window.onload=function (){
    
    var oV    = document.getElementById("v1");
    var oStop = document.getElementById("stop");
    var oPrev = document.getElementById("prev");
    var oPlay = document.getElementById("play");
    var oPause = document.getElementById("pause");
    var oNext = document.getElementById("next");
    var oSpeedBox  = document.querySelector(".speed");
    var oCur  = document.querySelector(".speed_this");
    var oBtn  = oCur.querySelector(".button");
    
    var oBuff = document.querySelector(".speed_buffer");
    var curTime = document.getElementById("curTime");//curTime 00:00 
    var totalTime = document.getElementById("totalTime");//totalTime
    var oVolume = document.querySelector(".volume_this");//volume_this 声音
    var oBtnVol  = oVolume.querySelector(".button");
    
    var maxW = oSpeedBox.offsetWidth - oBtn.offsetWidth;
    
    setTimeout(function(){
        oV.onprogress = function(){
            var scale = this.buffered.end(0)/this.duration;
            oBuff.style.width = scale*100 + "%";
            console.log(scale);
        };
    },1000);

    oV.onended = function(){
        alert("播放完毕！亲")
    };
    oBtn.onmousedown=function(ev){
        var disX = ev.clientX-oBtn.offsetLeft;
        oV.pause();

        document.onmousemove=function(ev){
            var l = ev.clientX-disX;

            l<0 && (l=0);
            l>maxW && (l=maxW);

            var scale = l/maxW;
            oCur.style.width=scale*100+"%";
        };
        document.onmouseup=function(){
            document.onmousemove = document.onmouseup =null;
            oPause.style.display="block";
            oPlay.style.display="none";
            oV.play();
            oV.currentTime = oCur.offsetWidth/oSpeedBox.offsetWidth*oV.duration;
            oV.play();
        };
        return false;
    };
    oBtnVol.onmousedown=function(ev){
        var disX = ev.clientX-oBtnVol.offsetLeft;
        
        document.onmousemove=function(ev){
            var l = ev.clientX-disX;
            var maxW = oVolume.parentNode.offsetWidth - oBtnVol.offsetWidth;
            l<0 && (l=0);
            l>maxW && (l=maxW);

            var scale = l/maxW;
            oVolume.style.width=scale*100+"%";
            oV.volume = scale;
        };
        document.onmouseup=function(){
            document.onmousemove = document.onmouseup =null;
        };
        return false;
    };
    setTimeout(function(){
        totalTime.innerHTML = formTime(oV.duration);
    }, 30);
    oV.ontimeupdate = function(){
        oCur.style.width = oV.currentTime/oV.duration*100+"%";
        totalTime.innerHTML = formTime(oV.duration);
        curTime.innerHTML = formTime(oV.currentTime);
    };
    oPlay.onclick=function(){
        oPause.style.display="block";
        this.style.display="none";
        oV.play();
    };
    oPause.onclick=function(){
        oV.pause();
        oPlay.style.display="block";
        this.style.display="none";
    };
    oStop.onclick=function(){
        oV.pause();
        oV.currentTime=0;
        oPlay.style.display="block";
        oPause.style.display="none";
    };

    function fillZero(n){
        return n<10?"0"+n:""+n;
    }

    function formTime(n){
        var m = parseInt(n/60);
        var s = parseInt(n%60);
        return fillZero(m)+":"+fillZero(s);
    };
};  