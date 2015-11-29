function rnm(n,m){
    return parseInt(n+Math.random()*(m-n));
};
window.onload=function(){
    var oP = document.getElementsByTagName('p')[0];
    var oDiv = document.getElementsByTagName('div')[0];
    function suiji(){
        var len = rnm(1,20);
        
        for (var i = 0; i < len; i++) {
            var oS = document.createElement('span');
            oS.innerHTML = rnm(0,11);
            oDiv.appendChild(oS);
            oS.style.fontSize = rnm(20,40)+"px";
            oS.style.left = rnm(0,480)+'px';
            oS.style.color = 'rgb('+rnm(0,255)+','+rnm(0,255)+','+rnm(0,255)+')';
            (function(oS){
                move(oS,{top:510},{time:rnm(1000,5000),type:"ease-in",fn:function(){
                    oDiv.removeChild(oS);
                }});
            })(oS);
        };
    };
    

    oP.onclick=function(){
        oP.style.display="none";
        setInterval(suiji, rnm(500,1500));
    };

};