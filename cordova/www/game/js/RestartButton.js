class RestartButton extends Button{
    constructor(x, y){
        super(x, y, TEXT_WIDTH, TEXT_HEIGHT, "Restart", null, 30);
    }

    render(){
        if(GAME_OVER){
            super.render()
        }
    }

    onClickAction(){
        if(GAME_OVER){
            reloadGame()
        }
    }
}