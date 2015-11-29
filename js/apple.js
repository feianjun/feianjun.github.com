window.onload=function(){
    var oApple = document.getElementsByTagName('div')[0];
    var aImg = oApple.children;
    document.onmousemove=function(ev){
        var oEv = ev || event;
        for (var i = 0; i < aImg.length; i++) {
            var a = aImg[i].offsetLeft-oEv.clientX+aImg[i].offsetWidth/2;
            var b = aImg[i].offsetTop+oApple.offsetTop-oEv.clientY+aImg[i].offsetHeight/2;
            var c = Math.sqrt(a*a+b*b);
            var dis = 1-c/300;
            dis<0.5 && (dis=0.5);
            aImg[i].style.width=parseInt(128*dis)+"px";
        };
    };
};