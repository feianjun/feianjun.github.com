
function rnd(n,m){
    return parseInt(Math.random()*(m-n) + n);
}

window.onload = function(){
    var oC = document.getElementById("c1");
    var gd = oC.getContext("2d");
     
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    
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
            x:rnd(0,winW),
            y:rnd(0,winH),
            speedX:rnd(-10,10),
            speedY:rnd(-10,10)
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
            gd.strokeStyle = "rgba(0,255,0,"+opacity+")" 
            gd.closePath();
            gd.stroke();
        }
    },16);
    
    
    function drowPoint(p){
        gd.fillStyle = "#fff";
        gd.fillRect(p.x,p.y,p.w,p.h);
        gd.strokeRect(p.x,p.y,p.w,p.h);
    } 
};