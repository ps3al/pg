(function($) {
	"use strict";

	
	
// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('#masthead').outerHeight();

	$(window).scroll(function(event){
			didScroll = true;
	});

	setInterval(function() {
			if (didScroll) {
					hasScrolled();
					didScroll = false;
			}
	}, 250);

	function hasScrolled() {
			var st = $(this).scrollTop();

			// Make sure they scroll more than delta
			if(Math.abs(lastScrollTop - st) <= delta)
					return;

			// If they scrolled down and are past the navbar, add class .header-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > navbarHeight){
					// Scroll Down
					$('#masthead').removeClass('header-down').addClass('header-up');
			} else {
					// Scroll Up
					if(st + $(window).height() < $(document).height()) {
							$('#masthead').removeClass('header-up').addClass('header-down');
					}
			}

			lastScrollTop = st;
	}	
	
	

	/*=============================================>>>>>
	= Fitvids =
	===============================================>>>>>*/
	$('.fitvids').fitVids();
	/*= End of Fitvids =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Smooth Scroll =
	===============================================>>>>>*/
	$('.smoothscroll').smoothScroll({speed:1000,offset:-50});
	/*= End of Smooth Scrolll =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Easy Tabs =
	===============================================>>>>>*/
	var et = $('.easytabs');
	et.each(function(index) {
		var etDefaults = {};
		var etOptions = $(this).data('easytabs-options');
		var etx = $(this).easytabs($.extend(etDefaults, etOptions));
	});
	/*= End of Easy Tabs =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Magnific Popup =
	===============================================>>>>>*/
	var mpOpen = true;
	var mp = $('.magnific-popup');
	mp.each(function(index) {
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
			disableOn: function() {
				return mpOpen;
			}
		};
		var mpOptions = $(this).data('magnificpopup-options');
		var mpx = $(this).magnificPopup($.extend(mpDefaults, mpOptions));
	});
	/*= End of Magnific Popup =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Light Gallery =
	===============================================>>>>>*/
	var lg = $('.light-gallery');
	lg.each(function(index) {
		var lgDefaults = {
			"selector": "a"
		};
		var lgOptions = $(this).data('lightgallery-options');
		var lgx = $(this).lightGallery($.extend(lgDefaults, lgOptions));
	});
	/*= End of Light Gallery =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Slick Slider =
	===============================================>>>>>*/
	var ss = $('.slick-slider');
	ss.each(function(index) {
		var ssDefaults = {
			slidesToShow: 4
		};
		var ssOptions = $(this).data('slick-options');
		var ssx = $(this).slick($.extend(ssDefaults, ssOptions));
	});
	/*= End of Slick Slider =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Swiper Slider =
	===============================================>>>>>*/
	$('.swiper-slider').each(function(index) {
		var swDefaults = {
			paginationClickable: true
		};
		var swiperConf = $(this).data('swiper-options');
		$.extend(swDefaults, swiperConf);
		var slider = new Swiper(swiperConf['container'], swDefaults);
	});
	/*= End of Swiper Slider =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Jarallax =
	===============================================>>>>>*/
	var jx = $('.jarallax');
	jx.each(function(index) {
		var jxDefaults = {};
		var jxOptions = $(this).data('jarallax-options');
		var jarallaxx = $(this).jarallax($.extend(jxDefaults, jxOptions));
	});
	/*= End of Jarallax =*/
	/*=============================================<<<<<*/



	/*=============================================>>>>>
	= Plyr =
	===============================================>>>>>*/
	plyr.setup('.js-player');
	/*= End of Plyr =*/
	/*=============================================<<<<<*/



	$(window).on("load", function(e) {

		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({
			'overflow': 'visible'
		});



		/*=============================================>>>>>
		= Scroll Up =
		===============================================>>>>>*/
		$.scrollUp({
			scrollName: 'scrollUp',
			scrollDistance: 300,
			scrollFrom: 'top',
			scrollSpeed: 300,
			easingType: 'linear',
			animation: 'fade',
			animationInSpeed: 200,
			animationOutSpeed: 200,
			scrollText: '<span class="btn btn-square btn-rounded btn-icon"><i class="fa fa-chevron-up"></i></span>',
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
		$pcircle.each(function(i) {
			var progresbarDefaults = {
				data: 50,
				strokeWidth: 4,
				trailWidth: 4,
				duration: 5000,
				easing: 'easeInOut',
				offset: "100%",
				step: function(state, circle, attachment) {
					circle.setText(Math.round(circle.value() * 100));
				}
			}
			var progresbarOptions = $(this).data('progressbar-options');
			$.extend(progresbarDefaults, progresbarOptions);
			var circle = new ProgressBar.Circle(this, progresbarDefaults);
			var value = progresbarDefaults['data'] / 100;
			$pcircle.waypoint(function() {
				circle.animate(value);
			}, {
				offset: progresbarDefaults['offset']
			})
		});

		$psemi.each(function(i) {
			var progresbarDefaults = {
				data: 50,
				strokeWidth: 4,
				trailWidth: 4,
				duration: 5000,
				easing: 'easeInOut',
				offset: "100%",
				step: function(state, circle, attachment) {
					circle.setText(Math.round(circle.value() * 100));
				}
			}
			var progresbarOptions = $(this).data('progressbar-options');
			$.extend(progresbarDefaults, progresbarOptions);
			var semi = new ProgressBar.SemiCircle(this, progresbarDefaults);
			var value = progresbarDefaults['data'] / 100;
			$psemi.waypoint(function() {
				semi.animate(value);
			}, {
				offset: progresbarDefaults['offset']
			})
		});

		$pline.each(function(i) {
			var progresbarDefaults = {
				strokeWidth: 3,
				trailWidth: 3,
				duration: 3000,
				easing: 'easeInOut',
				offset: "100%",
				text: {
					style: {
						color: 'inherit',
						position: 'absolute',
						right: '0',
						top: '-30px',
						padding: 0,
						margin: 0,
						transform: null
					},
					autoStyleContainer: false
				},
				step: function(state, line, attachment) {
					line.setText(Math.round(line.value() * 100) + ' %');
				}
			}
			var progresbarOptions = $(this).data('progressbar-options');
			$.extend(progresbarDefaults, progresbarOptions);
			var line = new ProgressBar.Line(this, progresbarDefaults);
			var value = progresbarDefaults['data'] / 100;
			$pline.waypoint(function() {
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
		$('.countdown').each(function() {
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
		$('.counterup').each(function() {
			var counterDefaults = {
				delay: '10',
				time: '5000'
			};
			var counterOptions = $(this).data('counterup-options');
			$.extend(counterDefaults, counterOptions);
			var elem = $(this);
			elem.counterUp(counterDefaults);
		});
		/*= End of Counterup =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Animated =
		===============================================>>>>>*/
		$('.animated').each(function() {
			var animDefaults = {
				animation: 'fadeInUp',
				delay: '300',
				offset: '90%',
				triggerOnce: true
			};
			var animOptions = $(this).data('animation-options');
			$.extend(animDefaults, animOptions)
			var elem = $(this);
			var animation = animDefaults['animation'];
			var delay = animDefaults['delay'];
			var offset = animDefaults['offset'];
			var triggerOnce = animDefaults['triggerOnce'];
			var waypoints = elem.waypoint(function(direction) {
				if (!elem.hasClass('visible')) {
					if (delay) {
						setTimeout(function() {
							elem.addClass(animation + " visible");
						}, delay);
					} else {
						elem.addClass(animation + " visible");
					}
				}
			}, {
				triggerOnce: triggerOnce,
				offset: offset
			});
		});
		/*= End of Animated =*/
		/*=============================================<<<<<*/



		/*=============================================>>>>>
		= Isotope =
		===============================================>>>>>*/
		$('.isotope-container').each(function(index) {
			var grid = $(this);
			var isotopeDefaults = {
				filter: '*'
			};
			var isotopeOptions = $.parseJSON(grid.attr('data-isotope-options'));
			var isotopeFilters = isotopeOptions.filters;
			$(isotopeFilters).on('click', function() {
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
		oc.each(function(index) {
			var ocDefaults = {
				nav: false,
				dots: false,
				navClass: ['owl-prev', 'owl-next'],
				autoplay: true,
				margin: 0,
				items: 1,
				center: true,
				loop: true,
				autoWidth: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 1000,
/*				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 1
					},
					1000: {
						items: 1
					}
				}*/
			}
			var ocOptions = $(this).data('owlcarousel-options');
			var owlx = $(this).owlCarousel($.extend(ocDefaults, ocOptions));
			if (!ocDefaults['nav'] && ocOptions['navClass']) {
				$('.' + ocDefaults['navClass'][0]).click(function() {
					owlx.trigger('next.owl.carousel');
				});
				$('.' + ocDefaults['navClass'][1]).click(function() {
					owlx.trigger('prev.owl.carousel');
				});
			}
		});
		/*= End of Owl Carousel =*/
		/*=============================================<<<<<*/



	});


	/*=============================================>>>>>
	= Google Maps =
	===============================================>>>>>*/
	var $window = $(window),
		mapInstances = [],
		$pluginInstance = $('.google-map').lazyLoadGoogleMaps({
			key: 'AIzaSyD-YJPlyhCKmS70KTSOitSLcHOCsHtX7ZQ',
			callback: function(container, map) {
				var $container = $(container);
				var x = $container.attr('data-googlemaps-options') ? $container.attr('data-googlemaps-options') : "{}";
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
					zoomControl: true,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.DEFAULT,
					},
					disableDoubleClickZoom: false,
					mapTypeControl: true,
					mapTypeControlOptions: {
						style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					},
					scaleControl: true,
					scrollwheel: false,
					streetViewControl: true,
					draggable: true,
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
				var updateCenter = function() {
					$.data(map, 'center', map.getCenter());
				};
				google.maps.event.addListener(map, 'dragend', updateCenter);
				google.maps.event.addListener(map, 'zoom_changed', updateCenter);
				google.maps.event.addListenerOnce(map, 'idle', function() {
					$container.addClass('is-loaded');
				});
			}
		});
	/*----------- GoogleMaps Center on Window Resize -----------*/
	$window.on('resize', $pluginInstance.debounce(1000, function() {
		$.each(mapInstances, function() {
			this.setCenter($.data(this, 'center'));
		});
	}));
	/*----------- End of GoogleMaps Center on Window Resize -----------*/
	/*= End of Google Maps =*/
	/*=============================================<<<<<*/

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 200) {
			$('#top-menu').addClass('menu-dark');
		} else {
			$('#top-menu').removeClass('menu-dark');
		}
	});

})(jQuery);
