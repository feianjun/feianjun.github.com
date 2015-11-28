$(function(){
    var oHearder = getByClass(document,"header")[0];
    var oHearderUl = oHearder.getElementsByTagName("ul")[0];
    var oHearderAli = oHearderUl.children;
    var oHearderLast = oHearderAli[oHearderAli.length-1];
    var oPage = getByClass(document,"pageCount")[0];
    var aPage = getByClass(oPage,"page");
    var bodyH = document.documentElement.clientHeight;
    var f1 = Tween.Quad.easeInOut;
    var f2 = Tween.Quint.easeOut;
    var f3 = Tween.Expo.easeInOut;
    var iNow = 0;
    if(bodyH<673){
        bodyH=673;
    };
    for (var i = 0; i < aPage.length; i++) {
        aPage[i].style.height = bodyH+"px";
    };
    oPage.style.height = aPage[0].offsetHeight*4+"px";
    (function(){
        var ready = true;
        var aBtn = getByClass(getByClass(aPage[0],"nav_list")[0],"nav_btn");
        for (var i = 0; i < oHearderAli.length-1; i++) {
            (function(index){
                oHearderAli[i].onclick=aBtn[i].onclick=function(){
                if(!ready)return;
                ready = false;
                iNow = index;
                    tab();
                };
            })(i);
        };
        //导航
        var speed = 0;
        function headMove(obj,iTarget){
            clearInterval(obj.timer);

            obj.timer = setInterval(function(){

                speed +=(iTarget-obj.offsetLeft)/5;
                speed*=0.7;

                obj.style.left = obj.offsetLeft+speed+"px";
                if(obj.offsetLeft==iTarget && Math.abs(speed)<1){
                    clearInterval(obj.timer);
                };
            }, 30);
        };

        //切换：
        function tab(){
            for (var i = 0; i < aPage.length; i++) {
                removeClass(aPage[i],"yudong");
                oHearderAli[i].className="";
            };
            // oHearderLast
            oHearderAli[iNow].className="cur";
            headMove(oHearderLast,oHearderAli[iNow].offsetLeft);
            addClass(aPage[iNow],"yudong");
            move(oPage,{top:-iNow*bodyH},{easing:f1,duration:1000,complete:function(){
                ready = true;
            }});
        };

        addMouseWheel(document,function(fx){
            if(!ready)return;
            ready=false;
            if(fx){
                iNow++;
            }else{
                iNow--;
            };
            iNow<0 && (iNow=0);
            iNow>aPage.length-1 && (iNow=aPage.length-1);
            tab();
        });
    })();

    //第一部分
    (function(){
        var oH1 = aPage[0].getElementsByTagName("h1")[0];
        var oTextP = getByClass(aPage[0],"head_text")[0].getElementsByTagName("p");
        
        var H1Str = "Welcome To My Personal Website";
        var oTarr = ["我是一名前端开发工程师","只要你给我一张图纸","我就能帮你勾画出一张美丽的页面"];
        for (var i = 0; i < H1Str.length; i++) {
            var oSpan = document.createElement("span");
            oSpan.innerHTML=H1Str.charAt(i);
            oH1.appendChild(oSpan);
        };
        for (var i = 0; i < oTarr.length; i++) {
            for (var j = 0; j <oTarr[i].length; j++) {
                var oSpan = document.createElement("span");
                oSpan.innerHTML=oTarr[i].charAt(j);
                oTextP[i].appendChild(oSpan);
            };
        };
        var aS = oTextP[0].parentNode.getElementsByTagName("span");

        setTimeout(function(){
            var i = 0;
            var timer = setInterval(function(){
                aS[i].style.opacity=1;
                i++;
                if(i==aS.length){
                    clearInterval(timer);
                };
            }, 100);
        }, H1Str.length*100+100);
        var aSpan = oH1.children;
        setTimeout(function(){
            var i = 0;
            var timer = setInterval(function(){
                aSpan[i].style.opacity=1;
                i++;
                if(i==H1Str.length){
                    clearInterval(timer);
                };
            }, 100);
        }, 100);
        var oBox = document.querySelector("#biao");
        var oH = oBox.querySelector(".hours");
        var oM = oBox.querySelector(".min");
        var oS = oBox.querySelector(".sec");

        for (var i = 0; i < 60; i++) {
            var oSpan = document.createElement("span");
            oBox.appendChild(oSpan);
            // oSpan.style.transform = "rotate("+i*6+"deg)";
            setStyle3(oSpan,"transform","rotate("+i*6+"deg)")
            if(i%5==0){
                oSpan.className="on";
                if(i==0){
                    oSpan.innerHTML = "<em>12</em>";
                }else{
                    oSpan.innerHTML = "<em>"+i+"</em>";
                    oSpan.children[0].innerHTML=i/5;
                    setStyle3(oSpan.children[0],"transform","rotate("+(-i*6)+"deg)");
                };
            };
        };

        function tick(){
            var oDate = new Date();
            var iH    = oDate.getHours();
            var iM    = oDate.getMinutes();
            var iS    = oDate.getSeconds();
            var iMS   = oDate.getMilliseconds();
            setStyle3(oH,"transform","rotate("+(iH+iM/60)*30+"deg)");
            setStyle3(oM,"transform","rotate("+(iM+iS/60)*6+"deg)");
            setStyle3(oS,"transform","rotate("+(iS+iMS/1000)*6+"deg)");
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
    })();
    //第二部分
    (function(){
        var aLi = getByClass(aPage[1],"two_list")[0].children;
        var arr = [];
        for (var i = 0; i < aLi.length; i++) {
            arr[i] = aLi[i].offsetLeft

            aLi[i].onmouseover=function(){
                move(this.children[0],{bottom:0});
            };
            aLi[i].onmouseout=function(){
                move(this.children[0],{bottom:-122},{duration:800});
            };
        };
        var oFen = getByClass(aPage[1],"pingfen")[0];
        // var aPanLi = oFen.getElementsByTagName("li");
        var aPlanText = getByClass(oFen,"scale_text");
        var aPlan = getByClass(oFen,"scale_line");

        // aPlan[0].style.width="30%";
        var aBtn = getByClass(oFen,"web");
        aBtn[0].per=90;
        aBtn[1].per=80;
        aBtn[2].per=85;
        aBtn[3].per=50;
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].n=0;
            (function(index){
                aBtn[i].onclick=function(){
                    clearInterval(this.timer);
                    var _this = this;
                        this.timer = setInterval(function(){
                            aBtn[index].n++;
                            if(_this.n>_this.per){
                                clearInterval(_this.timer);
                            }else{
                                aPlan[index].style.width=_this.n+"%";
                                aPlanText[index].innerHTML=_this.n+"%";
                            };  
                        }, 50);
                }
            })(i);
        };
        var oGrade = getByClass(aPage[1],"grade")[0]
        var aPaLi = oGrade.getElementsByTagName("li");
        var oS1 = getByClass(oGrade,"s1")[0];
        var oS2 = getByClass(oGrade,"s2")[0];
        var oA = oGrade.children[oGrade.children.length-1];
        garde();
        function garde(){
            for (var i = 0; i < aPaLi.length; i++) {
                (function(index){
                    aPaLi[i].onmouseover=function(){
                        for (var i = 0; i < aPaLi.length; i++) {
                            if((i>=0 && i<=index)){
                                aPaLi[i].className="cur";
                            }else{
                                aPaLi[i].className="";
                            };
                        };
                        if(index==9){
                            oS1.innerHTML="满分";
                        }else{
                            oS1.innerHTML=index+1+"分";
                        }
                        
                    };
                    aPaLi[i].onmouseout=function(){
                        init();
                    };
                    aPaLi[i].onclick=function(){
                        for (var i = 0; i < aPaLi.length; i++) {
                            aPaLi[i].onmouseover=aPaLi[i].onmouseout=null;
                        };
                        oS2.style.display=oA.style.display="inline-block";
                    };
                })(i);
            };
        };
        oS2.onclick=function(){
            if(parseInt(oS1.innerHTML)<=0){
                oA.innerHTML = "感谢你的评价，总有一天我会让你满意的";

            }else{
                oA.innerHTML = "感谢你的评价，我会更加努力的";
            };
               oA.style.color="rgba("+rnm(0,255)+","+rnm(0,255)+","+rnm(0,255)+","+Math.random()+")";
            this.style.display=oA.style.display="none";
            init();
            garde();
        };
        function init(){
            for (var i = 0; i < aPaLi.length; i++) {
                aPaLi[i].className="";
            };
            aPaLi[0].className="cur";
            oS1.innerHTML="1分";
        };
    })();
    //第三部分
    (function(){
        var oXiao = getByClass(aPage[2],"xiaoguo")[0];
        var jSulLi = oXiao.children[0].children;
        var oSkin = getByClass(aPage[2],"skin")[0].children[0];
        var bReady = true;
        oSkin.parentNode.onmouseover=function(){
            move(oSkin,{height:180});
        };
        oSkin.parentNode.onmouseout=function(){
            move(oSkin,{height:0});
        };
        var aSkin = oSkin.children;
        for (var i = 0; i < aSkin.length; i++) {
            aSkin[i].index=i;
            aSkin[i].onclick=function(){
                aPage[2].style.backgroundImage="url(img/tigle_"+(this.index+1)+".jpg)";
            };
        };
        for (var i = 0; i < jSulLi.length; i++) {
            jSulLi[i].onmouseover=function(ev){
                var oEv = ev || event;
                var oA = this.children[0];
                var oF = oEv.fromElement || oEv.relatedTarget;
                if(oF && this.contains(oF)){
                    return;
                };
                var n = getDir(this,oEv);
                switch(n){
                    case 0:
                        oA.style.left = "-120px";
                        oA.style.top = 0;
                        break;
                    case 1:
                        oA.style.left = 0;
                        oA.style.top = "150px";
                        break;
                    case 2:
                        oA.style.left = "120px";
                        oA.style.top = 0;
                        break;
                    case 3:
                        oA.style.left = 0;
                        oA.style.top = "-150px";
                        break; 
                };

                move(oA,{left:0,top:0},{easing:f1});
            };
            jSulLi[i].onmouseout=function(ev){
                var oEv = ev || event;
                var oA = this.children[0];
                var oT = oEv.toElement || oEv.relatedTarget;
                if(oT && this.contains(oT)){
                    return;
                };
                var n = getDir(this,oEv);
                switch(n){
                    case 0:
                        move(oA,{left:-120,top:0},{easing:f1});
                        break;
                    case 1:
                        move(oA,{left:0,top:150},{easing:f1});
                        break;
                    case 2:
                        move(oA,{left:120,top:0},{easing:f1});
                        break;
                    case 3:
                        move(oA,{left:0,top:-150},{easing:f1});
                        break; 
                };
            };
        };
        var oXarr = ["JS的小效果","CSS作品","C3效果","h5小效果"]
        var oPar = aPage[2].getElementsByTagName("ol")[0]
        var aBtnC = getByClass(oPar,"btn");
        var oBtxt = getByClass(aPage[2],"p_text")[0];
        var aLiTwo = oXiao.children[1].children;
        // move(oXiao,{left:-2*800});
        for (var i = 0; i < aBtnC.length; i++) {
            aBtnC[i].index = i;
            aBtnC[i].onclick=function(){
                move(oXiao,{left:-this.index*800});
                oBtxt.innerHTML=oXarr[this.index];
                return false;
            };
        };
        for (var i = 0; i < aLiTwo.length; i++) {
            aLiTwo[i].onmouseover=function(){
                move(this.children[0],{left:-30});
                move(this.children[1],{bottom:0},{easing:f3});
            };
            aLiTwo[i].onmouseout=function(){
                move(this.children[0],{left:0});
                move(this.children[1],{bottom:-120},{easing:f3});
            };
        };
        var oInset = getByClass(oXiao.children[2],"inset")[0];

        var oPrve = getByClass(oXiao.children[2],"prve")[0];
        var oNext = getByClass(oXiao.children[2],"next")[0];

        var aC3li = oInset.children;
        var cArr = [];
        for (var i = 0; i < aC3li.length; i++) {
            cArr[i]=aC3li[i].className;
        };
        oPrve.onclick=function(){
            if(!bReady)return;
            bReady=false;
            cArr.unshift(cArr.pop());
            wait();
        };
        oNext.onclick=function(){
            if(!bReady)return;
            bReady=false;
            cArr.push(cArr.shift());
            wait();
        };
        function wait(){
            for (var i = 0; i < aC3li.length; i++) {
                aC3li[i].className=cArr[i];
            };
            var oCur = getByClass(oInset,"cur")[0];
            oCur.addEventListener("transitionend", function(){
                bReady=true;
            }, false);
        };
        // for (var i = 0; i < aC3li.length; i++) {
            
        //     aC3li[i].onclick=function(){
                
        //     };
        // };
        var oUlfour = oXiao.children[3];
        var oFuLi = oUlfour.children;
        for (var i = 0; i < oFuLi.length; i++) {
            oFuLi[i].onmouseover=function(ev){
                var oEv = ev || event;
                var oF = oEv.fromElement || oEv.relatedTarget;
                if(oF && this.contains(oF)){
                    return;
                };
                var oQ = document.createElement("i");
                oQ.className="qq";
                this.appendChild(oQ);
                for (var i = 0; i < oFuLi.length; i++) {
                    move(oFuLi[i],{opacity:0.3},{easing:f1});
                };
                move(this,{opacity:1},{easing:f1});
                qq();

                
                function qq(){
                    move(oQ,{top:-32},{easing:f1,complete:function(){
                        move(oQ,{top:84},{complete:qq});
                    }});
                };
            };
            oFuLi[i].onmouseout=function(ev){
                
                var oEv = ev || event;
                var oT = oEv.toElement || oEv.relatedTarget;
                if(oT && this.contains(oT)){
                    return;
                };
                var oQ = this.children[1];
                this.removeChild(oQ);

            };
        };
    })();

    (function(){
        var oMy = document.getElementById("my_pic");
        var oJie = document.getElementById("jieshao");
        oMy.onmouseover=function(){
            move(oJie,{opacity:1});
        };
        oMy.onmouseout=function(){
            move(oJie,{opacity:0.3});
        };

        var oC = document.getElementById("ca");
        var gd = oC.getContext("2d");
         
        var winW = oJie.offsetWidth;
        var winH = oJie.offsetHeight;
        
        oC.width = winW;
        oC.height = winH;
        
        //个数
        var N = 5;
    //点的信息
    
    /* {
        w:宽度
        h:高度
        x:x轴范围
        y:y轴范围
        speedX:横向速度
        speedY:纵向速度     
    }
    
    */
        var aPoint = [];
        
        //初始化坐标点
        for(var i = 0; i < N; i++){
            aPoint[i] = {
                w:1,
                h:1,
                x:rnm(0,winW),
                y:rnm(0,winH),
                speedX:rnm(-10,10),
                speedY:rnm(-10,10)
            };
        }
    
    
        //
        var oldPoint = [[5],[5]];
        
        //动起来
        setInterval(function(){
            
            //清楚画布
            gd.clearRect(0,0,oC.width,oC.height);
            
            for(var i = 0; i < N; i++){
                drowPoint(aPoint[i]);
                
                
                if(aPoint[i].x < 0){
                    aPoint[i].x = 0;
                    aPoint[i].speedX *= -1;
                }
                if(aPoint[i].x > winW){
                    aPoint[i].x = winW;
                    aPoint[i].speedX *= -1;
                }
                if(aPoint[i].y < 0){
                    aPoint[i].y = 0;
                    aPoint[i].speedY *= -1;
                }
                if(aPoint[i].y > winH){
                    aPoint[i].y = winH;
                    aPoint[i].speedY *= -1;
                }
                
            
                aPoint[i].x += aPoint[i].speedX;
                aPoint[i].y += aPoint[i].speedY;
            
            }
            //连接
            gd.beginPath();
            gd.moveTo(aPoint[0].x,aPoint[0].y);
            for(var i = 1; i < N; i++){
                gd.lineTo(aPoint[i].x,aPoint[i].y);
                
            }
            gd.strokeStyle = "#fff";
            gd.closePath();
            gd.stroke(); 
            
            //尾巴 影子
            var arr = [];//存当前的坐标路径
            
            for(var i = 0; i < N; i++){
                arr.push({x:aPoint[i].x,y:aPoint[i].y});
            }
            
            oldPoint.push(arr);

            while(oldPoint.length > 10){
                oldPoint.shift();
            }
             
            //重新绘制影子
            for(var i = 0; i < oldPoint.length; i++){
                
                gd.beginPath();
                gd.moveTo(oldPoint[i][0].x,oldPoint[i][0].y);
                for(var j = 0; j < oldPoint[i].length; j++){
                    gd.lineTo(oldPoint[i][j].x,oldPoint[i][j].y);
                    
                }
                var opacity = i/(oldPoint.length - 1);
                gd.strokeStyle = "rgba(0,255,255,"+opacity+")";
                gd.closePath();
                gd.stroke();
            }
        },30);
               
        function drowPoint(p){
            gd.fillStyle = "#fff";
            gd.fillRect(p.x,p.y,p.w,p.h);
            gd.strokeRect(p.x,p.y,p.w,p.h);
        } 

    })();
});