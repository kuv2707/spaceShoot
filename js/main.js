import shooter from "/js/shooter.js"
import bullet from "/js/bullet.js"
import scoreBoard from "/js/score.js"
import targets from "/js/targets.js"
import MessageShower from "/js/MessageShower.js"


const Game={
    status:"notStarted",
    scoreBoard,
    shooter,
    end:function()
    {
        this.status="ended"
        MessageShower.showMessage("Game Over")
    },
}
const Targets=targets(scoreBoard,Game)
const Bullets=bullet(Game)
Game.start=function()
{
    this.status="inProgress"
    Targets.targetShowerStart()
    let loop=function()
    {
        Targets.targetInspector()
        Bullets.collisionInspector(Targets.targetArr)
        if(Game.status=="inProgress")
        window.requestAnimationFrame(loop)
    }
    MessageShower.clearMessage()
    loop()
}

MessageShower.showMessage(`Press <u>space</u> to start!`)



const Keys=new Map()
let inputId=setInterval(function()
{
    if(Game.status=="ended")
    return clearInterval(inputId)
    Keys.forEach((val,code)=>
    {
        if(val==undefined || val==false)
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
                Bullets.shootBullet()
                break
            case "Numpad6":
                shooter.rotate(1)
                break
            case "Numpad4":
                shooter.rotate(-1)
                break
            default:
                //console.log(code)
        }
    })
},15)
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
document.addEventListener("keypress",function(e)//for gamestart
{
    if(e.key==" ")
    {
        if(Game.status="notStarted")
        Game.start()
    }
},)
document.addEventListener("pointerdown",(e)=>e.button!=2?Bullets.shootBullet(shooter.translateCoords):null)


