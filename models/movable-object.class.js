class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    // two variables to control falling speed
    speedY = 0;
    acceleration = 0.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
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

    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x  + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height  - mo.offset.bottom;
    }

    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1; // return true if hit durring last 5 s
    }

    isDead() {
        return this.energy == 0;
    }

}