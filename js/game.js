let canvas;
let world;
let keyboard = new Keyboard(); // Instances keyboard object
let gameOver;
let soundOn = true;

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
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    && screen.availHeight < screen.availWidth) {
        forceFullscreen();
    }
    gameOver = false;
    if (soundOn == true) {
        pepeStartMP3.play();
    }
    initLevel();
    world = new World(canvas, keyboard);
    initLevelMedia();
}

function initLevelMedia() {
    soundOnOffRestart();
    handleScreensAndButtons();
    setTimeout(() => { /* wait to avoid black screen caused by loading */
        document.getElementById("pepestart").style.display = "none";
    }, 1500);
    setTimeout(() => {
        if (soundOn == true) {
            collectBottlesMP3.play();
        }
    }, 2000);
}

function handleScreensAndButtons() {
    document.getElementById("youlost").style.display = "none";
    document.getElementById("youwon").style.display = "none";
    document.getElementById("replaybutton").style.display = "none";
    document.getElementById("pepestart").style.display = "inline";
    document.getElementById("startbutton").style.display = "none";
    document.getElementById("startscreen").style.display = "none";
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
        if (gameOver == false) {
            keyboard.LEFT = true;
        }
    });

    document.getElementById('arrowleft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('arrowright').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (gameOver == false) {
            keyboard.RIGHT = true;
        }
    });

    document.getElementById('arrowright').addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
    });

    document.getElementById('arrowjump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (gameOver == false) {
            keyboard.SPACE = true;
        }
    });

    document.getElementById('arrowjump').addEventListener('touchend', (event) => {
        keyboard.SPACE = false;
    });

    document.getElementById('arrowthrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (gameOver == false) {
            keyboard.D = true;
        }
    });

    document.getElementById('arrowthrow').addEventListener('touchend', (event) => {
        keyboard.D = false;
    });
}

function toggleFullscreen() {
    if (document.getElementById('fullscreenicon').innerText == 'fullscreen') {
        addFullscreenClasses();
    }
    else {
        document.getElementById('fullscreenicon').innerText = 'fullscreen';
        document.exitFullscreen();
    }
}

function forceFullscreen() {
        addFullscreenClasses();
}

function addFullscreenClasses() {
    document.getElementById('canvas-frame').requestFullscreen();
    document.getElementById('canvas').classList.add('fullscreen-res');
    document.getElementById('youlost').classList.add('fullscreen-res');
    document.getElementById('youwon').classList.add('fullscreen-res');
    document.getElementById('pepestart').classList.add('fullscreen-res');
    document.getElementById('fullscreenicon').innerText = 'fullscreen_exit';
}

document.addEventListener("fullscreenchange", function () {
    if (window.innerHeight == screen.height) {
        document.getElementById('fullscreenicon').innerText = 'fullscreen_exit';
    } else {
        document.getElementById('fullscreenicon').innerText = 'fullscreen';
    }
});


function playSound(sound, volume) {
    if(soundOn) {
        if(volume) {
            sound.volume = 0.01;
        }

        sound.play();
    }
}

function soundOnOff() {
    const soundOnOffIcon = document.getElementById('soundonofficon');
    if (soundOn == true) {
        soundOn = false;
        soundOnOffIcon.innerText = 'volume_off';
        world.game_music.pause();
        collectBottlesMP3.pause();
    } else {
        soundOn = true;
        soundOnOffIcon.innerText = 'volume_up';
        if (world.game_music.paused) {
            world.game_music.volume = 0.1;
            world.game_music.play();
        }
    }
}

function soundOnOffRestart() {
    const soundOnOffIcon = document.getElementById('soundonofficon');
    if (soundOnOffIcon.innerText == 'volume_off') {
        soundOn = false;
    } else {
        soundOn = true;
    }
}

function endSoundOnRestart() {
    world.endBoss[0].endScreenMP3.pause();
    world.endBoss[0].endScreenMP3.currentTime = 0;
    world.character.youLostScreenMP3.pause();
    world.character.youLostScreenMP3.currentTime = 0;
}

function restartGame() {
    endSoundOnRestart();
    startGame();
}