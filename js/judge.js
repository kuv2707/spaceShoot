

let Env={}
function inspectCollisions(Bullets)
{
    let intv=setInterval(()=>
    {
        if(Bullets.length==0)
        return clearInterval(intv)&&1
        Bullets.forEach(bullet=>
            {
                Env.Targets.forEach((target)=>
                {
                    let tco=target.translateCoords
                    let bulloc={
                        x:(bullet.x)+(bullet.width)/2,
                        y:(bullet.y)+(bullet.width)/2,
                    }
                    if(bulloc.x>tco.x &&  bulloc.x<(tco.x+target.offsetWidth)
                    && bulloc.y>tco.y &&  bulloc.y<(tco.y+target.offsetHeight))
                    {
                        if(target.innerText=="💀")
                        return
                        target.innerText="💀"
                        target.alive=false
                        console.log("struck")
                        bullet.end()
                        Env.scoreBoard.addScore(target.score)
                    }
                })
            })
    },25)
}
export default {
    inspectCollisions,
    setEnv:(t)=>{
        Env=t
        console.log(Env)
    }
}
