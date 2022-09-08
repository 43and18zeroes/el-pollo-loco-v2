class Endboss extends MovableObject {

    endBossIntervals = [];
    
    width = 343;
    height = 400;
    y = 50;

    endBossHealth = 1;
    endBossDead = false;

    offset = {
        top: 100,
        bottom: 100,
        left: 70,
        right: 50
    }

    IMAGES_WALKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
    ];

    IMAGES_DYING =  [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ]

    constructor() {
        // if even the loadImages should load the images with a problem
        // the loadImage loads the first img just in case
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = 2470;
        this.animate();
    }

    animate() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        this.endBossIntervals.push(id);
    }

    bossDies() {
        this.endBossDead = true;
        this.endBossIntervals.forEach(clearInterval);
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_DYING);
            setTimeout(() => {
                clearInterval(id);
            }, 200 / 2 * this.IMAGES_DYING.length);
        }, 200);
    }
}