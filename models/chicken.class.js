class Chicken extends MovableObject {

    width = 80;
    height = 80;
    y = 345;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.x = 200 + Math.floor(Math.random() * 500);
    }

}