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

    
    // added by Junus off record, purpose unclear
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width.this.height);
    }
}