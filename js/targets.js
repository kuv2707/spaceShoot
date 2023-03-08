import makeTransformable from "/js/transformManager.js"
export default function()
{
    let tar=[]
    for(let j=0;j<40;j++)
    {
        for(let i=j;i<25-j;i++)
        {
            let t=document.createElement("label")
            t.innerText="🧑‍🚀"
            t.src="/../images/aliens.png"
            t.className="targets"
            t.variation={
                ampl:{
                    x:Math.random()*30,
                    y:Math.random()*25
                },
                freq:{
                    x:Math.random()*10,
                    y:Math.random()*30
                }
            }
            t.score=t.variation.ampl.x+t.variation.ampl.y+t.variation.freq.x+t.variation.freq.y
            t.alive=true
            makeTransformable(t)
            t.move(50+i*50,j*30)
            document.body.append(t)
            tar.push(t)
            
        }

    }
    let t=0
    let intid=setInterval(()=>
    {
        if(tar.length==0)
        clearInterval(intid) 
        tar.forEach(targetElement=>
            {
                if(targetElement.alive)
                targetElement.move(
                    targetElement.translateCoords.x+targetElement.variation.ampl.x*Math.sin(targetElement.variation.freq.x*t),
                    targetElement.translateCoords.y+targetElement.variation.ampl.y*Math.sin(targetElement.variation.freq.y*t))
            })
            t+=0.05
    },50)
    return tar
}

