import shooter from "/js/shooter.js"
import shootBullet from "/js/bullet.js"
const Keys=new Map()
document.addEventListener("keydown",(e)=>
{
    Keys.set(e.code,true)
    Keys.forEach((val,code)=>
    {
        if(val==false ||  val==undefined)
        return;
        
        switch(code)
        {
            case "ArrowDown":
                shooter.moveTowards("down")
                break
            case "ArrowUp":
                shooter.moveTowards("up")
                break
            case "ArrowLeft":
                shooter.moveTowards("left")
                break
            case "ArrowRight":
                shooter.moveTowards("right")
                break
            case "Numpad0":
                shootBullet(shooter.translateCoords)
            default:
                console.log(e.code)
        }
    })
})
document.addEventListener("keyup",(e)=>
{
    Keys.set(e.code,false)
    shooter.stop()
})