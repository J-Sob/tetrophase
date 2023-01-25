class HighScoreButton extends Button{
    constructor(x, y){
        super(x, y, TEXT_WIDTH, TEXT_HEIGHT, "Show high scores", null, 30);
    }

    render(){
        if(GAME_OVER){
            super.render()
        }
    }

    onClickAction(){
        if(GAME_OVER){
            firestoreService.fetchScores()
                .then(elements => {
                    alert(
                        elements.sort((a, b) => a.score > b.score ? -1 : 1)
                            .slice(0, 9)
                            .map((entry, index) => `${index + 1}. ${entry.name} | ${entry.score} \n`)
                    )})
        }
    }
}