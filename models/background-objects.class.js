class BackgroundObject {
    x = 0;
    y = 0;
    img;
    width = 720;
    height = 480;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

}