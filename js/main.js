import _ from "./../js/transformManager.js"
import shooterf from          "./../js/shooter.js"
import bullet from            "./../js/bullet.js"
import scoreBoard from        "./../js/score.js"
import TargetSpawner from           "./../js/targets.js"
import MessageShower from     "./../js/messageShower.js"

const Game={
    status:"notStarted",
    scoreBoard,
    makeTransformable,
    end:function()
    {
        this.status="ended"
        MessageShower.showMessage("Game Over","Press <u>space</u> to restart")
    },
}
const shooter=shooterf(Game)
shooter.scoreBoard=scoreBoard
const targetspawn=new TargetSpawner(Game)
const Bullets=bullet(Game,shooter)
Game.start=function()
{
    this.status="inProgress"
    targetspawn.targetShowerStart()
    let loop=function()
    {
        Bullets.collisionInspector(targetspawn.targetArr)
        targetspawn.targetInspector()
        if(Game.status=="inProgress")
        window.requestAnimationFrame(loop)
    }
    MessageShower.clearMessage()
    loop()
}

MessageShower.showMessage("Ready?",`<u>Press space</u>/<u>tap</u> to start!`)



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
            case "leftmbutton":
                Bullets.shootBullet()
                break
            case "Numpad6":
                shooter.rotate(1.5)
                break
            case "Numpad4":
                shooter.rotate(-1.5)
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
document.addEventListener("pointerdown",(e)=>
{
    Keys.set("leftmbutton",true)
})
document.addEventListener("pointerup",(e)=>
{
    Keys.set("leftmbutton",false)
})
document.addEventListener("pointermove",(e)=>
{
    shooter.move(e.clientX-shooter.offsetWidth/2,e.clientY-shooter.offsetHeight/2)
})
document.addEventListener("scroll",(e)=>
{
    console.log(e)
})
document.addEventListener("keypress",function(e)//for gamestart
{
    if(e.key==" ")
    {
        if(Game.status=="notStarted")
        Game.start()
        else
        window.location.reload()
    }
})
document.onload=function()
{
    if(window.innerWidth/window.innerHeight<1)
    {
        document.addEventListener("pointerdown",()=>
        {
            if(Game.status=="notStarted")
                Game.start()
                
        },{once:true})
    }

}
