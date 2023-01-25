class GameOverText extends StaticText{
    constructor(x, y, size){
        super("GAME OVER!", x, y, "Orbitron", size, "red", false, 100)
    }

    updateState(){
        if(GAME_OVER){
            this.visible = true;
        }else{
            this.visible = false;
        }
    }
}