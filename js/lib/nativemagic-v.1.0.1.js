/**
 *	@file
 * 	This is a JavaScript library for manipulating DOM elements with ease, while still staying close to
 *  native JavaScript.
 */
// TODO: convert entire file to es6? (lol like that's going to happen)
/**
 *  For private methods / classes
 *  @namespace
 */
export let magic$ = new Object();
// instance methods
magic$.style$ = function(self, name, value, operator) {
	if (value === undefined) {
		var val = self.style[name];
		var shortened = val.substring(0, val.length-2);	// minus 'px'
		if (!isNaN(val)) {
			return val*1;
		} else {
			if (!isNaN(shortened)) return shortened*1;
		}
		return val;
	} else {
		if (operator === undefined) operator = '=';
		switch (operator) {
			case '=': {
				if (!isNaN(value)) self.style[name] = value + 'px';	// is a number
				self.style[name] = value;		// ????
				break;
			}
			case '+=': {
				if (!isNaN(value)) self.style[name] = (self.style$(name)+value) + 'px';	// is a number
				else throw Exception('Cannot perform += operation on: ' + value);
				break;
			}
			case '-=': {
				if (!isNaN(value)) self.style[name] = (self.style$(name)-value) + 'px';	// is a number
				else throw Exception('Cannot perform -= operation on: ' + value);
				break;
			}
			case '*=': {
				if (!isNaN(value)) self.style[name] = (self.style$(name)*value) + 'px';	// is a number
				else throw Exception('Cannot perform *= operation on: ' + value);
				break;
			}
			case '/=': {
				if (!isNaN(value)) self.style[name] = (self.style$(name)/value) + 'px';	// is a number
				else throw Exception('Cannot perform /= operation on: ' + value);
				break;
			}
			default: {
				if (!isNaN(value)) self.style[name] = value + 'px';	// is a number
				self.style[name] = value;
				break;
			}
		}
		return self;
	}
};
magic$.innerHTML$ = function(self, html, op='=') {
	if (html !== undefined) {
		if (op === '=') self.innerHTML = html;
		else if (op === '+=') self.innerHTML += html;
		return self;
	} else {
		return self.innerHTML;
	}
};
magic$.id$ = function(self, id) {
	if (id !== undefined) self.id = id;
	else return self.id;
	return self;
}
magic$.addClass$ = function(self, cls) {
	if (self.className.indexOf(cls) == -1)
		self.className += (self.className.length>0?';':'') + cls;
};
magic$.hasClass$ = function(self, cls) {
	var classes = self.className.split(';');
	for (var i=0; i<classes.length; i++) {
		if (classes[i] === cls) return true;
	}
	return false;
};
magic$.removeClass$ = function(self, cls) {
	var classes = self.className.split(';');
	for (var i=0; i<classes.length; i++) {
		if (classes[i] === cls) classes.splice(i, 1);
	}
	self.className = classes.join(';');
	return self;
};
magic$.toggleClass$ = function(self, cls) {
	if (self.hasClass$(cls)) {
		self.removeClass$(cls);
		return true;
	} else {
		self.addClass$(cls);
		return false;
	}
};
magic$.purgeClasses$ = function(self) {
	var parentClasses = self.className.split(' ');
	parentClasses.sort(); // for comparing

	// only merge hierarchy if self has any children
	if (self.children.length == 0) return;

	// iterate over children
	for (var i=0; i<self.children.length; i++) {
		var child = self.children[i];
		// recurse if child has children
		if (child.children.length > 0) mergeHierarchy(child);

		var childClasses = child.className.split(' ');
		childClasses.sort();  // for comparing
		// if self classes differ from child classes, then move onto the next child (after removing any duplicated classes)
		if (childClasses.length != parentClasses.length || !childClasses.every(function(item,i) { return item === parentClasses[i];} )) {
			// remove duplicate classes from child (if any)
			for (var c=0; c<childClasses.length; c++) {
				if (parentClasses.indexOf(childClasses[c]) > -1) childClasses.splice(c, 1);
			}
			child.className = childClasses.join(' ');
			continue;
		}
		// remove child from DOM and insert innerHTML into parentf
		self.innerHTML = self.innerHTML.replace(child.outerHTML, child.innerHTML);
	}
};
magic$.on$ = function(self, eventName, handler) {
	self.addEventListener(eventName, handler);
};
magic$.appendTo$ = function(self, parent) {
	parent.appendChild(self);
};
magic$.prependTo$ = function(self, parent) {
	parent.insertBefore(self, parent.childNodes[0]);
};
magic$.removeFromDOM$ = function(self) {
	self.parentElement.removeChild(self);
};
magic$.fade$ = function(self, animating, internalCallback, css, duration, rate=2, callback) {
	if (animating) clearInterval(timer);	// stop whatever animation is going on
	var time = 0;
	var origCss = new Object();
	var slope = new Object();
	var dummyObj = document.createElement('div');	// used for style transformations
	magic$.M(dummyObj, true);
	for (prop in css) {
		if (css.hasOwnProperty(prop)) {
			dummyObj.style$(prop, css[prop]);
			css[prop] = dummyObj.style$(prop);	// numericalize, if necessary
			origCss[prop] = self.style$(prop);
			// color
			// convert to rgb
			if (typeof css[prop] === 'string') {
				if (css[prop][0] === '#' || css[prop].substring(0, 3) ==='rgb') css[prop] = magic$.getRGBComponents(css[prop]);
				if (origCss[prop][0] === '#' || origCss[prop].substring(0, 3) ==='rgb') origCss[prop] = magic$.getRGBComponents(origCss[prop]);
			}

			// pre-compute slopes / deltas
			if (typeof css[prop] === 'object') {	// it's a color
				slope[prop] = new Object();
				for (comp in css[prop]) {
					slope[prop][comp] = (css[prop][comp] - origCss[prop][comp]) / (duration - 0);
				}
			} else if (typeof css[prop] === 'number') {
				slope[prop] = (css[prop] - origCss[prop]) / (duration - 0);
			}
		}
	}
	timer = setInterval(function() {
		for (prop in css) {
			if (css.hasOwnProperty(prop)) {
				if (typeof css[prop] === 'object') {	// it's a color
					var color = {};
					// for comp in ('r', 'g', 'b'); (comp == component)
					for (comp in css[prop]) {
						var val = slope[prop][comp]*(time-0) + origCss[prop][comp];
						color[comp] = val;
					}
					self.style$(prop, magic$.rgbToString(color));
					if (time >= duration-rate && self.style$(prop) !== css[prop]) self.style$(prop, css[prop]);	// short work-around
				} else if (typeof css[prop] === 'number') {
					var val = slope[prop]*(time-0) + origCss[prop];	// point-slope form (modified)
					self.style$(prop, val);
					if (time >= duration-rate && self.style$(prop) !== css[prop]) self.style$(prop, css[prop]);	// short work-around
				}
			}
		}
		time += rate;
		if (time >= duration) {
			clearInterval(timer);
			animating = false;
			callback();
		}
	}, rate);
};

