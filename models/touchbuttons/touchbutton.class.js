class TouchButton extends DrawableObject {
    canvasHeight = document.getElementById('canvas').clientHeight;
    touchButtonSize = 100;

    constructor() {
        super();
        this.y = 380;
        this.width = this.touchButtonSize;
        this.height = this.touchButtonSize;
    }

}