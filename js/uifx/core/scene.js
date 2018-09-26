export class Scene {
    constructor(duration, render, init, end) {
        this.duration = duration;
        this.render = render;
        this.end = end;
        init && init.call(this);
    }
}

export class Game {
    constructor() {
        this.sceneStartTime = undefined;
        this.index = -1;
        this.timeline = [];
        this._stop = false;
    }
    /* having to do with all the scenes */
    appendScene(scene) {
        this.timeline.push(scene);
    }
    start() {
        this.index = 0;
        this.sceneStartTime = Date.now();
        window.requestAnimationFrame(this.render.bind(this));

        return new Promise((resolve, reject) => {
            this._end = resolve;
            // reject is irrelevant
        });
    }
    render() {
        this.sceneStartTime = this.sceneStartTime || Date.now();
        if (Date.now() - this.sceneStartTime >= this.timeline[this.index].duration) {
            let endingScene = this.timeline[this.index];
            endingScene.end && endingScene.end();
            if (this.index + 1 < this.timeline.length) this.index++;
            else {
                this._end && this._end();
                return;
            }
            this.sceneStartTime = Date.now();
        }
        // in range [0, 1) for each scene
        let progress = (Date.now() - this.sceneStartTime) / this.timeline[this.index].duration;
        this.timeline[this.index].render(progress);
        if (!this._stop) window.requestAnimationFrame(this.render.bind(this));
    }
    /** Stops the scene progression prematurely */
    cancel() {
        this._stop = true;
    }
}
