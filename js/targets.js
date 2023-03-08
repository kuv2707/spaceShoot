import makeTransformable from "/js/transformManager.js"
export default function()
{
    let tar=[]
    for(let j=0;j<30;j++)
    {
        for(let i=j;i<15-j;i++)
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
            t.alive=true
            makeTransformable(t)
            t.move(300+i*50,j*50)
            document.body.append(t)
            tar.push(t)
            
        }

    }
    let t=0
    setInterval(()=>
    {
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

