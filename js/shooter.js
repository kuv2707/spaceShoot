
import makeTransformable from "/js/transformManager.js"

let shooter=document.createElement("img")
shooter.id="shooter"
shooter.src="/../images/shooter.png"
document.body.append(shooter)
makeTransformable(shooter)
shooter.velo=25
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
    let newx=this.translateCoords.x+xx*this.velo;
    let newy=this.translateCoords.y+yy*this.velo;
    //shooter.move((newx+window.innerWidth)%window.innerWidth,(newy+window.innerHeight)%window.innerHeight)
    if(newx<window.innerWidth-shooter.offsetWidth &&  newx>0)
    shooter.move(newx,newy)
    this.velo+=ACCN
}

shooter.stop=function()
{
    this.velo=25
}
shooter.move(window.innerWidth/2-shooter.offsetWidth,window.innerHeight-100)
export default shooter


