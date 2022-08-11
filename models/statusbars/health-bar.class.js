class HealthBar extends StatusBar {

    IMAGES_HEALTHBAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBAR);
        this.setPercentageHealthBar(100);
    }

    setPercentageHealthBar(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_HEALTHBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

}