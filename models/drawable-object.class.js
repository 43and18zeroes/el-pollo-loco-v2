class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    width = 120;
    height = 250;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    drawHitbox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    };


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path; // local
            this.imageCache[path] = img; // global
        });
    }

}