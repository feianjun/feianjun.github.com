//物体对象
function Sprite(imgs){
	this.img=imgs;
	
	this.sx=0;
	this.sy=0;
	
	this.x=0;
	this.y=0;
	
	this.w=0;
	this.h=0;
	
	this.speed=0;
	this.rotate=0;
	this.count=0;
};
Sprite.prototype.draw=function(gd){
	
	gd.save();
	
	//gd.translate(this.x+this.w/2, this.y+this.y/2);
	gd.translate(this.x, this.y);	//为了以中心做坐标
	gd.rotate(d2a(this.rotate));
	
	gd.drawImage(
		this.img,
		this.sx, this.sy, this.w, this.h,
		-this.w/2, -this.h/2, this.w, this.h
	);
	
	gd.restore();
};
Sprite.prototype.move=function(){
	var speedX=Math.cos(d2a(this.rotate-90))*this.speed;
	var speedY=Math.sin(d2a(this.rotate-90))*this.speed;
	this.x+=speedX;
	this.y+=speedY;
};
Sprite.prototype.collTest=function(sprite2){
	var r1=Math.min(this.w,this.h)/2;
	var r2=Math.min(sprite2.w,sprite2.h)/2;
	var x=this.x-sprite2.x;
	var y=sprite2.y-this.y;
	var dis=Math.sqrt(x*x+y*y);
	return dis<=(r1+r2)*0.3;
};









