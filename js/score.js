let scoreBoard=document.createElement("div")
scoreBoard.id="scoreBoard"
document.body.append(scoreBoard)
scoreBoard.score=0
let scorLab=document.createElement("label")
scorLab.id="scorLab"
scoreBoard.append(scorLab)

scoreBoard.misses=0
let misses=document.createElement("label")
misses.id="misses"
scoreBoard.append(misses)
scoreBoard.addScore=function(score)
{
    score=Math.round(score)
    scoreBoard.score+=score
    scorLab.innerText=`Score: ${scoreBoard.score}`
}
scoreBoard.addMiss=function()
{
    misses.innerText=`Misses: ${scoreBoard.misses++}/50`
    
}
scoreBoard.addScore(0)
scoreBoard.addMiss(0)

export default scoreBoard