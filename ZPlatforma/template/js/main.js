(function($){
"use strict";

		$("#blogs-3-slider").flickity({
			cellSelector: '.slider-item',
			resize: true,
			cellAlign: 'left',
			contain: true,
			imagesLoaded: true,
			wrapAround: true,
			adaptiveHeight: true,
			pageDots: false,
			groupCells: true,
			prevNextButtons: true
		})

		$("#blogs-5-slider").flickity({
			cellSelector: ".slider-item",
			resize: true,
			cellAlign: 'left',
			contain: true,
			imagesLoaded: true,
			wrapAround: false,
			adaptiveHeight: true,
			pageDots: false,
			groupCells: true,
			prevNextButtons: true
		})

		$('#contents-18 h3').next().hide()
	  $('#contents-18 h3 a').on('click', function(e) {
	    e.preventDefault();
	    $(this).closest('h3').next().toggle();
	  });

		$("#content-18-slider").flickity({
	    cellSelector:    ".slider-item",
	    resize:          true,
	    cellAlign:       'center',
	    contain:         true,
	    adaptiveHeight:  true,
	    prevNextButtons: false
	  })

		$('#ecommerces-1-tabs a').click(function (e) {
			e.preventDefault()
			$(this).tab('show')
		})

		$("#ecommerce-3-slider").flickity({
			cellSelector: ".slider-item",
			resize: true,
			cellAlign: 'left',
			contain: false,
			imagesLoaded: true,
			wrapAround: true,
			adaptiveHeight: true,
			pageDots: false,
			groupCells: false,
			prevNextButtons: true
		});

		$('#ecommerces-3 .more').on('click', function() {
			$('#ecommerces-3 input')[0].stepUp();
		});

		$('#ecommerces-3 .less').on('click', function() {
			$('#ecommerces-3 input')[0].stepDown();
		});

		$("#ecommerces-slider-4").flickity({
			cellSelector:    ".slider-item",
			resize:          true,
			cellAlign:       'left',
			contain:         true,
			imagesLoaded:    true,
			wrapAround:      true,
			adaptiveHeight:  true,
			pageDots:        true,
			groupCells:      true,
			prevNextButtons: true
		})

		$('#ec5-tabs a').click(function (e) {
			e.preventDefault()
			$(this).tab('show')
		})

		$("#ecommerces-slider-6").flickity({
			cellSelector: ".slider-item",
			resize: true,
			cellAlign: 'center',
			contain: true,
			imagesLoaded: true,
			wrapAround: true,
			adaptiveHeight: true,
			pageDots: false,
			groupCells: false,
			prevNextButtons: true
		})

		$('#feature-12-tabs a').click(function (e) {
			e.preventDefault()
			$(this).tab('show')
		})

		$('#feature-14-tabs a').click(function (e) {
			e.preventDefault()
			var currentId = $(this).attr('href');
			$('#feature-14-tabs .active').removeClass('active');

			$(this).closest('.plain-tab').addClass('active');
			$(currentId).siblings().removeClass('active');
			$(currentId).addClass('active');
		})

		$('#f18-tabs a').click(function (e) {
			e.preventDefault();
			$('#f18-tabs a').removeClass('active')
			$(this).addClass('active')
			$(this).tab('show')
		})

		$('#f21-tabs a').click(function (e) {
			e.preventDefault();
			$(this).tab('show')
		})

		$("#header-7-slider").flickity({
			cellSelector: ".slider-item",
			cellAlign: 'left',
			contain: true,
			pageDots: false,
			groupCells: true
		})

		$('p2-tabs a').click(function (e) {
			e.preventDefault()
			$(this).tab('show')
		})

		$("#portfolio-5-slider").flickity({
			cellSelector:    ".slider-item",
			cellAlign:       'left',
			resize:          true,
			imagesLoaded:    true,
			adaptiveHeight:  true,
			groupCells:      true,
			prevNextButtons: true,
			wrapAround:      false,
			pageDots:        false,
			contain:         false,
		})

		$("#portfolio-7-slider").flickity({
			cellSelector: ".slider-item",
			resize: true,
			cellAlign: 'left',
			contain: false,
			imagesLoaded: true,
			wrapAround: false,
			adaptiveHeight: true,
			pageDots: false,
			groupCells: true,
			prevNextButtons: true
		})

		$("#prices-4 input").each(function() {
	    var value = $(this).val();
	    var bar_length = $(this).width() * value / 100;

	    $(this).parent().find('.value-bar').width(bar_length);
	  })

	  $("#prices-4 input").on('change input', function() {
	    var value = $(this).val();
	    var bar_length = $(this).width() * value / 100;

	    $(this).parent().find('.value-bar').width(bar_length);
	    $(this).parent().parent().find('.slider-price').html(value);

	    var summary = 0;
	    $("#prices-4 input").each(function () {
	      summary += Number($(this).val());
	    });
	    $('#price-4-summary').text(summary);
	  })

		$('#price-8-tabs a').click(function (e) {
			e.preventDefault()
			$(this).tab('show')
		})

		$("#sliders-1-slider").flickity({
	    cellSelector:    ".slider-item",
	    resize:          true,
	    cellAlign:       'center',
	    contain:         true,
	    imagesLoaded:    true,
	    wrapAround:      false,
	    adaptiveHeight:  true,
	    pageDots:        false,
	    groupCells:      false,
	    prevNextButtons: true
	  })

		$("#sliders-2-slider").flickity({
	    cellSelector: ".slider-item",
	    resize: true,
	    cellAlign: 'left',
	    contain: true,
	    imagesLoaded: true,
	    wrapAround: false,
	    adaptiveHeight: true,
	    pageDots: true,
	    groupCells: false,
	    prevNextButtons: true
	  })

		$("#sliders-3-slider").flickity({
	    cellSelector:    ".slider-item",
	    cellAlign:       'center',
	    resize:          true,
	    contain:         true,
	    imagesLoaded:    true,
	    wrapAround:      false,
	    adaptiveHeight:  true,
	    pageDots:        true,
	    groupCells:      true,
	    prevNextButtons: true
	  })

		$("#sliders-4-slider").flickity({
	    cellSelector: ".slider-item",
	    resize: true,
	    cellAlign: 'center',
	    contain: true,
	    imagesLoaded: true,
	    wrapAround: true,
	    adaptiveHeight: true,
	    pageDots: true,
	    groupCells: false,
	    prevNextButtons: true
	  })

		$("#slider-5-slider").flickity({
	    cellSelector:    ".slider-item",
	    cellAlign:       'center',
	    pageDots:        false,
	    groupCells:      false,
	    resize:          true,
	    contain:         true,
	    imagesLoaded:    true,
	    wrapAround:      true,
	    adaptiveHeight:  true,
	    prevNextButtons: true
	  })

		$("#sliders-6-slider").flickity({
	    cellSelector:    ".slider-item",
	    cellAlign:       'center',
	    resize:          true,
	    wrapAround:      true,
	    imagesLoaded:    true,
	    adaptiveHeight:  true,
	    pageDots:        true,
	    contain:         false,
	    groupCells:      false,
	    prevNextButtons: false
	  })

		var slidersSlider7 = $("#sliders-7-slider").flickity({
      cellSelector: ".slider-item",
      resize: true,
      cellAlign: 'center',
      contain: false,
      imagesLoaded: true,
      wrapAround: true,
      adaptiveHeight: true,
      pageDots: true,
      groupCells: false,
      prevNextButtons: false
    })

    slidersSlider7.find('.slider-item').on('click', function() {
      slidersSlider7.flickity('select', $(this).index());
    });

		$("#slider-8-slider").flickity({
      cellSelector: ".slider-item",
      resize: true,
      cellAlign: 'left',
      contain: true,
      imagesLoaded: true,
      wrapAround: false,
      adaptiveHeight: true,
      pageDots: false,
      groupCells: true,
      prevNextButtons: true
    })

		var slidersSlider9 = $("#slider-9-slider").flickity({
      cellSelector: ".slider-item",
      resize: true,
      cellAlign: 'center',
      contain: false,
      imagesLoaded: true,
      wrapAround: true,
      adaptiveHeight: true,
      pageDots: false,
      groupCells: false,
      prevNextButtons: true
    });

    slidersSlider9.find('.slider-item').on('click', function() {
      slidersSlider9.flickity('select', $(this).index());
    });

		$("#sliders-10-slider").flickity({
      cellSelector: ".slider-item",
      resize: true,
      cellAlign: 'center',
      contain: true,
      imagesLoaded: true,
      wrapAround: false,
      adaptiveHeight: true,
      pageDots: false,
      groupCells: false,
      prevNextButtons: true
    })

		$(document).ready(function(){
	    $("#team-slider-6").flickity({
	      cellSelector:    ".slider-item",
	      resize:          true,
	      cellAlign:       'center',
	      contain:         false,
	      wrapAround:      true,
	      adaptiveHeight:  true,
	      pageDots:        false,
	      groupCells:      false,
	      prevNextButtons: false
	    })

	    $("#team-slider-6-nav").flickity({
	      cellSelector:    ".slider-item",
	      resize:          true,
	      contain:         false,
	      cellAlign:       'left',
	      wrapAround:      true,
	      adaptiveHeight:  true,
	      pageDots:        false,
	      groupCells:      false,
	      prevNextButtons: false,
	      asNavFor:        "#team-slider-6",
	    })
	  })

		$(document).ready(function(){
			var groupCells = 3;
			var viewWidth = $('body').width();

			if (viewWidth < 992 && viewWidth >= 576) groupCells = 2;
			if (viewWidth < 576) groupCells = 1

			var t7slider = $("#team-slider-7").flickity({
				cellSelector:    ".slider-item",
				resize:          true,
				cellAlign:       'center',
				contain:         false,
				imagesLoaded:    true,
				wrapAround:      true,
				adaptiveHeight:  true,
				pageDots:        false,
				groupCells:      groupCells,
				prevNextButtons: false
			});

			t7slider.find('.slider-item').on('click', function() {
				t7slider.flickity('select', $(this).index() / groupCells);
			});
		})

		$(document).ready(function(){

	    $("#team-slider-8").flickity({
	      cellSelector: ".slider-item",
	      resize: true,
	      cellAlign: 'center',
	      contain: false,
	      wrapAround: false,
	      adaptiveHeight: true,
	      pageDots: false,
	      groupCells: false,
	      prevNextButtons: true
	    })
	  })

		var t1slider = $("#testimonials-1-slider").flickity({
			cellSelector: ".slider-item",
			resize: true,
			cellAlign: 'center',
			contain: false,
			imagesLoaded: true,
			wrapAround: true,
			adaptiveHeight: true,
			pageDots: false,
			groupCells: false,
			prevNextButtons: true
		});

		t1slider.find('.slider-item').on('click', function() {
			t1slider.flickity('select', $(this).index());
		});

		$('#testimonials-2-slider').flickity({
			pageDots: false
		})

		$('#testimonials-2-nav').flickity({
			asNavFor: '#testimonials-2-slider',
			pageDots: false,
			prevNextButtons: false,
			cellAlign: 'left',
			contain: true,
		})

		$('#testimonials-5-slider').flickity({
			pageDots: false,
			cellSelector: ".slider-item"
		})

		$('#testimonials-5-nav').flickity({
			asNavFor: '#testimonials-5-slider',
			pageDots: false,
			prevNextButtons: false,
			contain: true
		})

		$('#testimonials-6-slider').flickity({
			pageDots: false,
			cellSelector: '.slider-item'
		})

		$('#testimonials-6-nav').flickity({
			asNavFor: '#testimonials-6-slider',
			pageDots: false,
			prevNextButtons: false,
			cellAlign: 'left',
			contain: true
		})

		$('#testimonials-7-slider').flickity({
			pageDots: false,
			cellAlign: 'left'
		})

		$('#testimonials-9-slider').flickity({
			pageDots: false
		})

		$('#testimonials-10-slider').flickity({
			pageDots: true
		})

		$('#testimonials-11-slider').flickity({
			cellAlign:  'left',
			contain:    true,
			groupCells: true
		})

		$('#testimonials-12-slider').flickity({
			cellAlign:  'left',
			contain:    true,
			groupCells: true,
			pageDots: false
		})

		$('#testimonials-15-slider').flickity({
			cellAlign:  'left',
			contain:    true,
			groupCells: true,
			pageDots: false
		})


})(jQuery)
