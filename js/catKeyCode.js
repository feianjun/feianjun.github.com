function setC3(obj,name,value){
    var str = name.charAt(0).toUpperCase()+name.substring(1);

    obj.style["Webkit"+str]=value;
    obj.style["Moz"+str]=value;
    obj.style["ms"+str]=value;
    obj.style[str]=value;

};
window.onload=function(){
    var oBox = document.getElementById("box");
    var N = 11;
    for (var i = 0; i < N; i++) {
        var oDiv= document.createElement('div');
        oBox.appendChild(oDiv);
        oDiv.style.backgroundImage = "url(../css3/img/"+(i+1)+".jpg)";
        oDiv.innerHTML='<span></span>';
        oDiv.children[0].style.backgroundImage="url(../css3/img/"+(i+1)+".jpg)";

        setC3(oDiv,"transition","1s all ease "+(N-i)*300+"ms");

        (function(obj,index){
            setTimeout(function(){
                setC3(obj,"transform","rotateY("+360/N*index+"deg) translateZ(350px)");
            },0);
        })(oDiv,i);
    };

    var aDiv = oBox.children;
    aDiv[0].addEventListener("transitionend",function(){
        keyControl();
        mouseControl();
        change();
    },false);

    var x = -15;
    var y = 0;
    var lastY = 0;
    var speedY = 0;
    var timer = null;
    function mouseControl(){
        oBox.onmousedown=function(ev){
            clearInterval(timer);
            var disX=ev.clientX-y;
            clearMove();
            document.onmousemove=function(ev){
                y = ev.clientX-disX;
                change();
                speedY = y-lastY;
                lastY = y;
            };
            document.onmouseup=function(ev){
                document.onmousemove=document.onmouseup=null;
                timer = setInterval(function(){
                    y+=speedY;
                    speedY*=0.95;
                    if(Math.abs(speedY)<1){
                        clearInterval(timer);
                    };
                    change();
                }, 30);
            };
            return false;
        };

    };

    function keyControl(){

        document.onkeydown = function(ev){
            switch(ev.keyCode){
                case 37:
                clearMove();
                y-=360/N;
                change();
                break;
                case 39:
                clearMove
                y+=360/N;
                change();
                break;
                case 38:
                x+=1;
                setC3(oBox,"transform","perspective(800px) rotateX("+x+"deg) rotateY(0deg)");
                break;
                case 40:
                x-=1;
                setC3(oBox,"transform","perspective(800px) rotateX("+x+"deg) rotateY(0deg)");
                break;
            }

        };


    };



    

    function change(){
        for (var i = 0; i < aDiv.length; i++) {
            setC3(aDiv[i],"transform","rotateY("+(360/N*i+y/5)+"deg) translateZ(350px)");

            var s=Math.abs((360/N*i+y/5)%360);
            
            s>180 && (s=360-s);
            
            s=180-s;
            
            var scale=s/180;
            
            scale<0.2 && (scale=0.2);
            
            //aDiv[i].innerHTML=scale;
            
            aDiv[i].style.opacity=scale;

        };
    };

    function move(){
       for (var i = 0; i < aDiv.length; i++) {
            setC3(aDiv[i],"transition","1s all ease")
        }; 
    };
    function clearMove(){
        for (var i = 0; i < aDiv.length; i++) {
            setC3(aDiv[i],"transition","none")
        };
    };
};