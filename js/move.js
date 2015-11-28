//版权 北京智能社©, 保留所有权利

//'完美'运动
function move(obj,json,opational){
	//var opational={time:500};	var opational;
	opational=opational||{};
	opational.time=opational.time||300;
	opational.fn=opational.fn||null;
	opational.type=opational.type||'ease-out';
	
	var start={};//准备一个空start用来存储一堆初始值
	var dis={};//准备一个空dis用来存储一堆运动距离
	
	for(var key in json){//挑出用户传入的json
		start[key]=parseFloat(getStyle(obj,key));//每一个属性的起始位置
		dis[key]=json[key]-start[key];	//每一个属性的运动距离
	}
	
	var count=Math.round(opational.time/30);	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in json){
			switch(opational.type){
				case 'linear':
					var a=n/count;//0---1的数
					var cur=start[key]+dis[key]*a;//匀速
					break;	
				case 'ease-in':
					var a=n/count;//0---1的数
					var cur=start[key]+dis[key]*(a*a*a);//加速
					break;	
				case 'ease-out':
					var a=1-n/count;//0---1的数
					var cur=start[key]+dis[key]*(1-a*a*a);//减速
					break;
				case 'ease-in-out'://过渡一下
					if(n/count<=0.5){	
						//加速
						var a=n/count*1.5;//0---1的数
						var cur=start[key]+dis[key]*(a*a*a);//加速
					}else{
						//减速
						move(obj,json,{time:opational.time/2,fn:opational.fn});	
					}
					break;	
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+(cur*100)+')';	
			}else{
				obj.style[key]=cur+'px';	
			}
		}
		
		if(n==count){//停止条件
			clearInterval(obj.timer);
			opational.fn && opational.fn();	//回调函数存在(用户传了函数)，再去调用
		}
	},30);
	
		
}
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
}