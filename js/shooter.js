export default function(Game)
{

    let shooter=document.createElement("img")
    shooter.id="shooter"
    shooter.src=window.location.href+"images/shooter.png"
    document.body.append(shooter)
    window.makeTransformable(shooter)
    shooter.velo={x:2,y:2}
    shooter.moveTowards=function(direction,ACCN=1)
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
        let newx=this.translateCoords.x+xx*this.velo.x;
        let newy=this.translateCoords.y+yy*this.velo.y;
        if(newx<window.innerWidth-shooter.offsetWidth &&  newx>0  && newy>0  && newy<window.innerHeight-shooter.offsetHeight)
        shooter.move(newx,newy)
        this.velo.x+=ACCN
        this.velo.y+=ACCN
    }
    
    shooter.stop=function()
    {
        this.velo={x:2,y:2}
    }
    
    window.addEventListener("resize",()=>
    {
        shooter.move(window.innerWidth/2-shooter.clientWidth/2,window.innerHeight-100)
    })
    
    return shooter
}


