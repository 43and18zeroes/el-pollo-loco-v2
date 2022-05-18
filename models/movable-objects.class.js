class MovableObject {
    img;
    x = 120;
    y = 180;
    width = 120;
    height = 250;
    imageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    currentImage = 0;


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


    moveRight() {
        console.log('Moving right'); // this.img = document.getElementbyID('image') <img id="image">
    }

    moveLeft() {
        
    }
}