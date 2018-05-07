var gameRunning = false;
var htlmCache;

function runGame() {
  if (gameRunning) return;
  gameRunning = true;
  htmlCache = document.body.innerHTML;

  traverseDOMRecursively(function(element) {
    let text = element.innerHTML;
    if (text.length > 1 && element.children.length == 0) {
      element.innerHTML = '';
      for (var i=0; i<text.length; i++) {
        var letter = document.createElement('span');
        letter.innerHTML = text[i];
        element.appendChild(letter);
      }
    }

    m(element);
    element
      .style$('position', 'absolute')
      .style$('top', Math.floor(Math.random()*200))
      .style$('left', Math.floor(Math.random()*150))     // i don't know why i can't use window.innerWidth
      .style$('fontSize', 48);
  });
  var int = setInterval(function() {
    var beganStopping = false;
    traverseDOMRecursively(function(element) {
      if (beganStopping) return;
      element
        .style$('top', choose2(-1, +1)*Math.floor(Math.random()*5), '+=')
        .style$('left', choose2(-1, +1)*Math.floor(Math.random()*5), '+=')
        .style$('fontSize', 1, '-=');
      if(element.style$('fontSize') == 1) {
        beganStopping = true;
        document.body.innerHTML = '';
        // I hate javascript
        clearInterval(int);
        setTimeout(function() {
          alert('javascript');
          let changedStyles = ['position', 'top', 'left', 'fontSize'];
          for (var i=0; i<changedStyles.length; i++) {
            let style = changedStyles[i];
            document.body.style[style] = "";
          }
          document.body.innerHTML = htmlCache;
          gameRunning = false;
        }, 100);
      }
    });
  }, 200);
}
function choose2(opt1, opt2) {
  return Math.floor(Math.random()*2) == 0 ? opt1 : opt2;
}

function traverseDOMRecursively(action, elem=document.body) {
  action(elem);
  for (var i=0; i<elem.children.length; i++) {
    traverseDOMRecursively(action, elem.children[i]);
  }
}
