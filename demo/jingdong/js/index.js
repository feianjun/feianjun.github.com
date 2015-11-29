$(function(){


	//分类 start
	// var fu_typeLi = $(".fu_type li");
	// var fu_type_tag = $(".fu_type_tag");

	// fu_typeLi.hover(function(){
	// 	var num = $(this).index()
	// 	// document.title = num;
	// },function(){
	// 	fu_type_tag.text();
	// });

	//选择地区 area
	$(".area li").click(function(){
		$(".area li").removeClass("active");
		$(this).addClass("active");
		var cityTxt = $(this).text();

		$("#city").text(cityTxt);
	});


	//轮播图 start
	var fu_oBox = $(".fu_lunbo_left");
	var fu_aBtn = $(".fu_lunbo_left ol li");
	var fu_aLi  = $(".fu_lunbo_left ul li");
	var fu_aImg = $(".fu_lunbo_left ul li img");
	var fu_previous = $(".fu_lunbo_left .previous");
	var fu_next = $(".fu_lunbo_left .next");
	var fu_iNow = 0;

	fu_oBox.hover(function(){
		fu_previous.show();
		fu_next.show();
	},function(){
		fu_previous.hide();
		fu_next.hide();
	});

	fu_previous.click(function(){
		fu_iNow--;
		if(fu_iNow == -1){
			fu_iNow = fu_aLi.length-1;
		}

		fu_aBtn.removeClass("active");
		fu_aBtn.eq(fu_iNow).addClass("active");
		
		fu_aLi.css("zIndex",0);
		fu_aLi.eq(fu_iNow).css("zIndex",1);
		
		fu_aLi.stop().animate({"opacity":0});
		fu_aLi.eq(fu_iNow).stop().animate({"opacity":1});

		//清空所有  给当前的添加active
		fu_aImg.removeClass("active");
		fu_aImg.eq(fu_iNow).addClass("active");
	});

	fu_next.click(function(){
		fu_iNow++;
		if(fu_iNow == fu_aLi.length){
			fu_iNow = 0;
		}

		fu_aBtn.removeClass("active");
		fu_aBtn.eq(fu_iNow).addClass("active");
		
		fu_aLi.css("zIndex",0);
		fu_aLi.eq(fu_iNow).css("zIndex",1);
		
		fu_aLi.stop().animate({"opacity":0});
		fu_aLi.eq(fu_iNow).stop().animate({"opacity":1});

		//清空所有  给当前的添加active
		fu_aImg.removeClass("active");
		fu_aImg.eq(fu_iNow).addClass("active");
	});



	fu_aBtn.mouseover(function(){
		fu_aBtn.removeClass("active");
		$(this).addClass("active");

		fu_iNow = $(this).index();

		//改变层级
		fu_aLi.css("zIndex",0);
		fu_aLi.eq($(this).index()).css("zIndex",1);
		//改变透明度
		fu_aLi.stop().animate({"opacity":0});
		fu_aLi.eq($(this).index()).stop().animate({"opacity":1});
		
		
		//清空所有  给当前的添加active
		fu_aImg.removeClass("active");
		fu_aImg.eq($(this).index()).addClass("active");
	});
	//轮播图 over

});



$(function(){
	var $oDiv     = $(".showImg1");
	var $oBtnPrev = $(".showImg1 .pre");
	var $oBtnNext = $(".showImg1 .next");
	var $aLi      = $(".showImg1 ul li");
	var $aBtn     = $(".showImg1 ol li");
	
	
	var iNow = 0;
	
	$oBtnPrev.click(function(){
		iNow--;
		
		if(iNow == -1){
			iNow = 3;
		}
		
		$aBtn.removeClass("active");
		$aBtn.eq(iNow).addClass("active");
		
		$aLi.css("zIndex",0);
		$aLi.eq(iNow).css("zIndex",1);
		
		$aLi.stop().animate({"opacity":0});
		$aLi.eq(iNow).stop().animate({"opacity":1});
		 
		
		document.title = iNow;	
	});
	
	$oBtnNext.click(function(){
		iNow++;
		
		if(iNow == 4){
			iNow = 0;
		} 
		
		$aBtn.removeClass("active");
		$aBtn.eq(iNow).addClass("active");
		
		$aLi.css("zIndex",0);
		$aLi.eq(iNow).css("zIndex",1);
		
		$aLi.stop().animate({"opacity":0});
		$aLi.eq(iNow).stop().animate({"opacity":1});
		 
		
		document.title = iNow;	
	});
	
	
	$oDiv.hover(function(){
		$oBtnPrev.show();
		$oBtnNext.show();
	},function(){
		$oBtnPrev.hide();
		$oBtnNext.hide();
	});
	
	
	$aBtn.mouseover(function(){
		$aBtn.removeClass("active");
		$(this).addClass("active");	
		
		iNow = $(this).index();
		
		document.title = iNow;
		
		$aLi.css("zIndex",0);
		$aLi.eq(iNow).css("zIndex",1);
		
		$aLi.stop().animate({"opacity":0});
		$aLi.eq(iNow).stop().animate({"opacity":1});
	});	

});
$(function(){
	
	var $aBtn = $(".showImg ol li");
	var $oUl  = $(".showImg ul");
	var $aLi  = $(".showImg ul li");
	
	$aBtn.mouseover(function(){
		$aBtn.removeClass("active");
		$(this).addClass("active");
		$oUl.stop().animate({"left":-340*$(this).index()+ "px"});	
		
	});
	
		
});
	$(function() {
		$(".showPhone ol li").mouseover(function() {
			$(".showPhone ol li").removeClass("active")
			$(this).addClass("active")
			$(this).addClass('current').siblings().removeClass('current');
			$(".showPhone ul li").eq($(this).index()).stop().fadeIn(300).siblings().stop().fadeOut(300);
		});
	});