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
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image,', this.img.src);
        }
    }

     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path; // local
            this.imageCache[path] = img; // global
        });
    }
}