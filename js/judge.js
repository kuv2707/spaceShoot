

let Env={}
function inspectCollisions(bullet)
{
    for(let i=Env.Targets.length-1;i>=0;i--)
    {
        
        let target=Env.Targets[i]
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
                Env.Targets.splice(i,1)
                target.alive=false
                bullet.end()
                Env.scoreBoard.addScore(target.score)
            }
            
        }
    }
}
export default {
    inspectCollisions,
    setEnv:(t)=>{
        Env=t
    }
}
