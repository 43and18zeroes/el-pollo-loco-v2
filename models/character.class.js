class Character extends MovableObject {

    // y = 180;
    y = 0;
    width = 120;
    height = 250;
    speed = 10;
    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');

    
    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.animate();
    }


    animate() {

        setInterval(() => {
            // sound pauses during a draw() cycle in order to stop playing when character isn't walking
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT == true && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                // character move right -> sound plays
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT == true && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                // character move left -> sound plays
                this.walking_sound.play();
            }

            // changes cam position inverted to the x of character
            // + 100 so character is away from the canvas border
            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);



        setInterval(() => {

            // walking animation
            if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);


    }

    jump() {

    }
}