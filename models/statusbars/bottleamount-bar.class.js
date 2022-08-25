class bottleAmountBar extends StatusBar {

    IMAGES_BOTTLEAMOUNTBAR = [
        'img/7.Marcadores/Barra/Marcador_botella/Naranja/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Naranja/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Naranja/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Naranja/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Naranja/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Naranja/100_.png'
    ];

    maxBottleAmountBarValue = this.IMAGES_BOTTLEAMOUNTBAR.length;

    y = this.yPositionBars * 2;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEAMOUNTBAR);
        this.setPercentageBottleBarAmount(0);
    }

    setPercentageBottleBarAmount(bottlesCollected) {
        if (this.maxBottleAmountBarValueReached(bottlesCollected)) {
            bottlesCollected--;
        }
        let path = this.IMAGES_BOTTLEAMOUNTBAR[bottlesCollected];
        this.img = this.imageCache[path];
    }

    maxBottleAmountBarValueReached(bottlesCollected) {
        return bottlesCollected == this.maxBottleAmountBarValue;
    }
}