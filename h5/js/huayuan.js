function rnd(n,m){
    return Math.floor(n+Math.random()*(m-n));
};
function d2a(n){
    return n*Math.PI/180;
};
window.onload=function(){

    var oPage = Raphael(0,0,800,600);
    
    var cx = 300 , cy = 300 , r = 200;
    var app = [];
    function setPie(s,e){

        var oPh = oPage.path();
        var x1 = Math.sin(d2a(s))*r+cx,y1 = cy-Math.cos(d2a(s))*r;
        var x2 = Math.sin(d2a(e))*r+cx,y2 = cy-Math.cos(d2a(e))*r;
        app.push(oPh);
        oPh.attr('path',[
            'M' , cx , cy,
            'L' , x1 , y1,
            'A' , r , r , 0 , (e-s>180)?1:0 , 1 , x2 , y2,
            'Z'
            ].join(" "));
        oPh.attr({'fill':"rgb("+rnd(0,256)+","+rnd(0,256)+","+rnd(0,256)+")","stroke":"none"});

        oPh.hover(function(){
            r+=70;
            getIn();
        },function(){
            r-=70;
            getIn();
            for (var i = 0; i < app.length; i++) {
                app[i].attr('opacity','1');
            };
        });
        function getIn(){
            var x1 = Math.sin(d2a(s))*r+cx,y1 = cy-Math.cos(d2a(s))*r;
            var x2 = Math.sin(d2a(e))*r+cx,y2 = cy-Math.cos(d2a(e))*r;
            for (var i = 0; i < app.length; i++) {
                app[i].attr('opacity','0.3');
            };
            oPh.animate({'path' : [
                        'M' , cx , cy,
                        'L' , x1 , y1,
                        'A' , r , r , 0 , (e-s>180)?1:0 , 1 , x2 , y2,
                        'Z'
                        ].join(" "),'opacity':'1'},500);
       
        };
    };

    //setPie(0,30)
    
    var arr = [43,54,99,86,12,77];

    var sum = arr.reduce(function(a,b){
        return a+b;
    });

    var arrPie = [];

    arr.forEach(function(n){
        arrPie.push(Math.round(360*n/sum));
    });

    var d = 0;
    arrPie.forEach(function(n){

        setPie(d,d+n);
        d+=n;
    });
    
};