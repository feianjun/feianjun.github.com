function $(fn){
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        document.attachEvent("onreadystatechange", function(){
            if(document.readyState=="complete"){
                fn && fn();
            }
        })
    }
};

$(function(){
    var oS = document.getElementsByTagName("span")[0];
    var oUl = document.getElementsByTagName('ul')[0];
    var aLi = oUl.children;
    var arr = [];
    var ready = true;
    var count = 8;
    for (var i = 0; i < aLi.length; i++) {
        arr[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop,width:aLi[i].offsetWidth,height:aLi[i].offsetHeight,opacity:1};
        aLi[i].style.left = arr[i].left+"px";
        aLi[i].style.top = arr[i].top+"px";
    };

    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.position="absolute";
        aLi[i].style.margin=0;
    };

    oS.onclick=function(){
        if(!ready)return;
        ready = false;
        down();
    };

    function down(){
        var i = aLi.length-1;
        var timer = setInterval(function(){
            
            (function(index){
                move(aLi[index],{left:-20,top:-20,width:20,height:20,opacity:0},{time:800,fn:function(){
                    if(index==0){

                        for (var i = 0; i < aLi.length; i++) {
                            count++;
                            aLi[i].children[0].src = '../img2/'+(count%22)+'.jpg'
                        };
                        up();
                    }
                }});
            })(i);
            if(i==-1){
                clearInterval(timer);
            };
            i--;
        }, 200);
    };


    function up(){
        var i = 0;
        var timer = setInterval(function(){
            (function(index){
                move(aLi[i],arr[i],{time:1000,fn:function(){
                    if(index==aLi.length-1){
                        ready=true;
                    }
                }})
            })(i);
            i++;
            if(i==aLi.length){
                clearInterval(timer);

            };
        }, 200);
    };
});