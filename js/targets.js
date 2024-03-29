let MAX_SPD=5
const G=0.6
const ENEMIES=[["🤖",80],["👽",60],["👾",20],["💓",-20]]
export default class TargetSpawner
{
    constructor(Game)
    {
        this.targetArr=[]
        this.Game=Game
        
    }
    targetShowerStart()
    {
        let self=this
        let id=setInterval(()=>
        {
            if(self.targetArr.length>=100)
            return
            if(self.Game.status=="ended")
            return clearInterval(id)
            for(let i=0;i<2;i++)
            {
                let targ=makeTarget(self.Game,self.targetArr);
                document.body.append(targ)
                self.targetArr.push(targ)
            }
            MAX_SPD+=0.08
        },500)
    }
    targetInspector()
    {
        for(let i=this.targetArr.length-1;i>=0;i--)
        {
            let targetElement=this.targetArr[i]
            let relpos=normalize_and_scale_to({x:(shooter.translateCoords.x-targetElement.translateCoords.x),y:(shooter.translateCoords.y-targetElement.translateCoords.y)},targetElement.speed)
            targetElement.velocity.x+=relpos.x*G
            targetElement.velocity.y+=relpos.y*G
            targetElement.velocity=normalize_and_scale_to(targetElement.velocity,targetElement.speed)
            targetElement.move(
                targetElement.translateCoords.x+targetElement.velocity.x,
                targetElement.translateCoords.y+targetElement.velocity.y)

                if(distsq(targetElement.translateCoords,shooter.translateCoords)<101)
                {
                    targetElement.remove()
                    this.targetArr.splice(i,1)
                    scoreBoard.reduceHealth(targetElement.hitPts/10)
                    if(scoreBoard.health<=0)
                    this.Game.end()
                }
        }
    }
      
}
function makeTarget(Game,targetArr,x=(window.innerWidth)*Math.random(),y=0)
{
    let t=document.createElement("label")
    let enem=ENEMIES[Math.floor(Math.random()*ENEMIES.length)]
    t.innerText=enem[0]
    t.hitPts=enem[1]
    t.style.fontSize=40+Math.random()*t.hitPts+"px"
    t.className="targets"
    t.speed=2+MAX_SPD*Math.random()
    t.velocity={x:MAX_SPD*(Math.random()-0.5),
                y:MAX_SPD*Math.random()}
    window.makeTransformable(t)
    t.move(x,y)
    t.Game=Game
    t.containerArray=targetArr
    t.demote=function(bulletstrength)
    {
        this.hitPts-=bulletstrength
        //this.style.fontSize=t.hitPts+"px"
        this.scale(this.hitPts/120)
        shooter.scoreBoard.addScore(bulletstrength)
        if(this.hitPts<=40)
        {
            this.remove()
            this.containerArray.splice(this.containerArray.indexOf(this),1)
            
        }
    }
    return t
}
function normalize_and_scale_to({x,y},s=1)
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
