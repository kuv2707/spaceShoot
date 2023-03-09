const BULLET_VELO=15

export default function(Game,shooter)
{
    
    let exp={}
    exp.Bullets=new Map()
    exp.shootBullet=function()
    {
        if(Game.status!="inProgress")
        return
        let x=shooter.translateCoords.x
        let y=shooter.translateCoords.y
        let bullet=document.createElement("img")
        bullet.src="/../images/bullet.png"
        bullet.id="bullet"
        bullet.strength=1
        document.body.append(bullet)
        Game.makeTransformable(bullet)
        bullet.rotate(shooter.rotateVal)
        bullet.score=20
        bullet.move(x,y)
        bullet.direction=shooter.rotateVal*Math.PI/180
        bullet.end=function()
        {
            exp.Bullets.delete(this)
            this.remove()
        }
        this.Bullets.set(bullet,bullet)

    }

    exp.collisionInspector=function(targetArr)
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
                        target.hitPts-=bullet.strength
                        if(target.hitPts<=0)
                        {
                            target.remove()
                            targetArr.splice(i,1)
                            target.alive=false
                            bullet.end()
                            Game.scoreBoard.addScore(target.orig_hitPts)
                        }
                        
                    }
                }
            }
            else
            bullet.end()
            
        })
    }
    return exp
}



