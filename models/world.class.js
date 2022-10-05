class World {
  character = new Character();
  healthBar = new HealthBar();
  coinAmountBar = new coinAmountBar();
  bottleAmountBar = new bottleAmountBar();
  ThrowableObjects = [];

  level = level1;
  enemies = level1.enemies;
  endBoss = level1.endBoss;
  clouds = level1.clouds;
  coins = level1.coins;
  bottles = level1.bottles;
  backgroundObjects = level1.backgroundObjects;
  game_music = new Audio("audio/mexican-huapango-banda-2715.mp3");
  bottleCollectedMP3 = new Audio("audio/collect-bottle.mp3");

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  alreadyThrown = false; // auxiliary var to prevent rapid throwing
  bossHit = false; // auxiliary var to time boss hits

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    if (soundOn == true) {
      this.game_music.volume = 0.1;
      this.game_music.play();
    }
  }

  setWorld() {
    this.character.world = this;
    this.endBoss[0].world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.renderObjects();
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0); // translate camera back before drawing a fixed object
    this.renderFixedObjects();
    this.ctx.translate(this.camera_x, 0); // translate camera forward again before drawing movable objects
    this.ctx.translate(-this.camera_x, 0); // return camera after everything is drawed (otherwise it would translate until infinity)
    this.checkDevice();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  checkDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.getElementById('keyboardinstructions').style.display = 'none';
      document.getElementById('enterfullscreen').style.display = 'none';
      document.getElementById('lowerbuttons').style.display = 'flex';
    } else {
      document.getElementById('keyboardinstructions').style.display = 'block';
      document.getElementById('enterfullscreen').style.display = 'flex';
      document.getElementById('lowerbuttons').style.display = 'none';
    }
  }

  renderObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endBoss);
    this.addObjectsToMap(this.ThrowableObjects);
  }

  renderFixedObjects() {
    this.addToMap(this.healthBar);
    this.addToMap(this.coinAmountBar);
    this.addToMap(this.bottleAmountBar);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    // if (this.checkIfOffsetExists(mo)) {
    //   mo.drawHitbox(this.ctx);
    // } else {
    //   mo.drawFrame(this.ctx);
    // }

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  checkIfOffsetExists(mo) {
    return !(
      mo.offset.top == 0 &&
      mo.offset.bottom == 0 &&
      mo.offset.left == 0 &&
      mo.offset.right == 0
    );
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  run() {
    setInterval(() => {
      this.checkCollisionsChicken();
      this.checkCollisionsCoins();
      this.checkCollisionsBottles();
      this.checkCollisionsBottlesToBoss();
      this.checkCollisionsBottlesToGround();
      this.checkThrowObjects();
      this.checkIfBossIsDead();
      this.checkCollisionsBoss();
    }, 50);
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.alreadyThrown == false &&
      this.character.bottleAmount > 0
    ) {
      this.character.bottleAmount--;
      this.bottleAmountBar.setPercentageBottleBarAmount(this.character.bottleAmount);
      this.throwBottle();
    }
  }

  throwBottle() {
    this.alreadyThrown = true;
    let bottle = new ThrowableObject(
      this.character.x + 50,
      this.character.y + 110
    );
    this.ThrowableObjects.push(bottle);
    setTimeout(() => {
      this.alreadyThrown = false;
    }, 1000);
  }

  checkCollisionsChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isLandingOnTop(enemy)) {
        this.chickenDies(enemy);
      }
      else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
        this.character.hit();
        this.healthBar.setPercentageHealthBar(this.character.energy);
      }
    });
  }

  checkCollisionsBoss() {
    this.level.endBoss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.character.oneShot();
        this.healthBar.setPercentageHealthBar(this.character.energy);
      }
    });
  }

  chickenDies(enemy) {
    if (soundOn == true) {
      this.playboingOnChickenHeadMP3();
    }
    this.character.speedY = 6.5;
    const enemyToRemove = this.enemies.indexOf(enemy);
    this.enemies.splice(enemyToRemove, 1);
  }

  playboingOnChickenHeadMP3() {
    if (!this.character.boingOnChickenHeadMP3.paused) {
      this.character.boingOnChickenHeadMP3.pause();
      this.character.boingOnChickenHeadMP3.currentTime = 0;
    }
    this.character.boingOnChickenHeadMP3.play();
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        if (soundOn == true) {
          this.playCoinCollectedMP3();
        }
        const coinToRemove = this.coins.indexOf(coin);
        this.coins.splice(coinToRemove, 1);
        this.character.coinsAmount++;
        this.coinAmountBar.setPercentageCoinBarAmount(
          this.character.coinsAmount
        );
      }
    });
  }

  playCoinCollectedMP3() {
    if (!this.coins[0].coinCollectedMP3.paused) {
      this.coins[0].coinCollectedMP3.pause();
      this.coins[0].coinCollectedMP3.currentTime = 0;
    }
    this.coins[0].coinCollectedMP3.play();
  }

  checkCollisionsBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (!this.bottleCollectedMP3.paused) {
          this.bottleCollectedMP3.pause();
          this.bottleCollectedMP3.currentTime = 0;
        }
        this.collectBottle(bottle);
      }
    });
  }

  collectBottle(bottle) {
    if (soundOn == true) {
      this.bottleCollectedMP3.play();
    }
    const bottleToRemove = this.bottles.indexOf(bottle);
    this.bottles.splice(bottleToRemove, 1);
    this.character.bottleAmount++;
    this.bottleAmountBar.setPercentageBottleBarAmount(
      this.character.bottleAmount
    );
  }

  checkCollisionsBottlesToBoss() {
    this.ThrowableObjects.forEach((ThrowableObject) => {
      if (this.properBossHit(ThrowableObject)) {
        this.damageBoss();
        if (this.endBoss[0].endBossHealth > 0) {
          this.endBoss[0].bossEnraged();
        }
      }
    });
  }

  checkCollisionsBottlesToGround() {
    this.ThrowableObjects.forEach((ThrowableObject) => {
      if (this.bottleOnGround(ThrowableObject)) {
        this.ThrowableObjects[0].bottleBreak();
      }
    });
  }

  bottleOnGround(ThrowableObject) {
    return (ThrowableObject.y > 310);
  }

  damageBoss() {
    this.bossHit = true;
    this.endBoss[0].endBossHealth--;
    this.ThrowableObjects[0].bottleBreak();
    if (this.endBoss[0].x == 2470) {
      this.endBoss[0].runLeft();
    }
    setTimeout(() => {
      this.bossHit = false;
    }, 1000);
  }

  properBossHit(ThrowableObject) {
    return this.bottleHitsBoss(ThrowableObject) && this.hasRecentlyBeenHit();
  }

  bottleHitsBoss(ThrowableObject) {
    return (
      this.endBoss[0].isColliding(ThrowableObject) && this.ThrowableObjects.length != 0
    );
  }

  hasRecentlyBeenHit() {
    return this.bossHit != true;
  }

  checkIfBossIsDead() {
    if (
      this.endBoss[0].endBossHealth < 1 &&
      this.endBoss[0].endBossDead == false
    ) {
      this.endBoss[0].bossDies();
      this.endBoss[0].speed = 0;
    }
  }
}