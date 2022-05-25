class MovableObject {
    img;
    x = 120;
    y = 180;
    width = 120;
    height = 250;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

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


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        console.log('Moving right'); // this.img = document.getElementbyID('image') <img id="image">
    }
    

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // 60 FPS
    }
}