/**
 * NOTE: These effects include variability and the possibility of not being performed at a given frame
 */
import Renderer from './core/renderer.js';
import {getRenderer} from './constants.js';

export function redBlue(factor=0.5) {
    let ctx = getRenderer().ctx;
    // effect of increasing red or blue
    let doEffect = Math.floor(Math.random()*36) === 0;
    if (!doEffect) return;
    let effectAmount = factor * Math.random(),   // obv [0, 1)
        oneMinusAmount = 1 - effectAmount;
    let channel = Math.floor(Math.random()*2) === 0 ? 0 : 2;  // only red or blue
    getRenderer().filter((r, g, b) => {
        let p = [r, g, b];
        // raise channel
        p[channel] = effectAmount*200 + oneMinusAmount*p[channel];
        // decrease other channels
        for (let i=0; i<3; i++) p[i] *= effectAmount*0.5 + oneMinusAmount*1;
        return p;
    });
}

const NUMB_NOISE_FRAMES = 10, noiseCache = [];

// TODO: implement doRandomNoise that calculates variability and stuff
export function randomNoise(factor=0.5) {
    if (noiseCache.length < NUMB_NOISE_FRAMES) {
        // now we know the dimensions, so we'll render one frame at a time (ik kind of weird)
        let canvas = document.createElement('canvas');
        canvas.width = getRenderer().target.width;
        canvas.height = getRenderer().target.height;

        let tempRenderer = new Renderer(canvas, null);
        let imageData = tempRenderer.filter((r, g, b) => {
            let p = [];
            let grayscaleValue = Math.floor(Math.random()*255);
            for (let i=0; i<3; i++) p.push(grayscaleValue);
            return p;
        });
        noiseCache.push(imageData);
    }

    let doEffect = Math.floor(Math.random()*20) === 0;
    if (!doEffect) return;

    let amount = factor * Math.random(),
        oneMinusAmount = 1 - amount;
    let cacheIndex = Math.floor(Math.random()*noiseCache.length),
        cacheImageData = noiseCache[cacheIndex];


    let i=0;
    getRenderer().filter((r, g, b) => {
        let p = [r, g, b];
        for (let j=0; j<3; j++) p[j] = amount*cacheImageData.data[i+j] + oneMinusAmount*p[j];
        i+= 4;
        return p;
    });
}

export function blur(factor) {
    let ctx = getRenderer().ctx;
    // effect of pseudo-blurring
    let doEffect = Math.floor(Math.random()*5) === 0;
    if (!doEffect) return;
    let effectAmount = factor * Math.random(),   // cubic interpolation   [0, 1)
        oneMinusAmount = 1 - effectAmount;
    // render the canvas onto itself a few times for "blur"
    ctx.save();
    ctx.globalAlpha = 0.2;
    let variance = 4,            // text displacement factor
        min = -variance, max = +variance;
    let numbRenders = 1 + Math.floor(Math.random()*2);
    for (let i=0; i<numbRenders; i++)
        ctx.drawImage(
            getRenderer().target,
            min + Math.random() * (max-min),
            min + Math.random() * (max-min)
        );
    ctx.restore();
}
