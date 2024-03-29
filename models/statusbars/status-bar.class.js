class StatusBar extends DrawableObject {

    yPositionBars = 56;

    percentage = 0;
    x = 40;
    y = this.yPositionBars * 0;
    width = 200;
    height = 60;


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }   

}