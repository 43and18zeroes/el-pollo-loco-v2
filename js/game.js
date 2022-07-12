let canvas;
let world;
let keyboard = new Keyboard(); // Instances keyboard object


function init() {
    canvas = document.getElementById('canvas');
}


function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    /* wait 30 ms to avoid black screen caused by loading */
    setTimeout(() => {
        document.getElementById("startbutton").style.display = "none";
        document.getElementById("startscreen").style.display = "none";
    }, 30);
    // test comment
}


// Basic eventlistener that displays pressed keys in the console
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


function activateFullscreen() {
    let canvas = document.getElementById('canvas');
    canvas.requestFullscreen();
    canvas.classList.add('fullscreen-res');
    canvas.style.backgroundImage = 'none';
}


