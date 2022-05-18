let canvas;
let world;
let keyboard = new Keyboard(); // Instances keyboard object


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    console.log('My Character', world.character);
}

// Basic eventlistener that displays pressed keys in the console
window.addEventListener("keypress", (e) => { 
    console.log(e);
});