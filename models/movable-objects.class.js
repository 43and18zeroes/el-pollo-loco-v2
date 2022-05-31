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
    // two variables to control falling speed
    speedY = 0;
    acceleration = 0.5;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                console.log("this.speedY", this.speedY)
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < 180;
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


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
        // character move right -> sound plays
    }


    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        
    }
}