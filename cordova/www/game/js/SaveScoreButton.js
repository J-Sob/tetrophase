class SaveScoreButton extends Button{
    constructor(x, y){
        super(x, y, TEXT_WIDTH, TEXT_HEIGHT, "Save score", null, 30);
    }

    render(){
        if(GAME_OVER){
            super.render()
        }
    }

    onClickAction(){
        if(GAME_OVER){
            let name = prompt("Enter your nickname")
            if(name != null && name != ""){
                firestoreService.saveScore(name, gameObjects[GAME_ENGINE].score, () => reloadGame())
            }
        }
    }
}