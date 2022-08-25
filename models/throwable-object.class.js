class ThrowableObject extends MovableObject {

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    IMAGES_ROTATING = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        this.loadImages(this.IMAGES_ROTATING);
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
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        }, 100);
    }
}