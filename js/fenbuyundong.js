function $(fn){
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        document.attachEvent("onreadystatechange", function(){
            if(document.readyState=="complete"){
                fn && fn();
            }
        });
    };
};

$(function(){
    var oDiv = document.getElementById("div1");
    var oUl = oDiv.children[0];
    var aLi = oUl.children;
    var W = oDiv.offsetWidth/2;
    oUl.onmousedown=function(ev){
        var oEv = ev || event;
        var disX = oEv.clientX - oUl.offsetLeft;

        document.onmousemove=function(ev){
            var oEv = ev || event;
            var l = oEv.clientX-disX;
            if(l >W - aLi[0].offsetWidth*(0 + 0.5) ){
                l  = W- aLi[0].offsetWidth*(0 + 0.5) ;
            } else if(l < W - aLi[0].offsetWidth*(6 + 0.5) ) {
                l  = W - aLi[0].offsetWidth*(6 + 0.5) ;  
            }
            oUl.style.left = l+"px";
            toBig();
        };
        document.onmouseup=function(){
            document.onmousemove=document.onmouseup=null;
            oUl.releaseCapture && oUl.releaseCapture();
        };
        oUl.setCapture && oUl.setCapture();
        return false;
    };
    toBig();
    function toBig(){
        for (var i = 0; i < aLi.length; i++) {
            var dis = Math.abs(W-oUl.offsetLeft-aLi[i].offsetLeft-aLi[i].offsetWidth/2);
            var scale = 1-dis/600;
            scale<0.5 && (scale=0.5);
            var oImg = aLi[i].children[0];
            oImg.style.width=parseInt(520*scale)+"px";
            oImg.style.height=parseInt(360*scale)+"px";
            oImg.style.marginTop = -(oImg.offsetHeight-180)/2+"px";
            oImg.style.marginLeft = -(oImg.offsetWidth-260)/2+"px";
            aLi[i].style.opacity = scale;
            aLi[i].style.zIndex = parseInt(scale*10000);
        };
    };
});