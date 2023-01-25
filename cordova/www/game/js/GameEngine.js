const Direction = {
    RIGHT: 0,
    LEFT: 1,
    DOWN: 2
}

const BONUS = {
    TIME: "time",
    LINE: "line",
}

class GameEngine extends GameObject {

    constructor() {
        super(700)
        this.gameBoardWidth = canvas.width
        this.gameBoardHeight = canvas.height * 0.85
        this.boardColumns = 10;
        this.boardRows = 20;
        this.score = 0;
        this.currentTetro = new Tetromino();
        this.upcomingTetro = new Tetromino();
        this.gameBoard = new Array(this.boardRows);
        this.tileWidth = this.gameBoardWidth / this.boardColumns;
        this.tileHeight = this.gameBoardHeight / this.boardRows;
        this.clearBoard()
    }

    render() {
        this.drawStack()
        this.drawFallingPiece()
        this.drawUpcomingPiece()
        // this.drawBonus()
    }

    updateState() {
        if (!GAME_OVER) {
            this.lowerTetromino()
            this.checkBoard()
            // this.generateBonus()
        }
    }

    drawStack() {
        for (let i = 0; i < this.boardRows; i++) {
            for (let j = 0; j < this.boardColumns; j++) {
                if (this.gameBoard[i][j].tileStatus) {
                    drawRectangle(
                        j * this.tileWidth,
                        (i * this.tileHeight) + canvas.height * 0.15,
                        this.tileWidth,
                        this.tileHeight,
                        this.gameBoard[i][j].color)
                }
            }
        }
    }

    generateBonus() {
        while (true) {
            let randomRow = Math.floor(Math.random() * this.boardRows);
            let randomColumn = Math.floor(Math.random() * this.boardColumns);
            if (!this.gameBoard[randomRow][randomColumn].tileStatus) {
                let randomBonus = Math.floor(Math.random() * 2);
                switch (randomBonus) {
                    case 0:
                        this.gameBoard[randomRow][randomColumn].tileStatus = BONUS.TIME;
                        break;
                    case 1:
                        this.gameBoard[randomRow][randomColumn].tileStatus = BONUS.LINE;
                        break;
                }
                break;
            }
        }
    }

