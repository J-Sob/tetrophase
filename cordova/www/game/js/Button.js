/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

const BUTTON_CENTRE = -1;
const TEXT_WIDTH = -2;
const TEXT_HEIGHT = -3;

class Button extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(x, y, width, height, text, 
        backgroundImage = null, fontSize = 50, 
        font = "Times Roman", textColour = "Black", 
        backgroundColour = "#ccc", borderColour = "#999", 
        borderWidth = 2, updateMillis = null)
    {
        super(updateMillis); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.backgroundImage = backgroundImage;

        this.isHovering = false;

        /* set default text values */
        this.font = font;
        this.fontSize = fontSize;
        this.textColour = textColour;
        this.backgroundColour = backgroundColour;
        this.strokeStyle = borderColour;
        this.borderWidth = borderWidth;
        
        /* set the size and postition of the button */
        if (this.width === TEXT_WIDTH)
        {
            ctx.font = this.fontSize + "px " + this.font;
            this.width = ctx.measureText(this.text).width * 1.1; // make the box slightly wider than the text
        }

        if (this.height === TEXT_HEIGHT)
        {
            this.height = this.fontSize * 1.1;
        }

        if (this.x === BUTTON_CENTRE)
        {
            this.x = (canvas.width - this.width) / 2;
        }
    }

    render()
    {
        /* the ImageButton's border */
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.borderWidth;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.fillStyle = this.backgroundColour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();

        /* the button's image */
        if (this.backgroundImage !== null)
        {
            ctx.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
        }

        /* the button's text */
        ctx.fillStyle = this.textColour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed elsewhere
        ctx.fillText(this.text, this.x + this.width * 0.05, this.y + this.height * 0.75);

        /* brighten the image if the mouse is hovering over it */
        if (this.isHovering)
        {
            let imageData = ctx.getImageData(this.x, this.y, this.width, this.height);
            let data = imageData.data;

            /* Manipulate the pixel data */
            for (let i = 0; i < data.length; i += 4)
            {
                data[i + 0] = data[i + 0] + 30;
                data[i + 1] = data[i + 1] + 30;
                data[i + 2] = data[i + 2] + 30;
            }

            ctx.putImageData(imageData, this.x, this.y);
        }
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if (!this.gameObjectIsDisplayed)
        {
            this.isHovering = false;
            return false;
        }
        if ((pointX > this.x) && (pointY > this.y))
        {
            if (pointX > this.x)
            {
                if ((pointX - this.x) > this.width)
                {
                    this.isHovering = false;
                    return false; // to the right of this gameObject
                }
            }

            if ((pointY - this.y) > this.height)
            {
                if (pointY > this.height)
                {
                    this.isHovering = false;
                    return false; // below this gameObject
                }
            }
        }
        else // above or to the left of this gameObject
        {
            this.isHovering = false;
            return false;
        }
        this.isHovering = true;
        return true; // inside this gameObject
    }

    onClickAction(){}
}