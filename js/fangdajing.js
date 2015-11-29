function getByClass(a,b){
    var re = RegExp("\\b"+b+"\\b");
    var all = a.getElementsByTagName('*');
    var arr = [];
    for (var i = 0; i < all.length; i++) {
        if(re.test(all[i].className)){
            arr.push(all[i]);
        }
    };

    return arr;
};
function $(fn){
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded", fn, false);
    }else{
        document.attachEvent("onreadystatechange", function(){
            if(document.readyState=="complete"){
                fn && fn();
            };
        });
    };
};
function getPos(obj){
    var l=0;   //存left
    var t=0;
    while(obj){   //while用循环;
        
         l += obj.offsetLeft;
         t += obj.offsetTop;
        obj=obj.offsetParent;   
    }
    return {left:l, top:t}
}
$(function(){
    var oContent = getByClass(document,"content")[0];
    var oBox = oContent.children[0];
    var oBoxImg = oBox.children[0];
    var oMask = oBox.children[1];
    var oFang = oContent.children[1];
    var aLi = oContent.children[2].children;
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].onclick=function(){
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className="";
            };
            oBoxImg.src = this.children[0].src;
            oFang.children[0].src = this.children[0].src;
            this.className="cur";
        };
    };

    oBox.onmouseover=function(ev){
        var oEv = ev || event;
        var oF = oEv.fromElement || oEv.releatedTarget;
        if(oF && oBox.contains(oF)){
            return;
        }
        oMask.style.display="block";
        oFang.style.display="block";
    };
    oBox.onmouseout=function(ev){
        var oEv = ev || event;
        var oT = oEv.toElement || oEv.releatedTarget;
        if(oT && oBox.contains(oT)){
            return;
        };
        oMask.style.display="none";
        oFang.style.display="none";
    };

    oBox.onmousemove=function(ev){

        var oEv = ev || event;
        var l = (oEv.clientX-oMask.offsetWidth/2)-getPos(oBox).left;
        var t = (oEv.clientY-oMask.offsetHeight/2)-getPos(oBox).top;

        l<0 && (l=0);
        t<0 && (t=0);
        l>oBox.offsetWidth-oMask.offsetWidth && (l=oBox.offsetWidth-oMask.offsetWidth);
        t>oBox.offsetHeight-oMask.offsetHeight && (t=oBox.offsetHeight-oMask.offsetHeight)
        oMask.style.left = l+"px";
        oMask.style.top = t + "px";

        oFang.children[0].style.left=(oMask.offsetLeft/(oBox.offsetWidth-oMask.offsetWidth))*(oFang.offsetWidth-oFang.children[0].offsetWidth)+"px";
        oFang.children[0].style.top=(oMask.offsetTop/(oBox.offsetHeight-oMask.offsetHeight))*(oFang.offsetHeight-oFang.children[0].offsetHeight)+"px";
    };
    

});