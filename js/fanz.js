window.onload=function(){

    var oDiv    = document.querySelector(".box");
    var oPage1  = oDiv.children[0];
    var oPage2  = oDiv.children[1];
    var oFornt  = oPage1.children[0];
    var oBack   = oPage1.children[1];

    var iNow = 0;
    var ready = true;

    oDiv.onclick=function(){

        if(!ready)return;
        ready = false;
        iNow++;
        if(iNow==3)iNow=0;

        oPage1.style.transition="1s all ease";
        oPage1.style.transform="perspective(800px) rotateY(-180deg)";
    };

    oPage1.addEventListener("transitionend",function(){
        oPage1.style.transition="none";
        oPage1.style.transform="none";
        oDiv.style.backgroundImage="url(../appimg/baoz_"+iNow+".jpg)";
        oFornt.style.backgroundImage="url(../appimg/baoz_"+iNow+".jpg)";
        oBack.style.backgroundImage="url(../appimg/baoz_"+(iNow+1)%3+".jpg)";
        oPage2.style.backgroundImage="url(../appimg/baoz_"+(iNow+1)%3+".jpg)";
        ready = true;

    },false);

};