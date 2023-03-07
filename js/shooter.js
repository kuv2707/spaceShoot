
import makeTransformable from "spaceShoot/js/transformManager.js"

let shooter=document.createElement("img")
shooter.id="shooter"
shooter.src="spaceShoot/../images/shooter.png"
document.body.append(shooter)
makeTransformable(shooter)
shooter.move(window.innerWidth/2-40,window.innerHeight-100)
export default shooter