    drawBonus() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus == BONUS.TIME ||
                    this.currentTetro.tetroPosition[i][j].tileStatus == BONUS.LINE) {
                    let realColumnPos = this.currentTetro.columnPosition + j;
                    let realRowPos = this.currentTetro.rowPosition + i;
                    let icon;
                    if (this.currentTetro.tetroPosition[i][j].tileStatus == BONUS.TIME) {
                        icon = timeIcon;
                    } else if (this.currentTetro.tetroPosition[i][j].tileStatus == BONUS.LINE) {
                        icon = lineIcon;
                    }
                    new StaticImage(
                        icon,
                        realColumnPos * this.tileWidth,
                        (realRowPos * this.tileHeight) + canvas.height * 0.15,
                        this.tileWidth,
                        this.tileHeight).render()
                }
            }
        }
    }


    drawFallingPiece() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus) {
                    let realColumnPos = this.currentTetro.columnPosition + j;
                    let realRowPos = this.currentTetro.rowPosition + i;
                    drawRectangle(
                        realColumnPos * this.tileWidth,
                        (realRowPos * this.tileHeight) + canvas.height * 0.15,
                        this.tileWidth,
                        this.tileHeight,
                        this.currentTetro.tetroPosition[i][j].color)
                }
            }
        }
    }

    drawUpcomingPiece() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.upcomingTetro.tetroPosition[i][j].tileStatus) {
                    drawRectangle(
                        j * this.tileWidth + canvas.width * 0.04,
                        i * this.tileHeight + canvas.height * 0.05,
                        this.tileWidth,
                        this.tileHeight,
                        this.upcomingTetro.tetroPosition[i][j].color)
                }
            }
        }
    }

    checkBoard() {      // function checks if any row has been filled with pieces
        for (let i = this.boardRows - 1; i >= 0; i--) {
            let usedSlots = 0;
            for (let j = 0; j < this.boardColumns; j++) {
                if (this.gameBoard[i][j].tileStatus) {
                    usedSlots++;
                }
            }
            if (usedSlots === this.boardColumns) {
                this.clearRow(i);
                this.addPoints();
                this.lowerRows(i);
            }
        }
    }

    lowerTetromino() {      // appending piece, if it collides with either stack or bottom it's added to the stack
        let initialRowPos = this.currentTetro.rowPosition;
        this.currentTetro.rowPosition = initialRowPos + 1;
        if (this.bottomCollision() || this.stackCollision()) {
            this.currentTetro.rowPosition = initialRowPos;
            this.addToStack();
            this.currentTetro = this.upcomingTetro.clone()       // current piece becomes next piece in the line
            this.upcomingTetro = new Tetromino();        // next piece is generated
            if (this.stackCollision()) {           // if newly created piece collides with stack, game is over
                GAME_OVER = true;
            }
        }
    }

    moveTetromino(dir) {      // moving a piece, if piece collides with either wall or stack, move gets reversed
        if (!GAME_OVER) {
            switch (dir) {
                case Direction.DOWN: {
                    if (!this.isGameOver) {
                        this.lowerTetromino();
                    }
                    break;
                }
                case Direction.LEFT: {
                    let initialColumnPos = this.currentTetro.columnPosition;
                    this.currentTetro.columnPosition = initialColumnPos - 1;
                    if (this.leftCollision() || this.stackCollision()) {
                        this.currentTetro.columnPosition = initialColumnPos;
                    }
                    break;
                }
                case Direction.RIGHT: {
                    let initialColumnPos = this.currentTetro.columnPosition;
                    this.currentTetro.columnPosition = initialColumnPos + 1;
                    if (this.rightCollision() || this.stackCollision()) {
                        this.currentTetro.columnPosition = initialColumnPos;
                    }
                    break;
                }
            }
        }
    }

    rotateTetromino() {         // same logic as with moving, if new position collides, move gets reversed
        if (!GAME_OVER) {
            let temp = new Array(4);
            for (let i = 0; i < 4; i++) {
                temp[i] = new Array(4)
                for (let j = 0; j < 4; j++) {
                    temp[i][j] = this.currentTetro.tetroPosition[i][j];
                }
            }

            let initialColumnPos = this.currentTetro.columnPosition;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    this.currentTetro.tetroPosition[i][j] = temp[3 - j][i];
                }
            }

            while (this.leftCollision()) {
                this.currentTetro.columnPosition = initialColumnPos + 1;
            }

            while (this.rightCollision()) {
                this.currentTetro.columnPosition = initialColumnPos - 1;
            }

            if (this.stackCollision()) {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        this.currentTetro.tetroPosition[i][j] = temp[i][j];
                    }
                }
                this.currentTetro.columnPosition = initialColumnPos;
            }
        }
    }

    stackCollision() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus) {
                    let realColumnPos = this.currentTetro.columnPosition + j;
                    let realRowPos = this.currentTetro.rowPosition + i;
                    if (this.gameBoard[realRowPos][realColumnPos].tileStatus) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    bottomCollision() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus) {
                    let realRowPos = this.currentTetro.rowPosition + i;
                    if (realRowPos == this.boardRows) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    leftCollision() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus) {
                    let realColumnPos = this.currentTetro.columnPosition + j;
                    if (realColumnPos < 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    rightCollision() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus) {
                    let realColumnPos = this.currentTetro.columnPosition + j;
                    if (realColumnPos >= this.boardColumns) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    lowerRows(index) {      // lowers all rows before given index
        for (let i = index - 1; i > 0; i--) {
            for (let j = 0; j < this.boardColumns; j++) {
                this.gameBoard[i + 1][j] = new TetroPiece(this.gameBoard[i][j].tileStatus, this.gameBoard[i][j].color)
                this.gameBoard[i][j] = new TetroPiece(this.gameBoard[i - 1][j].tileStatus, this.gameBoard[i - 1][j].color)
            }
        }
    }

    addToStack() {      // function changes states in the gameBoard array according to fallen piece position
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.currentTetro.tetroPosition[i][j].tileStatus) {
                    let realColumnPos = this.currentTetro.columnPosition + j;
                    let realRowPos = this.currentTetro.rowPosition + i;
                    this.gameBoard[realRowPos][realColumnPos] = new TetroPiece(true, this.currentTetro.tetroPosition[i][j].color)
                }
            }
        }
        this.checkBoard()
    }

    clearBoard() {
        for (let i = 0; i < this.boardRows; i++) {
            this.gameBoard[i] = new Array(this.boardColumns);
            for (let j = 0; j < this.boardColumns; j++) {
                this.gameBoard[i][j] = new TetroPiece(false, null);
            }
        }
    }

    clearRow(rowIndex) {
        for (let i = 0; i < this.boardColumns; i++) {
            this.gameBoard[rowIndex][i] = new TetroPiece(false, null);
        }
    }

    addPoints() {
        this.score += 100;
        gameObjects[SCORE_TEXT].text = `Score: ${this.score}`
    }
}