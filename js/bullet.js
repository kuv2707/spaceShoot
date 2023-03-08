import Judge from "/js/judge.js"

const Bullets=new Map()
const BULLET_VELO=15
let canvas=document.createElement("canvas")
canvas.id="canv"
canvas.width=window.innerWidth
canvas.height=window.innerHeight
document.body.append(canvas)
let g=canvas.getContext("2d")

const DIMENSION_BULLET=80
let image=new Image(DIMENSION_BULLET,DIMENSION_BULLET)
image.src="/../images/bullet.png"
image.id="bullet"

let shooter;
function shootBullet()
{
    let x=shooter.translateCoords.x
    let y=shooter.translateCoords.y-60
    let bullet={x,y,width:DIMENSION_BULLET,height:DIMENSION_BULLET}
    bullet.score=20
    bullet.end=function()
    {
        Bullets.delete(this)
    }
    Bullets.set(bullet,bullet)
    if(Bullets.size==1)
    {
        window.requestAnimationFrame(painter)
        Judge.inspectCollisions(Bullets)
    }
}

function painter()
{
    g.clearRect(0,0,canvas.width,canvas.height)
    Bullets.forEach(bullet=>
    {
        if(bullet.y>-80)
        {
            g.drawImage(image,bullet.x,bullet.y)
            bullet.y-=BULLET_VELO
        }
        else
        Bullets.delete(bullet)
    })
    
    if(Bullets.size>0)
    window.requestAnimationFrame(painter)
}


export default {
    shootBullet,
    setShooter:(sho)=>shooter=sho,

}