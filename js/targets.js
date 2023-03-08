import makeTransformable from "/js/transformManager.js"
export default function(scoreBoard,Game)
{
    let tar=[]
    document.addEventListener("keypress",function(e)
    {
        if(e.key==" ")
        {
            let id=setInterval(()=>
            {
                if(Game.status==false)
                return clearInterval(id)
                for(let i=0;i<2;i++)
                {
                    let t=document.createElement("label")
                    t.innerText="🧑‍🚀"
                    t.src="/../images/aliens.png"
                    t.className="targets"
                    t.velocity={x:0,y:10*Math.random()}
                    t.score=t.velocity.y
                    t.alive=true
                    makeTransformable(t)
                    t.move(100+(window.innerWidth-250)*Math.random(),0)
                    document.body.append(t)
                    tar.push(t)
                }
        
            },250)
        }
    })
    
    let ptr=()=>
    {
        for(let i=tar.length-1;i>=0;i--)
            {
                let targetElement=tar[i]
                if(!targetElement.alive)
                return
                targetElement.move(
                    targetElement.translateCoords.x+targetElement.velocity.x,
                    targetElement.translateCoords.y+targetElement.velocity.y)

                    if(targetElement.translateCoords.y>window.innerHeight)
                    {
                        //gameOver()
                        targetElement.remove()
                        tar.splice(i,1)
                        scoreBoard.addMiss()
                        if(scoreBoard.misses>50)
                        Game.status=false
                    }
            }
            if(Game.status)
            window.requestAnimationFrame(ptr)
    }
    window.requestAnimationFrame(ptr)
    return tar
}

