function getByClass(a,b){
    if(a.getElementsByClassName){
        return a.getElementsByClassName(b);
    }
    var arr = [];
    var all = a.getElementsByTagName('*');
    var re = RegExp("\\b"+b+"\\b","g");
    for (var i = 0; i < all.length; i++) {
        if(re.test(all[i].className)){
            arr.push(all[i]);
        }
    };
    return arr;
};
window.onload = function(){

    var aLi=document.getElementsByTagName('ul')[0].getElementsByTagName('li');
    var aBtn=getByClass(document, 'foot')[0].getElementsByTagName('a');
    var oCaret=getByClass(document, 'caret')[0];
    var aPos=[];
    var timer=null;
    var i=0;

    for(i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aPos[i]=aLi[i].offsetLeft;
        aLi[i].style.left=aPos[i]+'px';
    }
    
    for(i=0;i<aLi.length;i++){
        aLi[i].style.position='absolute';  
    }

    aBtn[0].onclick=function(){

        var i=aLi.length-1;
        clearTimeout(timer);

        function next(){
            if(i>=aLi.length/2){
                move(aLi[i],{left:900})
                timer = setTimeout(next, 100);
                i--;
            }else{
                timer=setTimeout(next2, 150);
            };
        };

        function next2(){
            if(i>=0){
                move(aLi[i],{left:aPos[i]});
                timer=setTimeout(next2, 100);
            }
            i--;
        };
        next();
        aBtn[1].className='';
        this.className='show';
        move(oCaret,{left:this.offsetLeft+this.offsetWidth/2});
    };

    aBtn[1].onclick=function(){

        var i = 0;
        clearTimeout(timer);

        function next(){
            if(i<aLi.length/2){
                move(aLi[i],{left:-200})
                timer = setTimeout(next, 100);
                i++;
            }else{
                timer=setTimeout(next2, 150);
            };
        };

        function next2(){
            if(i<aLi.length){
                move(aLi[i],{left:aPos[i-aLi.length/2]})
                timer=setTimeout(next2, 100);
            }
            i++;

        };

        next();
        aBtn[0].className='';
        this.className='show';
        move(oCaret,{left:this.offsetLeft+this.offsetWidth/2});
    };
};