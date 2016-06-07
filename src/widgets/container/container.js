require("./container.less")


module.exports=function(){
    var div=document.createElement('div');
    div.className='container';
    div.innerHTML='this is container';
    document.body.appendChild(div)
}





