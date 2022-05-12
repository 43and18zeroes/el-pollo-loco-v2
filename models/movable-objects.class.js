class MovableObject {
    x = 120;
    y = 180;
    width = 120;
    height = 250;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right'); // this.img = document.getElementbyID('image') <img id="image">
    }

    moveLeft() {
        
    }
}