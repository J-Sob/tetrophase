const Shape = {
    ISHAPE: 0,
    TSHAPE: 1,
    RECTSHAPE: 2,
    LSHAPE: 3,
    JSHAPE: 4,
    SSHAPE: 5,
    ZSHAPE: 6,
}

const tetroColors = [
    "purple",
    "red",
    "blue",
    "green",
    "yellow",
    "orange"
]

class TetroPiece {
    constructor(tileStatus, color){
        this.tileStatus = tileStatus;
        this.color = color;
    }
}

class Tetromino extends GameObject{

    constructor(){
        super();
        this.rowPosition = 0;
        this.columnPosition = 3;
        this.tetroPosition = new Array(4)
        
        let color = tetroColors[Math.floor(Math.random() * tetroColors.length)]

        // initial array fill
        for(let i = 0; i < 4; i++){
            this.tetroPosition[i] = new Array(4)
            for(let j = 0; j < 4; j++){
                this.tetroPosition[i][j] = new TetroPiece(false, color);
            }
        }

        this.shape = Math.floor(Math.random() * 7);

        switch(this.shape){
            case Shape.ISHAPE:
                this.tetroPosition[1][0].tileStatus = true;
                this.tetroPosition[1][1].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                this.tetroPosition[1][3].tileStatus = true;   
                break;
            case Shape.TSHAPE:
                this.tetroPosition[0][1].tileStatus = true;
                this.tetroPosition[0][2].tileStatus = true;
                this.tetroPosition[0][3].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                break;
            case Shape.RECTSHAPE:
                this.tetroPosition[0][1].tileStatus = true;
                this.tetroPosition[0][2].tileStatus = true;
                this.tetroPosition[1][1].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                break;
            case Shape.LSHAPE:
                this.tetroPosition[1][1].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                this.tetroPosition[0][3].tileStatus = true;
                this.tetroPosition[1][3].tileStatus = true;
                break;
            case Shape.JSHAPE:
                this.tetroPosition[1][1].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                this.tetroPosition[1][3].tileStatus = true;
                this.tetroPosition[0][1].tileStatus = true;
                break;
            case Shape.SSHAPE:
                this.tetroPosition[0][2].tileStatus = true;    
                this.tetroPosition[0][3].tileStatus = true;
                this.tetroPosition[1][1].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                break;
            case Shape.ZSHAPE:
                this.tetroPosition[0][1].tileStatus = true;
                this.tetroPosition[0][2].tileStatus = true;
                this.tetroPosition[1][2].tileStatus = true;
                this.tetroPosition[1][3].tileStatus = true;
                break;
        }
    }

    clone(){
        let tetro = new Tetromino();
        tetro.tetroPosition = this.tetroPosition.map(arr => [...arr]);
        return tetro;
    }
}