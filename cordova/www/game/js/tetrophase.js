/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */

let spaceImage = new Image()
spaceImage.src = "../res/space_backgroung.jpg"

let metalImage = new Image()
metalImage.src = "../res/metal_background.png"

let timeIcon = new Image()
timeIcon.src = "../res/clock_icon.jpg"

let lineIcon = new Image()
lineIcon.src = "../res/minus_icon.png"

const SCORE_TEXT = 3;
const GAME_ENGINE = 5;
const RESTART_BUTTON = 7;
const SAVE_SCORE_BUTTON = 8;
const HIGH_SCORE_BUTTON = 9;
const ACCELEROMETER_BUTTON = 11;

let GAME_OVER = false;
let ACCELEROMETER = false;

/******************* END OF Declare game specific data and functions *****************/




/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame() {
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* Specifically, this function will:                                */
    /* 1. initialise the canvas and associated variables                */
    /* 2. create the various game gameObjects,                   */
    /* 3. store the gameObjects in an array                      */
    /* 4. create a new Game to display the gameObjects           */
    /* 5. start the Game                                                */



    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */
    gameObjects.push(new StaticImage(spaceImage, 0, canvas.height * 0.15, canvas.width, canvas.height))
    gameObjects.push(new StaticImage(metalImage, 0, 0, canvas.width, canvas.height * 0.15))
    gameObjects.push(new StaticText("Upcoming piece", 0.05, canvas.height * 0.04, "Orbitron", 25, "white", true))
    gameObjects.push(new StaticText("Score: 0", canvas.width * 0.6, canvas.height * 0.04, "Orbitron", 25, "white", true))
    gameObjects.push(new Timer(120, canvas.width * 0.6, canvas.height * 0.08))
    gameObjects.push(new GameEngine())
    gameObjects.push(new GameOverText(canvas.width * 0.3, canvas.height * 0.5, 35))
    gameObjects.push(new RestartButton(canvas.width * 0.37, canvas.height * 0.52))
    gameObjects.push(new SaveScoreButton(canvas.width * 0.33, canvas.height * 0.59))
    gameObjects.push(new HighScoreButton(canvas.width * 0.27, canvas.height * 0.66))
    gameObjects.push(new StaticText("Acc: ", canvas.width * 0.6, canvas.height * 0.12, "Orbitron", 25, "white", true))
    gameObjects.push(new AccelerometrButton(canvas.width * 0.77, canvas.height * 0.09))

    /* Always create a game that uses the gameObject array */
    let game = new TetrophaseGame();

    /* Always play the game */
    game.start();


    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 37)  // left
        {
            gameObjects[GAME_ENGINE].moveTetromino(Direction.LEFT);
        }
        else if (e.keyCode === 38) // up
        {
            gameObjects[GAME_ENGINE].rotateTetromino()
        }
        else if (e.keyCode === 39) // right
        {
            gameObjects[GAME_ENGINE].moveTetromino(Direction.RIGHT);
        }
        else if (e.keyCode === 40) // down
        {
            gameObjects[GAME_ENGINE].moveTetromino(Direction.DOWN);
        }
    });

    document.getElementById("gameCanvas").addEventListener("mousedown", function (e) {
        if (e.which === 1)  // left mouse button
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            if (gameObjects[RESTART_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                gameObjects[RESTART_BUTTON].onClickAction()
            }
            else if (gameObjects[SAVE_SCORE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                gameObjects[SAVE_SCORE_BUTTON].onClickAction()
            }
            else if (gameObjects[HIGH_SCORE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                gameObjects[HIGH_SCORE_BUTTON].onClickAction()
            }
            else if (gameObjects[ACCELEROMETER_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                gameObjects[ACCELEROMETER_BUTTON].onClickAction()
            }
        }
    });

    document.getElementById("gameCanvas").addEventListener("mousemove", function (e) {
        if (e.which === 0) // no button selected
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            gameObjects[RESTART_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
            gameObjects[SAVE_SCORE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
            gameObjects[HIGH_SCORE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
            gameObjects[ACCELEROMETER_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
        }
    });

    // Mobile events

    let xDown = null;
    let yDown = null;

    document.addEventListener('touchstart', function (e) {
        const firstTouch = getTouches(e)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }, false);

    document.addEventListener('touchmove', function (e) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                gameObjects[GAME_ENGINE].moveTetromino(Direction.LEFT);
            } else {
                gameObjects[GAME_ENGINE].moveTetromino(Direction.RIGHT);
            }
        } else {
            if (yDiff > 0) {
                gameObjects[GAME_ENGINE].rotateTetromino()
            } else {
                gameObjects[GAME_ENGINE].moveTetromino(Direction.DOWN)
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }, false);

    function getTouches(e) {
        return e.touches ||
            e.originalEvent.touches;
    }

    // accelerometr movements

    window.addEventListener('deviceorientation', handleOrientation);

    function handleOrientation(event) {
        if(ACCELEROMETER){
            let betaR = Math.radians(event.beta)
            let gammaR = Math.radians(event.gamma)
            let alphaR = Math.radians(event.alpha)
            let spinSideway = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
            let spinFront = Math.atan2(Math.cos(alphaR) * Math.sin(gammaR), Math.sin(betaR));
    
            // convert back to degrees
            let sideWayTilt = spinSideway * 180 / Math.PI;
            let frontTilt = spinFront * 180 / Math.PI;
    
            if (sideWayTilt > 30) {
                gameObjects[GAME_ENGINE].moveTetromino(Direction.RIGHT);
                console.log("prawo") 
            }
            if (sideWayTilt < -30) {
                gameObjects[GAME_ENGINE].moveTetromino(Direction.LEFT);
                console.log("lewo")
            }
            if(frontTilt > 30 ){
                gameObjects[GAME_ENGINE].moveTetromino(Direction.DOWN);
                console.log("dol")
            }
        }
    }

}