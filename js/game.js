let canvas;
let world;
let keyboard = new Keyboard(); // Instances keyboard object
let gameOver;

pepeStartMP3 = new Audio("audio/pepe-start.mp3");
collectBottlesMP3 = new Audio("audio/collect-bottles.mp3");

function init() {
    canvas = document.getElementById('canvas');
    setTimeout(() => {
        document.getElementById("prestart").style.display = "none";
    }, 400);

    initTouchButtons();
}

function startGame() {
    gameOver = false;
    pepeStartMP3.play();
    initLevel();
    world = new World(canvas, keyboard);
    initLevelMedia();
}

function initLevelMedia() {
    document.getElementById("youlost").style.display = "none";
    document.getElementById("replaybutton").style.display = "none";
    document.getElementById("pepestart").style.display = "inline";
    document.getElementById("startbutton").style.display = "none";
    document.getElementById("startscreen").style.display = "none";
    setTimeout(() => { /* wait to avoid black screen caused by loading */
        document.getElementById("pepestart").style.display = "none";
    }, 1500);
    setTimeout(() => {
        collectBottlesMP3.play();
    }, 2000);

}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39 && gameOver == false) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37 && gameOver == false) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38 && gameOver == false) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40 && gameOver == false) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32 && gameOver == false) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68 && gameOver == false) {
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

function initTouchButtons() {
    document.getElementById('arrowleft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('arrowleft').addEventListener('touchend', (event) => {
        keyboard.LEFT = false;
    });

    document.getElementById('arrowright').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('arrowright').addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
    });

    document.getElementById('arrowjump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('arrowjump').addEventListener('touchend', (event) => {
        keyboard.SPACE = false;
    });

    document.getElementById('arrowthrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('arrowthrow').addEventListener('touchend', (event) => {
        keyboard.D = false;
    });
}

function activateFullscreen() {
    let canvas = document.getElementById('canvas');
    canvas.requestFullscreen();
    canvas.classList.add('fullscreen-res');
    canvas.style.backgroundImage = 'none';
}

function soundOnOff() {
    const soundOnOffIcon = document.getElementById('soundonofficon');
    if (world.soundOn == true) {
        world.soundOn = false;
        soundOnOffIcon.innerText = 'volume_off';
        world.game_music.pause();
        collectBottlesMP3.pause();
    } else {
        world.soundOn = true;
        soundOnOffIcon.innerText = 'volume_up';
        world.game_music.play();
    }
}