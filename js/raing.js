window.onload= function(){
    var oDiv = document.getElementsByTagName('div')[0];
    var timer = null;

    var speedX = 0;
    var speedY = 0;
    
    var lastX = 0;
    var lastY = 0;

    oDiv.onmousedown= function(ev){
        var oEv = ev || event;
        var disX = oEv.clientX-oDiv.offsetLeft;
        var disY = oEv.clientY-oDiv.offsetTop;

        document.onmousemove=function(ev){
            var oEv = ev || event;
            oDiv.style.left = oEv.clientX-disX+"px";
            oDiv.style.top = oEv.clientY-disY+"px";

            speedX = oDiv.offsetLeft - lastX;
            speedY = oDiv.offsetTop - lastY;
            
            lastX = oDiv.offsetLeft;
            lastY = oDiv.offsetTop;
        };

        document.onmouseup=function(){
            document.onmousemove=document.onmouseup=null;
            oDiv.releaseCapture && oDiv.releaseCapture();
            move();

        };

        oDiv.setCapture && oDiv.setCapture();
        return false;
    };
    function move(){
        var H = document.documentElement.clientHeight;
        var W = document.documentElement.clientWidth;
        clearInterval(timer);
        timer = setInterval(function(){
            speedY+=3;

            var t = oDiv.offsetTop+speedY;
            var l = oDiv.offsetLeft+speedX;

            if(t>=H-oDiv.offsetHeight){
                speedY *= -0.8;
                speedX *= 0.8;
                t=H-oDiv.offsetHeight;
            }else if(t<=0){
                speedY *= -0.8;
                speedX *= 0.8;
                t=0;
            };
            if(l>=W-oDiv.offsetWidth){
                speedX *= -0.8;
                speedY *= 0.8;
                l = W-oDiv.offsetWidth;
                
            }else if(l<=0){
                speedX *= -0.8;
                speedY *= 0.8;
                l = 0; 
            }

            oDiv.style.left = l + "px";
            oDiv.style.top  = t + "px";

            if(Math.abs(speedX) < 1){
                speedX = 0;
            }
            
            if(Math.abs(speedY) < 1){
                speedY = 0;
            }
            if(speedX == 0 && speedY == 0 && t == H - oDiv.offsetHeight ){
                clearInterval(timer);
            }
        }, 30);
    };

};