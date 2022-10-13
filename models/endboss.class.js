class Endboss extends MovableObject {
  endBossIntervals = [];

  width = 343;
  height = 400;
  y = 50;
  speed = 2;

  endBossHealth = 3;
  endBossDead = false;
  bossDiesIntervallTimesRun = 0;

  offset = {
    top: 100,
    bottom: 100,
    left: 70,
    right: 50,
  };

  IMAGES_WALKING = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png",
  ];

  IMAGES_DYING = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png",
  ];

  IMAGES_ENRAGED = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png",
  ];

  IMAGES_ENRAGED2 = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png"
  ];

  bossDefeatedMP3 = new Audio("audio/boss-defeated.mp3");
  endScreenMP3 = new Audio("audio/endscreen.mp3");
  world;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_ENRAGED2);
    this.x = 2470;
    this.animate();
  }

  animate() {
    let id = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
    this.endBossIntervals.push(id);
  }

  runLeft() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  bossDies() {
    this.endBossDead = true;
    this.endBossIntervals.forEach(clearInterval);
    this.bossDiesAnimation();
    if (soundOn) {
      this.bossDefeatedMP3.play();
    }
  }

  bossDiesAnimation() {
    let id = setInterval(() => {
      this.loadImage(this.IMAGES_DYING[this.bossDiesIntervallTimesRun]);
      this.y += 35;
      this.bossDiesIntervallTimesRun++;
      if (this.bossDiesIntervallTimesRun == this.IMAGES_DYING.length) {
        clearInterval(id);
      }
    }, 200);
    this.showYouWonScreen();
  }

  showYouWonScreen() {
    gameOver = true;
    setTimeout(() => {
      document.getElementById("youwon").style.display = "inline";
      document.getElementById("replaybutton").style.display = "flex";
      if (soundOn) {
        this.endScreenMP3.play();
      }
      endGame();
    }, 3500);
  }

  bossEnraged() {
    this.runLeft();
    let id = setInterval(() => {
      this.playAnimation(this.IMAGES_ENRAGED2);
    }, 150);
    this.endBossIntervals.push(id);
  }
}
