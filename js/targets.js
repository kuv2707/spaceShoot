
const enemies=[{face:"👽",hitp:15},{face:"👾",hitp:10}]
export default function(scoreBoard,Game)
{
    const exp={}
    exp.targetArr=[]
    exp.targetShowerStart=()=>
    {
        
        let id=setInterval(()=>
        {
            if(Game.status=="ended")
            return clearInterval(id)
            for(let i=0;i<5;i++)
            {
                let t=document.createElement("label")
                let enem=enemies[Math.floor(Math.random()*enemies.length)]
                t.innerText=enem.face
                t.src="/../images/aliens.png"
                t.className="targets"
                t.speed=15*Math.random()
                t.alive=true
                t.hitPts=enem.hitp
                t.orig_hitPts=t.hitPts
                Game.makeTransformable(t)
                t.move(100+(window.innerWidth-250)*Math.random(),0)
                document.body.append(t)
                exp.targetArr.push(t)
            }
        },250)
    }
    exp.targetInspector=function()
    {
        for(let i=exp.targetArr.length-1;i>=0;i--)
        {
            let targetElement=this.targetArr[i]
            if(!targetElement.alive)
            return
            let velocity=modulus({x:(shooter.translateCoords.x-targetElement.translateCoords.x),y:(shooter.translateCoords.y-targetElement.translateCoords.y)},targetElement.speed)
            targetElement.move(
                targetElement.translateCoords.x+velocity.x,
                targetElement.translateCoords.y+velocity.y)

                if(distsq(targetElement.translateCoords,shooter.translateCoords)<40)
                {
                    targetElement.remove()
                    this.targetArr.splice(i,1)
                    scoreBoard.reduceHealth(targetElement.hitPts)
                    if(scoreBoard.health<=0)
                    Game.end()
                }
        }
    }
    return exp
}

function modulus({x,y},s)
{
    let mod=Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
    return{
    x:(x*s/mod),y:(y*s/mod)
    }
}
function distsq(v1,v2)
{
    return Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2)
}