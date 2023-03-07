export default function addTransformManager(go)
{
    go.scaleVal={x:1,y:1};
    go.rotateVal=0;
    go.translateCoords={x:0,y:0};
    go.rotated=false;
    go.velo=5
    go.updateAppearance=function()
    {
        this.style.transform=
        `translate(${this.translateCoords.x}px,${this.translateCoords.y}px)
        scale(${this.scaleVal.x},${this.scaleVal.y})
        rotate(${this.rotateVal}deg)
        
        `;
    }
    go.rotate=function(value)
    {
        if(this.rotateVal==value)
        return;
        this.rotateVal=value;
        this.updateAppearance();
        if(value%360==0)
        this.rotated=false;
        else
        this.rotated=true;
    }
    go.scale=function(valueX,valueY)
    {
        if(valueY==undefined)
        valueY=valueX;
        if(this.scaleVal.x==valueX&&this.scaleVal.y==valueY)
        return;
        this.scaleVal={x:valueX,y:valueY};
        this.updateAppearance();
    }
    go.move=function(xx,yy)
    {
        this.translateCoords.x=xx;
        this.translateCoords.y=yy;
        this.updateAppearance();
    }
    go.moveTowards=function(direction,ACCN=1)
    {
        //console.log(direction)
        let xx,yy;
        switch(direction)
        {
            case "down":
                yy=1
                xx=0
                break
            case "up":
                yy=-1
                xx=0
                break
            case "right":
                xx=1
                yy=0
                break
            case "left":
                xx=-1
                yy=0
                break
            
        }
        this.translateCoords.x+=xx*this.velo;
        this.translateCoords.y+=yy*this.velo;
        this.velo+=ACCN
        this.updateAppearance();
    }
    go.stop=function()
    {
        this.velo=5
    }
}