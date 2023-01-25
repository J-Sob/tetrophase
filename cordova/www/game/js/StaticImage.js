
class StaticImage extends GameObject
{

    constructor(image, x, y, width, height)
    {
        super(null);

        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}