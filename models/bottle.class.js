class Bottle extends CollectableObject {

    offset = {
        top: -10,
        bottom: -10,
        left: -10,
        right: -10
    }

    width = 60;
    height = 60;

    constructor() {
        super().loadImage('img/6.botella/2.Botella_enterrada1.png');
        this.x = 400 + Math.floor(Math.random() * 10 * 180);
        this.y = 360;
    }

}