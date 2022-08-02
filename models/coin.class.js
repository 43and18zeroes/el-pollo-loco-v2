class Coin extends CollectableObject {

    width = 60;
    height = 60;

    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.x = 400 + Math.floor(Math.random() * 10 * 180);
        this.y = 50 + Math.floor(Math.random() * 10 * 30);
    }

}