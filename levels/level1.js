let level1;
function initLevel() {
    level1 = new Level(
        createLevel1Bottles(),
        createLevel1Coins(),
        createLevel1Chickens(),
        createLevel1Endboss(),
        createLevel1Clouds(),
        createLevel1Background()
    );
}

function createLevel1Bottles() {
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]
}

function createLevel1Coins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
}

function createLevel1Chickens() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]
}

function createLevel1Endboss() {
    return [
        new Endboss()
    ]
}

function createLevel1Clouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]
}

function createLevel1Background() {
    return [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -719),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -719),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -719),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -719),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 3),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719 * 3),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719 * 3),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719 * 3)
    ]
}