$(function(){
    (function(){
        var oBox1 = getByClass(document,"box1")[0];
        var oUl = oBox1.children[0];
        var aBtn = oBox1.children[1].children;
        var iNow = 0;
        var fx = Tween.Linear
        for (var i = 0; i < aBtn.length; i++) {
            (function(index){
                aBtn[i].onclick=function(){
                    iNow = index;
                    tab();
                };
            })(i);
        };

        function tab(){
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].className="";
            };
            aBtn[iNow].className="active";
            move(oUl,{left:-iNow*oUl.children[0].offsetWidth},{easing:fx});
        };
        function next(){
            iNow++;
            iNow==aBtn.length && (iNow=0);
            tab();
        };
        var timer = setInterval(next, 1500);
        oBox1.onmouseover=function(){
            clearInterval(timer)
        };
        oBox1.onmouseout=function(){
            timer = setInterval(next, 1500);
        };
    })();

    (function(){
        var oBox2 = getByClass(document,"box2")[0];
        var oUl = oBox2.children[0].children[0];
        var aLi = oBox2.children[1].children[1].children;
        var oSpan = oBox2.children[1].children[0];
        var Now = 0;

        for (var i = 0; i < aLi.length; i++) {
            (function(index){
                aLi[i].onmouseover=function(){
                    Now = index;
                    tab();
                };
            })(i);
        };
        function next(){
           Now++;
            Now == aLi.length && (Now=0);
            tab();
        }
        var timer = setInterval(next , 1000);
        function tab(){
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className='';
            };
            aLi[Now].className='active';
            move(oUl,{top:-Now*oUl.children[0].offsetHeight});
            move(oSpan,{top:Now*55})
        };
        oBox2.onmouseover=function(){
            clearInterval(timer);
        };
        oBox2.onmouseout=function(){
            timer = setInterval(next, 1000);
        };
    })();

    (function(){
        var oBox = getByClass(document,"box3")[0];
        var oPrev = oBox.children[0];
        var oNext = oBox.children[1];
        var aLi = oBox.children[2].children;
        var oUl = oBox.children[3]
        var oUlLi = oUl.children;
        var now = 0;
        var ready = true;
        var fx = Tween.Linear;
        oUl.innerHTML+=oUl.innerHTML;
        oUl.style.width = oUl.children.length*oUl.children[0].offsetWidth+"px";

        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick=function(){
                if(!ready)return;
                now= this.index;
                tab();
            };
        };
        function next(){
            now++;
            tab();
        }
        oNext.onclick=function(){
            if(!ready)return;
            ready = false;
            next();
        };

        function tab(){
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className="";
            };
            if(now==aLi.length){
                aLi[0].className="active";
            }else{
                aLi[now].className="active";
            }
            ready = false;
            move(oUl,{left:-now*oUlLi[0].offsetWidth},{easing:fx,complete:function(){
                ready = true;
                if(now==aLi.length){
                    oUl.style.left=0;
                    now=0;
                }
            }});
        };
        oPrev.onclick=function(){
            if(!ready)return;

            if(now==0){
                now = aLi.length-1;
                oUl.style.left = -oUl.offsetWidth/2+"px";
            }else{
                now--;
            }
            tab();
        };
        var timer = setInterval(next, 1500);
        oBox.onmouseover=function(){
            clearInterval(timer);
        }
        oBox.onmouseout=function(){
            timer = setInterval(next, 1500);
        }
    })();
});