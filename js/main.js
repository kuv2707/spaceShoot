import _ from "./../js/transformManager.js"
import shooterf from          "./../js/shooter.js"
import BulletController from  "./../js/bullet.js"
import scoreBoard from        "./../js/score.js"
import TargetSpawner from           "./../js/targets.js"
import MessageShower from     "./../js/messageShower.js"

const Game={
    status:"notStarted",
    scoreBoard,
    end:function()
    {
        this.status="ended"
        MessageShower.showMessage("Game Over","Press <u>space</u>/<u>reload</u> to restart")
    },
}
const shooter=shooterf(scoreBoard)
const targetspawn=new TargetSpawner(Game)
const bullets=new BulletController(Game,shooter)
Game.start=function()
{
    this.status="inProgress"
    targetspawn.targetShowerStart()
    let loop=function()
    {
        bullets.collisionInspector(targetspawn.targetArr)
        targetspawn.targetInspector()
        if(Game.status=="inProgress")
        window.requestAnimationFrame(loop)
    }
    MessageShower.clearMessage()
    loop()
}

MessageShower.showMessage("Ready?",`<u>Press space</u>/<u>tap</u> to start!`)


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
window.addEventListener("wheel",(e)=>
{
    console.log(e)
    shooter.rotate(e.deltaY/10)
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
document.addEventListener("pointerdown",()=>
{
    if(Game.status=="notStarted")
        Game.start()
        
},{once:true})



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
            case "leftmbutton":
                bullets.shootBullet()
                break
            default:
                //console.log(code)
        }
    })
},15)
// document.addEventListener("keydown",(e)=>
// {
//     Keys.set(e.code,true)
    
// })
// document.addEventListener("keyup",(e)=>
// {
//     Keys.set(e.code,false)
//     if(!(Keys.get("ArrowLeft")||Keys.get("ArrowRight")))
//     shooter.stop()
// })


window.dispatchEvent(new Event("resize"))