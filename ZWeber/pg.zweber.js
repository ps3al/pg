function createZWeberPlugin(wp, pinegrow) {

    var type_prefix = 'pg.zweber';
    var f = new PgFramework(type_prefix, 'Z Weber');
    f.allow_single_type = true;
    f.type = type_prefix;
    var terms = '<br><small class="text-muted">TERMS OF USE: <b>You can use Z Weber</b> to build and deploy websites for yourself and your clients, free or paid, as many as you want. <b>You can NOT use Z Weber</b> to create templates and themes that you then sell in template marketplaces or give away for free.</small>';
    f.author = 'Z Weber @ Semih MEMIS';
    f.author_link = 'https://semihmemis.com';
    f.setScriptFileByScriptTagId('plugin-pg-zweber');


    //Don't show these files in CSS tab
    f.ignore_css_files = [/font\-awesome/i];

    f.detect = function (pgPage) {
        return false;
    }

    var fs = require('fs');
    var path = require('path');

    var source_relative = 'code/';

    pinegrow.addFramework(f);

    var combined_css = '';
    var combined_css_file_included = {};

    var components_map = {};

    var getComponent = function (type) {
        return components_map[type_prefix + '.' + type];
    }

    var ifType = function (type, c, func) {
        if (c.type == type_prefix + '.' + type) func(c);
    }

    var showRefreshMessage = function (what, single) {
        if (!what) what = 'the element';
        pinegrow.showQuickMessage('<b>Refresh page (CMD + R)</b> to activate ' + what + '.', 3000, single);
    }

    f.pgbCreateComponent = function (source_url, selector, name, transform_code) {
        var clist = [];
        var sourceNode = pgbGetSourceNode(source_url);

        var list = sourceNode.find(selector);

        for (var i = 0; i < list.length; i++) {
            var pgel = list[i];
            var suff = list.length > 1 ? '-' + (i + 1) : '';
            var x = selector.replace('#', '');
            var key = x.replace('.', '') + suff;
            var type = type_prefix + '.' + key;
            var c = new PgComponentType(type, name + suff);
            c.selector = selector;

            if (list.length > 1) {
                c.selector += suff;
                pgel.addClass(c.selector.replace('.', ''));
            }
            c.parent_selector = 'body';
            c.sections = {};

            if (transform_code) transform_code(pgel, c, i);

            c.code = pgel.toStringOriginal(true);
            c.preview_image = c.type.replace('.wp.', '.') + '.jpg';
            c.button_image = c.preview_image;

            c.tags = 'block';

            f.addComponentType(c);

            clist.push(c);

            components_map[c.type] = c;
        }
        processCSSFile2(source_url.replace('.html', '.css'));
        return clist;
    }

    var processCSSFile = function (dir, name) {
        var css_file = f.getResourceFile(source_relative + dir + '/css/' + name);
        if (!(css_file in combined_css_file_included)) {
            try {
                var css = fs.readFileSync(css_file, {
                    encoding: 'utf8'
                });
                combined_css += css;
                combined_css_file_included[css_file] = true;
            } catch (err) {}
        }
    }

    var processCSSFile2 = function (dir, name) {
        var css_file = f.getResourceFile(source_relative + '/css/' + name);
        if (!(css_file in combined_css_file_included)) {
            try {
                var css = fs.readFileSync(css_file, {
                    encoding: 'utf8'
                });
                combined_css += css;
                combined_css_file_included[css_file] = true;
            } catch (err) {}
        }
    }


    var addTo = function (list, new_list) {
        for (var i = 0; i < new_list.length; i++) {
            list.push(new_list[i]);
        }
    }

    var source_base = f.getResourceUrl(source_relative);

    var pgbGetSourceFileUrl = function (fn) {
        return source_base + fn;
    }

    var source_cache = {};

    var pgbGetSourceNode = function (fn) {

        if (!(fn in source_cache)) {
            source_cache[fn] = pinegrow.getSourceNodeOfUrl(pgbGetSourceFileUrl(fn), true);
        }
        return source_cache[fn];
    }

    var pgbAddSection = function (key, name, list) {
        var section = new PgFrameworkLibSection(type_prefix + '.' + key, name);
        section.setComponentTypes(list);
        f.addLibSection(section);
    }


    function addSMComponentzzz(name, nick) {

        var comps = [];
        var selector = "";

        selector = "action-btn-text";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-halfbg-text-btn";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-img-text-btn-2";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-img-text-btn";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-img-text";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-text-btn-2";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-text-btn-img";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-text-btn";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-text-img";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-text-timer";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));
        selector = "action-text";
        addTo(comps, f.pgbCreateComponent(nick + '/' + selector + '/index.html', selector, name, function (pgel, c) {}));

        pgbAddSection(nick, name + ' Blocks', comps);

    }




    function addSMComponent(name, slug, resx) {

        var comps = [];
        for (var i = 0; i < resx.length; i++) {
            addTo(comps, f.pgbCreateComponent(slug + '/' + resx[i] + '/index.html', '#'+resx[i], name, function (pgel, c) {}));
        }
//        alert(comps.length);
        pgbAddSection(slug, name + ' Blocks', comps);

    }
//alert(2);
    var resx = [];
//    resx = [];



    resx = [
        'action-btn-text',
        'action-halfbg-text-btn',
        'action-img-text-btn-2',
        'action-img-text-btn',
        'action-img-text',
        'action-text-btn-2',
        'action-text-btn-img',
        'action-text-btn',
        'action-text-img',
        'action-text-timer',
        'action-text'
    ];
    addSMComponent("actions", "actions", resx);

//alert(22)



    resx = [
        'alert-img-text-btn',
        'alert-img-text',
        'alert-search',
        'alert-text-btn',
        'alert-text-img-btn',
        'alert-text'
    ];
    addSMComponent("alerts", "alerts", resx);


    resx = ['benefits-2col-10',
        'benefits-2col-11',
        'benefits-2col-2',
        'benefits-2col-3',
        'benefits-2col-4',
        'benefits-2col-5',
        'benefits-2col-6',
        'benefits-2col-7',
        'benefits-2col-8',
        'benefits-2col-9',
        'benefits-2col-counter-2',
        'benefits-2col-counter',
        'benefits-2col',
        'benefits-3col-10',
        'benefits-3col-11',
        'benefits-3col-12',
        'benefits-3col-2',
        'benefits-3col-3',
        'benefits-3col-5',
        'benefits-3col-6',
        'benefits-3col-7',
        'benefits-3col-8',
        'benefits-3col-9',
        'benefits-3col-counter-2',
        'benefits-3col-counter-3',
        'benefits-3col-counter',
        'benefits-3col',
        'benefits-4col-2',
        'benefits-4col-3',
        'benefits-4col-4',
        'benefits-4col-5',
        'benefits-4col-6',
        'benefits-4col-7',
        'benefits-4col-8',
        'benefits-4col-counter-2',
        'benefits-4col-counter-3',
        'benefits-4col-counter',
        'benefits-4col',
        'benefits-5col-counter',
        'benefits-6col-2',
        'benefits-single-counter',
    ];
    addSMComponent("benefits", "benefits", resx);


    resx = ['blog-1col-sidebar',
        'blog-1col',
        'blog-2col-2',
        'blog-2col-3',
        'blog-2col-sidebar',
        'blog-2col',
        'blog-3col-2',
        'blog-3col-3',
        'blog-3col-4',
        'blog-3col-5',
        'blog-3col-6',
        'blog-3col-7',
        'blog-3col-carousel',
        'blog-3col',
        'blog-4col-2',
        'blog-4col-3',
        'blog-4col-carousel',
        'blog-4col',
        'blog-breadcrumb',
        'blog-half-carousel',
        'blog-list',
        'blog-paginator-2',
        'blog-paginator',
        'blog-search',
        'blog-text-2',
        'blog-text-list',
        'blog-text',
    ];
    addSMComponent("blog", "blog", resx);


    resx = ['chart-2col-circle',
        'chart-3col-circle',
        'chart-center-chart-2',
        'chart-center-chart',
        'chart-chart-text',
        'chart-text-chart-2',
        'chart-text-chart-3',
        'chart-text-chart-4',
        'chart-text-chart-5',
        'chart-text-chart',
    ];
    addSMComponent("charts", "charts", resx);


    resx = ['clients-2col',
        'clients-4col',
        'clients-5col-2',
        'clients-5col',
        'clients-carousel',
        'clients-center',
    ];
    addSMComponent("clients", "clients", resx);


    resx = ['contact-center-form',
        'contact-form-2',
        'contact-form-3',
        'contact-form-halfbg',
        'contact-form-map',
        'contact-form',
        'contact-img-form',
        'contact-img-map-text',
        'contact-inline-form',
        'contact-map-text-2',
        'contact-map-text',
        'contact-map',
        'contact-text-form',
        'contact-text-map',
    ];
    addSMComponent("contact", "contact", resx);


    resx = ['cookie-img-text',
        'cookie-text-btn-2',
        'cookie-text-btn',
        'cookie-text',
    ];
    addSMComponent("cookies", "cookies", resx);


    resx = ['desc-accordion-2',
        'desc-accordion',
        'desc-carousel-text',
        'desc-carousel',
        'desc-halfbg-text-2',
        'desc-halfbg-text-3',
        'desc-halfbg-text-4',
        'desc-halfbg-text-5',
        'desc-halfbg-text-6',
        'desc-halfbg-text-7',
        'desc-halfbg-text-8',
        'desc-halfbg-text-img-text-2',
        'desc-halfbg-text-img-text',
        'desc-halfbg-text',
        'desc-img-img-text',
        'desc-img-tabs',
        'desc-img-text-2',
        'desc-img-text-3',
        'desc-img-text-4',
        'desc-img-text-5',
        'desc-img-text-6',
        'desc-img-text-7',
        'desc-img-text-8',
        'desc-img-text-text',
        'desc-img-text',
        'desc-img-textbox',
        'desc-items-list-2',
        'desc-items-list-3',
        'desc-items-list',
        'desc-list-img',
        'desc-single-carousel-2',
        'desc-single-carousel-3',
        'desc-single-carousel',
        'desc-tabs',
        'desc-text-2',
        'desc-text-3',
        'desc-text-4',
        'desc-text-6',
        'desc-text-7',
        'desc-text-8',
        'desc-text-halfbg-2',
        'desc-text-halfbg-3',
        'desc-text-halfbg-4',
        'desc-text-halfbg-5',
        'desc-text-halfbg',
        'desc-text-img-2',
        'desc-text-img-3',
        'desc-text-img-4',
        'desc-text-img-5',
        'desc-text-img-6',
        'desc-text-img-img-2',
        'desc-text-img-img',
        'desc-text-img-text',
        'desc-text-img-textblock',
        'desc-text-img',
        'desc-text-text-img',
        'desc-text',
        'desc-textblock',
        'desc-textbox-img',
    ];
    addSMComponent("descriptions", "descriptions", resx);


    resx = ['footer-img-text',
        'footer-logo-share',
        'footer-logo-social',
        'footer-logo-text-2',
        'footer-logo-text-btn',
        'footer-logo-text-img',
        'footer-logo-text-social',
        'footer-logo-text',
        'footer-social-text',
        'footer-text-2',
        'footer-text-img',
        'footer-text-instagram',
        'footer-text-logo-share',
        'footer-text-logo-social',
        'footer-text-logo-text-2',
        'footer-text-logo-text',
        'footer-text-logo',
        'footer-text-map',
        'footer-text-subscribe',
        'footer-text',
        'footer-twitter-img',
    ];
    addSMComponent("footers", "footers", resx);


    resx = ['gallery-2col-2',
        'gallery-2col-3',
        'gallery-2col',
        'gallery-3col-2',
        'gallery-3col-3',
        'gallery-3col-4',
        'gallery-3col-5',
        'gallery-3col-carousel',
        'gallery-3col',
        'gallery-4col-2',
        'gallery-4col-3',
        'gallery-4col-carousel',
        'gallery-4col',
        'gallery-5col-2',
        'gallery-5col',
        'gallery-fluid-carousel-2',
        'gallery-fluid-carousel-3',
        'gallery-fluid-carousel-4',
        'gallery-fluid-carousel-5',
        'gallery-fluid-carousel-6',
        'gallery-fluid-carousel-7',
        'gallery-fluid-carousel',
        'gallery-grid-1',
        'gallery-half-carousel',
        'gallery-single-carousel',
    ];
    addSMComponent("galleries", "galleries", resx);


    resx = ['header-breadcrump',
        'header-carousel-2',
        'header-carousel-3',
        'header-carousel',
        'header-form',
        'header-halfbg-form',
        'header-halfbg-text',
        'header-halfbg-timer-form',
        'header-img-modal',
        'header-img-slogan-btn-img',
        'header-img-text',
        'header-modal-text',
        'header-search-2',
        'header-search',
        'header-subscribe',
        'header-text-2',
        'header-text-3',
        'header-text-4',
        'header-text-5',
        'header-text-6',
        'header-text-7',
        'header-text-8',
        'header-text-carousel',
        'header-text-halfbg',
        'header-text-img-2',
        'header-text-img-3',
        'header-text-img',
        'header-text-text',
        'header-text',
        'header-textbox-2',
        'header-textbox-3',
        'header-textbox',
        'header-timer',
    ];
    addSMComponent("headers", "headers", resx);


    resx = ['inner-carousel-2',
        'inner-carousel',
        'inner-comments',
        'inner-follow-2',
        'inner-follow',
        'inner-img-2',
        'inner-img-text',
        'inner-img',
        'inner-list',
        'inner-media',
        'inner-post-sidebar',
        'inner-quote',
        'inner-share',
        'inner-tags',
        'inner-text-2',
        'inner-text',
        'inner-title',
    ];
    addSMComponent("inner", "inner", resx);


    resx = ['media-icon',
        'media-iframe-3col',
        'media-iframe-text-2',
        'media-iframe-text',
        'media-img-text-2',
        'media-text-icon',
        'media-text-iframe',
        'media-text-img',
    ];
    addSMComponent("media", "media", resx);


    resx = ['nav-icon-menu',
        'nav-list-logo-btn',
        'nav-logo-icon',
        'nav-logo-list',
        'nav-logo-megamenu-btn',
        'nav-logo-megamenu-social',
        'nav-logo-megamenu',
        'nav-logo-menu-2',
        'nav-logo-menu-acc',
        'nav-logo-menu-btn-2',
        'nav-logo-menu-btn',
        'nav-logo-menu-social',
        'nav-logo-menu',
        'nav-logo-social',
        'nav-megamenu-logo-menu',
        'nav-megamenu-logo-text',
        'nav-menu-btn',
        'nav-menu-full',
        'nav-menu-logo-menu',
        'nav-menu-logo-social',
        'nav-menu-logo',
        'nav-menu-social',
        'nav-menu',
        'nav-offcanvas-left',
        'nav-offcanvas-right-2',
        'nav-offcanvas-right',
        'nav-social-list',
        'nav-social-logo-offcanvas',
    ];
    addSMComponent("navigations", "navigations", resx);


    resx = ['panel-login',
        'panel-logo-menu',
        'panel-menu-screen',
        'panel-search',
    ];
    addSMComponent("panels", "panels", resx);


    resx = ['popup-countdown',
        'popup-form',
        'popup-halfbg-form',
        'popup-login',
        'popup-map-list',
        'popup-subscribe',
        'popup-text-halfbg',
        'popup-text-social',
        'popup-text',
    ];
    addSMComponent("popups", "popups", resx);


    resx = ['price-2col',
        'price-3col-2',
        'price-3col',
        'price-4col-2',
        'price-4col',
        'price-5col',
    ];
    addSMComponent("prices", "prices", resx);


    resx = ['sep-bottom-1',
        'sep-bottom-2',
        'sep-bottom-3',
        'sep-bottom-4',
        'sep-bottom-5',
        'sep-bottom-6',
        'sep-bottom-7',
        'sep-bottom-8',
        'sep-bottom-9',
        'sep-center-1',
        'sep-center-2',
        'sep-center-3',
        'sep-center-4',
        'sep-center-5',
        'sep-center-6',
        'sep-center-7',
        'sep-top-1',
        'sep-top-2',
        'sep-top-3',
        'sep-top-4',
        'sep-top-5',
        'sep-top-6',
        'sep-top-7',
        'sep-top-8',
    ];
    addSMComponent("separators", "separators", resx);


    resx = ['subscribe-block',
        'subscribe-field-2',
        'subscribe-field-3',
        'subscribe-field',
        'subscribe-halfbg-counter',
        'subscribe-halfbg-field',
        'subscribe-text-field',
        'subscribe-text-img',
    ];
    addSMComponent("subscription", "subscription", resx);


    resx = ['team-1col',
        'team-2col-2',
        'team-2col-3',
        'team-2col-4',
        'team-2col',
        'team-3col-2',
        'team-3col',
        'team-4col-2',
        'team-4col',
    ];
    addSMComponent("team", "team", resx);


    resx = ['testimonial-2col-2',
        'testimonial-2col',
        'testimonial-3col-2',
        'testimonial-3col-3',
        'testimonial-3col-4',
        'testimonial-3col-5',
        'testimonial-3col',
        'testimonial-4col',
        'testimonial-5col',
        'testimonial-carousel-2',
        'testimonial-carousel',
        'testimonial-single-2',
        'testimonial-single-3',
        'testimonial-single-4',
        'testimonial-single-5',
        'testimonial-single-6',
        'testimonial-single-7',
        'testimonial-single-carousel',
        'testimonial-single',
    ];
    addSMComponent("testimonials", "testimonials", resx);


    resx = ['text-1col',
        'text-2col-2',
        'text-2col-3',
        'text-2col-4',
        'text-2col-text-list',
        'text-2col',
        'text-3col-2',
        'text-3col-3',
        'text-3col-4',
        'text-3col-list',
        'text-3col',
        'text-4col-2',
        'text-4col-3',
        'text-4col'
    ];
    addSMComponent("text", "text", resx);


    //====================
    var body = {
        'type': 'pgblocks.body',
        'selector': 'body',
        'name': 'Body',
        //'display_name' : 'tag',
        //'priority' : 1000,
        not_main_type: true,
        'sections': {}
    }
    f.addComponentType(body);


    var takePhotos = function (list) {

        var resizeImage = function (file, w, h, new_file) {
            crsaResizeImage(file, w, h, new_file);
        }

        var url = f.getResourceUrl('../WeberBlocks/HTML Files/Skeleton File/photo.html');

        var gui = require('nw.gui');


        var current = 0;

        var preview_win = gui.Window.open(url, {
            width: 1024,
            height: 600
        });

        var chrome_width;
        var chrome_height;
        var $body;
        var $photo;

        var loaded = false;

        preview_win.on('loaded', function () {
            if (loaded) return;
            loaded = true;

            $body = $(preview_win.window.document.body);
            $photo = $body.find('#photo');

            var width = $body.width();
            chrome_width = preview_win.width - width;
            chrome_height = preview_win.height - $body.height();

            $body.removeAttr('style');
            $body.closest('html').removeAttr('style');

            var takePhoto = function () {
                $photo.html(list[current].code);
                console.log('SET - ' + list[current].type);

                if (list[current].take_photo_script) {
                    var scr = preview_win.window.document.createElement('script');
                    scr.async = false;
                    scr.text = list[current].take_photo_script;
                    $body.get(0).appendChild(scr);

                }

                setTimeout(function () {
                    var w = $photo.outerWidth(true);
                    w = 1024;
                    var h = $photo.outerHeight();
                    //preview_win.width = w + chrome_width;
                    preview_win.height = h + chrome_height;

                    console.log('PHOTO - ' + list[current].type);

                    preview_win.capturePage(function (buffer) {
                        var big_file = f.getResourceFile('images/' + list[current].type + '.jpg');
                        fs.writeFileSync(big_file, buffer);

                        resizeImage(big_file, parseInt(w / 1), parseInt(h / 1), big_file);
                        console.log('DONE - ' + list[current].type);
                        current++;
                        if (current < list.length) {
                            takePhoto();
                        }
                    }, {
                        format: 'jpg',
                        datatype: 'buffer'
                    });

                }, list[current].take_photo_delay || 1000);
            }

            takePhoto();
        })
    }
    //takePhotos( contacts );

    if (!wp && false) {
        var photo_list = [];
        for (var t in f.component_types) {
            photo_list.push(f.component_types[t]);
        }


        takePhotos(photo_list);
    }

    //Register starting page template
    f.addTemplateProjectFromResourceFolder('template', null, 1, function (node) {
        if (node.name == 'inc' && !wp) {
            node.required = false;
            return false;
        }
    });

    var toLocalPath = function (p) {
        return p.replace(/\//g, path.sep);
    }

    //add resources
/*
    var res_files = [
        'css',
        'fonts',
        'img',
        'js',
        'video',
        'fonts/lato.css ',
        'fonts/lora.css',
        'fonts/merriweather.css',
        'fonts/montserrat.css',
        'fonts/open-sans.css',
        'fonts/oswald.css',
        'fonts/playfair-display.css',
        'fonts/raleway.css',
        'fonts/roboto.css',
        'fonts/roboto-slab.css',
        'css/bootstrap.min.css',
        'css/flickity.css',
        'css/new.css',
        'css/last.css',
        'fonts/font-awesome.min.css',
        'fonts/material-design-iconic-font.min.css',
        'fonts/ionicons.min.css',
        'css/base.css',
        'css/styles.css',
        'js/jquery.min.js',
        'js/bootstrap.bundle.min.js',
        'js/flickity.js',
        'js/webfontloader.js',
        'js/main.js',
        'newx.js',
        'gulpfile.js'
    ];
*/

    var res_files = [
        'css',
        'fonts',
        'img',
        'js',
        'video',
        'fonts/lato.css ',
        'fonts/lora.css',
        'fonts/merriweather.css',
        'fonts/montserrat.css',
        'fonts/open-sans.css',
        'fonts/oswald.css',
        'fonts/playfair-display.css',
        'fonts/raleway.css',
        'fonts/roboto.css',
        'fonts/roboto-slab.css',
        'css/bootstrap.min.css',
        'css/flickity.css',
        'css/new.css',
        'css/last.css',
        'fonts/font-awesome.min.css',
        'fonts/material-design-iconic-font.min.css',
        'fonts/ionicons.min.css',
        'css/base.css',
        'css/styles.css',
        'js/jquery.min.js',
        'js/bootstrap.bundle.min.js',
        'js/flickity.js',
        'js/webfontloader.js',
        'js/main.js',
        'newx.js',
        'gulpfile.js',
        'css/fonts.css',
'css/bootstrap.weber.css',
'css/fx.css',
'css/owl.carousel.css',
'css/magnific-popup.css',
'css/bootstrap-datepicker.css',
'css/aos.css',
'css/custom.css',
'css/page.css',
];

    for (var i = 0; i < res_files.length; i++) {
        var file = f.getResourceFile('template/' + res_files[i]);
        var r = new PgComponentTypeResource(file);
        r.relative_url = res_files[i];
        r.source = toLocalPath(file);
        r.footer = res_files[i].indexOf('.js') >= 0;
        f.resources.add(r);
    }

    var res = new PgComponentTypeResource('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
    res.type = 'text/css';
    f.resources.add(res);

    f.resources.description = "CSS and JS files needed for Z Weber to work. Placeholder images.";

    if (wp) {
        var res_files = ['inc'];
        for (var i = 0; i < res_files.length; i++) {
            var file = f.getResourceFile('template/' + res_files[i]);
            var r = new PgComponentTypeResource(file);
            r.relative_url = res_files[i];
            r.source = toLocalPath(file);
            r.footer = res_files[i].indexOf('.js') >= 0;
            f.resources.add(r);
        }

    }

    source_cache = {};

}

$(function () {

    //Wait for Pinegrow to wake-up
    $('body').one('pinegrow-ready', function (e, pinegrow) {
//        alert(1);
        createZWeberPlugin(true, pinegrow);
//        alert(3);

    });
});