// miscellaneous methods
// Private function for color components -> credits: http://stackoverflow.com/a/11508164/3783155e
// Used for fade$()
magic$.getRGBComponents = function(str) {
	if (str[0] === '#') {
		var bigint = parseInt(str, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		return {'r': r, 'g': g, 'b': b};
	} else if (str.substring(0, 3) === 'rgb') {
		str = str.substring(4, str.length-1);
		var c = str.split(',');
		return {'r': c[0]*1, 'g': c[1]*1, 'b': c[2]*1};
	} else {
		throw new Error("Incorrect color format in parsing "+str+"  in Native Magic");
	}
}
// Used for fade$() also
magic$.rgbToString = function(obj) {
	return 'rgb(' + Math.round(obj.r) + ',' + Math.round(obj.g) + ',' + Math.round(obj.b) + ')';
}

/**
 *	This function takes in a DOM element and appends custom methods onto it to make
 *	doing things with it easier. This means it modifies the original object
 *	<em>PLEASE NOTE: this class is only used by the library. Do not use this class.</em>
 *	@param element {HTMLElement} the input DOM element to be modified
 *	@param isDummy {boolean} used to denote whether the object is used just for the
 *							 styling functions or not
 *	@return the modified element
 */
magic$.M = function(element, isDummy=false) {
	// |self| is another word for the element passed in as an argument
	var self = element;
	self.isDummy = isDummy;
	// for animating
	var animating = false,
		timer;
	/**	Sets <code>name</code> property of <code>self.style</code> to <code>value</code> by <code>op</code>, or returns <code>name</code> property of <code>self.style</code>
	 *	if other arguments omitted.
	 *	@param name {string}
	 * 	@param value {string, number}
	 *	@param operator {string} valid values: {'=', '+=', '-=', '/=', '*='}
	 *	@return {HTMLElement} self or the value of the css attribute of <code>value</code> is not present
	 */
	self.style$ = function(name, value, operator) {
		return magic$.style$(self, name, value, operator);
	};
	/** Gets or sets <code>self.innerHTML</code>
	 *	@param html {string} the new value for <code>innerHTML</code>
	 *	@param op {string} whether to set or append <code>html</code> onto <code>innerHTML</code>
	 *	@return <code>self</code> or <code>self.innerHTML</code> if <code>html</code> is not present.
	 */
	self.innerHTML$ = function(html, op='=') {
		return magic$.innerHTML$(self, op);
	};
	/** Gets or sets <code>self.id</code>
	 *	@param id {string} the new id
	 *	@return <code>self</code> or <code>self.id</code> if <code>id</code> is not present.
	 */
	self.id$ = function(id) {
		return magic$.id$(self, id);
	}
	/** Adds a string <code>newClass</code> to <code>self.className</code>. If class is already present, does nothing.
	 *	@param cls {string} the class to add
	 *	@return <code>self</code>
	 */
	self.addClass$ = function(cls) {
		magic$.addClass$(self, cls);
		return self;
	};
	/** Checks ot see if <code>self.className</code> contains the substring <code>theClass</code>
	 *	@param cls {string} the class to search for
	 *	@return {boolean}
	 */
	self.hasClass$ = function(cls) {
		return magic$.hasClass$(self, cls);
	};
	/** Removes the substring <code>cls</code> from <code>self.className</code>
	 *	@param cls {string} the class to remove
	 *	@return <code>self</code>
	 */
	self.removeClass$ = function(cls) {
		magic$.removeClass$(self, cls);
		return self;
	};
	/**	If <code>self</code> has class <code>cls</code>, adds removes class; else, adds it.
	 *	@param cls {string} the class to remove
	 *	@return <code>self</code>
	 */
	self.toggleClass$ = function(cls) {
		return magic$.toggleClass$(self, cls);
	};
	/** Purges all children of repeated classes, and merges parent/children-relationships with
	 *  identical classNames to single elements
	 *  @return <code>self</code>
	 */
	self.purgeClasses$ = function() {
		magic$.purgeClasses$(self);
		return self;
	}
	/**	Adds an event listener <code>handler</code> for <code>eventName</code>
	 *	@param eventName {string} the name of the event to attach to (e.g. "load", "click")
	 *	@param handler {function} the callback function
	 *	@return <code>self</code>
	 */
	self.on$ = function(eventName, handler) {
		magic$.on$(self, eventName, handler);
		return self;
	};
	/**	Appends <code>self</code> to the children of <code>parent</code>.
	 *	@param parent {HTMLElement} the new parent
	 *	@return <code>self</code>
	 */
	self.appendTo$ = function(parent) {
		magic$.appendTo$(self, parent);
		return self;
	};
	/**	Prepends <code>self</code> to the children of <code>parent</code>.
	 *	@param parent {HTMLElement} the new parent
	 *	@return <code>self</code>
	 */
	self.prependTo$ = function(parent) {
		magic$.prependTo$(self, parent);
		return self;
	};
	/**	Removes <code>self</code> from the children of its parent
	 *	@return <code>self</code>
	 */
	self.removeFromDOM$ = function() {
		magic$.removeFromDOM$(self);
		return self;
	};
	/**	Animates a set of CSS properties.
	 *	@param css {object} a set of key-value pairs (e.g. {"color": "#FF0000")
			<em>Note: color values can only be in hexadecimal or RGB form</em>
		@param duration {number} the total duration of the animation in milliseconds
		@param rate {number} optional, the number of milliseconds per frame of the animation
		@param callback {function} option, the function to call when the animation is complete
		@return <code>self</code>
	 */
	self.fade$ = function(css, duration, rate=2, callback) {
		magic$.fade$(self, animating, function(){animating=false;}, css, duration, rate, callback);
		animating = true;
		return self;
	};
};


/**	FUNCTION / CREATOR
 *	Takes in an element and passes it into C(). If <code>element.style$ != undefined</code>, then it is considered already modified and returns the original <code>element</code>
 *	@function
 *	@param element {string, HTMLElement} One of the following: A) {string} the tagname of the new element (e.g. 'div'); B) {string} basic html of ONE element. C) {string} the '#'
											followed by an ID to an existing element (e.g. '#marker'); D) {HTMLElement} an HTMLElement instance
 *	@return the modified <code>element</code>
 */

export let m = function(element) {
	var elem;
	if (element instanceof HTMLElement) {
		elem = element;
	} else if (typeof(element) === 'string') {
		// get element by id
		if (element[0] === '#') elem = document.getElementById(element.substring(1, element.length));
		// pure html
		else if (element[0] === '<' && element.substring(1, 3) !== '--') {
			// regex
			// no global flag because it only matches first one
			var p1 = /\<\s*(\w+)((\s+\w+\s*\=\s*(\'|\").*\3)*)\s*\>(.*)\<\s*\/\s*\1\s*\>/;	// first pattern; for normal tags (<p></p>, <title></title>);
			var p2 = /\<\s*(\w+)((\s+\w+\s*\=\s*(\'|\").*\3)*)\s*\/\>/;	// for self-closing tags like <img/>
			var p3 = /\<\s*(br|Br|bR|BR)(\s+\w+\=(\'|\").*\3)*\s*\>/;	// just for <br>

			var m1 = p1.exec(element);	// first match
			var m2 = p2.exec(element);
			if (m1 !== null | m2 !== null) {
				var m;
				var noInnerHTML = false;
				if (m1 === null) {
					m = m2;	// reference other one if it's null; if the other one's null, too bad
					noInnerHTML = true;	// self-explanatory
				} else if (m2 === null) {
					m = m1;
				} else {
					alert('bad');
				}
				var attribPattern = /(\w+)\s*\=\s*(\'|\")((?:.|\\\2)*?)\2/g;	// unique pattern that matches an attribute
				var tagName = m[1];	// first captured group
				elem = document.createElement(tagName);
				if (!noInnerHTML) elem.innerHTML = m[5];
				if (m[2] !== undefined) {
					// seperate each attr. by a colon, and then break it up by colons
					var attribStr = m[2];
					var attribMatch;
					while ((attribMatch = attribPattern.exec(attribStr)) !== null) {
						var attribName = attribMatch[1];
						var attribValue = attribMatch[3];
						elem.setAttribute(attribName, attribValue);
					}
				} else {
					// no attributes
				}
			}
			var m3 = p3.exec(element);
			if (m3 !== null) {
				elem = document.createElement('br');
			}
			if (m1 === null && m2 === null && m3 === null) throw new Error("Error parsing HTML in Native Magic");
		}
		// or create a new element with specified tag name
		else elem = document.createElement(element);
	}
	if (elem.style$ === undefined) magic$.M(elem);	// hasn't been magicified
	return elem;	// is an instance of M
};
/**
 *	@namespace
 */
export let cookie$ = new Object();
/**	Returns the value of the specified cookie.
 *	@param name {string} the name of the cookie to be retrieved
 *	@return the value of the cookie or undefined if not found
 */
cookie$.get = function(name) {
	cookies = document.cookie.split(',');
	for (var i=0; i<cookies.length; i++) {
		var namevaluepair = cookies[i].split('=');
		var cname = namevaluepair[0];
		var cvalue = namevaluepair[1];
		if (cname === name) return cvalue;
	}
	return undefined;	// explicit
}
/**	Sets a cookie <code>name</code> to <code>value</code> with optional <code>options</code>.
 *	@param name {string} the name of the cookie to be altered
 *	@param value {string} the new value of the cookie
 *	@param options {object} options that are converted to a string and sent to the cookie assignment with the value;
 *		@prop {string} expires the expiration date
 *		@prop {string} path the new path of the cookie
 */
cookie$.set = function(name, value, options) {
	var str = document.cookie.length>0?',':'';
	str += name + '=' + value;
	if (options !== undefined) {
		if (options.expires !== undefined) {
			str += '; ' + 'expires=' + options.expires;
		}
		if (options.path !== undefined) {
			str += '; ' + 'path=' + options.path;
		}
	}
		document.cookie += str;
	};
/**	Removes a cookie by setting its date to a date in the past
 *	@param name the name of the cookie to be removed
 */
cookie$.remove = function(name) {
	document.cookie = name + '='+';' + 'expires='+'Thu, 01 Jan 1970 00:00:00 UTC';
}
