function createZSlickPlugin(wp, pinegrow) {
    //Create new Pinegrow framework object
    var type_prefix = 'pg.zslick';

    var f = new PgFramework(type_prefix, 'Z Slick');

    //This will prevent activating multiple versions of the plugin, provided that other versions set the same type
    f.allow_single_type = true;
    f.type = type_prefix;


    var terms = '<br><small class="text-muted">TERMS OF USE: <b>You can use Z Slick</b> to build and deploy websites for yourself and your clients, free or paid, as many as you want. <b>You can NOT use Z Slick</b> to create templates and themes that you then sell in template marketplaces or give away for free.</small>';

    f.author = 'Z Slick @ Semih MEMIS';
    f.author_link = 'https://semihmemis.com';
    //f.info_badge = 'New';

    f.setScriptFileByScriptTagId('plugin-pg-zslick');


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
            c.preview_image = c.type.replace('.wp.', '.') + '.jpg';
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
                'pg.zslick.bck.image': {
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
                'pg.zslick.bck.cover': {
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

    addSMComponent("Call To Action", "cta", "#cta", 21);
    addSMComponent("Contact", "contact", "#contact", 6);
    addSMComponent("Content", "content", "#content", 28);
    addSMComponent("Features", "features", "#features", 22);
    addSMComponent("Footer", "footer", "#footer", 13);
    addSMComponent("Forms", "forms", "#forms", 14);
    addSMComponent("Gallery", "gallery", "#gallery", 3);
    addSMComponent("Header", "header", "#header", 17);
    addSMComponent("Navigation", "navigation", "#navigation", 28);
    addSMComponent("Partners", "partners", "#partners", 4);
    addSMComponent("Pricing", "pricing", "#pricing", 7);
    addSMComponent("Team", "team", "#team", 5);
    addSMComponent("Testimonials", "testimonials", "#testimonials", 4);



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

        var url = f.getResourceUrl('../SlickBlocks/HTML Files/Skeleton File/photo.html');

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
                        var big_file = f.getResourceFile('assets/images/screenshots/blocks/' + list[current].type + '.jpg');
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
        'assets/css',
        'assets/images',
        'assets/js',
        'assets/lib',
        'assets/videos',
        'assets/lib/bootstrap/dist/css/bootstrap.min.css',
        'assets/css/style.css',
        'assets/css/custom.css',
        'assets/lib/jquery/dist/jquery.min.js',
        'js/popper.min.js',
        'assets/lib/bootstrap/dist/js/bootstrap.min.js',
        'assets/js/core.js',
        'assets/js/main.js',
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

    f.resources.description = "CSS and JS files needed for Z Slick to work. Placeholder images.";

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
        createZSlickPlugin(true, pinegrow);
        //alert(3);

    });
});