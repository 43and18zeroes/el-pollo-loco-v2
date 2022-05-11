class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        // this.ctx.drawImage(this.enemies[0].img, this.enemies[0].x, this.enemies[0].y, this.enemies[0].width, this.enemies[0].height);

        // for (let index = 0; index < this.enemies.length; index++) {
        //     const element = this.enemies[index];
        //     this.ctx.drawImage(this.element.img, this.element.x, this.element.y, this.element.width, this.element.height);
        // }

        let self = this;

        requestAnimationFrame(function() {
            self.draw();
        });
    }
}