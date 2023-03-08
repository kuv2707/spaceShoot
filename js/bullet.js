import Judge from "/js/judge.js"
import makeTransformable from "/js/transformManager.js"
const Bullets=new Map()
const BULLET_VELO=15

let shooter,Game;
function shootBullet()
{
    if(!Game.status)
    return
    let x=shooter.translateCoords.x
    let y=shooter.translateCoords.y-60
    let bullet=document.createElement("img")
    bullet.src="/../images/bullet.png"
    bullet.id="bullet"
    document.body.append(bullet)
    makeTransformable(bullet)
    bullet.score=20
    bullet.move(x,y)
    bullet.direction=shooter.rotateVal*Math.PI/180
    bullet.end=function()
    {
        Bullets.delete(this)
        this.remove()
    }
    Bullets.set(bullet,bullet)
    if(Bullets.size==1)
    {
        window.requestAnimationFrame(painter)
    }

}

function painter()
{
    Bullets.forEach(bullet=>
    {
        if(bullet.translateCoords.y>-80)
        {
            let y=-BULLET_VELO*Math.cos(bullet.direction)
            let x=BULLET_VELO*Math.sin(bullet.direction)
            bullet.move(bullet.translateCoords.x+x,bullet.translateCoords.y+y)
            Judge.inspectCollisions(bullet)
        }
        else
        bullet.end()
        
    })
    
    if(Bullets.size>0 && Game.status)
    window.requestAnimationFrame(painter)
}


export default {
    shootBullet,
    setEnv:(sho,gam)=>{
        shooter=sho
        Game=gam
    }

}