let scoreBoard=document.createElement("div")
scoreBoard.id="scoreBoard"
document.body.append(scoreBoard)
scoreBoard.score=0
let scorLab=document.createElement("label")
scorLab.id="scorLab"
scoreBoard.append(scorLab)

scoreBoard.health=100
let health=document.createElement("label")
health.id="health"
scoreBoard.append(health)
scoreBoard.addScore=function(score)
{
    console.log(score)
    score=Math.round(score)
    scoreBoard.score+=score
    scorLab.innerText=`Score: ${scoreBoard.score}`
}
scoreBoard.reduceHealth=function(val)
{
    scoreBoard.health-=Math.round(val)
    health.innerText=`Health: ${scoreBoard.health}`
}
scoreBoard.addScore(0)
scoreBoard.reduceHealth(0)

export default scoreBoard