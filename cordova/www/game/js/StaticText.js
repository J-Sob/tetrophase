
const STATIC_TEXT_CENTRE = -1;

class StaticText extends GameObject
{
    constructor(text, x, y, font, fontSize, colour, visible, updateMillis)
    {
        super(updateMillis); 

        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;

        this.visible = visible;

        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
        if (this.x === STATIC_TEXT_CENTRE)
        {
            this.x = (canvas.width - this.width) / 2;
        }
    }

    render()
    {
        if(this.visible){
            ctx.fillStyle = this.colour;
            ctx.fillText(this.text, this.x, this.y);
        }
    }
}