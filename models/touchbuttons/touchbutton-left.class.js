class TouchButtonLeft extends TouchButton {

    touchButtonLeft = 'img/buttons/buttons_img/arrow-left.png';


    constructor() {
        super();
        this.loadImage(this.touchButtonLeft);
        this.x = 0;
    }

}