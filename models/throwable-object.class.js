class ThrowableObject extends MovableObject {

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    throwableObjectsIntervals = [];

    IMAGES_ROTATING = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];

    IMAGES_BREAKING = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
    ];

    world;
    bottle_breaking_sound = new Audio('audio/bottle-break.mp3');

    constructor(x, y) {
        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_BREAKING);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw();
        this.rotationAnimation();
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }

    rotationAnimation() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        }, 100);
        this.throwableObjectsIntervals.push(id);
    }

    bottleBreak() {
        this.throwableObjectsIntervals.forEach(clearInterval);
        if (world.soundOn == true) {
            this.bottle_breaking_sound.volume = 0.01;
            this.bottle_breaking_sound.play();
        }
        this.playAnimation(this.IMAGES_BREAKING);
        setTimeout(() => {
            this.x = 0;
        }, 100);
        setTimeout(() => {
            world.ThrowableObjects.splice(0, 1);
        }, 1000);
    }
}