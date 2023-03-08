import shooter from "/js/shooter.js"
import Bullet from "/js/bullet.js"
import scoreBoard from "/js/score.js"
import targets from "/js/targets.js"
import Judge from "/js/judge.js"
const Targets=targets()
Judge.setEnv({
    Targets,
    scoreBoard
})

const Keys=new Map()
Bullet.setShooter(shooter)
setInterval(function()
{
    Keys.forEach((val,code)=>
    {
        if(val==undefined || val==false)
        return;
        
        switch(code)
        {
            case "ArrowDown":
                //shooter.moveTowards("down")
                break
            case "ArrowUp":
                //shooter.moveTowards("up")
                break
            case "ArrowLeft":
                shooter.moveTowards("left")
                break
            case "ArrowRight":
                shooter.moveTowards("right")
                break
            case "Numpad0":
                Bullet.shootBullet()
                break
            default:
                console.log(code)
        }
    })
},50)
document.addEventListener("keydown",(e)=>
{
    Keys.set(e.code,true)
    
})
document.addEventListener("keyup",(e)=>
{
    Keys.set(e.code,false)
    if(!(Keys.get("ArrowLeft")||Keys.get("ArrowRight")))
    shooter.stop()
})
document.addEventListener("pointerdown",(e)=>e.button!=2?Bullet.shootBullet(shooter.translateCoords):null)


