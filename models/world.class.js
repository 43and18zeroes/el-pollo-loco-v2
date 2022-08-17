class World {

    character = new Character();
    healthBar = new HealthBar();
    coinAmountBar = new coinAmountBar();
    // startScreen = new StartScreen;
    throwableObjects = [];

    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    coins = level1.coins;
    backgroundObjects = level1.backgroundObjects;
    game_music = new Audio('audio/mexican-huapango-banda-2715.mp3');

    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    alreadyThrown = false;  // auxiliary var to prevent rapid throwing


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.game_music.volume = 0.01;
        this.game_music.play();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // translate can move a picture, the second value is for the y-axis
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // translate camera back before drawing a fixed object
        /* -------- Space for fixed objects ------------- */
        this.addToMap(this.healthBar);
        this.addToMap(this.coinAmountBar);
        // this.addToMap(this.startScreen);
        this.ctx.translate(this.camera_x, 0); // translate camera forward again before drawing movable objects


        // return camera after everything is drawed (otherwise it would translate until infinity)
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if(this.checkIfOffsetExists(mo)) {
            mo.drawHitbox(this.ctx);
        } else {
            mo.drawFrame(this.ctx);
        }
        

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    checkIfOffsetExists(mo) {
        return !(mo.offset.top == 0 &&
            mo.offset.bottom == 0 &&
            mo.offset.left == 0 &&
            mo.offset.right == 0);
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
            this.checkThrowObjects();
        }, 50);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.alreadyThrown == false) {
            this.alreadyThrown = true;
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 110);
            this.throwableObjects.push(bottle);

            setTimeout(() => {
                this.alreadyThrown = false;
            }, 1000);
        }
    }


    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                // Manipulate healthbar display
                this.healthBar.setPercentageHealthBar(this.character.energy);
            }
        });
    }


    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                const coinToRemove = this.coins.indexOf(coin);
                this.coins.splice(coinToRemove, 1);
                this.character.coinsAmount++
                this.coinAmountBar.setPercentageCoinBarAmount(this.character.coinsAmount);
            }
        });
    }
}