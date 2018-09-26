/**
 * @file Performs cool effects on the screen using screen2canvas
 * @author clabe45
 */
// BUG: html2canvas bug? <ul>s are not rendered properly... on localhost but not online?
// BUG: bottom of source's background is white when rendered
//      with html2canvas

import {Game, Scene} from './core/scene.js';
import Renderer from './core/renderer.js';
import scenes from './scenes.js';
import {setGame, setRenderer} from './constants.js';

const game = new Game();
setGame(game);
scenes.forEach(scene => { game.appendScene(scene); });

const START = 2 * 1000;
let gameHappening = false;
let htmlCache = null;
let styleCache = null;

setTimeout(() => {
    html2canvas(document.body, {
        backgroundColor: window.getComputedStyle(document.body).backgroundColor,    // for below the body
        width: window.innerWidth,
        height: window.innerHeight
    }).then(canvas => {
        console.log('lol');
        htmlCache = document.body.innerHTML;
        document.body.innerHTML = '';   // bad?

        let target = document.createElement('canvas');
        target.width = window.innerWidth;
        target.height = window.innerHeight;
        // target.class = 'rendered-screen';
        styleCache = window.getComputedStyle(document.body).cssText;
        document.body.style.paddingLeft = '0';
        document.body.style.paddingTop = '0';
        document.body.appendChild(target);

        gameHappening = true;

        startRendering(target, canvas);
    });
}, START);

function startRendering(target, source) {
    setRenderer(new Renderer(target, source));
    game.start().then(endRendering);
}

function endRendering() {
    console.log('gg :>');
}

document.addEventListener('keyup', event => {
    if (!gameHappening) return;
    let key = event.which || event.keyCode || 0;
    if (event.keyCode === 27) {
        game.cancel();
        document.body.innerHTML = htmlCache;
        document.body.style.cssText = styleCache;
        gameHappening = false;
    }
});
