require("./footer.less")


module.exports=function(){
    var div=document.createElement('div');
    div.className='footer';
    div.innerHTML='this is footer';
    document.body.appendChild(div)
}