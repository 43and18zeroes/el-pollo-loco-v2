class TouchButtonRight extends TouchButton {

    touchButtonLeft = 'img/buttons/buttons_img/arrow-right.png';


    constructor() {
        super();
        this.loadImage(this.touchButtonLeft);
        this.x = 100;
    }

}