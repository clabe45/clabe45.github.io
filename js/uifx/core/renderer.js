export default class Renderer {
    constructor(target, source, font='15px monospace') {
        this.target = target;
        this.ctx = target.getContext('2d');
        this.ctx.font = font;
        this.source = source;
    }

    renderSource() {
        this.ctx.drawImage(this.source, 0, 0);
    }
    renderOverlay(color, alpha) {
        this.ctx.save();

        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = alpha;
        this.ctx.fillRect(0, 0, this.target.width, this.target.height);

        this.ctx.restore();
    }

    filter(f) {
        let imageData = this.ctx.getImageData(0, 0, this.target.width, this.target.height);
        let d = imageData.data;
        for (let i=0; i<d.length; i+=4) {
            // exclude alpha
            let px = f(...d.slice(i, i+3));
            for (let j=0; j<3; j++) d[i+j] = px[j];
        }
        this.ctx.putImageData(imageData, 0, 0);
        return imageData;
    }
}
