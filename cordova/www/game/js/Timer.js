class Timer extends GameObject{
    constructor(time, x, y){
        super(1000)
        this.time = time;
        this.x = x;
        this.y = y;
        this.textToDisplay = new StaticText(`Time: ${Math.floor(this.time / 60) + ":" + this.time % 60}`, this.x, this.y, "Orbitron", 25, "white", true)
    }

    updateState(){
        if(this.time > 0 && !GAME_OVER){
            this.time -= 1;

            if(this.time == 0){
                GAME_OVER = true;
            }

            if(this.time <= 10){
                this.textToDisplay.colour = "red"
            }else{
                this.textToDisplay.colour = "white"
            }
            this.textToDisplay.text = `Time: ${Math.floor(this.time / 60) + ":" + this.time % 60}`;
        }
    }

    render(){
        this.textToDisplay.render();
    }

}