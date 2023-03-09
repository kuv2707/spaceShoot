let msgdiv=document.createElement("div")
msgdiv.id="messageShower"
document.body.append(msgdiv)
export default {
    showMessage:function(message)
    {
        msgdiv.innerHTML=message
        msgdiv.style.opacity="1"
    },
    clearMessage:function()
    {
        //msgdiv.innerHTML=""
        msgdiv.style.opacity="0"
    }
} 
//window.msgdiv=msgdiv