function createZPlatformaPlugin(wp, pinegrow) {
    //Create new Pinegrow framework object
    var type_prefix = 'pg.zplatforma';

    var f = new PgFramework(type_prefix, 'Z Platforma');

    //This will prevent activating multiple versions of the plugin, provided that other versions set the same type
    f.allow_single_type = true;
    f.type = type_prefix;


    var terms = '<br><small class="text-muted">TERMS OF USE: <b>You can use Z Platforma</b> to build and deploy websites for yourself and your clients, free or paid, as many as you want. <b>You can NOT use Z Platforma</b> to create templates and themes that you then sell in template marketplaces or give away for free.</small>';

    f.author = 'Z Platforma @ Semih MEMIS';
    f.author_link = 'https://semihmemis.com';
    //f.info_badge = 'New';

    f.setScriptFileByScriptTagId('plugin-pg-zplatforma');


    //Don't show these files in CSS tab
    f.ignore_css_files = [/font\-awesome/i];

    f.detect = function (pgPage) {
        return false;
    }

    var fs = require('fs');
    var path = require('path');

    var source_relative = 'code/';

    //Tell Pinegrow about the framework
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
            //            var key = selector.replace('.', '') + suff;
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
            c.preview_image = c.type.replace('.wp.', '.') + '.png';
            c.button_image = c.preview_image;

            c.tags = 'block';

            var bck_el = pgel.findOne('.background-image-holder');
            if (bck_el) {
                addBackgroundControl(c, '.background-image-holder');
            }

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

    var addBackgroundControl = function (c, selector) {
        c.sections[c.type + '.bck'] = {
            name: 'Background image',
            fields: {
                'pg.zplatforma.bck.image': {
                    type: 'image',
                    name: 'Image',
                    action: 'custom',
                    get_value: function (pgel) {

                        if (selector) pgel = pgel.findOne(selector);
                        if (pgel) {
                            var style = pgel.getAttr('style');
                            if (style) {
                                var m = style.match(/background\-image\:\s*url\(([^\)]*)\)\;?/);
                                if (m) {
                                    var url = m[1].replace(/['"]/g, '');
                                    return url;
                                }
                            }
                        }
                        return null;
                    },
                    set_value: function (pgel, value, values, oldValue, eventType) {

                        if (selector) pgel = pgel.findOne(selector);
                        if (pgel) {
                            var style = pgel.getAttr('style') || '';

                            style = style.replace(/background\-image\:\s*url\([^\)]*\)\;?/, '');
                            if (value) {
                                style += 'background-image:url(\'' + value + '\');';
                            }
                            pgel.setAttr('style', style);
                        }
                        return value;
                    }
                },
                'pg.zplatforma.bck.cover': {
                    type: 'checkbox',
                    name: 'Image covers area',
                    action: 'apply_class',
                    value: 'bg-image-cover'
                }
            }
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

    function addSMComponent(name, nick, selectorPrefix, count) {
        var comps = [];
        var countText = "";
        for (var i = 1; i <= count; i++) {
            (function (i) {
                countText = i;
                addTo(comps, f.pgbCreateComponent('index.html', selectorPrefix + '-' + countText, name + ' ' + countText, function (pgel, c) {
                    addBackgroundControl(c);
                }));
            })(i);
        }

        pgbAddSection(nick, name + ' Blocks', comps);

    }

    //addSMComponent("","", ".",);

    addSMComponent("Blog", "blog", "#blogs", 16);
    addSMComponent("Call To Action", "call", "#call-to-actions", 10);
    addSMComponent("Contacts", "contacts", "#contacts", 10);
    addSMComponent("Content", "content", "#contents", 23);
    addSMComponent("Ecommerce", "ecommerce", "#ecommerces", 7);
    addSMComponent("Feature", "feature", "#features", 22);
    addSMComponent("Footer", "footer", "#footers", 19);
    addSMComponent("Form", "form", "#forms", 11);
    addSMComponent("Grid", "grid", "#grids", 10);
    addSMComponent("Header", "header", "#headers", 19);
    addSMComponent("Portfolio", "portfolio", "#portfolio", 8);
    addSMComponent("Price", "price", "#prices", 10);
    addSMComponent("Slider", "slider", "#sliders", 10);
    addSMComponent("Team", "team", "#teams", 9);
    addSMComponent("Testimonials", "testimonials", "#testimonials", 15);



    var sccomps = [];

    function addShortCodeComponent(name, selector, opt, yn) {
        //	console.warn(name + " - " + selector);
        addTo(
            sccomps,
            f.pgbCreateComponent(
                'index.html',
                selector,
                name,
                function (pgel, c) {
                    //				if (yn) {
                    //					addOptionsControl(c,opt);
                    //				}
                }
            )
        );
    }


    //addShortCodeComponent("", ".x");


    addShortCodeComponent("Icon 1", ".xi1", "", false);
    addShortCodeComponent("Icon 2", ".xi2", "", false);
    addShortCodeComponent("Icon 3", ".xi3", "", false);
    addShortCodeComponent("Icon 4", ".xi4", "", false);
    addShortCodeComponent("Icon 5", ".xi5", "", false);
    addShortCodeComponent("Icon 6", ".xi6", "", false);
    addShortCodeComponent("Icon 7", ".xi7", "", false);
    addShortCodeComponent("Icon 8", ".xi8", "", false);
    addShortCodeComponent("Icon 9", ".xi9", "", false);
    addShortCodeComponent("Icon 10", ".xi10", "", false);
    addShortCodeComponent("Icon 11", ".xi11", "", false);
    addShortCodeComponent("Icon 12", ".xi12", "", false);
    addShortCodeComponent("Icon 13", ".xi13", "", false);
    addShortCodeComponent("Icon 14", ".xi14", "", false);


    addShortCodeComponent("Progressbar Circle", ".xpb1", "progressbar-options", true);
    addShortCodeComponent("Progressbar Semi Circle", ".xpb2", "progressbar-options", true);
    addShortCodeComponent("Progressbar Line", ".xpb3", "progressbar-options", true);

    addShortCodeComponent("CounterUp", ".xcu1", "counterup-options", true);

    addShortCodeComponent("Count Down", ".xcd1", "countdown-options", true);
    addShortCodeComponent("Count Down 2", ".xcd2", "countdown-options", true);
    addShortCodeComponent("Count Down 3", ".xcd3", "countdown-options", true);

    addShortCodeComponent("Parallax 1", ".xp1", "jarallax-options", true);
    addShortCodeComponent("Parallax 2", ".xp2", "jarallax-options", true);
    addShortCodeComponent("Parallax 3", ".xp3", "jarallax-options", true);
    addShortCodeComponent("Parallax 4", ".xp4", "jarallax-options", true);
    addShortCodeComponent("Parallax 5", ".xp5", "jarallax-options", true);
    addShortCodeComponent("Parallax 6", ".xp6", "jarallax-options", true);

    addShortCodeComponent("Google Maps", ".xgm1", "googlemaps-options", true);

    addShortCodeComponent("Media Youtube", ".xjp1", "plyr", true);
    addShortCodeComponent("Media Youtube 2", ".xjp2", "plyr", true);
    addShortCodeComponent("Media Local", ".xjp3", "plyr", true);
    addShortCodeComponent("Media Sound", ".xjp4", "plyr", true);

    addShortCodeComponent("Slider - Slick Slider", "#xss1", "slick-options", true);
    addShortCodeComponent("Slider - Swiper Slider", "#xsc1", "swiper-options", true);
    addShortCodeComponent("Slider - OWL Carousel", "#xowl1", "owlcarousel-options", true);

    addShortCodeComponent("Preloader", ".xpl1", "preloader-options", true);

    addShortCodeComponent("Animated", ".xa1", "animation-options", true);

    addShortCodeComponent("Gallery - Light Gallery", ".xlg1", "lightgallery-options", true);

    addShortCodeComponent("Gallery - Magnific Popup", ".xmp1", "magnificpopup-options", true);

    addShortCodeComponent("Gallery - Isotope", "#xisotope1", "isotope-options", true);

    addShortCodeComponent("Easy Tabs", ".xet1", "easytabs-options", true);


    pgbAddSection('xshortcode', 'ShortCode Blocks', sccomps);




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
    addBackgroundControl(body);
    f.addComponentType(body);


    var takePhotos = function (list) {

        var resizeImage = function (file, w, h, new_file) {
            crsaResizeImage(file, w, h, new_file);
        }

        var url = f.getResourceUrl('../PlatformaBlocks/HTML Files/Skeleton File/photo.html');

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
                        var big_file = f.getResourceFile('images/' + list[current].type + '.png');
                        fs.writeFileSync(big_file, buffer);

                        resizeImage(big_file, parseInt(w / 1), parseInt(h / 1), big_file);
                        console.log('DONE - ' + list[current].type);
                        current++;
                        if (current < list.length) {
                            takePhoto();
                        }
                    }, {
                        format: 'png',
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
    var res_files = [
        'css',
        'fonts',
        'img',
        'js',
        'video',
        'fonts/lato.css',
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
        'css/new.css',
        'css/last.css',
        'css/slick.css',
        'css/owl.carousel.min.css',
        'css/owl.theme.default.min.css',
        'fonts/font-awesome.min.css',
        'fonts/material-design-iconic-font.min.css',
        'fonts/ionicons.min.css',
        'css/swiper.min.css',
        'css/jarallax.css',
        'css/plyr.css',
        'css/animate.min.css',
        'css/magnific-popup.css',
        'css/jquery.smartmenus.bootstrap-4.css',
        'css/base.css',
        'css/styles.css',
        'css/flickity.css',
        'js/jquery-3.3.1.min.js',
        'js/bootstrap.bundle.min.js',
        'js/webfontloader.js',
        'js/slick.min.js',
        'js/owl.carousel.min.js',
        'js/lightbox.min.js',
        'js/isotope.pkgd.min.js',
        'js/swiper.min.js',
        'js/jarallax.min.js',
        'js/jarallax-video.min.js',
        'js/jarallax-element.min.js',
        'js/plyr.js',
        'js/jquery.lazyLoadGoogleMaps.js',
        'js/jquery.waypoints.min.js',
        'js/jquery.counterup.min.js',
        'js/countdown.min.js',
        'js/progressbar.min.js',
        'js/jquery.scrollUp.min.js',
        'js/jquery.smooth-scroll.min.js',
        'js/jquery.easing.js',
        'js/jquery.fitvids.js',
        'js/jquery.magnific-popup.min.js',
        'js/imagesloaded.pkgd.min.js',
        'js/lightgallery-all.min.js',
        'js/jquery.easytabs.min.js',
        'js/jquery.smartmenus.min.js',
        'js/jquery.smartmenus.bootstrap-4.min.js',
        'js/flickity.js',
        'js/main.js',
        'js/scripts.js',
        'newx.js',
        'gulpfile.js'
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

    f.resources.description = "CSS and JS files needed for Z Platforma to work. Placeholder images.";

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
        //alert(1);
        createZPlatformaPlugin(true, pinegrow);
        //alert(3);

    });
});