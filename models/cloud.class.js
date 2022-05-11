class Cloud extends MovableObject {



    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = 200 + Math.floor(Math.random() * 500);
    }

}