class Coin extends CollectableObject {

    width = 100;
    height = 100;

    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.x = 400 + Math.floor(Math.random() * 2000);
        this.y = Math.floor(Math.random() * 370);
    }

}