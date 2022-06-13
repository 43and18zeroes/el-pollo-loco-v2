class World {

    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = [];

    level = level1;
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;


    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // translate can move a picture, the second value is for the y-axis
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // translate camera back before drawing a fixed object
        /* -------- Space for fixed objects ------------- */
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // translate camera forward again before drawing movable objects


        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);


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
        // if object has an otherDirection var which is true
        if (mo.otherDirection) {
            // save current attributes of context
            this.ctx.save();
            // mirror image 
            this.ctx.translate(mo.width, 0);
            // invert width of object for the correct position
            this.ctx.scale(-1, 1);
            // x-axis was turned from left to right, so the x value of object must be changed too
            mo.x = mo.x * -1;
        }

        // insert image
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        // if object has an otherDirection var which is true (again)
        if (mo.otherDirection) {
            // x-axis was turned from left to right, so the x value of object must be changed too
            mo.x = mo.x * -1;
            // restore context so all other images get inserted unmirrored
            this.ctx.restore();
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                // Manipulate statusbar display
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

}