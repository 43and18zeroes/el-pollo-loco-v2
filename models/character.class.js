class Character extends MovableObject {

  y = 180;
  width = 120;
  height = 250;
  speed = 10;
  coinsAmount = 0;
  bottleAmount = 0;
  characterDiesAuxVar = 0;

  offset = {
    top: 120,
    bottom: 14,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png",
  ];

  IMAGES_IDLING = [
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png"
  ];

  intervalIds = [];
  world;
  characterDiesAuxVar = 0;
  walking_sound = new Audio("audio/walking.mp3");
  pepeDyingScreamMP3 = new Audio("audio/pepescream.mp3");
  youLostScreenMP3 = new Audio("audio/gameover.mp3");
  boingOnChickenHeadMP3 = new Audio("audio/boing.mp3");

  constructor() {
    super().loadImage(
      "img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLING);
    this.applyGravity();
    this.animate();
    this.pepeDyingScreamMP3.volume = 0.1;
  }

  moveRight() {
    this.x += this.speed;
    // character move right -> sound plays
    this.otherDirection = false;
    if (this.world.soundOn == true && this.y >= 180) {
      this.walking_sound.play();
    }
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
    if (this.world.soundOn == true && this.y >= 180) {
      this.walking_sound.play();
    }
  }

  beginningOfLevelReached() {
    return !(this.x > 0);
  }

  endOfLevelIsReached() {
    return !(this.x < this.world.level.level_end_x);
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && !this.endOfLevelIsReached();
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && !this.beginningOfLevelReached();
  }

  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  move() {
    // sound pauses during a draw() cycle in order to stop playing when character isn't walking
    this.walking_sound.pause();
    if (this.canMoveRight()) this.moveRight();

    if (this.canMoveLeft()) this.moveLeft();

    if (this.canJump()) this.jump();

    // changes cam position inverted to the x of character
    // + 100 so character is away from the canvas border
    this.world.camera_x = -this.x + 100;
  }

  isMoving() {
    return this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT;
  }

  play() {
    if (this.isDead()) this.initiateDead();
    else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.isMoving()) this.playAnimation(this.IMAGES_WALKING);
    else if (this.isIdling()) this.playAnimation(this.IMAGES_IDLING);
  }

  initiateDead() {
    this.disableKeys();
    if (!this.walking_sound.paused) {
      this.walking_sound.pause();
    }
    this.characterDyingAnimation();
  }

  characterDyingAnimation() {
    this.loadImage(this.IMAGES_DEAD[this.characterDiesAuxVar]);
    this.y += 15;
    this.characterDiesAuxVar++;
    this.pepeDyingScreamMP3.play();
    if (this.characterDiesAuxVar == this.IMAGES_DEAD.length) {
      this.intervalIds.forEach(clearInterval);
      this.showYouLostScreen();
    }
  }

  showYouLostScreen() {
    setTimeout(() => {
      document.getElementById("youlost").style.display = "inline";
      this.youLostScreenMP3.play();
    }, 3500);
  }

  animate() {
    let idMove = setInterval(() => {
      this.move();
    }, 1000 / 60);

    let idPlay = setInterval(() => {
      this.play();
    }, 50);

    this.intervalIds.push(idMove, idPlay);
  }

  jump() {
    this.speedY = 13;
  }

  isLandingOnTop(enemy) {
    return this.isColliding(enemy) && this.isAboveGround() && this.speedY < 0;
  }
}
