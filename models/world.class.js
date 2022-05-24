class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0)
    ];

    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        this.addToMap(this.character);

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
        if(mo.otherDirection) {
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

}