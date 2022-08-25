class ThrowableObject extends MovableObject {

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw();
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }
}