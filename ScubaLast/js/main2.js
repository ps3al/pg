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
	
//	$("#masthead").before($("#masthead").clone().addClass("fixed"));
	$(window).scroll(function(){
		var st = $(window).scrollTop();


			if(st >= 40){
				$('nav.navbar').addClass('sticky');
				$('#top-social').hide(350);
			}
			else{
				$('nav.navbar').removeClass('sticky');
				$('#top-social').show(350);
			}
					

//		lastScrollTop = st;
	
	});	
	
	
})(jQuery)
