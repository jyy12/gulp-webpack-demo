require("./header.less")


module.exports=function(){
    var div=document.createElement('div');
    div.className='header';
    div.innerHTML='this is header';
    document.body.appendChild(div)
}