// CANVAS PROPERTIES //

const canvas = document.getElementById('firstcanvas');
const context = canvas.getContext('2d');
canvas.width = 1596;
canvas.height = 500;

const keys = [];

// MOVABLE CHARACTER //

const player = {
    x: 10,
    y: 452,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 2,
    moving: false
}

// COINS 1 AND 2 //

const coins = {
    x: 902,
    y: 425,
    width: 84,
    height: 70,
    frameX: 0,
    frameY: 0,
    speed: 0,
    moving: true
}

const Scndcoins = {
    x: 1210,
    y: 403,
    width: 115,
    height: 97,
    frameX: 0,
    frameY: 0,
    speed: 0,
    moving: true
}

const End = {
    x: 1300,
    y: 200,
    width: 277,
    height: 33,
    frameX: 0,
    frameY: 0,
    speed: 0,
    moving: false
}

const Bac = {
    x: 895,
    y: 350,
    width: 150,
    height: 34,
    frameX: 0,
    frameY: 0,
    speed: 0,
    moving: false
}

const bts = {
    x: 1200,
    y: 350,
    width: 106,
    height: 35,
    frameX: 0,
    frameY: 0,
    speed: 0,
    moving: false
}

// DRAWING CHARACTER COINS AND BACKGROUND FROM PNG FILE //

const playerSprite = new Image();
playerSprite.src = "dude.png";
const background = new Image();
background.src = "background.png";
const coinsSprite = new Image();
coinsSprite.src = "smallcoins.png";
const ScndCoinsSprite = new Image();
ScndCoinsSprite.src = "coins.png"
const EndSprite = new Image();
EndSprite.src = "end.png"
const BacSprite = new Image();
BacSprite.src = "BAC.png"
const BtsSprite = new Image();
BtsSprite.src = "bts.png"

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawCoinsSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawScndCoinsSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawEndSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    
}

function drawBacSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    
}

function drawBtsSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    
}

// SET THE CHARACTER PLACE IN THE CANVAS AND DO THE ANIMATION //

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height); // correct the background position (cut it)
    context.drawImage(background, 0 , 0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height); // set player at the left top of the screen if player.x/y = 0
    if (player.x < 902) {
        drawCoinsSprite(coinsSprite, coins.width * coins.frameX, coins.height * coins.frameY, coins.width, coins.height, coins.x, coins.y, coins.width, coins.height);
    }
    if (player.x < 1210) {
        drawScndCoinsSprite(ScndCoinsSprite, Scndcoins.width * Scndcoins.frameX, Scndcoins.height * Scndcoins.frameY, Scndcoins.width, Scndcoins.height, Scndcoins.x, Scndcoins.y, Scndcoins.width, Scndcoins.height);
    }
    if (player.x > 1400) {
        drawEndSprite(EndSprite, End.width * End.frameX, End.height * End.frameY, End.width, End.height, End.x, End.y, End.width, End.height);
    }
    if (player.x > 902) {
        drawBacSprite(BacSprite, Bac.width * Bac.frameX, Bac.height * Bac.frameY, Bac.width, Bac.height, Bac.x, Bac.y, Bac.width, Bac.height);
    }
    if (player.x > 1210) {
        drawBtsSprite(BtsSprite, bts.width * bts.frameX, bts.height * bts.frameY, bts.width, bts.height, bts.x, bts.y, bts.width, bts.height);
    }
    moveCharacter();
    moveCharacterFrame();
    

    requestAnimationFrame(animate); // create the animation

}

animate();


setInterval(function() {

    context.clearRect(0, 0, canvas.width, canvas.height); // correct the background position (cut it)
    context.drawImage(background, 0 , 0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height); // set player at the left top of the screen if player.x/y = 0
    drawCoinsSprite(coinsSprite, coins.width * coins.frameX, coins.height * coins.frameY, coins.width, coins.height, coins.x, coins.y, coins.width, coins.height);
    moveCharacter();
    moveCharacterFrame();
    moveCoinsFrame();

}, 60);

// ALLOW US TO PLAY THE CHARACTER //

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true; // add element into an array, when key pressed , add the key to the "keys" array
    player.moving = true;
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
    player.frameY = 0; // if no key pressed, the caracter will look at you
    player.moving = false;
});

function moveCharacter() {
    if (keys[38] && player.y > 468) { // when keyboard up pressed move the Character up but can't exit the box
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;

    }
    if (keys[37] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
      //  position++;

    }
    if (keys[40] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;

    }
    if (keys[39] && player.x < 1596 ) {
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
      //  position--;

    }
}

// SET COINS AND PLAYER ANIMATION SPEED //

function moveCharacterFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}

function moveCoinsFrame() {
    if (coins.frameX < 3) coins.frameX++
    else coins.frameX = 0;
    if (Scndcoins.frameX < 3) Scndcoins.frameX++
    else Scndcoins.frameX = 0;
}