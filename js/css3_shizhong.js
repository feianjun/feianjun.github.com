function setCss3(obj,name,value){
    var str = name.charAt(0).toUpperCase()+name.substring(1);
    obj.style["Webkit" + str] = value;
    obj.style["Moz" + str] = value;
    obj.style["ms" + str] = value;
    obj.style[name] = value;  
};
window.onload=function(){

    var oBox = document.querySelector(".box");
    var oH = oBox.querySelector(".hours");
    var oM = oBox.querySelector(".min");
    var oS = oBox.querySelector(".sec");

    for (var i = 0; i < 60; i++) {
        var oSpan = document.createElement("span");
        oBox.appendChild(oSpan);
        // oSpan.style.transform = "rotate("+i*6+"deg)";
        setCss3(oSpan,"transform","rotate("+i*6+"deg)")
        if(i%5==0){
            oSpan.className="on";
            if(i==0){
                oSpan.innerHTML = "<em>12</em>";
            }else{
                oSpan.innerHTML = "<em>"+i+"</em>";
                oSpan.children[0].innerHTML=i/5;
                setCss3(oSpan.children[0],"transform","rotate("+(-i*6)+"deg)");
            };
        };
    };

    function tick(){
        var oDate = new Date();
        var iH    = oDate.getHours();
        var iM    = oDate.getMinutes();
        var iS    = oDate.getSeconds();
        var iMS   = oDate.getMilliseconds();
        setCss3(oH,"transform","rotate("+(iH+iM/60)*30+"deg)");
        setCss3(oM,"transform","rotate("+(iM+iS/60)*6+"deg)");
        setCss3(oS,"transform","rotate("+(iS+iMS/1000)*6+"deg)");
    }
    setInterval(tick, 30);
    oBox.onmousedown=function(ev){
        var oEv = ev || event;
        var disX = oEv.clientX-oBox.offsetLeft;
        var disY = oEv.clientY-oBox.offsetTop;
        document.onmousemove=function(ev){
            var oEv = ev || event;
            var l = oEv.clientX-disX;
            var t = oEv.clientY-disY;
            setPos(l,t);
        };
        document.onmouseup=function(){
            document.onmousemove=document.onmouseup=null;
            oBox.releaseCapture && oBox.releaseCapture()
        };
        oBox.setCapture && oBox.setCapture();
        return false;
    }

    function setPos(l,t){
        l<0 && (l=0);
        l>document.documentElement.clientWidth-oBox.offsetWidth && (l=document.documentElement.clientWidth-oBox.offsetWidth);
        t<0 && (t=0);
        t>document.documentElement.clientHeight-oBox.offsetHeight&& (t=document.documentElement.clientHeight-oBox.offsetHeight);
        oBox.style.left = l+"px";
        oBox.style.top = t+"px";
    };
};