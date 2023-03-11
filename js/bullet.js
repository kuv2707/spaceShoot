const BULLET_VELO=15
export default class BulletController
{
    constructor(Game,shooter)
    {
        this.Bullets=new Map()
        this.shootBullet=function()
        {
            if(Game.status!="inProgress")
            return
            let x=shooter.translateCoords.x
            let y=shooter.translateCoords.y
            let bullet=document.createElement("img")
            bullet.src=window.location.href+"images/bullet.png"
            bullet.id="bullet"
            bullet.strength=1+Math.random()*9
            document.body.append(bullet)
            window.makeTransformable(bullet)
            bullet.rotate(shooter.rotateVal)
            bullet.score=20
            bullet.move(x,y)
            bullet.direction=shooter.rotateVal*Math.PI/180
            let controller=this
            bullet.end=function()
            {
                controller.Bullets.delete(this)
                this.remove()
            }
            this.Bullets.set(bullet,bullet)
    
        }
    }
    collisionInspector=function(targetArr)
    {
        this.Bullets.forEach(bullet=>
        {
            if(bullet.translateCoords.y>-80)
            {
                let y=-BULLET_VELO*Math.cos(bullet.direction)
                let x=BULLET_VELO*Math.sin(bullet.direction)
                bullet.move(bullet.translateCoords.x+x,bullet.translateCoords.y+y)
                for(let i=targetArr.length-1;i>=0;i--)
                {
                    let target=targetArr[i]
                    let tco=target.translateCoords
                    let bulloc={
                        x:(bullet.translateCoords.x)+(bullet.offsetWidth)/2,
                        y:(bullet.translateCoords.y)+(bullet.offsetHeight)/2,
                    }
                    if(bulloc.x>tco.x &&  bulloc.x<(tco.x+target.offsetWidth)
                    && bulloc.y>tco.y &&  bulloc.y<(tco.y+target.offsetHeight))
                    {
                        target.demote(bullet.strength)
                        bullet.end()
                    }
                }
            }
            else
            bullet.end()
            
        })
    }
}