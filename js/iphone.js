window.onload=function(){
    var oMask = document.getElementById("mask");
    var oP = document.getElementById("p");
    var oJindu = document.getElementById("jindu");
    var oScale = document.getElementById("scale");
    var oBox = document.getElementById("box");
    var oBg = document.getElementById("bg_pic");
    // 
    var count=77;//图片总张数
    var loaded=0;//已加载
    for (var i = 0; i < count; i++) {
        var oImg = document.createElement("img");
        if(i==0){
            var firstImg = oImg;
        };
        oImg.onload=function(){
            loaded++;

            var scale = parseInt(loaded/count*100);
            oP.innerHTML =oScale.style.width= scale+"%";
            if(loaded==count){
                setTimeout(function(){
                    oMask.style.display=oBox.style.display="none";
                    oBg.style.opacity=1;
                    firstImg.style.display="block";
                    firstImg.style.zIndex=2;
                }, 1000);
            }
        };
        oBg.appendChild(oImg);
        oImg.src='http://www.zhinengshe.com/works/3525/img/'+i+'.jpg';
    };
    var n = 2;
    var aImg = document.getElementsByTagName("img");
    var speedX = 0;
    var lastX = 0;
    var x = 0;
    var timer = null;
    oBg.onmousedown=function(ev){
        var oEv = ev || event;
        var disX = oEv.clientX-x;
        clearInterval(timer);
        document.onmousemove=function(ev){
            var oEv = ev || event;
            x = oEv.clientX-disX;
            move();
            speedX = x-lastX;
            lastX = x;
        };
        document.onmouseup=function(){
            document.onmousemove=document.onmouseup=null;
            oBg.releaseCapture && oBg.releaseCapture();
            document.title=speedX;
            timer = setInterval(function(){
                x+=speedX;
                if(speedX>0){
                    speedX--;
                }else{
                    speedX++;
                }
                if(speedX==0){
                    clearInterval(timer);
                };
                move();
            }, 30);
            
        };
        oBg.setCapture && oBg.setCapture();
        return false;
    };
    
    function move(){
        var l = parseInt(-x/10);
        if(l>0){
            l = l%count;
        }else{
            l = l+(-Math.floor(l/77)*77);
        };
        aImg[l].style.zIndex=n++;
    };
};