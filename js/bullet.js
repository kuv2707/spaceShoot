const Bullets=[]
const BULLET_VELO=5
let canvas=document.createElement("canvas")
canvas.id="canv"
canvas.width=window.innerWidth
canvas.height=window.innerHeight
document.body.append(canvas)
let g=canvas.getContext("2d")
let image=new Image(80,80)

image.src="/../images/bullet.png"
image.id="bullet"
export default function({x,y})
{
    console.log(x,y)
    let bullet={x:x,y}
    let index=Bullets.push(bullet)
    if(Bullets.length==1)
    window.requestAnimationFrame(painter)
    // bullet.moveId=setInterval(function()
    // {
    //     console.log("setintv")
    //     if(bullet.y>-80)
    //     bullet.y--
    //     else
    //     clearInterval(bullet.moveId)
    // },5)
}

function painter()
{
    g.clearRect(0,0,canvas.width,canvas.height)
    for(let i=Bullets.length-1;i>=0;i--)
    {
        let bullet=Bullets[i]
        if(bullet.y>-80)
        {
            g.drawImage(image,bullet.x,bullet.y)
            bullet.y-=BULLET_VELO
        }
        else
        Bullets.splice(i,1)
    }
    
    if(Bullets.length>0)
    window.requestAnimationFrame(painter)
}