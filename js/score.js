let scoreBoard=document.createElement("div")
scoreBoard.id="scoreBoard"
document.body.append(scoreBoard)
scoreBoard.score=0
let scorLab=document.createElement("label")
scoreBoard.append(scorLab)
scoreBoard.addScore=function(score)
{
    score=Math.round(score)
    scoreBoard.score+=score
    scorLab.innerText=`Score: ${scoreBoard.score}`
}
scoreBoard.addScore(0)

export default scoreBoard