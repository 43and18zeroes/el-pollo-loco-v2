class coinAmountBar extends StatusBar {

    IMAGES_COINAMOUNTBAR = [
        'img/7.Marcadores/Barra/Marcador moneda/Verde/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/Verde/20_  copia.png',
        'img/7.Marcadores/Barra/Marcador moneda/Verde/40_  copia 2.png',
        'img/7.Marcadores/Barra/Marcador moneda/Verde/60_  copia 2.png',
        'img/7.Marcadores/Barra/Marcador moneda/Verde/80_  copia 2.png',
        'img/7.Marcadores/Barra/Marcador moneda/Verde/100_ copia 2.png'
    ];

    maxCoinAmountBarValue = this.IMAGES_COINAMOUNTBAR.length;

    y = this.yPositionBars;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINAMOUNTBAR);
        this.setPercentageCoinBarAmount(0);
    }

    setPercentageCoinBarAmount(coinsCollected) {
        if (this.maxCoinAmountBarValueReached(coinsCollected)) {
            coinsCollected--;
        }
        let path = this.IMAGES_COINAMOUNTBAR[coinsCollected];
        this.img = this.imageCache[path];
    }

    maxCoinAmountBarValueReached(coinsCollected) {
        return coinsCollected == this.maxCoinAmountBarValue;
    }
}