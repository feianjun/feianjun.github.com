function d2a(n){
    return n*Math.PI/180
};
function fillZero(n){
    return n<10?"0"+n:""+n;
};
window.onload=function(){
    var oC = document.getElementById("ca");

    var gd = oC.getContext("2d");
    var cx = 300;
    var cy = 200;
    var r = 120;

    
    function Arc(x,y,r,start,end,color){
        start-=90;
        end-=90;
        gd.beginPath();
        gd.strokeStyle=color;
        gd.lineWidth = "20";
        gd.arc(x, y, r, d2a(start), d2a(end), false);
        gd.stroke();
    };




    setInterval(function(){
        gd.clearRect(0,0,oC.width,oC.height);

        var oData = new Date();
        var H = oData.getHours();
        var M = oData.getMinutes();
        var S = oData.getSeconds();
        var Ms = oData.getMilliseconds();

        Arc(cx, cy, r-40, 0, H%12*30+M/60*30, "blue");
        Arc(cx, cy, r-20, 0, M*6+S/60*6, "red");
        Arc(cx, cy, r, 0, S*6+Ms/1000*6, "green");
        Arc(cx, cy, r+20, 0, Ms/1000*360, "pink");

        var str = fillZero(H) +":"+ fillZero(M) +":"+ fillZero(S);

        gd.font = "bold 20px kaiti";
        var w = gd.measureText(str).width;
        gd.fillStyle="#CC99CC";
        gd.fillText(str, cx-w/2,cy+10)

    }, 16);

    var oBtn = document.getElementById("btn");

    oBtn.onclick=function(){
        var str = oC.toDataURL("image/jpeg");
        // var oImg = new Image();

        // oImg.src=str;
        // document.body.appendChild(oImg)
        // 
        window.open(str,"_blank")

    };
};