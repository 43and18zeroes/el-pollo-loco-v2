class Character extends MovableObject {

    // y = 180;
    y = 180;
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
    
    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png'
    ];
  
    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
    ];
   
    world;
    walking_sound = new Audio('audio/walking.mp3');


    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    moveRight() {
        this.x += this.speed;
        // character move right -> sound plays
        this.otherDirection = false;
        this.walking_sound.play();
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
    }

    beginningOfLevelReached() {
        return !(this.x > 0);
    }

    endOfLevelIsReached() {
        return !(this.x < this.world.level.level_end_x);
    }

    animate() {

        setInterval(() => {
            // sound pauses during a draw() cycle in order to stop playing when character isn't walking
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && !this.endOfLevelIsReached()) {
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && !this.beginningOfLevelReached()) {
                this.moveLeft();
            }

            if (this.world.keyboard.SPACE == true && !this.isAboveGround()) {
                this.jump();
            } 

            // changes cam position inverted to the x of character
            // + 100 so character is away from the canvas border
            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);


        setInterval(() => {
            
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            
            else {
                // walking animation
                if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);

        
    }


    jump() {
        this.speedY = 13;
    }

}