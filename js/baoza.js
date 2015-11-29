window.onload = function(){
    
    var oDiv = document.getElementById("div1");
    
    var R = 10;
    var C = 10;
    
    for(var r = 0; r < R; r++){
        for(var c = 0; c < C; c++){
            var oSpan = document.createElement("span");
            oSpan.style.width = oDiv.offsetWidth/C + "px";
            oSpan.style.height = oDiv.offsetHeight/R + "px";
            oDiv.appendChild(oSpan);
            oSpan.style.left = oSpan.offsetWidth*c + "px";
            oSpan.style.top  = oSpan.offsetHeight*r + "px";
            
oSpan.style.backgroundPosition = -oSpan.offsetLeft + "px " + -oSpan.offsetTop + "px"; 
        }
    }
    var aSpan = oDiv.children;
    
    
    var iNow = 0;
    
    var ready = true;
    oDiv.onclick = function(){
        if(!ready)return;
        ready=false;
        for(var i = 0; i < aSpan.length; i++){
            aSpan[i].style.opacity = "1";
            aSpan[i].style.transition = "none";
            aSpan[i].style.transform = "none";
            aSpan[i].style.backgroundImage="url(../appimg/baoz_"+iNow+".jpg)";
        };
        iNow++;
        if(iNow==3){iNow=0};
        oDiv.style.backgroundImage="url(../appimg/baoz_"+iNow+".jpg)";
        for(var i = 0; i < aSpan.length; i++){
            
            //延迟演示
            (function(oSpan){
                setTimeout(function(){
                    oSpan.style.transition = "1s all cubic-bezier(1,-0.99, 0.43, 1.29)";
                    oSpan.style.opacity = "0";
                    var x = oSpan.offsetWidth/2 + oSpan.offsetLeft - oDiv.offsetWidth/2;
                    var y  = oSpan.offsetHeight/2 + oSpan.offsetTop - oDiv.offsetHeight/2;
                    oSpan.style.transform = "translate("+x+"px,"+y+"px) rotateX("+rnd(0,200)+"deg) " + "rotateY("+rnd(0,180)+"deg)";
                    
                },0);
            })(aSpan[i]);
        } 
    };
    
    aSpan[0].addEventListener("transitionend", function(){
        ready = true;
    }, false);
};

function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}