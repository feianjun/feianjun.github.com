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
        var oT     = getByClass(document,"search_1")[0];
        var oDiv   = getByClass(document,"hide_div")[0];
        oT.onkeyup=function(){
            oDiv.innerHTML="";
            jsonp({
                url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                data:{wd:this.value},
                success:function(json){
                    var arr = json.s;
                    if(arr.length==0){
                        oDiv.style.display="none";
                    }else{
                        for (var i = 0; i < arr.length; i++) {
                            var oA = document.createElement('a');
                            oA.href = 'https://www.baidu.com/s?wd='+arr[i];
                            oA.innerHTML = arr[i];
                            oDiv.appendChild(oA);
                            (function(b){
                                oA.onclick=function(){
                                    window.open(b.href,"_blank");
                                    oDiv.style.display="none";
                                    oT.value="";
                                    return false;

                                };
                            })(oA);
                        };
                        oDiv.style.display="block";
                    };
                }
            });
        };
};