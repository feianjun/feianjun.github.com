function getByClass(a,b){
    if(a.getElementsByClassName){
        return a.getElementsByClassName(b);
    }
    var arr = [];
    var all = a.getElementsByTagName('*');
    var re = RegExp("\\b"+b+"\\b","g");
    for (var i = 0; i < all.length; i++) {
        if(re.test(all[i].className)){
            arr.push(all[i]);
        }
    };
    return arr;
};
function d2a(n){
    return n*Math.PI/180;
}
window.onload=function(){

    var oBox1 = getByClass(document,"box1")[0];
    var oBtn1 = getByClass(document,"aa")[0];
    var R1 = oBox1.offsetWidth/2;
    var arrPic = ["../tabImg/a27.jpg","../tabImg/a28.jpg","../tabImg/a29.jpg","../tabImg/a30.jpg","../tabImg/a31.jpg","../tabImg/a38.jpg","../tabImg/a33.jpg","../tabImg/a34.jpg","../tabImg/a35.jpg","../tabImg/a36.jpg","../tabImg/a37.jpg","../tabImg/a32.jpg"];
    var n = 12;
    for (var i = 0; i < n; i++) {
        var oDiv = document.createElement("div");
        oDiv.className="pic";
        oDiv.style.backgroundImage='url('+arrPic[i]+')';
        document.body.appendChild(oDiv);

        oDiv.rotate = 0;
        setDiv(oDiv,0);
    };

    function setDiv(obj,deg){
        var a = Math.sin(d2a(deg))*R1;
        var b = Math.cos(d2a(deg))*R1;

        obj.style.left = oBox1.offsetLeft+R1+a+"px";
        obj.style.top = oBox1.offsetTop+R1-b+"px";
    };
    var aDiv = getByClass(document,"pic");
    oBtn1.onclick=function(){
        if(this.value=="开"){
            this.disabled = true;
            for (var i = 0; i < aDiv.length; i++) {
                move(aDiv[i],i*360/(n));
            };
            this.value="转"
        }else if(this.value=="转"){
            for (var i = 0; i < aDiv.length; i++) {
                zhuan(aDiv[i],aDiv[i].rotate,1)
            };
            this.value="反"
        }else if(this.value=="反"){
            for (var i = 0; i < aDiv.length; i++) {
                zhuan(aDiv[i],aDiv[i].rotate,-1)
            };
            this.value="停"
        }else if(this.value=="停"){
            for (var i = 0; i < aDiv.length; i++) {
                clearInterval(aDiv[i].timer)
            };
            this.value="收"
        }else if(this.value=="收"){
            this.disabled = true;
            for (var i = 0; i < aDiv.length; i++) {
                move(aDiv[i],0);
            };
            this.value="开"
        }

    };
    function zhuan(obj,deg,a){
        clearInterval(obj.timer)
        obj.timer = setInterval(function(){
            deg+=a;
            obj.rotate = deg;
            setDiv(obj,deg)
        }, 30);
    };
    function move(obj,iTarget){
        var start = obj.rotate;
        var dis = iTarget-start;
        var count = Math.round(1000/30);
        var n = 0;
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            n++;
            var a = n/count;
            var cur = start+dis*a*a*a;
            obj.rotate = cur;
            setDiv(obj,cur)
            if(n==count){
                clearInterval(obj.timer);
                oBtn1.disabled=false;
            }
        }, 30);
    }
};