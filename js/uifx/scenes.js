import {Game, Scene} from './core/scene.js';
import Renderer from './core/renderer.js';
import * as effect from './effects.js';
import {getRenderer, getGame} from './constants.js';

const intro = new Scene(4 * 1000, progress => {
    getRenderer().renderSource();
    getRenderer().renderOverlay('black', Math.pow(progress, 3));  // cubic interpolation
    let r = Math.floor(Math.random() * 25);
    switch (r) {
        case 0: {
            getRenderer().renderOverlay('black', 0.3);
            break;
        }
        case 1: {
            getRenderer().renderOverlay('darkblue', 0.3);
            break;
        }
        case 2: {
            getRenderer().renderOverlay('darkred', 0.3);
        }
    }

    // let them escape if they want to
    // blink every second (half of every second)
    if ((Date.now() - getGame().sceneStartTime) % 1000 >= 500) {
        let ctx = getRenderer().ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('Press ESC to exit...', 200, 100);
    }
});


const text = new Scene(null, function(progress) {   // `function` to use `this`
    this.background(progress);

    this.renderText(progress);
    effect.redBlue();
    effect.randomNoise();
    effect.blur();

}, function() {
    this.timeline = [
        {text: 'Welcome', duration: 3*1000},
        {text: null, duration: 500},
        {text: 'You thought this was an innocent profile page...', duration: 3*1000},
        {text: null, duration: 500},
        {text: 'My word, you were wrong.', duration: 3*1000},
        {text: null, duration: 500}
    ];
    this.duration = this.timeline.reduce((totalTime, text) => totalTime + text.duration, 0);
    this.textIndex = 0;
    this.background = function(progress) {
        getRenderer().renderSource();
        let flicker = Math.floor(Math.random()*60) === 0;
        getRenderer().renderOverlay('black', flicker ? 0.75 : 1);
    }
    this.renderText = function(progress) {
        let ctx = getRenderer().ctx;
        // get your hands dirty
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';

        this.textStart = this.textStart || Date.now();
        if (Date.now() - this.textStart >= this.timeline[this.textIndex].duration) {
            if (this.textIndex + 1 < this.timeline.length) this.textIndex++;
            // else scene should be ended, due to its duration (duration should be total durations)
            this.textStart = Date.now();
        }
        if (this.textIndex > -1) {
            if (Date.now() - this.textStart >= this.timeline[this.textIndex].duration) this.textIndex++;
            let currText = this.timeline[this.textIndex];
            if (currText.text) ctx.fillText(currText.text, getRenderer().target.width/2, getRenderer().target.height/2);
        }
    };
});

const tempOutro = new Scene(3 * 1000, progress => {
    let effectFactor = Math.pow(1 - progress, 3);   // cubic inteprolate out
    getRenderer().renderSource();
    let flicker = Math.floor(Math.random()*60) === 0;
    // flicker is an effect for our purposes
    getRenderer().renderOverlay('black', flicker ? effectFactor*1 + (1-effectFactor)*0.75 : 1);

    let ctx = getRenderer().ctx;
    ctx.save();
    ctx.textAlign = 'center';
    let [,fontFamily] = ctx.font.split(' ');
    ctx.font = '20px ' + fontFamily;    // increase font size
    ctx.fillStyle = '#fffa';
    ctx.fillText('To be continued...', getRenderer().target.width/2, getRenderer().target.height/2);

    ctx.font = '12px ' + fontFamily;
    ctx.fillStyle = '#fff6';
    ctx.fillText('Press ESC to exit', getRenderer().target.width/2, getRenderer().target.height/2+50);
    ctx.restore();

    effect.redBlue(effectFactor);
    effect.randomNoise(effectFactor);
    effect.blur(effectFactor);
});

// audio fun :>

export default [intro, text, tempOutro];
