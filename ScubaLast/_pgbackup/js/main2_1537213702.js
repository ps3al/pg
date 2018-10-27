(function($){
"use strict";
/*
	$(window).scroll(function(event){

		var st = $(window).scrollTop();
		if (st > 240){
			$('#masthead').addClass('header-sticky');
		} else {
			$('#masthead').removeClass('header-sticky');
		}	
	
	});
*/

	var lastScrollTop = 0;
	var delta = 5;
	
	$("#masthead").before($("#masthead").clone().addClass("fixed"));
	$(window).scroll(function(){
		var st = $(window).scrollTop();


				if(Math.abs(lastScrollTop - st) >= delta){

			if(st >= 250){
				$('#masthead.fixed').addClass('slideDown');
			}
			else{
				$('#masthead.fixed').removeClass('slideDown');
			}
					
				}else{

				$('#masthead.fixed').removeClass('slideDown');
		}
		lastScrollTop = st;
	
	});	
	
	
})(jQuery)
