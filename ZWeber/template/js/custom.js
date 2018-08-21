"use strict";

window.addEventListener('load', function() {
//------------------------------------------------------------------------------------
//								COUNT UP SCRIPT
//------------------------------------------------------------------------------------

var variableChart = $('.circular-chart:not(.circular-play)').waypoint({
    handler: function(direction) {
        $(this.element).attr('class', $(this.element).attr('class') + ' circular-play');
        variableChart[0].disable();
    },
    offset: '90%'
});
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(".toogle-btn").on('click', function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
});

$(".toogle-btn.close").on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("show");
});

//------------------------------------------------------------------------
//						MENU TAP ON MOBILE DEVICES
//------------------------------------------------------------------------

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("nav.navbar").addClass("touchmenu");
    $(".sub-menu-link").on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("tap");
    });
}


//------------------------------------------------------------------------
//						SHOW NAVIGATION ON SCROLL DOWN
//------------------------------------------------------------------------

var $window = $(window);
$window.on('scroll', function () {
    var $nav = $('nav.show-on-scroll');
    var height = $nav.outerHeight();
    var scrollTop = $window.scrollTop();
    if (scrollTop > height*2) {
        $nav.addClass('show');
    } else {
        $nav.removeClass('show');
    }

});


//------------------------------------------------------------------------
//						HIDE NAVIGATION ON SCROLL DOWN
//------------------------------------------------------------------------

var prev = 0;
var $window = $(window);
$window.on('scroll', function () {
    var nav = $('nav.hide-on-scroll');
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hide', scrollTop > prev);
    prev = scrollTop;
});



//------------------------------------------------------------------------
//						STICKY NAVIGATION
//------------------------------------------------------------------------

// Custom
window.stickyToggle = function (sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyWrapperHeight = stickyWrapper.outerHeight();
    var stickyTop = stickyWrapper.offset().top - stickyHeight + stickyWrapperHeight;
    if (scrollElement.scrollTop() >= stickyTop) {
        stickyWrapper.height(stickyHeight);
        sticky.addClass("fixed-top");
    } else {
        sticky.removeClass("fixed-top");
        stickyWrapper.height('auto');
    }
};

// Find all data-toggle="sticky-onscroll" elements
$('.sticky-top').each(function () {
    var sticky = $(this);
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    if (!sticky.next().hasClass('sticky-wrapper')) {
        sticky.after(stickyWrapper);
    } else {
        stickyWrapper = sticky.next();
    }

    window.stickyTB = window.stickyToggle.bind(window, sticky, stickyWrapper, $(window));
    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', window.stickyTB);

    // On page load
    window.stickyToggle(sticky, stickyWrapper, $(window));
});

//------------------------------------------------------------------------
//                    MAGNIFIC POPUP(LIGHTBOX) SETTINGS
//------------------------------------------------------------------------

$('.gallery').each(function () { // the containers for all your galleries
    var $this = $(this);
    $this.magnificPopup({
        delegate: '.video-popup, .image-popup', // the selector for gallery item
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: function (item) {
                return item.el.find('img').attr('alt');
            }
        },
        callbacks: {
            open: function() {
                $this.trigger('stop.owl.autoplay');
            },
            close: function() {
                $this.trigger('play.owl.autoplay');
            }
        }
    });
});
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(".toogle-btn:not(.close)").on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
});

$(".toogle-btn.close").on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).parent().removeClass("show");
    $(this).parent().trigger("close.panel");
});

$(document).on('click', '[data-toggle=panel]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('data-target');
    $(href).toggleClass("show");

    if(!$(href).hasClass("show")) $(href).trigger("close.alert");
    else $(href).trigger("open.alert");
});
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(".toogle-btn:not(.close)").on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
    $(this).parent().trigger("close.alert");
});

$(".toogle-btn.close").on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).parent().removeClass("show");
    $(this).parent().trigger("close.alert");
});

$(document).on('click', '[data-toggle=alert]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('data-target');
    $(href).toggleClass("show");

    if(!$(href).hasClass("show")) $(href).trigger("close.alert");
    else $(href).trigger("open.alert");
});
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(document).on('click', ".toogle-btn:not(.close)", function (e) {
    if (document.querySelector('.blr-active-page')) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
    $(this).parent().trigger("close.alert");
});

$(document).on('click', ".toogle-btn.close", function (e) {
    if (document.querySelector('.blr-active-page')) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).parent().removeClass("show");
    $(this).parent().trigger("close.alert");
});

$(document).on('click', '[data-toggle=alert]', function (e) {
    if (document.querySelector('.blr-active-page')) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('data-target');
    $(href).toggleClass("show");

    if(!$(href).hasClass("show")) $(href).trigger("close.alert");
    else $(href).trigger("open.alert");
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(name, val) {
    var domain = document.domain === 'localhost'
        || document.domain === 'file'
        || document.domain === '' ? 'multifour.com' : document.domain;
    document.cookie = name + '=' + val + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/; domain=.'
        + domain + ';';
}

var pAgree = getCookie('policy_agree');
if (!pAgree || pAgree !== '1') {
    $('.cookie-alert').addClass("show");
} else {
    $('.cookie-alert').removeClass("show");
}

$(document).on('click', '.cookie-alert .accept', function (e) {
    if (document.querySelector('.blr-active-page')) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    setCookie('policy_agree', '1');
    $(this).closest('.cookie-alert').removeClass("show");
    $(this).closest('.cookie-alert').trigger("close.alert");
});

});

window.addEventListener('load', function() {
		var rellax = new Rellax('.parallax', {
			center: true
		});
});
window.addEventListener('load', function() {
	$('body').delegate('input[type=text].datepicker-input', 'focusin', function(){
		$(this).datepicker({
			format: 'dd.mm.yyyy',
			weekStart: 1,
			autoclose: true,
			todayHighlight: true
		});
	});
});
