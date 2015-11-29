function setCss3(obj,name,value){
    var str = name.charAt(0).toUpperCase()+name.substring(1);
    obj.style["Webkit" + str] = value;
    obj.style["Moz" + str] = value;
    obj.style["ms" + str] = value;
    obj.style[name] = value;  
};
window.onload=function(){
    var oUl = document.getElementsByTagName("ul")[0];

    var aLi = oUl.children;

    var len = aLi.length;
    var i = len-1
    var timer = setInterval(function(){
        setCss3(aLi[i],"transform","rotateY("+360/len*i+"deg) translateZ(350px)");
        i--;
        if(i==-1){
            clearInterval(timer);
        };
    }, 300);
    var x = 150;
    var y = 0;
    var speedX = 0;
    var speedY = 0;
    var lastx = 0;
    var lasty = 0;
    oUl.onmousedown=function(ev){
        var oEv = ev || event;
        var disX = oEv.clientX-y;
        var disY = oEv.clientY-x;
        clearInterval(this.timer);
        document.onmousemove=function(ev){
            var oEv = ev || event;
            y = ev.clientX - disX;
            x = ev.clientY - disY;
            x>500 && (x=500);
            x<-500 && (x=-500);
            setCss3(oUl,"transform","perspective(800px) rotateX("+(-x/10)+"deg) rotateY("+y/10+"deg)");

            speedX = x-lastx;
            speedY = y-lasty;
            lastx = x;
            lasty = y;

        }
        document.onmouseup=function(){
            document.onmousemove=document.onmouseup=null;
            oUl.releaseCapture && oUl.releaseCapture();
            oUl.timer = setInterval(function(){
                x+=speedX;
                y+=speedY;
                //增加摩擦
                speedX*=0.95;
                speedY*=0.95;
                //限定
                x>500 && (x=500);
                x<-500 && (x=-500);
                Math.abs(speedX)<1 && (speedX=0);
                Math.abs(speedY)<1 && (speedY=0);

                if(speedX==0 && speedY==0){
                    clearInterval(oUl.timer);
                };
                setCss3(oUl,"transform","perspective(800px) rotateX("+(-x/10)+"deg) rotateY("+y/10+"deg)");
            }, 30);

        };

        oUl.setCapture && oUl.setCapture();
        return false;
    };


};