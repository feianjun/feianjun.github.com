window.onload=function ()
            {
                var oC=document.getElementById('cl');
                var gd=oC.getContext('2d');
                
                loadImg({
                    fish1:      'img/fish1.png',
                    fish2:      'img/fish2.png',
                    fish3:      'img/fish3.png',
                    fish4:      'img/fish4.png',
                    fish5:      'img/fish5.png',
                    bottom:     'img/bottom.png',
                    cannon1:    'img/cannon1.png',
                    cannon2:    'img/cannon2.png',
                    cannon3:    'img/cannon3.png',
                    cannon4:    'img/cannon4.png',
                    cannon5:    'img/cannon5.png',
                    cannon6:    'img/cannon6.png',
                    cannon7:    'img/cannon7.png',
                    bullet:     'img/bullet.png',
                }, function (imgs){
                    //炮台
                    var bottom=new Sprite(imgs.bottom);
                    bottom.w=765;
                    bottom.h=70;
                    bottom.x=400;
                    bottom.y=565;
                    
                    
                    //按钮
                    var oAdd=new Sprite(imgs.bottom);
                    oAdd.w=36;
                    oAdd.h=28;
                    oAdd.x=380;
                    oAdd.y=570;
                    oAdd.sx=47;
                    oAdd.sy=75;
                    var oReduce=new Sprite(imgs.bottom);
                    oReduce.w=36;
                    oReduce.h=28;
                    oReduce.x=500;
                    oReduce.y=570;
                    oReduce.sx=135;
                    oReduce.sy=75;
                    
                    oAdd.onclick=function(ev){
                        this.count++;
                        if(this.count>=7){
                            this.count=7;
                        }
                    };
                    
                    oReduce.onclick=function(){
                        this.count--;
                        if(this.count<=1){
                            this.count=1;
                        }
                    };
                    
                    //炮
                    var cannon=new Cannon(imgs,bottom.count+1);
                    cannon.x=440;
                    cannon.y=565;
                    
                    
                    
                    document.onmousemove=function(ev){
                        var a=ev.pageX-oC.offsetLeft-cannon.x;
                        var b=cannon.y-ev.pageY-oC.offsetTop;
                        var rotate=90-a2d(Math.atan2(b,a));
                        cannon.rotate=rotate;
                    };
                    //子弹
                    var cunBullet=[];
                    oC.onclick=function(){
                        var bullet=new Bullet(imgs.bullet,cannon.type);
                        bullet.x=440;
                        bullet.y=565;
                        bullet.rotate=cannon.rotate;
                        cunBullet.push(bullet);
                    };
                    
                    //鱼
                    var cunFish=[];
                    setInterval(function(){
                        var f=new Fish(imgs,rnd(1,6));
                        f.x=-100;
                        f.y=rnd(0,oC.height);
                        f.rotate=rnd(60,150);
                        cunFish.push(f);
                    },1000);
                    
                    setInterval(function(){
                        var f=new Fish(imgs,rnd(1,6));
                        f.x=900;
                        f.y=rnd(0,oC.height);
                        f.rotate=rnd(-30,-150);
                        cunFish.push(f);
                    },1000);
                    
                    setInterval(function(){
                        gd.clearRect(0,0,oC.width,oC.height);
                        bottom.draw(gd);
                        
                        for(var i=0;i<cunBullet.length;i++){
                            cunBullet[i].draw(gd);
                            cunBullet[i].move();
                        }
                        
                        for(var i=0;i<cunFish.length;i++){
                            cunFish[i].draw(gd);
                            cunFish[i].move();
                        }
                        for(var i=0;i<cunBullet.length;i++){
                            for(var j=0;j<cunFish.length;j++){
                                if(cunBullet[i].collTest(cunFish[j])){
                                    cunBullet.splice(i--,1);
                                    cunFish.splice(j--,1);
                                }
                            }
                            
                        }
                        
                        cannon.draw(gd);
                        oAdd.draw(gd);
                        oReduce.draw(gd);
                    },30);
                    
                    
                });
            };