let msgdiv=document.createElement("div")
msgdiv.id="msgShower"

let head=document.createElement("h1")
head.id="msgHead"

let bdy=document.createElement("label")
bdy.id="msgBody"

msgdiv.append(head,bdy)
document.body.append(msgdiv)
export default {
    showMessage:function(msgHead,msgBdy)
    {
        head.innerHTML=msgHead
        bdy.innerHTML=msgBdy
        msgdiv.style.opacity="1"
    },
    clearMessage:function()
    {
        msgdiv.style.opacity="0"
    }
} 