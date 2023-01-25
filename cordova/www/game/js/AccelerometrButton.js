const OFF = "OFF"
const ON = "ON"

class AccelerometrButton extends Button{
    constructor(x, y){
        super(x, y, TEXT_WIDTH, TEXT_HEIGHT, "OFF", null, 30);
        this.backgroundColour = "red"
    }

    onClickAction(){
        if(ACCELEROMETER){
            ACCELEROMETER = false;
            this.text = OFF
            this.backgroundColour = "red"
        }else{
            ACCELEROMETER = true;
            this.text = ON
            this.backgroundColour = "green"
        }
    }
}