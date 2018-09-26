import runGame from './game.js';
import './uifx/app.js'; // does work internally

window.addEventListener('load', () => {
    document.getElementById('runGame').addEventListener('click', () => {
        runGame();
        return false;
    });
});
