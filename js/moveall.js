//版权 北京智能社©, 保留所有权利
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];
}
function addMouseWheel (obj,fn) {
    if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){
        obj.addEventListener("DOMMouseScroll", fnWheel, false);
    }else{
        addEvent(obj,"mousewheel",fnWheel);
    };

    function fnWheel(ev){
        var oEv = ev || event;
        var down = true;

        if(oEv.wheelDelta){
            down = oEv.wheelDelta>0?false:true;
        }else{
            down = oEv.detail>0?true:false;
        };
        fn && fn(down)
        oEv.preventDefault && oEv.preventDefault();
        return false;
    };
}
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv, fn, false);
    }else{
        obj.attachEvent("on"+sEv, fn);
    };
}
function getByClass(a,b){
    var arr = [];
    var aEl = a.getElementsByTagName('*');
    var re  =RegExp("\\b"+b+"\\b");
    for (var i = 0; i < aEl.length; i++) {
        if(re.test(aEl[i].className)){
            arr.push(aEl[i]);
        };
    };
    return arr;
};

function removeClass(a,b){
    var re = RegExp("\\b"+b+"\\b","g");
    a.className = a.className.replace(/^\s+|\s+$/g,"").replace(re,"").replace(/\s+/g," ");

};
function rnm(n,m){
    return parseInt(n + Math.random()*(m-n));
};
function getPos(obj){
    var l = 0;
    var t = 0;
    while(obj){
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj=obj.offsetParent;
    }
    return {left:l,top:t};
}
function getDir(a,b){
    var x = b.clientX-getPos(a).left-a.offsetWidth/2;
    var y = getPos(a).top+a.offsetHeight/2-b.clientY;

    return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
};
function setStyle3(obj,name,value){
    
    var str = name.charAt(0).toUpperCase() + name.substring(1);
    
    obj.style["Webkit" + str] = value;
    obj.style["Moz" + str] = value;
    obj.style["ms" + str] = value;
    obj.style[name] = value;
};

function getByClass(a,b){
    if(a.getElementsByClassName){
        return a.getElementsByClassName(b);
    };

    var arr = [];
    var all = a.getElementsByTagName("*");
    var re = RegExp("\\b"+b+"\\b","g");

    for (var i = 0; i < all.length; i++) {
        if(re.test(all[i].className)){
            arr.push(all[i]);
        }
    };
    return arr;
};
function addClass(a,b){
    var re = RegExp("\b"+b+"\\b");
    if(!re.test(a.className)){
        if(a.className){
            a.className+=" "+b;
        }else{
            a.className=b;
        };
    };
};


//options duration easing complete 
function move(obj,json,options){
	
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || Tween.Bounce.easeOut;
	
	//起点 
	var start = {};
	var dis = {};
	var count = Math.round(options.duration/30);
	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		//算位置
		
		for(var name in json){
			
			
			var cur = options.easing(n/count*options.duration,start[name],dis[name],options.duration);
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur +　"px";
			}
		
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
		
	},30);
	
}
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
}
//jsonp
function jsonp(options){
    options = options || {};

    if(!options.url){
        return;
    }
    options.data = options.data || {};
    options.timeout = options.timeout || 0;
    options.cbName = options.cbName || "cb";

    var fnName = ("jsonp_"+Math.random()).replace('.','');
    options.data[options.cbName] = fnName;

    var arr = [];
    for( var name in options.data ){
        arr.push(name+'='+encodeURIComponent(options.data[name]));
    };
    var str = arr.join('&');

    window[fnName]=function(json){
        window[fnName]=null;
        options.success && options.success(json);
        oHead.removeChild(oS);
        clearTimeout(timer);
    };

    var oS = document.createElement('script');
    oS.src = options.url+"?"+str;
    var oHead = document.getElementsByTagName("head")[0];
    oHead.appendChild(oS);

    if(options.timeout){
        var timer = setTimeout(function(){
            window[fnName]=function(){
                oHead.removeChild(oS);
            };
            options.error && options.error();
        }, options.timeout);
    }
};
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

