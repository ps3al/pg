(function ($) {
	"use strict";

	
	var nt = parseInt($("nav").css('marginTop').replace('px',''));
	var nh = $("nav").outerHeight();
	
	$('body').scrollspy({ 
		target: '.navbar-nav',
		offset: nh
	});
	
	$(window).on("scroll", function (e) {
		
		var st = $(window).scrollTop();
//		console.warn(st);

		if(st>=nt){
			$("nav").removeClass('mt-3');
			$("nav").addClass('bg-dark mt-0');
		}else{
			$("nav").removeClass('bg-dark');
			$("nav").removeClass('mt-0');
			$("nav").addClass('mt-3');
		}
		
	});	
	
	var tx = $('.titlex');
	tx.each(function (index) {
		var scale = $(this).data("scale")?$(this).data("scale"):"2";
//		var zindex = $(this).data("zindex")?$(this).data("zindex"):"0";
		var zindex = $(this).data("zindex")
		if(zindex==null){
			zindex="0";
		}
		var color = $(this).data("color")?$(this).data("color"):"#e2e2e236";
		var text = $(this).data("text")?$(this).data("text"):"";
		var temp = $(this).clone().insertAfter($(this)).css("position","relative");
		
		$(this).css({
			"user-select":"none",
			"position": "absolute",
			"color": color,
			"top": "0",
			"left": "0",
			"right": "0",
			"z-index": zindex,
			"transform" : "scale(" + scale + ")"			
		});
		if(text){
			$(this).text(text);
		}
	});
	
	
	/*=============================================>>>>>
	= Fitvids =
	===============================================>>>>>*/
	$('.fitvids').fitVids();
	/*= End of Fitvids =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Smooth Scroll =
	===============================================>>>>>*/
	$('.smoothscroll').smoothScroll({
		offset:0-nh
	});
	/*= End of Smooth Scrolll =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Easy Tabs =
	===============================================>>>>>*/
	var et = $('.easytabs');
	et.each(function (index) {
		var etDefaults = {};
		var etOptions = $(this).data('easytabs-options');
		var etx = $(this).easytabs($.extend(etDefaults, etOptions));

		etx.bind('easytabs:after',function(event,clicked,targetPanel, settings){
			// console.warn("tab changed");
			// console.warn(clicked);
			// console.warn(targetPanel);

			var $elems = targetPanel.find('.wow');
//				alert($elems.length);
			if($elems.length<=0){
//					$elems = $currItem.find('.wowx');
				$elems = targetPanel.find('[data-sliderx]');
			}
			doAnimations($elems,index);


		});

	});
	/*= End of Easy Tabs =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Magnific Popup =
	===============================================>>>>>*/
	var mpOpen = true;
	var mp = $('.magnific-popup');
	mp.each(function (index) {
		var mpDefaults = {
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom',
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300
			},
			disableOn: function () {
				return mpOpen;
			}
		};
		var mpOptions = $(this).data('magnific-popup-options');
		var mpx = $(this).magnificPopup($.extend(mpDefaults, mpOptions));
	});
	/*= End of Magnific Popup =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Light Gallery =
	===============================================>>>>>*/
	var lg = $('.light-gallery');
	lg.each(function (index) {
		var lgDefaults = {
			"selector": "a"
		};
		var lgOptions = $(this).data('light-gallery-options');
		var lgx = $(this).lightGallery($.extend(lgDefaults, lgOptions));
	});
	/*= End of Light Gallery =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Slick Slider =
	===============================================>>>>>*/
	var ss = $('.slick-slider');
	ss.each(function (index) {
		var ssDefaults = {};
		var ssOptions = $(this).data('slick-slider-options');
		var ssx = $(this).slick($.extend(ssDefaults, ssOptions));

		ssx.on('afterChange', function(event, slick, currentSlide, nextSlide){

			// console.warn(currentSlide);
			// console.warn("----------------");
			// console.warn($(slick.$slides.get(currentSlide)));
			// console.warn("----------------");



//			$("[data-slick-index='" +currentSlide+ "']").attr('id')
//$(slick.$slides.get(currentSlide)).attr('id')
//$('.slick-slide.slick-current.slick-active').attr('id')
//slick.$slides.eq(nextSlide)



			// var $elems = currentSlide.querySelectorAll('.wow')
			// if($elems.length<=0){
			// 	$elems = currentSlide.querySelectorAll('[data-sliderx]');
			// }


			var $elems = $(slick.$slides.get(currentSlide)).find('.wow');
			if($elems.length<=0){
				$elems = $(slick.$slides.get(currentSlide)).find('[data-sliderx]');
			}

			doAnimations($elems,index);

		});


	});
	/*= End of Slick Slider =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Swiper Slider =
	===============================================>>>>>*/
	$('.swiper-slider').each(function (index) {
		var swDefaults = {};
		var swiperConf = $(this).data('swiper-slider-options');
		$.extend(swDefaults, swiperConf);
		var slider = new Swiper(swiperConf['containerClass'], swDefaults);
		
		slider.on('slideChange', function() { 
			// mySwiper.slides
			// mySwiper.activeIndex
			// mySwiper.realIndex
			var sliderx = this;
			var $currItem = sliderx.slides[sliderx.realIndex];
			//var $elems = $currItem.find('.wow');
			var $elems = $currItem.querySelectorAll('.wow')
			if($elems.length<=0){
//				$elems = $currItem.find('[data-sliderx]');
				$elems = $currItem.querySelectorAll('[data-sliderx]');
			}
			// console.warn(sliderx);
			// console.warn(sliderx.activeIndex);
			// console.warn(sliderx.realIndex);
			// console.warn($currItem);
			// console.warn(sliderx);
			// console.warn($elems);
			// console.warn(index);

			doAnimations($elems,index);
		 });
	
	});
	/*= End of Swiper Slider =*/
	/*=============================================<<<<<*/




	/*=============================================>>>>>
	= Jarallax =
	===============================================>>>>>*/
	var jx = $('.jarallax');
	jx.each(function (index) {
		var jxDefaults = {};
		var jxOptions = $(this).data('jarallax-options');
		var jarallaxx = $(this).jarallax($.extend(jxDefaults, jxOptions));
	});
	/*= End of Jarallax =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Rellax =
	===============================================>>>>>*/
	// $('.rellax').each(function (index) {
	// 	var rllxDefaults = {};
	// 	var rllxOptions = $(this).data('rellax-options');
	// 	console.warn($(this));
	// 	var rellax = new Rellax(this,$.extend(rllxDefaults, rllxOptions));
	// });
	if($('.rellax').length>0){
		var rellax = new Rellax('.rellax');
	}


	/*= End of Rellax =*/
	/*=============================================<<<<<*/


	// $('.swiper-slider').each(function (index) {
	// 	var swDefaults = {};
	// 	var swiperConf = $(this).data('swiper-slider-options');
	// 	$.extend(swDefaults, swiperConf);
	// 	var slider = new Swiper(swiperConf['containerClass'], swDefaults);


	// var rellax = new Rellax('.rellax', {
    //     // center: true
    //     callback: function(position) {
    //         // callback every position change
    //         console.log(position);
    //     }
    //   });



	/*=============================================>>>>>
	= Plyr =
	===============================================>>>>>*/
	Plyr.setup('.js-player');
	/*= End of Plyr =*/
	/*=============================================<<<<<*/


	$(window).on("load", function (e) {


		/*=============================================>>>>>
		= Scroll Up =
		===============================================>>>>>*/
		$.scrollUp({
			scrollName: 'scrollUp',
			scrollDistance: nt,
			scrollFrom: 'top',
			scrollSpeed: 300,
			easingType: 'linear',
			animation: 'fade',
			animationInSpeed: 200,
			animationOutSpeed: 200,
			scrollText: '<span class="btn btn-square btn-rounded btn-icon"><i class="fa fa-chevron-up"></i>yukarı</span>',
			scrollTitle: false,
			scrollImg: false,
			activeOverlay: false,
			zIndex: 10001
		});
		/*= End of Scroll Up =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Progressbar =
		===============================================>>>>>*/
		var $pcircle = $('.progressbar-circle');
		var $psemi = $('.progressbar-semicircle');
		var $pline = $('.progressbar-line');
		$pcircle.each(function (i) {
			
			var progresbarOptions = $(this).data('progressbar-options');
			
			var textcolor = progresbarOptions['textcolor'] ? progresbarOptions['textcolor'] : 'inherit';
			
			var progresbarDefaults = {
				data: 50,
				strokeWidth: 4,
				trailWidth: 4,
				duration: 5000,
				easing: 'easeInOut',
				offset: "100%",
				text: {
					style: {
						color: textcolor
					},
					autoStyleContainer: false
				},
				step: function (state, circle, attachment) {
					circle.setText(Math.round(circle.value() * 100));
				}
			}

			$.extend(progresbarDefaults, progresbarOptions);
			var circle = new ProgressBar.Circle(this, progresbarDefaults);
			var value = progresbarDefaults['data'] / 100;
			$pcircle.waypoint(function () {
				circle.animate(value);
			}, {
				offset: progresbarDefaults['offset']
			})
		});

		$psemi.each(function (i) {

			var progresbarOptions = $(this).data('progressbar-options');
			
			var textcolor = progresbarOptions['textcolor'] ? progresbarOptions['textcolor'] : 'inherit';
			
			var progresbarDefaults = {
				data: 50,
				strokeWidth: 4,
				trailWidth: 4,
				duration: 5000,
				easing: 'easeInOut',
				offset: "100%",
				text: {
					style: {
						color: textcolor,
					},
					autoStyleContainer: false
				},
				step: function (state, circle, attachment) {
					circle.setText(Math.round(circle.value() * 100));
				}
			}

			$.extend(progresbarDefaults, progresbarOptions);
			var semi = new ProgressBar.SemiCircle(this, progresbarDefaults);
			var value = progresbarDefaults['data'] / 100;
			$psemi.waypoint(function () {
				semi.animate(value);
			}, {
				offset: progresbarDefaults['offset']
			})
		});

		$pline.each(function (i) {
			
			var progresbarOptions = $(this).data('progressbar-options');
			
			var textcolor = progresbarOptions['textcolor'] ? progresbarOptions['textcolor'] : 'inherit';
			var textright = progresbarOptions['textright'] ? progresbarOptions['textright'] : '0';
			var texttop = progresbarOptions['texttop'] ? progresbarOptions['texttop'] : '-30px';
			var textpadding = progresbarOptions['textpadding'] ? progresbarOptions['textpadding'] : '0';
			var textmargin = progresbarOptions['textmargin'] ? progresbarOptions['textmargin'] : '0';
						
			
			var progresbarDefaults = {
				strokeWidth: 3,
				trailWidth: 3,
				duration: 3000,
				easing: 'easeInOut',
				offset: "100%",
				text: {
					style: {
						color: textcolor,
						position: 'absolute',
						right: textright,
						top: texttop,
						padding: textpadding,
						margin: textmargin,
						transform: null
					},
					autoStyleContainer: false
				},
				step: function (state, line, attachment) {
					line.setText(Math.round(line.value() * 100) + ' %');
				}
			}
			$.extend(progresbarDefaults, progresbarOptions);
			var line = new ProgressBar.Line(this, progresbarDefaults);
			var value = progresbarDefaults['data'] / 100;
			$pline.waypoint(function () {
				line.animate(value);
			}, {
				offset: progresbarDefaults['offset']
			})
		});
		/*= End of Progressbar =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Countdown =
		===============================================>>>>>*/
		$('.countdown').each(function () {
			var countdownDefaults = {
				date: new Date(2050, 1, 1, 23, 59, 59),
			}
			var countdownOptions = $(this).data('countdown-options');
			$.extend(countdownDefaults, countdownOptions);
			var elem = $(this);
			elem.countdown(countdownDefaults);
		});
		/*= End of Countdown =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Counterup =
		===============================================>>>>>*/
		$('.counterup').each(function () {
			var counterDefaults = {
				delay: '10',
				time: '1000',
				offset: '70',
				beginAt: '100'
			};
//			if($(this).html()){
				$(this).attr('data-counterup-nums','');
//			}
			
			var counterOptions = $(this).data('counterup-options');
			$.extend(counterDefaults, counterOptions);
			var elem = $(this);
			elem.counterUp(counterDefaults);
		});
		/*= End of Counterup =*/
		/*=============================================<<<<<*/



		var wow = new WOW({});
		wow.init();

		AOS.init();

		/*=============================================>>>>>
		= Animated =
		===============================================>>>>>*/
		$('.animated').each(function () {
			var animDefaults = {
				animation: 'fadeInDown',
				delay: '300',
				offset: '90%',
				triggerOnce: true
			};
			var animOptions = $(this).data('animated-options');
			$.extend(animDefaults, animOptions)
			var elem = $(this);
			var animation = animDefaults['animation'];
			var delay = animDefaults['delay'];
			var offset = animDefaults['offset'];
			var triggerOnce = animDefaults['triggerOnce'];


			// var waypoint = new Waypoint({
			// 	element: document.getElementById('element-waypoint'),
			// 	handler: function(direction) {
			// 	  notify(this.element.id + ' triggers at ' + this.triggerPoint)
			// 	},
			// 	offset: '75%'
			//   })


			// var waypoints = elem.waypoint(function(direction) {
			// 	if (!elem.hasClass('visible')) {
			// 		if (delay) {
			// 			setTimeout(function() {
			// 				elem.addClass(animation + " visible");
			// 			}, delay);
			// 		} else {
			// 			elem.addClass(animation + " visible");
			// 		}
			// 	}
			// }, {
			// 	triggerOnce: triggerOnce,
			// 	offset: offset
			// 	// offset: 'bottom-in-view'
			// });



			var waypoint = new Waypoint({
				element: elem,
				handler: function (direction) {
					if (!elem.hasClass('visible')) {
						if (delay) {
							setTimeout(function () {
								elem.addClass(animation + " visible");
							}, delay);
						} else {
							elem.addClass(animation + " visible");
						}
					}
				},
				offset: offset
			})


		});
		/*= End of Animated =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Isotope =
		===============================================>>>>>*/
		$('.isotope').each(function (index) {
			var grid = $(this);
			var isotopeDefaults = {
				filter: '*'
			};
			var isotopeOptions = $.parseJSON(grid.attr('data-isotope-options'));
			var isotopeFilters = isotopeOptions.filters;
			$(isotopeFilters).on('click', function () {
				$(isotopeFilters).removeClass("active");
				$(this).addClass('active');
				var filterValue = $(this).attr('data-isotope-filter');
				grid.isotope({
					filter: filterValue
				});
			});
			grid.isotope($.extend(isotopeDefaults, isotopeOptions));
		});
		/*= End of Isotope =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Owl Carousel =
		===============================================>>>>>*/
		var oc = $('.owl-carousel');
		oc.each(function (index) {
			var ocDefaults = {
				// nav: false,
				// dots: false,
				// navClass: ['owl-prev', 'owl-next'],
				// autoplay: true,
				// margin: 0,
				// items: 1,
				// center: true,
				// loop: true,
				// autoWidth: true,
				// autoplayTimeout: 5000,
				// autoplaySpeed: 1000,
				// responsive: {
				// 	0: {
				// 		items: 1
				// 	},
				// 	600: {
				// 		items: 2
				// 	},
				// 	1000: {
				// 		items: 3
				// 	}
				// }
			}
			var ocOptions = $(this).data('owl-carousel-options');
			var owlx = $(this).owlCarousel($.extend(ocDefaults, ocOptions));
			if (!ocDefaults['nav'] && ocOptions['navClass']) {
				$('.' + ocDefaults['navClass'][0]).click(function () {
					owlx.trigger('next.owl.carousel');
				});
				$('.' + ocDefaults['navClass'][1]).click(function () {
					owlx.trigger('prev.owl.carousel');
				});
			}
			owlx.on('changed.owl.carousel',function(event){
				var $currItem = $('.owl-item',owlx).eq(event.item.index);
				var $elems = $currItem.find('.wow');
//				alert($elems.length);
				if($elems.length<=0){
//					$elems = $currItem.find('.wowx');
					$elems = $currItem.find('[data-sliderx]');
				}

				doAnimations($elems,index);
			});
		});
		/*= End of Owl Carousel =*/
		/*=============================================<<<<<*/




		/*=============================================>>>>>
		= Tilt.js =
		===============================================>>>>>*/
		$('.tilt').each(function () {
			var tiltDefaults = {
				maxTilt:        20,
				perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
				easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
				scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
				speed:          300,    // Speed of the enter/exit transition.
				transition:     true,   // Set a transition on enter/exit.
				disableAxis:    null,   // What axis should be disabled. Can be X or Y.
				reset:          true,   // If the tilt effect has to be reset on exit.
				glare:          false,  // Enables glare effect
				maxGlare:       1       // From 0 - 1.
			};
			var tiltOptions = $(this).data('tilt-options');
			$.extend(tiltDefaults, tiltOptions);
			var elem = $(this);
			elem.tilt(tiltDefaults);
		});
		/*= End of Tilt.js =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Veno Box =
		===============================================>>>>>*/
		$('.venobox').each(function () {
			var venoboxDefaults = {};
			var venoboxOptions = $(this).data('venobox-options');
			$.extend(venoboxDefaults, venoboxOptions);
			var elem = $(this);
			elem.venobox(venoboxDefaults);
		});
		/*= End of Counterup =*/
		/*=============================================<<<<<*/




	});



	function doAnimations(elems, index) {

		var $keys = [];

		Array.prototype.forEach.call(elems, function(el, i){

			var className = "wow";
			if (el.classList){
				el.classList.remove(className);
			}else{
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

			var $ukey = el.getAttribute('data-sliderx');
			var className2;

			if($ukey){
				className2 = $ukey;			
			}else{
				var $temp = new Date().getTime();

				if($keys.indexOf($temp)>=0){
					$temp = $temp+i;
				}
				$keys.push("a" + $temp);
				className2 = "a" + $temp;
			}

			console.warn("ukey : " + $ukey);
			console.warn("className2 : " + className2);

			if (el.classList){
				el.classList.remove(className2);
			}else{
				el.className = el.className.replace(new RegExp('(^|\\b)' + className2.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

			if (el.classList){
				el.classList.add(className2);
			}else{
				el.className += ' ' + className2;
			}

			el.setAttribute('data-sliderx',className2);

			new WOW({boxClass:className2}).init();

		});

	}


	function doAnimationsold(elems, index) {
		// elems.each(function (index2) {
		// 	var $this = $(this);
		// 	$this.removeClass("wow");
		// 	$this.removeClass("wowx"+index+"z"+index2);
		// 	$this.addClass("wowx"+index+"z"+index2);
		// 	$this.attr('data-sliderx',"wowx"+index+"z"+index2);
		// 	new WOW({boxClass:'wowx'+index+"z"+index2}).init();

		// 	// $this.removeClass("wow");
		// 	// $this.removeClass("wowx");
		// 	// $this.addClass("wowx");
		// 	// new WOW({boxClass:'wowx'}).init();		
		// });

		Array.prototype.forEach.call(elems, function(el, i){

//			el.removeClass("wow");
			var className = "wow";
			if (el.classList){
				el.classList.remove(className);
			}else{
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

//			el.removeClass("wowx"+index+"z"+i);
			var className2 = "wowx"+index+"z"+i;
			if (el.classList){
				el.classList.remove(className2);
			}else{
				el.className = el.className.replace(new RegExp('(^|\\b)' + className2.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

//			el.addClass("wowx"+index+"z"+i);
			if (el.classList){
				el.classList.add('wowx'+index+'z'+i);
			}else{
				el.className += ' ' + 'wowx'+index+'z'+i;
			}

//			el.attr('data-sliderx',"wowx"+index+"z"+i);
			el.setAttribute('data-sliderx',"wowx"+index+"z"+i);

			new WOW({boxClass:'wowx'+index+"z"+i}).init();

		});


	}	





	/*=============================================>>>>>
	= Google Maps =
	===============================================>>>>>*/
	var $window = $(window),
		mapInstances = [],
		$pluginInstance = $('.google-map').lazyLoadGoogleMaps({
			key: 'AIzaSyD-YJPlyhCKmS70KTSOitSLcHOCsHtX7ZQ',
			callback: function (container, map) {
				var $container = $(container);
				var x = $container.attr('data-google-map-options') ? $container.attr('data-google-map-options') : "{}";
				var gmOptions = $.parseJSON(x);
				var center;
				if (gmOptions.lat) {
					center = new google.maps.LatLng(gmOptions.lat, gmOptions.lng);
				} else {
					if ($container.attr('data-lat')) {
						center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));
					} else {
						center = new google.maps.LatLng("51.520868", "-0.127697");
					}
				}
				var gmDefaults = {
					center: center,
					zoom: 15,
					zoomControl: false,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.DEFAULT,
					},
					disableDoubleClickZoom: false,
					mapTypeControl: false,
					mapTypeControlOptions: {
						style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					},
					scaleControl: false,
					scrollwheel: false,
					streetViewControl: false,
					draggable: false,
					overviewMapControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				$.extend(gmDefaults, gmOptions);
				map.setOptions(gmDefaults);
				new google.maps.Marker({
					position: center,
					map: map
				});
				$.data(map, 'center', center);
				mapInstances.push(map);
				var updateCenter = function () {
					$.data(map, 'center', map.getCenter());
				};
				google.maps.event.addListener(map, 'dragend', updateCenter);
				google.maps.event.addListener(map, 'zoom_changed', updateCenter);
				google.maps.event.addListenerOnce(map, 'idle', function () {
					$container.addClass('is-loaded');
				});
			}
		});
	/*----------- GoogleMaps Center on Window Resize -----------*/
	$window.on('resize', $pluginInstance.debounce(1000, function () {
		$.each(mapInstances, function () {
			this.setCenter($.data(this, 'center'));
		});
	}));
	/*----------- End of GoogleMaps Center on Window Resize -----------*/
	/*= End of Google Maps =*/
	/*=============================================<<<<<*/



})(jQuery);