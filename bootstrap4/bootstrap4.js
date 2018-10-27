$(function() {

    $('body').one('pinegrow-ready', function(e, pinegrow) {
        var f = new PgFramework('bs4', 'Bootstrap 4');
        f.type = "bootstrap";
        f.allow_single_type = true;

        f.description = '<a href="http://getbootstrap.com/">Bootstrap 4</a> starting pages and components. Templates are based on Bootstrap 4.1.3.';
        f.author = 'Pinegrow';
        f.author_link = 'http://pinegrow.com';

        f.ignore_css_files = [/(^|\/)bootstrap\.(css|less)/i, /(^|\/)bootstrap\.min\.(css|less)/i, /(^|\/)font(\-|)awesome(\.min|)\.(css|less)/i];

        f.detect_async = function (crsaPage, done) {
            crsaPage.stylesheetsThatContain(/bootstrap\sv4/i, /bootstrap(\.min|)\.(css|less)/i, function(list) {
                done(list.length > 0)
            });
        }

        var getBootstrapVersionForPage = function(page) {
            if(force_bs_version != 'auto') {
                setCurrentBsVersion( parseFloat(force_bs_version));
                return;
            }
            if(page.data.bootstrapVersion) {
                setCurrentBsVersion(page.data.bootstrapVersion);
                //console.log('bs version = ' + current_bs_version);
            } else {
                page.stylesheetsThatContain(/bootstrap\sv(4[0-9\.]*)/i, /bootstrap(\.min|)\.(css|less)/i, function (list, matches, async) {
                    if(list.length > 0) {
                        var a = matches[0][1].split('.');
                        var version = parseFloat(a[0]);
                        if (a.length > 1) {
                            version += parseFloat(a[1]) / 10.0;
                        }
                        setCurrentBsVersion(version);
                        page.data.bootstrapVersion = version;
                        if (async) {
                            pinegrow.selectedElements.reselect(); //trigger update
                        }
                        console.log('bs version = ' + current_bs_version + ' ' + async);
                    }
                });
            }
        }

        var reqVersion = function(min_ver) {
            return current_bs_version >= min_ver;
        }

        f.setScriptFileByScriptTagId('plugin-bootstrap-4-mt'); //get url if script is included directly into edit.html

        var bs_version = 4.1;
        var current_bs_version;

        var setCurrentBsVersion = function(ver) {
            current_bs_version = ver;
            f.name_short = 'Bootstrap ' + ver;
        }

        setCurrentBsVersion(bs_version);

        var force_bs_version = pinegrow.getSetting('bs4-force-version', 'auto');
        if(force_bs_version != 'auto') {
            setCurrentBsVersion(parseFloat(force_bs_version));
        }

        pinegrow.addFramework(f, 3);

        var prefix = 'bs4.';

        var num_columns = parseInt(pinegrow.getSetting('bootstrap-col-num', '12')) || 12;
        var sizes = ["xs", "sm", "md", "lg", "xl"];
        var sizes_names = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
        var sizes_breakpoints = [0, 576, 768, 992, 1200];
        var sizes_view_sizes = [320, 640, 768, 1024, 1280];
        var sizes_icons = ['icon-Xs', 'icon-IPAD', 'icon-tableta-lezeca', 'icon-ikone100--copy_laptop', 'icon-Lg'];

        var size_for_all = sizes[0];

        var sizes_breakpoints_map = {};
        for(var i = 0; i < sizes.length; i++) {
            sizes_breakpoints_map[sizes[i]] = sizes_breakpoints[i];
        }

        var isColumn = function(pgel) {
            if(pgel.tagName == 'div') {
                if(pgel.parent && pgel.parent.isSelector('.row,.form-row') && !pgel.hasClass('row')) return true;
                if(pgel.getData(prefix + 'was-column')) return true;
            }
            if(pgel.tagName == 'label') return false;
            var cls = pgel.getAttr('class');
            if(cls) {
                if(cls.match(/(\s|^)col($|[\-\s])/i)) return true; //handle .col as well
            }
            return false;
        }

        var isContainer = function(pgel) {
            return pgel.hasClass('container') || pgel.hasClass('container-fluid')
        }

        var bs_options = {
            num_columns: num_columns,
            sizes: sizes,
            sizes_breakpoints: sizes_breakpoints,
            sizes_breakpoints_map: sizes_breakpoints_map,
            sizes_view_sizes: sizes_view_sizes,
            sizes_icons: sizes_icons,
            size_for_all: size_for_all,
            sizes_names: sizes_names,
            prefix: prefix,
            col_prefix_class: 'col',
            isColumn: isColumn,
            onClickOnColumnPoint: function() {
                var q = PgQuickProperties([def_all.sections[this.options.prefix + 'columns']], this.menu.pgel, this.$element, 'Column size &amp; order', 300);
            }
        }

        var gh = PgBootstrapHelpers(bs_options, f, 4);




        var bm = new PgToggleButtonMaker();

        var getBootstrapColor = function (type) {
            switch (type) {
                case 'white':
                    return '#fff';
                case 'light':
                    return '#f8f9fa';
                case 'dark':
                    return '#343a40';
                case 'primary':
                    return '#337ab7';
                case 'secondary':
                    return '#868e96';
                case 'info':
                    return '#5bc0de';
                case 'success':
                    return '#5cb85c';
                case 'warning':
                    return '#f0ad4e';
                case 'danger':
                    return '#d9534f';
                case 'muted':
                    return '#777';
                default:
                    return '#fff';
            }
        }

        var getButtonTypeToggleButton = function(type, title) {
            var attr = {}
            if (title) attr.title = title;

            if(type == 'link') {
                return bm.makeColor(null, 'T', {
                    'text-decoration': 'underline',
                    'attributes': attr
                });
            } else {
                var text_color = type == 'light' ? '#333' : '#fff';
                return bm.makeColor(getBootstrapColor(type), '', {
                    'color': text_color,
                    'attributes': attr
                });
            }
        }

        var bgColorOptions = [
            {'key' : 'bg-white',     'name' : 'White',     html: getButtonTypeToggleButton('white',     'White')},
            {'key' : 'bg-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light',     'Light')},
            {'key' : 'bg-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark',      'Dark')},
            {'key' : 'bg-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary',   'Primary')},
            {'key' : 'bg-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary', 'Secondary')},
            {'key' : 'bg-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success',   'Success')},
            {'key' : 'bg-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info',      'Info')},
            {'key' : 'bg-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning',   'Warning')},
            {'key' : 'bg-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger',    'Danger')}
        ];

        var borderColorOptions = [
            {'key' : 'border-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light')},
            {'key' : 'border-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark')},
            {'key' : 'border-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary')},
            {'key' : 'border-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary')},
            {'key' : 'border-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success')},
            {'key' : 'border-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info')},
            {'key' : 'border-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning')},
            {'key' : 'border-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger')}
        ]

        var columnPlaceMsg = 'Put <b>Column</b> in a <b>Row</b>. If you want to put it somewhere else, drop it on the tree.';






        //all section and field keys should be prefixed by prefix bs4.
        var addPrefixToSectionsAndFields = function (sections) {
            return gh.addPrefixToSectionsAndFields(sections);
        }

        var makeFieldLabelForSize = gh.makeFieldLabelForSize;

        ////
        var tooltipMsgShown = false,
            popoverMsgShown = false;

        var onTooltipsChanged = function(pgel) {
            gh.executeScriptInPageDelayed(pgel.getPage(), '$(\'[data-toggle="tooltip"]\').tooltip(\'dispose\');' + bsTooltipsSection._tooltipsCode);
        }

        var onTooltipsChangedRefresh = function(pgel) {
            pinegrow.showQuickMessage('Refresh the page to see the changes.', 2000, false, null, 5000);
        }

        var bsTooltipsSection = {
            name : 'Tooltip',
            _tooltipsCode: '$(function() {\n    $(\'[data-toggle="tooltip"]\').tooltip();\n})',
            _tooltipsMainCode: '$(\'[data-toggle="tooltip"]\').tooltip()',
            fields : {
                tooltip : {
                    'type' : 'checkbox',
                    'name' : 'Tooltip',
                    'value' : "1",
                    'action' : 'custom',
                    get_value: function(pgel) {
                        return pgel.attr('data-toggle') == 'tooltip';
                    },
                    set_value: function(pgel, value, values, oldValue, eventType) {
                        if(value) {
                            pgel.attr('data-toggle', 'tooltip');
                            pinegrow.askAboutAddingCodeToPage(pgel.getPage(), bsTooltipsSection._tooltipsCode, 'Enable Bootstrap tooltips', 'Bootstrap tooltips need to be enabled with the call to the .tooltip() function. The following code activates all tooltips on the page:', true, bsTooltipsSection._tooltipsMainCode);

                        } else {
                            if(pgel.attr('data-toggle') == 'tooltip') {
                                pgel.removeAttr('data-toggle');
                            }
                        }
                        onTooltipsChangedRefresh(pgel);
                        return value;
                    }
                },
                tooltptext : {
                    type: 'text',
                    name: 'Text',
                    live_update : true,
                    'action' : 'custom',
                    get_value: function(pgel) {
                        var t = pgel.attr('title');
                        if(!t || t.length == 0) {
                            t = pgel.attr('data-original-title');
                        }
                        return t;
                    },
                    set_value: function(pgel, value, values, oldValue, eventType) {
                        if(value) {
                            pgel.attr('title', value);
                            if(pgel.attr('data-original-title')) {
                                pgel.attr('data-original-title', value);
                            }
                        } else {
                            pgel.removeAttr('title');
                            pgel.removeAttr('data-original-title');
                        }
                        return value;
                    },
                    on_changed : function(pgel, prop, value, oldValue) {
                        if(!oldValue) {
                            onTooltipsChangedRefresh(pgel)
                        } else {
                            onTooltipsChanged(pgel)
                        }
                    }
                },
                tooltipos : {
                    type: 'select',
                    name: 'Placement',
                    action: 'element_attribute',
                    attribute : 'data-placement',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'top', 'name' : 'Top'},
                        {'key' : 'right', 'name' : 'Right'},
                        {'key' : 'bottom', 'name' : 'Bottom'},
                        {'key' : 'left', 'name' : 'Left'},
                        {'key' : 'auto top', 'name' : 'Auto top'},
                        {'key' : 'auto right', 'name' : 'Auto right'},
                        {'key' : 'auto bottom', 'name' : 'Auto bottom'},
                        {'key' : 'auto left', 'name' : 'Auto left'}
                    ],
                    on_changed : onTooltipsChangedRefresh
                },
                tooltiphtml : {
                    type: 'checkbox',
                    name: 'Html',
                    action: 'element_attribute',
                    attribute: 'data-html',
                    value: 'true',
                    negvalue: 'false',
                    live_update : false,
                    on_changed : onTooltipsChangedRefresh
                },
                tooltiptrigger : {
                    type: 'select',
                    name: 'Trigger',
                    action: 'element_attribute',
                    attribute : 'data-trigger',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'click', 'name' : 'Click'},
                        {'key' : 'hover', 'name' : 'Hover'},
                        {'key' : 'focus', 'name' : 'Focus'},
                        {'key' : 'manual', 'name' : 'Manual'}
                    ],
                    on_changed : onTooltipsChangedRefresh
                },
                tooltpdelay : {
                    type: 'text',
                    name: 'Delay in ms',
                    action: 'element_attribute',
                    attribute: 'data-delay',
                    live_update : true,
                    on_changed : onTooltipsChangedRefresh
                },
                tooltpcontainer : {
                    type: 'text',
                    name: 'Container',
                    action: 'element_attribute',
                    attribute: 'data-container',
                    live_update : false,
                    on_changed : onTooltipsChangedRefresh
                },
                tooltipcode : {
                    'type' : 'button',
                    'action': 'button',
                    'name' : 'Enable tooltips on the page',
                    'func' : function(pgel, $button) {
                        pinegrow.makeChanges(pgel, 'Add tooltips code', function() {
                            pinegrow.addScriptCodeToPageIfNeeded(pgel.getPage(), bsTooltipsSection._tooltipsCode, 'Tooltips code', true /* execute */, bsTooltipsSection._tooltipsMainCode);
                        })
                    }
                }
            }
        }

        var onPopoversChanged = function(pgel) {
            gh.executeScriptInPageDelayed(pgel.getPage(), '$(\'[data-toggle="popover"]\').popover(\'dispose\');' + bsPopoverSection._popoversCode);
        }

        var bsPopoverSection = {
            name : 'Popover',
            _popoversCode: '$(function() {\n    $(\'[data-toggle="popover"]\').popover();\n})',
            _popoversMainCode: '$(\'[data-toggle="popover"]\').popover()',
            fields : {
                popover : {
                    'type' : 'checkbox',
                    'name' : 'Popover',
                    'value' : "1",
                    'action' : 'custom',
                    get_value: function(pgel) {
                        return pgel.attr('data-toggle') == 'popover';
                    },
                    set_value: function(pgel, value, values, oldValue, eventType) {
                        if(value) {
                            pgel.attr('data-toggle', 'popover');
                            pinegrow.askAboutAddingCodeToPage(pgel.getPage(), bsPopoverSection._popoversCode, 'Enable Bootstrap popovers', 'Bootstrap popovers need to be enabled with the call to the .popover() function. The following code activates all popovers on the page:', true, bsPopoverSection._popoversMainCode);
                        } else {
                            if(pgel.attr('data-toggle') == 'popover') {
                                pgel.removeAttr('data-toggle');
                            }
                        }
                        onTooltipsChangedRefresh(pgel);
                        return value;
                    }
                },
                popovertext : {
                    type: 'text',
                    name: 'Title',
                    'action' : 'custom',
                    get_value: function(pgel) {
                        var t = pgel.attr('title');
                        if(!t || t.length == 0) {
                            t = pgel.attr('data-original-title');
                        }
                        return t;
                    },
                    set_value: function(pgel, value, values, oldValue, eventType) {
                        if(value) {
                            pgel.attr('title', value);
                            if(pgel.attr('data-original-title')) {
                                pgel.attr('data-original-title', value);
                            }
                        } else {
                            pgel.removeAttr('title');
                            pgel.removeAttr('data-original-title');
                        }
                        return value;
                    },
                    on_changed : function(pgel, prop, value, oldValue) {
                        if(!oldValue) {
                            onTooltipsChangedRefresh(pgel)
                        } else {
                            onPopoversChanged(pgel)
                        }
                    }
                },
                popovercontent : {
                    type: 'text',
                    name: 'Content',
                    action: 'element_attribute',
                    attribute: 'data-content',
                    on_changed : onPopoversChanged
                },
                popoverpos : {
                    type: 'select',
                    name: 'Placement',
                    action: 'element_attribute',
                    attribute : 'data-placement',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'top', 'name' : 'Top'},
                        {'key' : 'right', 'name' : 'Right'},
                        {'key' : 'bottom', 'name' : 'Bottom'},
                        {'key' : 'left', 'name' : 'Left'},
                        {'key' : 'auto top', 'name' : 'Auto top'},
                        {'key' : 'auto right', 'name' : 'Auto right'},
                        {'key' : 'auto bottom', 'name' : 'Auto bottom'},
                        {'key' : 'auto left', 'name' : 'Auto left'}
                    ],
                    on_changed : onTooltipsChangedRefresh
                },
                popoverhtml : {
                    type: 'checkbox',
                    name: 'Html',
                    action: 'element_attribute',
                    attribute: 'data-html',
                    value: 'true',
                    negvalue: 'false',
                    live_update : false,
                    on_changed : onTooltipsChangedRefresh
                },
                popovertrigger : {
                    type: 'select',
                    name: 'Trigger',
                    action: 'element_attribute',
                    attribute : 'data-trigger',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'click', 'name' : 'Click'},
                        {'key' : 'hover', 'name' : 'Hover'},
                        {'key' : 'focus', 'name' : 'Focus'},
                        {'key' : 'manual', 'name' : 'Manual'}
                    ],
                    on_changed : onTooltipsChangedRefresh
                },
                popoverdelay : {
                    type: 'text',
                    name: 'Delay in ms',
                    action: 'element_attribute',
                    attribute: 'data-delay',
                    live_update : false,
                    on_changed : onTooltipsChangedRefresh
                },
                popovercontainer : {
                    type: 'text',
                    name: 'Container',
                    action: 'element_attribute',
                    attribute: 'data-container',
                    live_update : false,
                    on_changed : onTooltipsChangedRefresh
                },
                popovercode : {
                    'type' : 'button',
                    'action': 'button',
                    'name' : 'Enable popovers on the page',
                    'func' : function(pgel, $button) {
                        pinegrow.makeChanges(pgel, 'Add popovers code', function() {
                            pinegrow.addScriptCodeToPageIfNeeded(pgel.getPage(), bsPopoverSection._popoversCode, 'Popovers code', true /* execute */, bsPopoverSection._popoversMainCode);
                        })
                    }
                }
            }
        }

        var bsDataTarget = {
            type: 'text',
            name: 'Data target',
            type: 'text',
            live_update: true,
            action : 'custom',
            get_value: function(pgel) {
                return pgel.attr('data-target');
            },
            set_value: function(pgel, value, values, oldValue, eventType) {
                if(value) {
                    pgel.attr('data-target', value);
                } else {
                    pgel.removeAttr('data-target');
                }
                showJavascriptMessage();
                return value;
            }
        }

        var bsDataToggle = {
            type: 'select',
            name: 'Data toggle',
            live_update: false,
            show_empty: true,
            options : [
                {key : 'dropdown', name : 'Dropdown' },
                {key : 'modal', name : 'Modal' },
                {key : 'tab', name : 'Tab' },
                {key : 'pill', name : 'Pill' },
                {key : 'tooltip', name : 'Tooltip' },
                {key : 'popover', name : 'Popover' },
                {key : 'button', name : 'Button' },
                {key : 'buttons', name : 'Buttons' },
                {key : 'collapse', name : 'Collapse' },
                {key : 'popover', name : 'Popover' }
            ],
            action : 'custom',
            get_value: function(pgel) {
                return pgel.attr('data-toggle');
            },
            set_value: function(pgel, value, values, oldValue, eventType) {
                if(value) {
                    pgel.attr('data-toggle', value);
                } else {
                    pgel.removeAttr('data-toggle');
                }
                showJavascriptMessage();
                return value;
            }
        }

        var button_group_size = {
            type: 'select',
            action: 'apply_class',
            show_empty: true,
            name: 'Size',
            options: [
                {key: 'btn-group-lg', name: "Large"},
                {key: 'btn-group-sm', name: "Small"}
            ]
        }


        //f.default = true;

        var getPlaceholderImage = function () {
            return pinegrow.getPlaceholderImage();
        }


        var showJavascriptMessage = function () {
        }




        //Return a function that will create the control
        var getGridControlFactory = function(control_id, rows) {
            //Returns function that creates the control
            return function() {
                //will keep helper functions and vars private

                //Create control, needs a unique id
                var c = new PgCustomPropertyControl(prefix + control_id);

                //Register subfields.
                c.onDefine = function () {

                    //These fields will not be shown when just registered. This is neccessary to get values.
                    for (var n = 0; n < rows.length; n++) {
                        for (var m = 0; m < sizes.length; m++) {
                            var field = prefix + rows[n].field_prefix + '.' + sizes[m];
                            this.registerInputField(field, createFieldDef(rows[n], sizes[m]))
                        }
                    }
                }

                //Show control. Return the control $el.
                c.onShow = function () {
                    var $table = $("<table/>", {class: 'grid-control columns-control six-col-grid'});
                    var html = '<td></td>';
                    sizes.forEach(function(size) {
                        html += '<td><label class="grid-control-size">' + size + '</label></td>';
                    })
                    var $row = $("<tr/>").html(html).appendTo($table);

                    for (var n = 0; n < rows.length; n++) {
                        $row = $("<tr/>", {class: ''}).appendTo($table);
                        var $td = $("<td/>").html('<label>' + rows[n].name + '</label>').appendTo($row);

                        for (var m = 0; m < sizes.length; m++) {
                            $td = $("<td/>").appendTo($row);
                            var field = prefix + rows[n].field_prefix + '.' + sizes[m];
                            this.showInputField($td, field, createFieldDef(rows[n], sizes[m]));
                        }
                    }
                    return $table;
                }

                //Called when control is recycled and new values are set
                c.onSetValues = function () {
                    //Nothing to do in this case. PG will take care of updating sub fields with new values
                }

                //Helper functions and vars

                var createFieldDef = function(row, size) {
                    var size_part = (size == size_for_all) ? '' : ('-' + size);
                    var base = row.class_prefix + size_part;
                    var span_select = {
                        'type': 'select',
                        'name': null,
                        'action': 'apply_class',
                        draggable_list : true,
                        'show_empty': true,
                        'options': [],
                        'on_changed' : function(pgel, prop, value) {
                            pgel.setData(prefix + 'was-column', true);
                            if(value) {
                                if(!pgel.parent.hasClass('row')) {
                                    pinegrow.showAlert('<p>Column must have a Row parent element.</p><p>Would you like to add a Row?</p>', 'Every Column needs a Row', 'No', 'Yes, add a Row', null, function() {
                                        if(!pgel.isDeleted) {
                                            var row = pgCreate('<div class="row"></div>');
                                            row.insertBefore(pgel);
                                            row.append(pgel);
                                            pinegrow.showQuickMessage('Parent Row added.');
                                        }
                                    })
                                }
                            }
                        }
                    }
                    row.values.forEach(function(d) {
                        span_select.options.push({key: base + d.key, name: d.name});
                    })
                    return span_select;
                }

                //Return the control
                return c;
            };
        }

        var column_span_values = [
            {key: '', name: 'Distribute'},
            {key: '-auto', name: 'Auto'}
        ]
        var order_values = [
        ]
        var offset_values = [
        ]
        for (var i = 0; i <= num_columns; i++) {
            if (i == 0) {
                order_values.push({key: '-first', name: 'First'});
            }
            else {
                column_span_values.push({key: '-' + i, name: i});
                order_values.push({key: '-' + i, name: i});
            }

            if (i != num_columns) {
                offset_values.push({key: '-' + i, name: i});
            }
        }


        var columns_section_def = {
            name : "Columns",
            fields : {
                layout_control: {
                    type: 'custom',
                    name: 'layout_control',
                    action: 'none',
                    control: getGridControlFactory('column-span', [
                        {
                            field_prefix: 'col',
                            class_prefix: 'col',
                            values: column_span_values,
                            name: 'Size'
                        },
                        {
                            field_prefix: 'order',
                            class_prefix: 'order',
                            values: order_values,
                            name: 'Order'
                        },
                        {
                            field_prefix: 'offset',
                            class_prefix: 'offset',
                            values: offset_values,
                            name: 'Offset'
                        }
                    ])
                }
            }
        };

        var def_column = new PgComponentType(prefix + 'column', 'Column', {
            tags: 'major',
            selector : isColumn,
            parent_selector: '.row',
            code : '<div class="col-md-4"><h3>Column title</h3>\
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
            </div>',
            empty_placeholder : true,
            name : 'Column',
            sections : addPrefixToSectionsAndFields({
                columns : columns_section_def
            })
        });
        f.addComponentType(def_column);



        //Return a function that will create the control
        var getDevicesControlFactory = gh.getDevicesControlFactory;





        //Return a function that will create the control
        var getDevicesMarginAndPaddingControlFactory = gh.getDevicesMarginAndPaddingControlFactory;


        //Add device selector on prop sections with multi-device controls
        var onSectionWithDevicesControlsShown = gh.onSectionWithDevicesControlsShown;


        var getGridPreview = function(t) {
            var colcont = '<div style="height:60px;background:#eee;"></div>';

            var sel = 'border:2px solid #0098cc;';
            var conts, rows, cols;
            conts = rows = cols = '';

            switch(t) {
                case 'container':
                    conts = sel;
                    break;
                case 'row':
                    rows = sel;
                    break;
                case 'column':
                    cols = sel;
                    break;
            }

            return '<div class="container-fluid" style="' + conts + '">\
                <div class="row" style="' + rows + '">\
                    <div class="col-4" style="' + cols + '">' + colcont + '</div>\
                    <div class="col-4">' + colcont + '</div>\
                    <div class="col-4">' + colcont + '</div>\
                </div>\
                <div class="row" style="margin-top:12px;">\
                    <div class="col-4">' + colcont + '</div>\
                    <div class="col-4">' + colcont + '</div>\
                    <div class="col-4">' + colcont + '</div>\
                </div>\
            </div>';
        }


        var margin_span_values = [{key: '-auto', name: 'Auto'}];

        var margin_values = 5;
        for(var i = 0; i <= margin_values; i++) {
            margin_span_values.push({key: '-' + i, name: i});
        }


        //Add BS common sections to all elements
        var def_all = new PgComponentType(prefix + 'all', 'All elements', {
            selector : function(pgel) { return true },
            name : 'Div',
            display_name : 'tag',
            priority : 2001,
            sections : addPrefixToSectionsAndFields({
                textalign : {
                    name : "Layout",
                    on_section_shown : onSectionWithDevicesControlsShown,
                    fields: {
                        bstextalign : {
                            type: 'custom',
                            name: 'text_align',
                            action: 'none',
                            control: getDevicesControlFactory('text.align', 'Text Align', function(size, size_token) {
                                var base = 'text' + size_token + '-';

                                var field = {
                                    'type' : 'select',
                                    'name' : makeFieldLabelForSize('Text align', size),
                                    'action' : 'apply_class',
                                    'show_empty' : true,
                                    'toggle_buttons' : true,
                                    'options' : [
                                        { 'key' : base + 'left',    'name' : 'Left',    'html' : bm.makeIcon('align-left')   },
                                        { 'key' : base + 'center',  'name' : 'Center',  'html' : bm.makeIcon('align-center') },
                                        { 'key' : base + 'right',   'name' : 'Right',   'html' : bm.makeIcon('align-right')  },
                                        { 'key' : base + 'justify', 'name' : 'Justify', 'html' : bm.makeIcon('align-full')   }
                                    ]
                                }

                                return field;
                            })
                        },
                        divfloat : {
                            type: 'custom',
                            name: 'Float',
                            action: 'none',
                            control: getDevicesControlFactory('float', 'Float', function(size, size_token) {
                                var base = 'float' + size_token + '-';

                                var field = {
                                    'type' : 'select',
                                    'name' : makeFieldLabelForSize('Float', size),
                                    'action' : 'apply_class',
                                    'show_empty' : true,
                                    'toggle_buttons' : true,
                                    'options' : [
                                        { 'key' : base + 'none',  'name' : 'None',  'html' : bm.makeIcon('float',       { attributes: { 'title': 'None'  } }) },
                                        { 'key' : base + 'left',  'name' : 'Left',  'html' : bm.makeIcon('float-left"', { attributes: { 'title': 'Left'  } }) },
                                        { 'key' : base + 'right', 'name' : 'Right', 'html' : bm.makeIcon('float-right', { attributes: { 'title': 'Right' } }) }
                                    ]
                                }

                                return field;
                            })
                        },
                        divdisplay : {
                            type: 'custom',
                            name: 'Display',
                            action: 'none',
                            control: getDevicesControlFactory('display', 'Display', function(size, size_token) {
                                var base = 'd' + size_token + '-';

                                var field = {
                                    'type' : 'select',
                                    'name' : makeFieldLabelForSize('Display', size),
                                    'action' : 'apply_class',
                                    'show_empty' : true,
                                    'options' : [
                                        { 'key' : base + 'none',         'name' : 'None' },
                                        { 'key' : base + 'inline',       'name' : 'Inline' },
                                        { 'key' : base + 'inline-block', 'name' : 'Inline block' },
                                        { 'key' : base + 'block',        'name' : 'Block' },
                                        { 'key' : base + 'table',        'name' : 'Table' },
                                        { 'key' : base + 'table-row',    'name' : 'Table row' },
                                        { 'key' : base + 'table-cell',   'name' : 'Table cell' },
                                        { 'key' : base + 'flex',         'name' : 'Flex' },
                                        { 'key' : base + 'inline-flex',  'name' : 'Inline flex' },
                                    ]
                                }

                                return field;
                            })
                        }
                    }
                },
                'textcontext' : {
                    name: 'Text',
                    compact: true,
                    default_closed: false,
                    fields: {
                        bsemphasis40: {
                            'type' : 'select',
                            'name' : 'Text',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'toggle_buttons' : true,
                            'options' : function() {
                                var list = [
                                    { 'key' : 'text-muted',     'name' : 'Muted',     'html' : bm.makeColorText( getBootstrapColor('muted'),     { attributes: {title: 'Muted'}     }) },
                                    { 'key' : 'text-white',     'name' : 'White',     'html' : bm.makeColorText( getBootstrapColor('white'),     { attributes: {title: 'White'}     }) },
                                    { 'key' : 'text-light',     'name' : 'Light',     'html' : bm.makeColorText( getBootstrapColor('light'),     { attributes: {title: 'Light'}     }) },
                                    { 'key' : 'text-dark',      'name' : 'Dark',      'html' : bm.makeColorText( getBootstrapColor('dark'),      { attributes: {title: 'Dark' }     }) },
                                    { 'key' : 'text-primary',   'name' : 'Primary',   'html' : bm.makeColorText( getBootstrapColor('primary'),   { attributes: {title: 'Primary'}   }) },
                                    { 'key' : 'text-secondary', 'name' : 'Secondary', 'html' : bm.makeColorText( getBootstrapColor('secondary'), { attributes: {title: 'Secondary'} }) },
                                    { 'key' : 'text-success',   'name' : 'Success',   'html' : bm.makeColorText( getBootstrapColor('success'),   { attributes: {title: 'Success'}   }) },
                                    { 'key' : 'text-info',      'name' : 'Info',      'html' : bm.makeColorText( getBootstrapColor('info'),      { attributes: {title: 'Info'}      }) },
                                    { 'key' : 'text-warning',   'name' : 'Warning',   'html' : bm.makeColorText( getBootstrapColor('warning'),   { attributes: {title: 'Warning'}   }) },
                                    { 'key' : 'text-danger',    'name' : 'Danger',    'html' : bm.makeColorText( getBootstrapColor('danger'),    { attributes: {title: 'Danger'}    }) }
                                ];
                                return list;
                            },
                            show_if: function() {
                                return current_bs_version == 4;
                            }
                        },
                        bsemphasis41: {
                            'type' : 'select',
                            'name' : 'Text',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'toggle_buttons' : true,
                            'options' : function() {
                                var list = [
                                    { 'key' : 'text-muted',     'name' : 'Muted',     'html' : bm.makeColorText( getBootstrapColor('muted'),     { attributes: {title: 'Muted'}     }) },
                                    { 'key' : 'text-white',     'name' : 'White',     'html' : bm.makeColorText( getBootstrapColor('white'),     { attributes: {title: 'White'}     }) },
                                    { 'key' : 'text-light',     'name' : 'Light',     'html' : bm.makeColorText( getBootstrapColor('light'),     { attributes: {title: 'Light'}     }) },
                                    { 'key' : 'text-dark',      'name' : 'Dark',      'html' : bm.makeColorText( getBootstrapColor('dark'),      { attributes: {title: 'Dark' }     }) },
                                    { 'key' : 'text-primary',   'name' : 'Primary',   'html' : bm.makeColorText( getBootstrapColor('primary'),   { attributes: {title: 'Primary'}   }) },
                                    { 'key' : 'text-secondary', 'name' : 'Secondary', 'html' : bm.makeColorText( getBootstrapColor('secondary'), { attributes: {title: 'Secondary'} }) },
                                    { 'key' : 'text-success',   'name' : 'Success',   'html' : bm.makeColorText( getBootstrapColor('success'),   { attributes: {title: 'Success'}   }) },
                                    { 'key' : 'text-info',      'name' : 'Info',      'html' : bm.makeColorText( getBootstrapColor('info'),      { attributes: {title: 'Info'}      }) },
                                    { 'key' : 'text-warning',   'name' : 'Warning',   'html' : bm.makeColorText( getBootstrapColor('warning'),   { attributes: {title: 'Warning'}   }) },
                                    { 'key' : 'text-danger',    'name' : 'Danger',    'html' : bm.makeColorText( getBootstrapColor('danger'),    { attributes: {title: 'Danger'}    }) }
                                ];
                                //if(reqVersion(4.1)) {
                                    list.push({
                                            'key' : 'text-body',
                                            'name' : 'Body',
                                            'html' : bm.makeColorText( '#212529',    { attributes: {title: 'Body text color'}})
                                        }
                                    )
                                    list.push({
                                            'key' : 'text-black-50',
                                            'name' : 'Black 50%',
                                            'html' : bm.makeColorText( 'rgba(0,0,0,0.5)',    { attributes: {title: 'Black transparent 50%'}})
                                        }
                                    )
                                    list.push({
                                            'key': 'text-white-50',
                                            'name': 'White 50%',
                                            'html': bm.makeColorText('rgba(255, 255, 255, 0.5)', {attributes: {title: 'White transparent 50%'}})
                                        }
                                    )
                                //}
                                return list;
                            },
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        },
                        bsTransform: {
                            'type' : 'select',
                            'name' : 'Transform',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'toggle_buttons' : true,
                            'options' : [
                                { 'key' : 'text-lowercase',  'name' : 'Lowercase',  'html': bm.makeIcon('lowercase')     },
                                { 'key' : 'text-uppercase',  'name' : 'Uppercase',  'html': bm.makeIcon('uppercase')     },
                                { 'key' : 'text-capitalize', 'name' : 'Capitalize', 'html': bm.makeIcon('sentence-case') }
                            ]
                        },
                        verticalalign: {
                            'type' : 'select',
                            'name': 'Vertical alignment',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'align-baseline',    'name' : 'Baseline'    },
                                { 'key' : 'align-top',         'name' : 'Top'         },
                                { 'key' : 'align-middle',      'name' : 'Middle'      },
                                { 'key' : 'align-bottom',      'name' : 'Bottom'      },
                                { 'key' : 'align-text-top',    'name' : 'Text top'    },
                                { 'key' : 'align-text-bottom', 'name' : 'Text bottom' }
                            ]
                        },
                        fontweight: {
                            'type' : 'select',
                            'name' : 'Weight',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'font-weight-bold',   'name' : 'Bold' },
                                { 'key' : 'font-weight-normal', 'name' : 'Normal' },
                                { 'key' : 'font-weight-light',  'name' : 'Light' }
                            ]
                        },
                        fontitalic: {
                            'type' : 'checkbox',
                            'name' : 'Italic',
                            'action' : 'apply_class',
                            'value' : 'font-italic'
                        },
                        bslead: {
                            'type' : 'checkbox',
                            'name' : 'Lead',
                            'action' : 'apply_class',
                            'value' : 'lead'
                        },
                        bsnowrap: {
                            'type' : 'checkbox',
                            'name' : 'No wrap',
                            'action' : 'apply_class',
                            'value' : 'text-nowrap'
                        },
                        texttruncate: {
                            'type' : 'checkbox',
                            'name' : 'Truncate',
                            'action' : 'apply_class',
                            'value' : 'text-truncate'
                        },
                        textmonospace: {
                            'type' : 'checkbox',
                            'name' : 'Monospace',
                            'action' : 'apply_class',
                            'value' : 'text-monospace',
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        }
                    }
                },
                'background' : {
                    name: 'Background',
                    compact: true,
                    default_closed: false,
                    fields: {
                        bsbckcontext: {
                            'type' : 'select',
                            'name' : 'Background',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'toggle_buttons' : true,
                            'options' : bgColorOptions
                        },
                        boxshadow: {
                            'type' : 'select',
                            'name' : 'Box shadow',
                            'action' : 'apply_class',
                            'show_empty': true,
                            'options' : [
                                { key: 'shadow-none', name: 'None' },
                                { key: 'shadow-sm', name: 'Small' },
                                { key: 'shadow', name: 'Regular' },
                                { key: 'shadow-lg', name: 'Large' }
                            ],
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        }
                    }
                },
                spacing: {
                    name : "Spacing",
                    on_section_shown : onSectionWithDevicesControlsShown,
                    fields : {
                        margin_control: {
                            type: 'custom',
                            name: 'layout_control',
                            action: 'none',
                            control: gh.getSpacingControl()
                        }

                    }
                },
                'bslayout' : {
                    name: 'Display',
                    fields: {
                        bsposition : {
                            'type' : 'select',
                            'name' : 'Position',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'position-static',   'name' : 'Static'   },
                                { 'key' : 'position-relative', 'name' : 'Relative' },
                                { 'key' : 'position-absolute', 'name' : 'Absolute' },
                                { 'key' : 'position-fixed',    'name' : 'Fixed'    },
                                { 'key' : 'position-sticky',   'name' : 'Sticky'   }
                            ]
                        },
                        clearfix : {
                            'type' : 'checkbox',
                            'name' : 'Clear floats',
                            'action' : 'apply_class',
                            'value' : 'clearfix'
                        },
                        bswidth : {
                            'type' : 'select',
                            'name' : 'Width',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'w-auto', 'name' : 'Auto' },
                                { 'key' : 'w-25',   'name' : '25%'  },
                                { 'key' : 'w-50',   'name' : '50%'  },
                                { 'key' : 'w-75',   'name' : '75%'  },
                                { 'key' : 'w-100',  'name' : '100%' }
                            ]
                        },
                        bsmxwidth : {
                            'type' : 'checkbox',
                            'name' : 'Max width',
                            'action' : 'apply_class',
                            'value' : 'mw-100'
                        },
                        bsheight : {
                            'type' : 'select',
                            'name' : 'Height',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'h-auto', 'name' : 'Auto' },
                                { 'key' : 'h-25',   'name' : '25%'  },
                                { 'key' : 'h-50',   'name' : '50%'  },
                                { 'key' : 'h-75',   'name' : '75%'  },
                                { 'key' : 'h-100',  'name' : '100%' }
                            ]
                        },
                        bsmxheight : {
                            'type' : 'checkbox',
                            'name' : 'Max height',
                            'action' : 'apply_class',
                            'value' : 'mh-100'
                        }
                    }
                },
                borders : {
                    name: 'Border',
                    fields: {
                        hasborder: {
                            'type' : 'checkbox',
                            'name' : 'Border',
                            'action' : 'apply_class',
                            'value' : 'border'
                        },
                        hideborder: {
                            type: 'select',
                            name: 'Hide',
                            action: 'apply_class_multiple',
                            show_empty: true,
                            multiple: true,
                            options: [
                                { key: 'border-0',        name: 'All sides'},
                                { key: 'border-top-0',    name: 'Top'    },
                                { key: 'border-right-0',  name: 'Right'  },
                                { key: 'border-left-0',   name: 'Left'   },
                                { key: 'border-bottom-0', name: 'Bottom' },
                            ]
                        },
                        bordercolor: {
                            type: 'select',
                            name: 'Border',
                            action: 'apply_class',
                            show_empty: true,
                            toggle_buttons: true,
                            options: [
                                {'key' : 'border-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light')    },
                                {'key' : 'border-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark')     },
                                {'key' : 'border-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary')  },
                                {'key' : 'border-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary')},
                                {'key' : 'border-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success')  },
                                {'key' : 'border-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info')     },
                                {'key' : 'border-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning')  },
                                {'key' : 'border-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger')   }
                            ]
                        }
                    }
                },
                columns : columns_section_def,
                'bsvisible' : {
                    name: 'Visibility',
                    compact: true,
                    fields: {
                        bsvisibility : {
                            'type' : 'select',
                            'name' : 'Visibility',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'visible',   'name' : 'Visible' },
                                { 'key' : 'invisible', 'name' : 'Invisible' }
                            ]
                        },
                        bsprint : {
                            'type' : 'select',
                            'name' : 'Print',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'd-print-none',         'name' : 'None' },
                                { 'key' : 'd-print-block',        'name' : 'Block' },
                                { 'key' : 'd-print-inline',       'name' : 'Inline' },
                                { 'key' : 'd-print-inline-block', 'name' : 'Inline block' },
                                { 'key' : 'd-print-table',        'name' : 'Table' },
                                { 'key' : 'd-print-table-row',    'name' : 'Table row' },
                                { 'key' : 'd-print-table-cell',   'name' : 'Table cell' },
                                { 'key' : 'd-print-flex',         'name' : 'Flex' },
                                { 'key' : 'd-print-inline-flex',  'name' : 'Inline flex' }
                            ]
                        },
                        'bssronly' : {
                            'type' : 'select',
                            'name' : 'Scr.rdr',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                { 'key' : 'sr-only',           'name' : 'Only' },
                                { 'key' : 'sr-only-focusable', 'name' : 'Focusable' }
                            ]
                        }
                    }
                },
                'flex': {
                    name : "Flex container",
                    on_section_shown : onSectionWithDevicesControlsShown,
                    fields : {
                        flex_display: {
                            type: 'custom',
                            name: 'flex_display',
                            action: 'none',
                            control: getDevicesControlFactory('flex.display', 'Display', function(size, size_token) {
                                var base = 'd' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Display', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        { 'key' : base + 'flex', 'name' : 'Flex', html: bm.makeText('Flex')},
                                        {'key' : base + 'inline-flex', name : 'Inline flex', html: bm.makeText('Inline flex')}
                                    ]
                                }
                                return field;
                            })
                        },
                        flex_direction: {
                            type: 'custom',
                            name: 'flex_direction',
                            action: 'none',
                            control: getDevicesControlFactory('flex.direction', 'Direction', function(size, size_token) {
                                var base = 'flex' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Direction', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'row', name : 'Row', html: bm.makeIcon('225', { attributes: { 'title': 'Row' } })},
                                        {key : base + 'row-reverse', name : 'Row rev.', html: bm.makeIcon('224', { attributes: { 'title': 'Row reverse' } })},
                                        {key : base + 'column',name: 'Column',html: bm.makeIcon('227', { attributes: { 'title': 'Column' } })},
                                        {key : base + 'column-reverse',name : 'Col. rev.',html: bm.makeIcon('226', { attributes: { 'title': 'Column reverse' } })}
                                    ],
                                    on_changed: function(pgel, prop, value, oldValue, fieldDef, $field, eventType, values, crsaPage) {
                                      /*  var $section = $field.closest('.pg-ui-section-content');
                                        var dir = (value || '').replace(base, '').replace('-reverse', '');
                                        $section.find('[data-device-size="' + size + '"]').attr('data-flex-dir', dir).addClass('pg-has-flex-direction');*/
                                    }
                                }
                                return field;
                            })
                        },
                        flex_justify_content: {
                            type: 'custom',
                            name: 'flex_justify_content',
                            action: 'none',
                            control: getDevicesControlFactory('flex.justify.content', 'Justify content', function(size, size_token) {
                                var base = 'justify-content' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Justify content', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'start', name : '', html: bm.makeIcon('223', { attributes: { 'title': 'Start' } })},
                                        {key : base + 'end', name : '', html: bm.makeIcon('218', { attributes: { 'title': 'End' } })},
                                        {key : base + 'center', name : '', html: bm.makeIcon('219', { attributes: { 'title': 'Center' } })},
                                        {key : base + 'between', name : '', html: bm.makeIcon('206', { attributes: { 'title': 'Between' } })},
                                        {key : base + 'around', name : '', html: bm.makeIcon('205', { attributes: { 'title': 'Around' } })}
                                    ]
                                }
                                return field;
                            })
                        },
                        flex_align_items: {
                            type: 'custom',
                            name: 'flex_align_items',
                            action: 'none',
                            control: getDevicesControlFactory('flex.align.items', 'Align items', function(size, size_token) {
                                var base = 'align-items' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Align items', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'start', name : '', html: bm.makeIcon('223', { attributes: { 'title': 'Start' } })},
                                        {key : base + 'end', name : '', html: bm.makeIcon('220', { attributes: { 'title': 'End' } })},
                                        {key : base + 'center', name : '', html: bm.makeIcon('221', { attributes: { 'title': 'Center' } })},
                                        {key : base + 'baseline', name : '', html: bm.makeIcon('212', { attributes: { 'title': 'Baseline' } })},
                                        {key : base + 'stretch', name : '', html: bm.makeIcon('214', { attributes: { 'title': 'Stretch' } })}
                                    ]
                                }
                                return field;
                            })
                        },
                        flex_align_content: {
                            type: 'custom',
                            name: 'flex_align_content',
                            action: 'none',
                            control: getDevicesControlFactory('flex.align.content', 'Align content', function(size, size_token) {
                                var base = 'align-content' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Align content', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'start', name : '', html: bm.makeIcon('217', { attributes: { 'title': 'Start' } })},
                                        {key : base + 'end', name : '', html: bm.makeIcon('216', { attributes: { 'title': 'End' } })},
                                        {key : base + 'center', name : '', html: bm.makeIcon('215', { attributes: { 'title': 'Center' } })},
                                        {key : base + 'between', name : '', html: bm.makeIcon('210', { attributes: { 'title': 'Stretch' } })},
                                        {key : base + 'around', name : '', html: bm.makeIcon('209', { attributes: { 'title': 'Stretch' } })},
                                        {key : base + 'stretch', name : '', html: bm.makeIcon('214', { attributes: { 'title': 'Stretch' } })}
                                    ]
                                }
                                return field;
                            })
                        },
                        flex_wrap: {
                            type: 'custom',
                            name: 'flex_wrap',
                            action: 'none',
                            control: getDevicesControlFactory('flex.wrap', 'Wrap', function(size, size_token) {
                                var base = 'flex' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Wrap', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'nowrap', name : '', html: bm.makeIcon('203', { attributes: { 'title': 'No wrap' } })},
                                        {key : base + 'wrap', name : '', html: bm.makeIcon('204', { attributes: { 'title': 'Wrap' } })},
                                        {key : base + 'wrap-reverse', name : '', html: bm.makeIcon('202', { attributes: { 'title': 'Wrap reverse' } })}
                                    ]
                                }
                                return field;
                            })
                        }
                    }
                },
                'flex.child': {
                    name : "Flex child",
                    on_section_shown : onSectionWithDevicesControlsShown,
                    fields : {
                        flex_grow: {
                            type: 'custom',
                            name: 'flex_grow',
                            action: 'none',
                            control: getDevicesControlFactory('flex.grow', 'Grow', function(size, size_token) {
                                var base = 'flex' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Grow', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'grow-0', name : '0' },
                                        {key : base + 'grow-1', name : '1' }
                                    ]
                                }
                                return field;
                            }),
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        },
                        flex_shrink: {
                            type: 'custom',
                            name: 'flex_shrink',
                            action: 'none',
                            control: getDevicesControlFactory('flex.shrink', 'Shrink', function(size, size_token) {
                                var base = 'flex' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Shrink', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'shrink-0', name : '0' },
                                        {key : base + 'shrink-1', name : '1' }
                                    ]
                                }
                                return field;
                            }),
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        },
                        flex_align_self: {
                            type: 'custom',
                            name: 'flex_align_self',
                            action: 'none',
                            control: getDevicesControlFactory('flex.align.self', 'Align self', function(size, size_token) {
                                var base = 'align-self' + size_token + '-';
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Align self', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: true,
                                    options : [
                                        {key : base + 'start', name : '', html: bm.makeIcon('211', { attributes: { 'title': 'Start' } })},
                                        {key : base + 'end', name : '', html: bm.makeIcon('208', { attributes: { 'title': 'End' } })},
                                        {key : base + 'center', name : '', html: bm.makeIcon('213', { attributes: { 'title': 'Center' } })},
                                        {key : base + 'baseline', name : '', html: bm.makeIcon('212', { attributes: { 'title': 'Baseline' } })},
                                        {key : base + 'stretch', name : '', html: bm.makeIcon('207', { attributes: { 'title': 'Stretch' } })}
                                    ]
                                }
                                return field;
                            })
                        },
                        flex_order: {
                            type: 'custom',
                            name: 'flex_order',
                            action: 'none',
                            control: getDevicesControlFactory('flex.order', 'Order', function(size, size_token) {
                                var base = 'order' + size_token + '-';

                                var options = [];
                                for(var i = 1; i <= num_columns; i++) {
                                    options.push({key: base + i, name: i});
                                }
                                var field = {
                                    type : 'select',
                                    name : makeFieldLabelForSize('Order', size),
                                    action : 'apply_class',
                                    show_empty : true,
                                    toggle_buttons: false,
                                    options : options
                                }
                                return field;
                            })
                        },
                        flex_fill: {
                            type: 'custom',
                            name: 'flex_fill',
                            action: 'none',
                            control: getDevicesControlFactory('flex.fill', 'Fill', function(size, size_token) {
                                var base = 'flex' + size_token + '-';
                                var field = {
                                    type : 'checkbox',
                                    name : makeFieldLabelForSize('Fill', size),
                                    action : 'apply_class',
                                    value : base + 'fill'
                                }
                                return field;
                            }),
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        }
                    }
                },
                bstooltip : bsTooltipsSection,
                bspopover : bsPopoverSection,
                bsjs : {
                    name : 'Toggle',
                    fields : {
                        bsdatatarget : bsDataTarget,
                        bsdatatoggle : bsDataToggle
                    }
                },
                bsoptions: {
                    name: 'Bootstrap options',
                    fields: {
                        bsversionlabel40: {
                            type: 'displayhtml',
                            name: '<p>Bootstrap <b>4.0</b> properties are shown for the current page.</p>',
                            action: 'custom',
                            show_if: function() {
                                return current_bs_version == 4;
                            }
                        },
                        bsversionlabel41: {
                            type: 'displayhtml',
                            name: '<p>Bootstrap <b>4.1</b> properties are shown for the current page.</p>',
                            action: 'custom',
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        },
                        bsforceversion: {
                            type: 'select',
                            name: 'Bootstrap version',
                            show_empty: false,
                            options: [
                                {key: 'auto', name: 'Auto detect'},
                                {key: '4.0', name: '4.0'},
                                {key: '4.1', name: '4.1'}
                            ],
                            action: 'custom',
                            get_value: function() {
                                return force_bs_version;
                            },
                            set_value: function(pgel, value) {
                                force_bs_version = value;
                                pinegrow.setSetting('bs4-force-version', value);
                                if(value != 'auto') {
                                    setCurrentBsVersion( parseFloat(value));
                                }
                                setTimeout(function() {
                                    pinegrow.selectedElements.reselect();
                                }, 100);
                                return value;
                            }
                        }
                    }
                }
            })
        })
        f.addComponentType(def_all);


        // Container
        var def_container = new PgComponentType(prefix + 'container', 'Container', {
            'selector' : '.container,.container-fluid',
            tags: 'major',
            preview: getGridPreview('container'),
            'code' : '<div class="container"></div>',
            empty_placeholder : true,
            action_menu: {
                add: [prefix + 'row']
            },
            'inline_edit' : true,
            'sections' : addPrefixToSectionsAndFields({
                containeropt : {
                    name : "Container",
                    fields : {
                        cofluid : {
                            name : 'Fluid',
                            'type': 'checkbox' ,
                            value: '1',
                            action: "custom",
                            get_value: function(pgel) {
                                return pgel.hasClass('container-fluid') ? '1' : null;
                            },
                            set_value: function(pgel, value, values, oldValue, eventType) {
                                if(value) {
                                    pgel.removeClass('container');
                                    pgel.addClass('container-fluid');
                                } else {
                                    pgel.addClass('container');
                                    pgel.removeClass('container-fluid');
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_container);

        // Row
        var def_row = new PgComponentType(prefix + 'row', 'Row', {
            'selector' : 'div.row',
            tags: 'major',
            preview: getGridPreview('row'),
            invalid_drop_msg : "Row can only be dropped into a Container. Drop it to the tree if you want to put it somewhere else.",
            'code' : '<div class="row"></div>',
            empty_placeholder : true,
            action_menu : {
                add: [prefix + 'column']
            },
            'sections' : addPrefixToSectionsAndFields({
                rowoptions: {
                    name: 'Row options',
                    fields: {
                        bsnogutters: {
                            'type' : 'checkbox',
                            'name' : 'No gutters',
                            'action' : 'apply_class',
                            'value' : 'no-gutters'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_row);

        // Column clear
        var def_clear_columns = new PgComponentType(prefix + 'clear-columns', 'Clear columns', {
            'tags' : 'major',
            'priority' : 100,
            'selector' : '',
            'selector_new' : function(pgel) {
                return pgel.hasClass('w-100') && pgel.parent && pgel.parent.hasClass('row');
            },
            'code' : '<div class="w-100"></div>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_clear_columns);


        // Thumbnails
        var def_thumbnail_img = new PgComponentType(prefix + 'thumbnail-img', 'Image thumbnail', {
            'selector' : null,
            tags: 'major',
            parent_selector: '.row',
            invalid_drop_msg : columnPlaceMsg,
            'code' : function() {
                return '<div class="col-md-3">\
                    <a href="#">\
                        <img class="w-100 img-thumbnail" src="' + getPlaceholderImage() + '" alt="">\
                    </a>\
                </div>';
            },
            'preview' : function() {
                return '<div class="col-md-12">\
                    <a href="#">\
                        <img class="w-100 img-thumbnail" src="' + getPlaceholderImage() + '" alt="">\
                    </a>\
                </div>';
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_thumbnail_img);


        var grid_section = new PgFrameworkLibSection(prefix + 'grid', 'Grid');
        grid_section.setComponentTypes([def_container, def_row, def_column, def_clear_columns, def_thumbnail_img]);
        f.addLibSection(grid_section);


        // Button
        var getButtonSizeToggleButton = function(size) {
            return bm.makeText(size);

            var fs = 14;
            switch(size) {
                case 'lg':
                    fs = 16;
                    break;
                case 'default':
                    fs = 14;
                    break;
                case 'sm':
                    fs = 12;
                    break;
                case 'xs':
                    fs = 10;
                    break;
            }
            return '<div style="color:#fff;font-weight:bold;font-size:' + fs + 'px;padding: 2px 16px;border-radius: 4px;background-color:#4D4D4D;">' + size + '</div>';
        }

        var def_button = new PgComponentType(prefix + 'button', 'Button', {
            'selector' : '.btn',
            'code' : '<button type="button" class="btn btn-light">Label</button>',
            'content_selector' : null,
            'drag_code' : null, //same as panel code
            'allowed_in' : null, //everywhere
            'sections' : addPrefixToSectionsAndFields({
                'button' : {
                    name : 'Button',
                    default_closed: false,
                    fields : {
                        'buttonlabel' : {
                            type: 'text',
                            name: 'Label',
                            action: 'element_html',
                            update_tree: true
                        },
                        /*
                        'buttonhref' : {
                            name : 'Href (if a)',
                            type : 'text',
                            action: 'element_attribute',
                            attribute: 'href',
                            file_picker: true,
                            file_picker_no_proxy : true,
                            show_if: prefix + 'buttontag==a'
                        },
                        'buttontarget' : {
                            name : 'Target (if a)',
                            type : 'text',
                            action: 'element_attribute',
                            attribute: 'target',
                            show_if: prefix + 'buttontag==a'
                        },*/
                        'buttontag' : {
                            'type' : 'select',
                            'name' : 'Element',
                            'action' : 'custom',
                            toggle_buttons: true,
                            'options' : [
                                {
                                    'key' : 'a',
                                    'name' : 'Link - a tag',
                                    html: bm.makeText('&lt;a&gt;')
                                },
                                {
                                    'key' : 'button',
                                    'name' : 'Button - button tag',
                                    html: bm.makeText('&lt;button&gt;')
                                }
                            ],
                            show_empty: false,
                            get_value: function(pgel) {
                                return pgel.tagName == 'button' ? 'button' : 'a';
                            },
                            set_value: function(pgel, value, values, oldValue, eventType) {
                                var tag = value;
                                pgel = pgel.replaceTag(tag);

                                if(value == 'a') {
                                    pgel.removeAttr('type');
                                    pgel.attr('href', pgel.getData('remember-href') || '#');
                                } else {
                                    pgel.attr('type', 'button');
                                    pgel.setData('remember-href', pgel.attr('href'));
                                    pgel.removeAttr('href');
                                }
                                return value;
                            }
                        },
                        'buttontype' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'action' : 'apply_class',
                            show_empty: true,
                            toggle_buttons: true,
                            'options' : [
                                { 'key' : 'btn-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light') },
                                { 'key' : 'btn-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark') },
                                { 'key' : 'btn-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary') },
                                { 'key' : 'btn-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary') },
                                { 'key' : 'btn-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info') },
                                { 'key' : 'btn-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success') },
                                { 'key' : 'btn-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning') },
                                { 'key' : 'btn-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger') },
                                { 'key' : 'btn-link',      'name' : 'Link',      html: getButtonTypeToggleButton('link') }
                            ]
                        },
                        'buttonoutlinetype' : {
                            'type' : 'select',
                            'name' : 'Outline',
                            'action' : 'apply_class',
                            show_empty: true,
                            toggle_buttons: true,
                            'options' : [
                                {
                                    'key' : 'btn-outline-light',
                                    'name' : 'Light',
                                    html: getButtonTypeToggleButton('light')
                                },
                                {
                                    'key' : 'btn-outline-dark',
                                    'name' : 'Dark',
                                    html: getButtonTypeToggleButton('dark')
                                },
                                {
                                    'key' : 'btn-outline-primary',
                                    'name' : 'Primary',
                                    html: getButtonTypeToggleButton('primary')
                                },
                                {
                                    'key' : 'btn-outline-secondary',
                                    'name' : 'Secondary',
                                    html: getButtonTypeToggleButton('secondary')
                                },
                                {
                                    'key' : 'btn-outline-info',
                                    'name' : 'Info',
                                    html: getButtonTypeToggleButton('info')
                                },
                                {
                                    'key' : 'btn-outline-success',
                                    'name' : 'Success',
                                    html: getButtonTypeToggleButton('success')
                                },
                                {
                                    'key' : 'btn-outline-warning',
                                    'name' : 'Warning',
                                    html: getButtonTypeToggleButton('warning')
                                },
                                {
                                    'key' : 'btn-outline-danger',
                                    'name' : 'Danger',
                                    html: getButtonTypeToggleButton('danger')
                                }
                            ]
                        },
                        'buttonsize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            toggle_buttons: true,
                            'options' : [
                                {
                                    'key' : 'btn-lg',
                                    'name' : 'Large',
                                    html: getButtonSizeToggleButton('lg')
                                },
                                {
                                    'key' : 'btn-sm',
                                    'name' : 'Small',
                                    html: getButtonSizeToggleButton('sm')
                                }
                            ]
                        },
                        'buttonblock' : {
                            type: 'checkbox',
                            name: 'Block level',
                            action: 'apply_class',
                            value: 'btn-block'
                        },
                        'buttonactive' : {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'apply_class',
                            value: 'active'
                        },
                        'buttondisabled': {
                            type: 'checkbox',
                            name: 'Disabled',
                            action: 'custom',
                            value: '1',
                            get_value: function(pgel) {
                                return (pgel.attr('disabled') != null || pgel.hasClass('disabled')) ? '1' : null;
                            },
                            set_value: function(pgel, value, values, oldValue, eventType) {
                                if(pgel.tagName == 'button') {
                                    if(value) {
                                        pgel.attr('disabled', 'disabled');
                                    } else {
                                        pgel.removeAttr('disabled');
                                    }
                                } else {
                                    if(value) {
                                        pgel.addClass('disabled');
                                    } else {
                                        pgel.removeClass('disabled');
                                    }
                                }
                                return value;
                            }
                        }
                    }
                },
                css : {
                    //inherit this from html framework
                    inherit: true
                }
            })
        });
        f.addComponentType(def_button);

        var def_close_button = new PgComponentType(prefix + 'close-button', 'Close button', {
            'selector' : 'button.close',
            'code' : '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            'sections' : {}
        });
        f.addComponentType(def_close_button);

        var def_button_toolbar = new PgComponentType(prefix + 'button-toolbar', 'Button toolbar', {
            'selector' : 'div.btn-toolbar',
            'code' : '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
                <div class="btn-group" role="group" aria-label="First group">\
                    <button type="button" class="btn btn-secondary">1</button>\
                    <button type="button" class="btn btn-secondary">2</button>\
                    <button type="button" class="btn btn-secondary">3</button>\
                </div>\
            </div>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_button_toolbar);


        var def_button_group = new PgComponentType(prefix + 'button-group', 'Button group', {
            'selector' : 'div.btn-group, div.btn-group-vertical',
            'code' : '<div class="btn-group" role="group" aria-label="Basic example">\
            <button type="button" class="btn btn-secondary">Left</button>\
            <button type="button" class="btn btn-secondary">Middle</button>\
            <button type="button" class="btn btn-secondary">Right</button>\
            </div>',
            tags: 'major',
            'sections' : addPrefixToSectionsAndFields({
                'buttongroup' : {
                    name : 'Button group',
                    fields : {
                        buttongroupsize : button_group_size,
                        buttongrouporientation : {
                            name: "Orientation",
                            show_empty: false,
                            type: 'select',
                            action: 'apply_class',
                            options: [
                                {key: 'btn-group', name: "Horizontal"},
                                {key: 'btn-group-vertical', name: "Vertical"}
                            ]
                        },
                        buttongrouptoggle : bsDataToggle
                    }
                }
            })
        });
        f.addComponentType(def_button_group);

        var def_button_group_checkbox = new PgComponentType(prefix + 'button-group-checkbox', 'Checkboxes Button group', {
            'selector' : null,
            'code' : '<div class="btn-group" data-toggle="buttons">\
                <label class="btn btn-secondary active">\
                    <input type="checkbox" checked autocomplete="off"> Checkbox 1 (pre-checked)\
                </label>\
                <label class="btn btn-secondary">\
                    <input type="checkbox" autocomplete="off"> Checkbox 2\
                </label>\
                <label class="btn btn-secondary">\
                    <input type="checkbox" autocomplete="off"> Checkbox 3\
                </label>\
            </div>'
        });
        f.addComponentType(def_button_group_checkbox);

        var def_button_group_radio = new PgComponentType(prefix + 'button-group-radio', 'Radio Button group', {
            'selector' : null,
            'code' : '<div class="btn-group" data-toggle="buttons">\
            <label class="btn btn-secondary active">\
            <input type="radio" name="options" id="option1" autocomplete="off" checked> Radio 1 (preselected)\
        </label>\
        <label class="btn btn-secondary">\
            <input type="radio" name="options" id="option2" autocomplete="off"> Radio 2\
        </label>\
        <label class="btn btn-secondary">\
            <input type="radio" name="options" id="option3" autocomplete="off"> Radio 3\
        </label>\
        </div>'
        });
        f.addComponentType(def_button_group_radio);


        var def_button_dropdown = new PgComponentType(prefix + 'button-dropdown', 'Button dropdown', {
            'selector_new' : function(pgel) {
                if ((pgel.hasClass('dropdown') || pgel.hasClass('btn-group')) && pgel.find('> .dropdown-menu').length > 0) return true;
                return false;
            },
            'code' : '<div class="dropdown">\
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                    Dropdown button\
                </button>\
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
                    <a class="dropdown-item" href="#">Action</a>\
                    <a class="dropdown-item" href="#">Another action</a>\
                    <a class="dropdown-item" href="#">Something else here</a>\
                </div>\
            </div>',
            tags: 'major',
            'action_menu' : {
                'add' : [prefix + 'dropdown-item'],
                'on_add' : function (pgel, pgnew, newdef, prepend) {
                    var pgul = pgel.findOne('> .dropdown-menu');
                    if (!pgul) {
                        pgul = pgCreateNodeFromHtml('<div class="dropdown-menu" role="menu"></div>');
                        pgel.append(pgul);
                    }

                    if (prepend) {
                        pgul.prepend(pgnew);
                    } else {
                        pgul.append(pgnew);
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
                'buttondropdown' : {
                    name : 'Variations',
                    fields : {
                        buttondropdowndropup : {
                            name : "Dropup",
                            type : "checkbox",
                            value: 'dropup',
                            action: 'apply_class'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_button_dropdown);

        var dropdown_item_classes = [
            {key: 'dropdown-header', name: 'Header'},
            {key: 'dropdown-divider', name: 'Divider'},
            {key: 'dropdown-item-text', name: 'Text'},
            {key: 'disabled', name: 'Disabled'}
        ];

        var def_dropdown_item = new PgComponentType(prefix + 'dropdown-item', 'Dropdown item', {
            'selector_new' : function(pgel) {
                return (pgel.hasClass('dropdown-item') || pgel.hasClass('dropdown-header') || pgel.hasClass('dropdown-divider') || pgel.hasClass('dropdown-item-text')) && pgel.parent && pgel.parent.hasClass('dropdown-menu');
            },
            parent_selector: 'ul.dropdown-menu',
            'code' : '<a class="dropdown-item" href="#">Dropdown item</a>',
            'sections' : addPrefixToSectionsAndFields({
                'dropdownitem' : {
                    name : 'Dropdown item',
                    fields : {
                        dropdownitemtype : {
                            name : "Type",
                            type : "select",
                            options : dropdown_item_classes,
                            show_empty: true,
                            action: 'custom',
                            get_value: function (pgel) {
                                var val = null;
                                $.each(dropdown_item_classes, function(i, c) {
                                    if (pgel.hasClass(c.key)) {
                                        val = c.key;
                                        return false;
                                    }
                                });
                                return val;
                            },
                            set_value: function (pgel, value, values) {
                                var removeClasses = [], addClasses = [];

                                if (value == 'dropdown-header') {
                                    pgel = pgel.replaceTag('h6');
                                    pgel.removeAttr('href');
                                    removeClasses.push('dropdown-item', 'disabled', 'dropdown-divider', 'dropdown-item-text');
                                    addClasses.push(value);
                                }
                                else if (value == 'dropdown-divider') {
                                    pgel = pgel.replaceTag('div');
                                    pgel.html('');
                                    pgel.removeAttr('href');
                                    removeClasses.push('dropdown-item', 'disabled', 'dropdown-header', 'dropdown-item-text');
                                    addClasses.push(value);
                                }
                                else if (value == 'dropdown-item-text') {
                                    pgel = pgel.replaceTag('span');
                                    pgel.removeAttr('href');
                                    removeClasses.push('dropdown-item', 'disabled', 'dropdown-divider', 'dropdown-header');
                                    addClasses.push(value);
                                }
                                else if (value == 'disabled') {
                                    pgel = pgel.replaceTag('a');
                                    var hrefAttr = pgel.getAttr('href');
                                    if (!hrefAttr) pgel.setAttr('href', '#');
                                    removeClasses.push('dropdown-header', 'dropdown-divider', 'dropdown-item-text');
                                    addClasses.push(value, 'dropdown-item');
                                }
                                else {
                                    pgel = pgel.replaceTag('a');
                                    var hrefAttr = pgel.getAttr('href');
                                    if (!hrefAttr) pgel.setAttr('href', '#');
                                    removeClasses.push('dropdown-header', 'dropdown-divider', 'disabled', 'dropdown-item-text');
                                    addClasses.push('dropdown-item');
                                }

                                for (var i = 0; i < removeClasses.length; i++) {
                                    pgel.removeClass(removeClasses[i]);
                                }

                                for (var i = 0; i < addClasses.length; i++) {
                                    pgel.addClass(addClasses[i]);
                                }

                                return value;
                            }
                        },
                        dropdownitemlabel : {
                            name : "Label",
                            type : "text",
                            action: 'custom',
                            get_value: function (pgel) {
                                return pgel.html();
                            },
                            set_value: function (pgel, value, values) {
                                pgel.html(value);
                                return value;
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_dropdown_item);

        var def_dropdown_menu = new PgComponentType(prefix + 'dropdown-menu', 'Dropdown menu', {
            'selector' : '.dropdown-menu',
            'code' : '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
                <a class="dropdown-item" href="#">Action</a>\
                <a class="dropdown-item" href="#">Another action</a>\
                <a class="dropdown-item" href="#">Something else here</a>\
            </div>',
            tags: 'major',
            'action_menu' : {
                'add' : [prefix + 'dropdown-item']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_dropdown_menu);

        var button_section = new PgFrameworkLibSection(prefix + 'button', 'Buttons');
        button_section.setComponentTypes([def_button, def_close_button, def_button_toolbar, def_button_group, def_button_group_checkbox, def_button_group_radio, def_button_dropdown, def_dropdown_menu]);
        f.addLibSection(button_section);


        var textAndImageSection = [];

        var hoptions = [
            {key: 'h1', name: 'Heading 1'},
            {key: 'h2', name: 'Heading 2'},
            {key: 'h3', name: 'Heading 3'},
            {key: 'h4', name: 'Heading 4'},
            {key: 'h5', name: 'Heading 5'},
            {key: 'h6', name: 'Heading 6'}
        ];

        var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        $.each(headings, function(i,h) {
            var def_heading = new PgComponentType(prefix + h, h, {
                'selector' : h,
                'code' : '<' + h + '>Heading ' + (i+1) + '</' + h + '>',
                action_menu: {
                    add: [prefix + 'small']
                },
                'sections' : addPrefixToSectionsAndFields({
                    'headstyle' : {
                        name : 'Heading',
                        fields : {
                            headlevel : {
                                'type' : 'select',
                                'name' : 'Level',
                                'action' : 'custom',
                                'show_empty' : false,
                                options: hoptions,
                                get_value: function(pgel) {
                                    for(var i = 0; i < hoptions.length; i++) {
                                        if(pgel.tagName == hoptions[i].key) {
                                            return hoptions[i].key;
                                        }
                                    }
                                    return null;
                                },
                                set_value: function(pgel, value, values, oldValue, eventType) {
                                    crsaWillChangeDom();
                                    var newpgel = pgel.replaceTag(value);
                                    //$.fn.crsa('setSelectElementOnUpdate', newpgel);todo30
                                    return value;
                                }
                            },
                            displayheadings: {
                                'type' : 'select',
                                'name' : 'Display',
                                'action' : 'apply_class',
                                'show_empty' : true,
                                'options' : [
                                    { 'key' : 'display-1',  'name' : '1 (big)' },
                                    { 'key' : 'display-2',  'name' : '2' },
                                    { 'key' : 'display-3',  'name' : '3' },
                                    { 'key' : 'display-4',  'name' : '4' },
                                    { 'key' : 'display-5',  'name' : '5 (small)' }
                                ]
                            }
                        }
                    }
                })
            });
            f.addComponentType(def_heading);

            textAndImageSection.push(def_heading);
        });

        var def_secondary_text = new PgComponentType(prefix + 'small', 'Small', {
            'selector' : 'small',
            'code' : '<small>Secondary text</small>',
            'preview' : '<h1><small>Secondary text</small></h1>',
            'sections' : addPrefixToSectionsAndFields({})
        })
        f.addComponentType(def_secondary_text);
        textAndImageSection.push(def_secondary_text);

        var def_paragraph = new PgComponentType(prefix + 'p', 'p', {
            'selector' : 'p',
            'code' : '<p>Paragraph</p>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_paragraph);
        textAndImageSection.push(def_paragraph);

        var def_abbreviation = new PgComponentType(prefix + 'abbr', 'Abbreviation', {
            'selector' : 'abbr',
            'code' : '<abbr title="Description">term</abbr>',
            'sections' : addPrefixToSectionsAndFields({
                'abbreviationstyle' : {
                    name : 'Abbreviation',
                    fields : {
                        abbreviationtext : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        },
                        abbreviationdescription : {
                            'type' : 'text',
                            'name' : 'Description',
                            'action' : 'element_attribute',
                            'attribute' : 'title'
                        },
                        abbreviationinitialism : {
                            'type' : 'checkbox',
                            'name' : 'All caps',
                            'action' : 'apply_class',
                            'value' : 'initialism'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_abbreviation);
        textAndImageSection.push(def_abbreviation);

        var def_address = new PgComponentType(prefix + 'address', 'Address', {
            'selector' : 'address',
            'code' : '<address>\
                <strong>Twitter, Inc.</strong><br/>\
                795 Folsom Ave, Suite 600<br/>\
                San Francisco, CA 94107<br/>\
                <abbr title="Phone">P:</abbr> (123) 456-7890<br/>\
                <br/>\
                <strong>Full Name</strong><br>\
                <a href="mailto:#">first.last@example.com</a>\
            </address>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_address);
        textAndImageSection.push(def_address);

        // Blockquote
        var def_blockquote = new PgComponentType(prefix + 'blockquote', 'Blockquote', {
            'selector_new' : function(pgel) {
                if (pgel.tagName == 'blockquote' || pgel.hasClass('blockquote')) return true;
                return false;
            },
            tags: 'major',
            'code' : '<blockquote class="blockquote">\
                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\
                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>\
            </blockquote>',
            action_menu: {
                add: [prefix + 'blockquote-footer']
            },
            'sections' : addPrefixToSectionsAndFields({
                'blockquotedata' : {
                    name: "Blockquote Info",
                    fields: {
                        blockquotetext: {
                            type: 'text',
                            name: 'Quote',
                            action: 'custom',
                            get_value: function (pgel) {
                                var p = pgel.findOne('p');
                                if (!p) return null;
                                return p.html();
                            },
                            set_value: function (pgel, value, values, oldValue) {
                                var p = pgel.findOne('p');
                                if(!p) {
                                    p = pgCreate('<p class="mb-0"></p>');
                                    pgel.prepend(p);
                                }
                                p.html(value);
                                return value;
                            }
                        },
                        blockquotecitation: {
                            type: 'text',
                            name: 'Citation',
                            action: 'custom',
                            get_value: function (pgel) {
                                var pgbqfooter = pgel.findOne('.blockquote-footer');
                                if (!pgbqfooter) return null;
                                var s = pgbqfooter.html();
                                s = s.replace(/<cite.*<\/cite>/i, '@SOURCE');
                                return s;
                            },
                            set_value: function (pgel, value, values, oldValue) {
                                var source = values[prefix + 'blockquotesource'];
                                var pgbqfooter = pgel.findOne('.blockquote-footer');
                                if (!value || value.length == 0) {
                                    //$small.remove();
                                    pgbqfooter.remove();
                                } else {
                                    if (source && source.length > 0) {
                                        source = '<cite title="' + source + '">' + source + '</cite>';
                                    } else {
                                        source = '';
                                    }
                                    if ((!oldValue || oldValue.length == 0) && (source && source.length > 0)) value += " @SOURCE";
                                    var text = value.replace(/@source/i, source);
                                    if (!pgbqfooter) {
                                        //$small = $("<small/>").appendTo($el);
                                        pgbqfooter = pgCreateNodeFromHtml("<div class='blockquote-footer'></div>");
                                        pgel.append(pgbqfooter);
                                    }
                                    pgbqfooter.html(text);
                                }
                                return value;
                            }
                        },
                        blockquotesource: {
                            type: 'text',
                            name: 'Source',
                            action: 'custom',
                            get_value: function (pgel) {
                                var pgcite = pgel.findOne('cite');
                                if (!pgcite) return null;
                                return pgcite.text();
                            },
                            set_value: function (pgel, value, values) {
                                var citation = values.citation;
                                if (value && value.length > 0) {
                                    if (!citation) {
                                        citation = '@SOURCE';
                                    } else {
                                        if (!citation.match(/@source/i)) {
                                            citation += ' @SOURCE';
                                        }
                                    }
                                }

                                var pgcite = pgel.findOne('cite');
                                if (!pgcite) {
                                    pgcite = pgCreateNodeFromHtml("<cite title='Source Title'></cite");
                                    var pgbqfooter = pgel.findOne('.blockquote-footer');
                                    if (!pgbqfooter) {
                                        pgbqfooter = pgCreateNodeFromHtml("<div class='blockquote-footer'>" + value + "</div>");
                                        pgel.append(pgbqfooter);
                                    }

                                    pgbqfooter.append(pgcite);
                                }

                                pgcite.html(value);

                                return value;
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_blockquote);
        textAndImageSection.push(def_blockquote);

        var def_blockquote_footer = new PgComponentType(prefix + 'blockquote-footer', 'Blockquote footer', {
            'selector' : '.blockquote-footer',
            'code' : '<footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_blockquote_footer);

        // Hr
        var def_hr = new PgComponentType(prefix + 'hr', 'Hr', {
            'selector' : 'hr',
            'code' : '<hr/>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_hr);
        textAndImageSection.push(def_hr);

        var def_img = new PgComponentType(prefix + 'img', 'Image', {
            'selector' : 'img',
            'code' : '<img src="' + getPlaceholderImage() + '">',
            big_preview: true,
            'sections' : addPrefixToSectionsAndFields({
                image : {
                    name : 'Image options',
                    fields : {
                        imgrounded : {
                            type: 'select',
                            name: 'Rounded',
                            action: 'apply_class',
                            show_empty: true,
                            options: [
                                { key: 'rounded-0',      name: 'None'   },
                                { key: 'rounded',        name: 'All'    },
                                { key: 'rounded-top',    name: 'Top'    },
                                { key: 'rounded-right',  name: 'Right'  },
                                { key: 'rounded-left',   name: 'Left'   },
                                { key: 'rounded-bottom', name: 'Bottom' },
                                { key: 'rounded-circle', name: 'Circle' }
                            ]
                        },
                        imgfluid : {
                            type: 'checkbox',
                            name: 'Fluid',
                            action: 'apply_class',
                            value: 'img-fluid'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_img);
        textAndImageSection.push(def_img);

        var button_section = new PgFrameworkLibSection(prefix + 'textAndImage', 'Text &amp; Images');
        button_section.setComponentTypes(textAndImageSection);
        f.addLibSection(button_section);

        // Badge
        var def_badge = new PgComponentType(prefix + 'badge', 'Badge', {
            'selector' : 'span.badge',
            'code' : '<span class="badge badge-primary">42</span>',
            'sections' : addPrefixToSectionsAndFields({
                'badge' : {
                    name : 'Badge',
                    fields : {
                        badgepill: {
                            type: 'checkbox',
                            name: 'Pill',
                            action: 'apply_class',
                            value: "badge-pill"
                        },
                        badgevalue : {
                            type: 'text',
                            name: 'Value',
                            action: 'element_html'
                        },
                        badgevariation : {
                            type: 'select',
                            name: 'Type',
                            action: 'apply_class',
                            toggle_buttons: true,
                            'options' : [
                                {'key' : 'badge-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light')},
                                {'key' : 'badge-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark')},
                                {'key' : 'badge-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary')},
                                {'key' : 'badge-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary')},
                                {'key' : 'badge-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success')},
                                {'key' : 'badge-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info')},
                                {'key' : 'badge-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning')},
                                {'key' : 'badge-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger')}
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_badge);

        // Alert
        var def_alert = new PgComponentType(prefix + 'alert', 'Alert', {
            'selector' : 'div.alert',
            'code' : '<div class="alert alert-success">\
                <strong>Well done!</strong> You successfully read this important alert message.\
            </div>',
            action_menu: {
                'add' : [prefix + 'alert-title', prefix + 'alert-p', prefix + 'hr'],
                actions : [
                    {label: "Style links", action: function (pgel) {
                        var pga = pgel.find('a');
                        if (pga.length > 0) {
                            for (var i = 0; i < pga.length; i++) {
                                pga[i].addClass('alert-link');
                            }
                        }
                    }}
                ]
            },
            'sections' : addPrefixToSectionsAndFields({
                'alertstyle' : {
                    name : 'Alert',
                    fields : {
                        'alertvariation' : {
                            type: 'select',
                            name: 'Type',
                            action: 'apply_class',
                            toggle_buttons: true,
                            'options' : [
                                {'key' : 'alert-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light')},
                                {'key' : 'alert-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark')},
                                {'key' : 'alert-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary')},
                                {'key' : 'alert-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary')},
                                {'key' : 'alert-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success')},
                                {'key' : 'alert-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info')},
                                {'key' : 'alert-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning')},
                                {'key' : 'alert-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger')}
                            ]
                        },
                        'alertclose' : {
                            'type' : 'checkbox',
                            'name' : 'Dismissable',
                            'value' : "1",
                            'action' : 'custom',
                            get_value: function (pgel) {
                                return pgel.find("button.close").length > 0 ? "1" : null;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var pgb = pgel.findOne('button.close');

                                if (value) {
                                    if (!pgb) {
                                        pgb = pgCreateNodeFromHtml('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"></span></button>').html('&times;');
                                        pgel.prepend(pgb);
                                    }
                                } else {
                                    pgb.remove();
                                }

                                return value;
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_alert);

        var def_alert_title = new PgComponentType(prefix + 'alert-title', 'Alert title', {
            'selector' : 'div.alert-heading',
            'code' : '<h4 class="alert-heading">Well done!</h4>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_alert_title);

        var def_alert_p = new PgComponentType(prefix + 'alert-p', 'Alert text', {
            'selector' : null,
            'code' : '<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_alert_p);

        // Progress
        var def_progress = new PgComponentType(prefix + 'progress', 'Progress', {
            'selector' : 'div.progress',
            'code' : '<div class="progress">\
                <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>\
                <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>\
            </div>',
            'preview' : '<div class="progress">\
                <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>\
                <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>\
            </div>',
            tags: 'major',
            action_menu : {
                add: [prefix + 'progress-bar']
            },
            'sections' : addPrefixToSectionsAndFields({ })
        });
        f.addComponentType(def_progress);

        var def_progress_bar = new PgComponentType(prefix + 'progress-bar', 'Progress bar', {
            'selector' : 'div.progress-bar',
            parent_selector: 'div.progress',
            'code' : '<div class="progress-bar" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>',
            'preview' : '<div class="progress">\
                <div class="progress-bar" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>\
            </div>',
            'sections' : addPrefixToSectionsAndFields({
                'progressbarstyle' : {
                    name : 'Progress bar',
                    fields : {
                        'progressbarstriped' : {
                            'type' : 'checkbox',
                            'name' : 'Striped',
                            'value' : "progress-bar-striped",
                            'action' : 'apply_class'
                        },
                        'progressbaranimated' : {
                            'type' : 'checkbox',
                            'name' : 'Animated',
                            'value' : "progress-bar-animated",
                            'action' : 'apply_class'
                        },
                        'progressbartype' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'action' : 'apply_class',
                            show_empty: true,
                            toggle_buttons: true,
                            'options' : bgColorOptions
                        },
                        'progressbarpercent' : {
                            'type' : 'text',
                            'name' : 'Completed %',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                var v = pgel.getAttr('aria-valuenow');
                                if (v !== null) return v;

                                var styles = styleToObject(pgel.getAttr('style'));

                                var w = styles.width;
                                w = w ? w.replace('%', '') : null;
                                return w;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var v = value == null ? 50 : parseInt(value);
                                if (v > 100) v = 100;
                                value = v.toString();
                                pgel.setAttr('aria-valuenow', value);
                                pgel.setAttr('style', 'width:' + value + '%');
                                var t = value + '% Complete';
                                for (var n = 0; n < bgColorOptions.length; n++) {
                                    if (pgel.hasClass(bgColorOptions[n].key)) {
                                        t += ' (' + bgColorOptions[n].name + ')';
                                        break;
                                    }
                                }

                                var pgspan = pgel.findOne('span');
                                if (pgspan) pgspan.html(t);
                                return value;
                            }
                        },
                        'progressbarlabel': {
                            'type' : 'text',
                            'name' : 'Label',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                var pgspan = pgel.findOne('> span');
                                if (!pgspan) return '';

                                return pgspan.text();
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var pgspan = '';
                                var pgpspan = pgel.findOne('> span');
                                if (!pgpspan) {
                                    var pgpspan = pgCreateNodeFromHtml('<span></span>');
                                    pgel.html('').append(pgpspan);
                                }
                                pgpspan.html(value);
                                return value;
                            }
                        },
                        'progressbarshowlabel': {
                            'type' : 'checkbox',
                            'name' : 'Show label',
                            'value' : '1',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                var pgspan = pgel.findOne('> span');
                                return pgspan && pgspan.hasClass('sr-only') ? null : '1';
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var pgspan = pgel.findOne('> span');

                                if (value == 1) {
                                    if (pgspan) pgspan.removeClass('sr-only');
                                }
                                else {
                                    if (pgspan) pgspan.addClass('sr-only');
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_progress_bar);

        // Media
        var def_media = new PgComponentType(prefix + 'media', 'Media', {
            'selector' : '.media',
            'code' : function() {
                return '<div class="media">\
                    <img class="d-flex mr-3" src="' + getPlaceholderImage() + '" alt="Generic placeholder image" width="150">\
                    <div class="media-body">\
                        <h5 class="mt-0">Media heading</h5>\
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\
                    </div>\
                </div>';
            },
            priority: 100,
            'action_menu' : {
                'add' : [prefix + 'media', prefix + 'media-image', prefix + 'media-body'],
                on_add : function (pgel, pgnew, newdef) {
                    if (newdef.type == 'media-image') {
                        pgel.prepend(pgnew);
                    }
                    if (newdef.type == 'media-body') {
                        pgel.append(pgnew);
                    } else if (newdef.type == 'media') {
                        var pgb = pgel.findOne('> .media-body');
                        if (!pgb) {
                            pgb = pgCreateNodeFromHtml('<div class="media-body"></div>');
                            pgel.append(pgb);
                        }

                        pgb.append(pgnew);
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_media);

        var def_media_image = new PgComponentType(prefix + 'media-image', 'Media image', {
            'priority' : 100,
            'selector_new' : function(pgel) {
                return pgel.tagName == 'img' && pgel.parent && pgel.parent.hasClass('media');
            },
            'code' : function() {
                return '<img class="d-flex mr-3" src="' + getPlaceholderImage() + '" alt="Generic placeholder image" width="150">';
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_media_image);

        var def_media_body = new PgComponentType(prefix + 'media-body', 'Media body', {
            'priority' : 100,
            'selector' : '.media-body',
            'code' : '<div class="media-body">\
                <h5 class="mt-0">Media heading</h5>\
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\
            </div>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_media_body);

        // List group
        var def_list_group = new PgComponentType(prefix + 'list-group', 'List group', {
            'selector' : 'ul.list-group,div.list-group',
            'priority': 100,
            'code' : '<ul class="list-group">\
                <li class="list-group-item">Cras justo odio</li>\
                <li class="list-group-item">Dapibus ac facilisis in</li>\
                <li class="list-group-item">Morbi leo risus</li>\
                <li class="list-group-item">Porta ac consectetur ac</li>\
                <li class="list-group-item">Vestibulum at eros</li>\
            </ul>',
            'action_menu' : {
                'add' : [prefix + 'list-group-item']
            },
            tags: 'major',
            'sections' : addPrefixToSectionsAndFields({
                'listgroupstyle' : {
                    name : 'List group',
                    fields : {
                        'listgrouppercent' : {
                            'type' : 'checkbox',
                            'name' : 'Linked',
                            'value' : '1',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                return pgel.tagName == 'div' ? '1' : null;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var dmain = value == '1' ? 'div' : 'ul';
                                var ditem = value == '1' ? 'a' : 'li';
                                var pgnewel;
                                if (pgel.tagName != dmain) {
                                    pgel = pgel.replaceTag(dmain);

                                    var items = pgel.children;
                                    for (var i = 0; i < items.length; i++) {
                                        var item = items[i];
                                        if (item.tagName != 'text') {
                                            item = item.replaceTag(ditem);
                                            if (ditem == 'a') {
                                                item.setAttr('href', '#');
                                            }
                                            else {
                                                item.removeAttr('href');
                                            }
                                        }
                                    }
                                }

                                return value;
                            }
                        },
                        'listgroupflush' : {
                            'type' : 'checkbox',
                            'name' : 'Flush',
                            'value' : 'list-group-flush',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_list_group);

        var list_group_fields = {
            listitem : {
                name : 'List item',
                fields : {
                    'listgroupitemactive' : {
                        'type' : 'checkbox',
                        'name' : 'Active',
                        'value' : 'active',
                        'action' : 'apply_class'
                    },
                    'listgroupitemdisabled' : {
                        'type' : 'checkbox',
                        'name' : 'Disabled',
                        'value' : 'disabled',
                        'action' : 'apply_class'
                    },
                    'listgroupitemaction' : {
                        'type' : 'checkbox',
                        'name' : 'Action',
                        'value' : 'list-group-item-action',
                        'action' : 'apply_class'
                    },
                    'listgroupitemtype' : {
                        type: 'select',
                        name: 'Type',
                        action: 'apply_class',
                        toggle_buttons: true,
                        'options' : [
                            {'key' : 'list-group-item-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light')},
                            {'key' : 'list-group-item-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark')},
                            {'key' : 'list-group-item-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary')},
                            {'key' : 'list-group-item-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary')},
                            {'key' : 'list-group-item-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success')},
                            {'key' : 'list-group-item-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info')},
                            {'key' : 'list-group-item-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning')},
                            {'key' : 'list-group-item-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger')}
                        ]
                    }
                }
            }
        }

        var def_list_group_item = new PgComponentType(prefix + 'list-group-item', 'List group item', {
            'selector' : 'li.list-group-item',
            priority: 100,
            parent_selector: 'ul,ol',
            'code' : '<li class="list-group-item">Cras justo odio</li>',
            'action_menu' : {
                'add' : ['h4', 'p', 'img', prefix + 'badge']
            },
            'sections' : addPrefixToSectionsAndFields(list_group_fields)
        });
        f.addComponentType(def_list_group_item);

        var def_list_group_item_link = new PgComponentType(prefix + 'list-group-item-link', 'List group item link', {
            'selector' : 'a.list-group-item',
            priority: 100,
            parent_selector: '.list-group',
            'code' : '<a class="list-group-item" href="#">Cras justo odio</a>',
            'action_menu' : {
                'add' : ['h4', 'p', 'img', prefix + 'badge']
            },
            'sections' : addPrefixToSectionsAndFields(list_group_fields)
        });
        f.addComponentType(def_list_group_item_link);

        // Card
        var def_card_group = new PgComponentType(prefix + 'card-group', 'Card group', {
            'tags' : 'major',
            'selector' : 'div.card-group',
            'priority' : 100,
            big_preview: true,
            'code' : '<div class="card-group">\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
                    </div>\
                    <div class="card-footer">\
                        <small class="text-muted">Last updated 3 mins ago</small>\
                    </div>\
                </div>\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>\
                    </div>\
                    <div class="card-footer">\
                        <small class="text-muted">Last updated 3 mins ago</small>\
                    </div>\
                </div>\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>\
                    </div>\
                    <div class="card-footer">\
                        <small class="text-muted">Last updated 3 mins ago</small>\
                    </div>\
                </div>\
            </div>',
            action_menu: {
                add: [prefix + 'card']
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_group);

        var def_card_deck = new PgComponentType(prefix + 'card-deck', 'Card deck', {
            'tags' : 'major',
            'selector' : 'div.card-deck',
            'priority' : 100,
            'code' : '<div class="card-deck">\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    </div>\
                </div>\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>\
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    </div>\
                </div>\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>\
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    </div>\
                </div>\
            </div>',
            action_menu: {
                add: [prefix + 'card']
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_deck);

        var def_card_columns = new PgComponentType(prefix + 'card-columns', 'Card columns', {
            'tags' : 'major',
            'selector' : 'div.card-columns',
            'priority' : 100,
            big_preview: true,
            'code' : '<div class="card-columns">\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title that wraps to a new line</h4>\
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
                    </div>\
                </div>\
                <div class="card p-3">\
                    <blockquote class="blockquote mb-0 card-body">\
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\
                        <footer class="blockquote-footer">\
                            <small class="text-muted">\
                                Someone famous in <cite title="Source Title">Source Title</cite>\
                            </small>\
                        </footer>\
                    </blockquote>\
                </div>\
                <div class="card">\
                    <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>\
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    </div>\
                </div>\
                <div class="card bg-primary p-3 text-center">\
                    <blockquote class="blockquote mb-0">\
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>\
                        <footer class="blockquote-footer">\
                            <small>\
                                Someone famous in <cite title="Source Title">Source Title</cite>\
                            </small>\
                        </footer>\
                    </blockquote>\
                </div>\
                <div class="card text-center">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>\
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    </div>\
                </div>\
                <div class="card">\
                    <img class="card-img" src="' + getPlaceholderImage() + '" alt="Card image">\
                </div>\
                <div class="card p-3 text-right">\
                    <blockquote class="blockquote mb-0">\
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\
                        <footer class="blockquote-footer">\
                            <small class="text-muted">\
                                Someone famous in <cite title="Source Title">Source Title</cite>\
                            </small>\
                        </footer>\
                    </blockquote>\
                </div>\
                <div class="card">\
                    <div class="card-body">\
                        <h4 class="card-title">Card title</h4>\
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>\
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\
                    </div>\
                </div>\
            </div>',
            action_menu: {
                add: [prefix + 'card']
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_columns);

        var def_card = new PgComponentType(prefix + 'card', 'Card', {
            'tags' : 'major',
            'selector' : 'div.card',
            'priority' : 100,
            'code' : '<div class="card">\
                <img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">\
                <div class="card-body">\
                    <h4 class="card-title">Card title</h4>\
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>\
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
                    <a href="#" class="btn btn-primary">Go somewhere</a>\
                </div>\
            </div>',
            action_menu: {
                add: [prefix + 'card-img', prefix + 'card-header', prefix + 'card-body', prefix + 'card-img-overlay', prefix + 'card-footer', prefix + 'list-group']
            },
            'sections' : addPrefixToSectionsAndFields({
                'card' : {
                    name : 'Card',
                    fields : {
                        cardtype : {
                            type: 'select',
                            name: 'Type',
                            action: 'apply_class',
                            show_empty: true,
                            toggle_buttons: true,
                            options: bgColorOptions
                        },
                        cardborder : {
                            type: 'select',
                            name: 'Border',
                            action: 'apply_class',
                            show_empty: true,
                            toggle_buttons: true,
                            options: borderColorOptions
                        }
                    }
                }
            })
        });
        f.addComponentType(def_card);


        var cardparttype = {
            type: 'select',
            name: 'Type',
            action: 'apply_class',
            show_empty: true,
            toggle_buttons: true,
            options: bgColorOptions
        }

        var cardpartborder = {
            type: 'select',
            name: 'Border',
            action: 'apply_class',
            show_empty: true,
            toggle_buttons: true,
            options: borderColorOptions
        }

        var def_card_img = new PgComponentType(prefix + 'card-img', 'Card image', {
            'tags' : 'major',
            'selector' : 'img.card-img-top',
            'priority' : 100,
            'code' : '<img class="card-img-top" src="' + getPlaceholderImage() + '" alt="Card image cap">',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_img);

        var def_card_header = new PgComponentType(prefix + 'card-header', 'Card header', {
            'tags' : 'major',
            'selector' : 'div.card-header',
            'priority' : 100,
            'code' : '<div class="card-header">Header</div>',
            'sections' : addPrefixToSectionsAndFields({
                'cardheader' : {
                    name : 'Card header',
                    fields : {
                        cardheadertype : cardparttype,
                        cardheaderborder : cardpartborder
                    }
                }
            })
        });
        f.addComponentType(def_card_header);

        var def_card_body = new PgComponentType(prefix + 'card-body', 'Card body', {
            'selector' : 'div.card-body',
            'priority' : 100,
            'code' : '<div class="card-body">\
                <h4 class="card-title">Card title</h4>\
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
                <a href="#" class="btn btn-primary">Go somewhere</a>\
            </div>',
            action_menu: {
                add: [prefix + 'card-title', prefix + 'card-subtitle', prefix + 'card-text', prefix + 'card-link']
            },
            'sections' : addPrefixToSectionsAndFields({
                'cardbody' : {
                    name : 'Card',
                    fields : {
                        cardbodytype : cardparttype,
                        cardbodyborder : cardpartborder
                    }
                }
            })
        });
        f.addComponentType(def_card_body);

        var def_card_img_overlay = new PgComponentType(prefix + 'card-img-overlay', 'Card image overlay', {
            'selector' : 'div.card-img-overlay',
            'priority' : 100,
            'code' : '<div class="card-img-overlay">\
                <h4 class="card-title">Card title</h4>\
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
                <p class="card-text">Last updated 3 mins ago</p>\
            </div>',
            action_menu: {
                add: [prefix + 'card-title', prefix + 'card-subtitle', prefix + 'card-text', prefix + 'card-link']
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_img_overlay);

        var def_card_body_title = new PgComponentType(prefix + 'card-title', 'Card title', {
            'selector' : '.card-title',
            'priority' : 100,
            'code' : '<h4 class="card-title">Card title</h4>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_body_title);

        var def_card_body_subtitle = new PgComponentType(prefix + 'card-subtitle', 'Card subtitle', {
            'selector' : '.card-subtitle',
            'priority' : 100,
            'code' : '<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_body_subtitle);

        var def_card_body_text = new PgComponentType(prefix + 'card-text', 'Card text', {
            'selector' : 'p.card-text',
            'priority' : 100,
            'code' : '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_body_text);

        var def_card_body_link = new PgComponentType(prefix + 'card-link', 'Card link', {
            'selector' : 'a.card-link',
            'priority' : 100,
            'code' : '<a href="#" class="card-link">Card link</a>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_card_body_link);

        var def_card_footer = new PgComponentType(prefix + 'card-footer', 'Card footer', {
            'tags' : 'major',
            'selector' : 'div.card-footer',
            'priority' : 100,
            'code' : '<div class="card-footer">Footer</div>',
            'sections' : addPrefixToSectionsAndFields({
                'cardfooter' : {
                    name : 'Card footer',
                    fields : {
                        cardfootertype : cardparttype,
                        cardfooterborder : cardpartborder
                    }
                }
            })
        });
        f.addComponentType(def_card_footer);

        var def_figure = new PgComponentType(prefix + 'figure', 'Figure', {
            'tags' : 'major',
            'selector' : 'figure, .figure',
            'code' : '<figure class="figure">\
                <img src="' + getPlaceholderImage() + '" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">\
                <figcaption class="figure-caption">A caption for the above image.</figcaption>\
            </figure>',
            action_menu: {
                add: [prefix + 'figure-img', prefix + 'figure-caption']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_figure);

        var def_figure_img = new PgComponentType(prefix + 'figure-img', 'Figure image', {
            'selector' : '.figure-img',
            'code' : '<img src="' + getPlaceholderImage() + '" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_figure_img);

        var def_figure_caption = new PgComponentType(prefix + 'figure-caption', 'Figure caption', {
            'selector' : '.figure-caption',
            'code' : '<figcaption class="figure-caption">A caption for the above image.</figcaption>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_figure_caption);

        var def_responsive_vid = new PgComponentType(prefix + 'res-media', 'Responsive media', {
            'selector' : '.embed-responsive',
            'code' : '<div class="embed-responsive embed-responsive-16by9">\
                <iframe class="embed-responsive-item" src="http://www.youtube.com/embed/tbbKjDjMDok"></iframe>\
                </div>',
            'drag_helper' : '<div class="embed-responsive embed-responsive-16by9">\
                <div class="pg-empty-placeholder">Media</div>\
                </div>',
            tags: 'major',
            priority: 100,
            action_menu: {
                add: ['html-iframe', 'html-embed', 'html-object']
            },
            'sections' : addPrefixToSectionsAndFields({
                'bsmedia' : {
                    name : 'Media options',
                    fields : {
                        active : {
                            'type' : 'select',
                            'name' : 'Aspect ratio',
                            'action' : 'apply_class',
                            'show_empty' : false,
                            'options' : [
                                {key: 'embed-responsive-1by1', name: '1 x 1'},
                                {key: 'embed-responsive-4by3', name: '4 x 3'},
                                {key: 'embed-responsive-16by9', name: '16 x 9'},
                                {key: 'embed-responsive-21by9', name: '21 x 9'}
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_responsive_vid);


        var ui_element = new PgFrameworkLibSection(prefix + 'uiElement', 'UI elements');
        ui_element.setComponentTypes([def_badge, def_alert, def_progress, def_media, def_figure, def_list_group, def_card_group, def_card_deck, def_card_columns, def_card, def_responsive_vid]);
        f.addLibSection(ui_element);


        // List
        var def_list = new PgComponentType(prefix + 'list', 'List', {
            tags: 'major',
            'selector' : function(pgel) {
                return (pgel.tagName == 'ol' || pgel.tagName == 'ul') && !pgel.hasClass('list-group');
            },
            'code' : '<ul>\
                <li>Lorem ipsum dolor sit amet</li>\
                <li>Consectetur adipiscing elit</li>\
                <li>Integer molestie lorem at massa</li>\
                <li>Nulla volutpat aliquam velit\
                    <ul>\
                        <li>Phasellus iaculis neque</li>\
                        <li>Purus sodales ultricies</li>\
                    </ul>\
                </li>\
            </ul>',
            'action_menu' : {
                'add' : [prefix + 'list-item']
            },
            'sections' : addPrefixToSectionsAndFields({
                'liststyle' : {
                    name : 'List',
                    fields : {
                        'listordered' : {
                            'type' : 'checkbox',
                            'name' : 'Ordered',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function (pgel) {
                                return pgel.tagName == "ol" ? "1" : null;
                            },
                            set_value: function (pgel, value, values) {
                                var tag = value == "1" ? 'ol' : 'ul';
                                pgel = pgel.replaceTag(tag);

                                return value;
                            }
                        },
                        'listunstyled' : {
                            'type' : 'checkbox',
                            'name' : 'Unstyled',
                            'action' : 'apply_class',
                            'value' : 'list-unstyled'
                        },
                        'listinline' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'action' : 'apply_class',
                            'value' : 'list-inline'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_list);

        var def_list_def = new PgComponentType(prefix + 'list-item', 'List item', {
            'selector' : 'li',
            parent_selector: 'ol,ul',
            'code' : '<li>List item</li>',
            'name' : 'List Item',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_list_def);

        // Description
        var def_description = new PgComponentType(prefix + 'description', 'Description list', {
            'selector' : 'dl',
            'code' : '<dl>\
                <dt>Description lists</dt>\
                <dd>A description list is perfect for defining terms.</dd>\
                <dt>Euismod</dt>\
                <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>\
            </dl>',
            tags: 'major',
            action_menu: {
                add: [prefix + 'description-term', prefix + 'description-def']
            },
            'sections' : addPrefixToSectionsAndFields({
                /* 'descriptionstyle' : {
                    name : 'Style',
                    fields : {
                        'descriptionhorizontal' : {
                            'type' : 'checkbox',
                            'name' : 'Horizontal',
                            'action' : 'apply_class',
                            'value' : 'dl-horizontal'
                        }
                    }
                } */
            })
        });
        f.addComponentType(def_description);

        var def_description_term = new PgComponentType(prefix + 'description-term', 'Description term', {
            'selector' : 'dt',
            'parent_selector': 'dl',
            'code' : '<dt>Term</dt>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_description_term);

        var def_description_def = new PgComponentType(prefix + 'description-def', 'Description definition', {
            'selector' : 'dd',
            'parent_selector': 'dl',
            'code' : '<dd>Term definition.</dd>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_description_def);


        var list = new PgFrameworkLibSection(prefix + 'list', 'List');
        list.setComponentTypes([def_list, def_list_def, def_description, def_description_term, def_description_def]);
        f.addLibSection(list);


        var getTablePreviewCode = function(t) {
            return '<table class="table preview-' + t + '">\
                <thead>\
                    <tr>\
                        <th>#</th>\
                        <th>First Name</th>\
                        <th>Last Name</th>\
                        <th>Username</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr class="sel">\
                        <td>1</td>\
                        <td class="sel">Mark</td>\
                        <td>Otto</td>\
                        <td>@mdo</td>\
                    </tr>\
                    <tr>\
                        <td>2</td>\
                        <td>Jacob</td>\
                        <td>Thornton</td>\
                        <td>@fat</td>\
                    </tr>\
                    <tr>\
                        <td>3</td>\
                        <td>Larry</td>\
                        <td>the Bird</td>\
                        <td>@twitter</td>\
                    </tr>\
                </tbody>\
            </table>';
        }

        var isTableRowEmpty = function (pgtr) {
            var empty = true;
            var pgtd = pgtr.find(">td");

            for (var i = 0; i < pgtd.length; i++) {
                if ($.trim(pgtd[i].html()).length > 0) {
                    empty = false;
                    return false;
                }
            }

            return empty;
        }

        var countNonEmptyTableRows = function(pgtbody) {
            var c = 0;
            var pgrows = pgtbody.find(">tr");

            for (var i = 0; i < pgrows.length; i++) {
                if (isTableRowEmpty(pgrows[i])) c++;
            }
            return c;
        }

        var responsiveTableOptions = [
            { key: 'table-responsive',    name: 'Xs' },
            { key: 'table-responsive-sm', name: 'Sm' },
            { key: 'table-responsive-md', name: 'Md' },
            { key: 'table-responsive-lg', name: 'Lg' },
            { key: 'table-responsive-xl', name: 'Xl' }
        ];

        var def_table = new PgComponentType(prefix + 'table', 'Table', {
            'selector' : 'table',
            tags: 'major',
            'code' : '<table class="table">\
                <thead>\
                    <tr>\
                        <th>#</th>\
                        <th>First Name</th>\
                        <th>Last Name</th>\
                        <th>Username</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr>\
                        <th scope="row">1</th>\
                        <td>Mark</td>\
                        <td>Otto</td>\
                        <td>@mdo</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">2</th>\
                        <td>Jacob</td>\
                        <td>Thornton</td>\
                        <td>@fat</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">3</th>\
                        <td>Larry</td>\
                        <td>the Bird</td>\
                        <td>@twitter</td>\
                    </tr>\
                </tbody>\
            </table>',
            preview: getTablePreviewCode('table'),
            action_menu: {
                add: [prefix + 'table-head', prefix + 'table-body']
            },
            'sections' : addPrefixToSectionsAndFields({
                'tabledata' : {
                    name: "Table options",
                    fields: {
                        'tablerows': {
                            type: 'slider',
                            name: 'Rows',
                            action: 'custom',
                            live_update: false,
                            slider_def_unit: '',
                            get_value: function (pgel) {
                                var pgtbody = pgel.findOne('>tbody');
                                var pgrows = pgtbody.find('>tr');
                                return pgrows.length;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                value = parseInt(value) || 0;
                                var pgtbody = pgel.findOne('>tbody');
                                if (!pgtbody) {
                                    pgtbody = pgCreateNodeFromHtml('<tbody></tbody>');
                                    pgel.append(pgtbody);
                                }
                                var pgrows = pgtbody.find('>tr').reverse();

                                var cols = parseInt(values[prefix + 'tablecolumns']) || 0;
                                var change = false;
                                var empty_count = countNonEmptyTableRows(pgtbody);
                                var new_value = value;

                                if (pgrows.length < value) {
                                    for (var n = 0; n < value - pgrows.length; n++) {
                                        var pgtr = pgCreateNodeFromHtml('<tr></tr>');
                                        pgtbody.append(pgtr);
                                        for (var c = 0; c < cols; c++) {
                                            pgtr.append(pgCreateNodeFromHtml('<td></td>'));
                                        }
                                    }
                                    change = true;
                                } else if (pgrows.length > value) {
                                    var remove = pgrows.length - value;

                                    for (var i = 0; i < pgrows.length; i++) {
                                        var pgtr = pgrows[i];
                                        if (true || isTableRowEmpty(pgtr)) {
                                            pgtr.remove();
                                            remove--;
                                            if(remove == 0) break;
                                        }
                                    }

                                    new_value = value + remove;
                                }

                                if (eventType == "change") {
                                    value = new_value;
                                }
                                if (value == 0) return null;
                                else            return value;
                            }
                        },
                        'tablecolumns': {
                            type: 'slider',
                            name: 'Columns',
                            action: 'custom',
                            slider_def_unit: '',
                            live_update: false,
                            get_value: function (pgel) {
                                var pgtbody = pgel.findOne('>tbody');
                                var pgrows = pgtbody.find('>tr');
                                var max_c = 0;

                                for (var i = 0; i < pgrows.length; i++) {
                                    var c = pgrows[i].find('>td').length;
                                    if (c > max_c) max_c = c;
                                }

                                var pgheadrows = pgel.find('>thead >tr');

                                for (var i = 0; i < pgheadrows.length; i++) {
                                    var c = pgheadrows[i].find('>th').length;
                                    if (c > max_c) max_c = c;
                                }

                                return max_c;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {

                                crsaWillChangeDom();

                                value = parseInt(value) || 0;

                                var pgtbody = pgel.findOne('>tbody');
                                var pgthead = pgel.findOne('>thead');

                                var pgrows = [];
                                if (pgtbody) pgrows = pgrows.concat(pgtbody.find('>tr'));
                                if (pgthead) pgrows = pgrows.concat(pgthead.find('>tr'));

                                var new_value = value;
                                if (value) {
                                    var max_c = 0;

                                    for (var i = 0; i < pgrows.length; i++) {
                                        var pgcells = pgrows[i].find('>td,>th').reverse();

                                        if (pgcells.length > value) {
                                            var remove = pgcells.length - value;

                                            for (var n = 0; n < pgcells.length; n++) {
                                                var pgtd = pgcells[n];
                                                if (true || $.trim(pgtd.html()) == '') {
                                                    //$td.remove();
                                                    pgtd.remove();
                                                    remove--;
                                                    if (remove == 0) break;
                                                }
                                            }
                                        } else if (pgcells.length < value) {
                                            for(var n = pgcells.length; n < value; n++) {
                                                var tag = pgrows[i].parent.tagName == 'thead' ? 'th' : 'td';
                                                pgrows[i].append(pgCreateNodeFromHtml('<' + tag + '></' + tag + '>'));
                                                //$('<' + tag +'/>').appendTo($(tr));
                                            }
                                        }
                                        var c = pgrows[i].find('>td,>th').length;
                                        if (c > max_c) max_c = c;
                                    }

                                    new_value = max_c;
                                }
                                if (eventType == "change") {
                                    // $.fn.crsa("setNeedsUpdate", false, $el);
                                    value = new_value;
                                }

                                if (value == 0) return null;
                                else            return value;
                            }
                        },
                        'tableresponsive' : {
                            'type' : 'select',
                            'name' : 'Responsive',
                            // 'action' : 'apply_class_multiple',
                            'action' : 'custom',
                            'show_empty' : true,
                            'multiple' : true,
                            'options' : responsiveTableOptions,
                            get_value: function (pgel) {
                                var value = [];
                                var pgp = pgel.parent;

                                for (var i = 0; i < responsiveTableOptions.length; i++) {
                                    var resOpt = responsiveTableOptions[i];
                                    if (pgp.hasClass(resOpt.key)) value.push(resOpt.key);
                                }

                                return value.join(',');
                            },
                            set_value: function (pgel, value, values, oldValue) {
                                var pgp = pgel.parent;
                                var parentClasses = pgp.getClasses();

                                var currValues = [];
                                if (value) currValues = value.split(',');

                                var hasResClass = false;
                                if (parentClasses.length != 0) {
                                    for (var i = 0; i < responsiveTableOptions.length; i++) {
                                        var resOpt = responsiveTableOptions[i];
                                        if (pgp.hasClass(resOpt.key)) {
                                            hasResClass = true;
                                            break;
                                        }
                                    }
                                }

                                if (parentClasses.length != 0 && !hasResClass) {
                                    var pgdiv = pgCreateNodeFromHtml('<div></div>');
                                    pgdiv.insertBefore(pgel);
                                    pgdiv.append(pgel);
                                }

                                pgp = pgel.parent;

                                for (var i = 0; i < responsiveTableOptions.length; i++) {
                                    var resOpt = responsiveTableOptions[i];
                                    if (currValues.indexOf(resOpt.key) > -1) {
                                        pgp.addClass(resOpt.key);
                                    }
                                    else {
                                        pgp.removeClass(resOpt.key);
                                    }
                                }

                                return value;
                            }
                        },
                        'tableborder': {
                            'type' : 'select',
                            'name' : 'Border',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'toggle_buttons' : false,
                            'options' : [
                                { key: 'table-bordered',   name: 'Bordered' },
                                { key: 'table-borderless', name: 'Borderless' }
                            ],
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        },
                        'tabledark' : {
                            'type' : 'checkbox',
                            'name' : 'Dark',
                            'action' : 'apply_class',
                            'value' : 'table-dark'
                        },
                        'tablestriped' : {
                            'type' : 'checkbox',
                            'name' : 'Striped',
                            'action' : 'apply_class',
                            'value' : 'table-striped'
                        },
                        'tablehoverrows' : {
                            'type' : 'checkbox',
                            'name' : 'Hover rows',
                            'action' : 'apply_class',
                            'value' : 'table-hover'
                        },
                        'tablecondensed' : {
                            'type' : 'checkbox',
                            'name' : 'Small',
                            'action' : 'apply_class',
                            'value' : 'table-sm'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_table);

        var def_table_head = new PgComponentType(prefix + 'table-head', 'Table heading', {
            'selector' : 'thead',
            'parent_selector' : 'table',
            'code' : '<thead><tr><th></th></tr></thead>',
            'preview' : getTablePreviewCode('thead'),
            'sections' : addPrefixToSectionsAndFields({
                'tableheadstyle' : {
                    name : 'Style',
                    fields : {
                        'tableheadcontext' : {
                            'type' : 'select',
                            'name' : 'Context',
                            'action' : 'apply_class',
                            show_empty: true,
                            'options' : [
                                { 'key' : 'thead-inverse', 'name' : 'Inverse' },
                                { 'key' : 'thead-default', 'name' : 'Default' }
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_table_head);

        var def_table_body = new PgComponentType(prefix + 'table-body', 'Table body', {
            'selector' : 'tbody',
            'parent_selector' : 'table',
            'code' : '<tbody><tr><td></td></tr></tbody>',
            'preview' : getTablePreviewCode('tbody'),
            action_menu: {
                add: [prefix + 'table-tr']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_table_body);

        var tableContext = {
            'type' : 'select',
            'name' : 'Context',
            'action' : 'apply_class',
            'show_empty' : true,
            'toggle_buttons' : true,
            'options' : [
                {'key' : 'table-light',     'name' : 'Light',     html: getButtonTypeToggleButton('light')},
                {'key' : 'table-dark',      'name' : 'Dark',      html: getButtonTypeToggleButton('dark')},
                {'key' : 'table-primary',   'name' : 'Primary',   html: getButtonTypeToggleButton('primary')},
                {'key' : 'table-secondary', 'name' : 'Secondary', html: getButtonTypeToggleButton('secondary')},
                {'key' : 'table-success',   'name' : 'Success',   html: getButtonTypeToggleButton('success')},
                {'key' : 'table-info',      'name' : 'Info',      html: getButtonTypeToggleButton('info')},
                {'key' : 'table-warning',   'name' : 'Warning',   html: getButtonTypeToggleButton('warning')},
                {'key' : 'table-danger',    'name' : 'Danger',    html: getButtonTypeToggleButton('danger')}
            ]
        };

        var def_table_row = new PgComponentType(prefix + 'table-tr', 'Table row', {
            'selector' : 'tr',
            'parent_selector' : 'table,tbody,thead,tfooter',
            'code' : '<tr><td></td></tr>',
            'preview' : getTablePreviewCode('tr'),
            action_menu: {
                add: [prefix + 'table-td']
            },
            'sections' : addPrefixToSectionsAndFields({
                'tablerowstyle' : {
                    name : 'Style',
                    fields : {
                        'tablerowcontext' : tableContext
                    }
                }
            })
        });
        f.addComponentType(def_table_row);

        var def_table_cell = new PgComponentType(prefix + 'table-td', 'Table cell', {
            'selector' : 'td',
            'parent_selector' : 'tr',
            'code' : '<td></td>',
            'preview' : getTablePreviewCode('td'),
            'sections' : addPrefixToSectionsAndFields({
                'tablecellstyle' : {
                    name : 'Style',
                    fields : {
                        'tablecellcontext' : tableContext
                    }
                }
            })
        });
        f.addComponentType(def_table_cell);


        var table = new PgFrameworkLibSection(prefix + 'table', 'Tables');
        table.setComponentTypes([def_table /*, def_table_head, def_table_body, def_table_row, def_table_cell*/]);
        f.addLibSection(table);

        // Code
        var def_code = new PgComponentType(prefix + 'code', 'Code', {
            'selector' : 'code',
            'code' : '<code>&lt;section&gt;</code>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_code);

        var def_code_block = new PgComponentType(prefix + 'code-block', 'Code block', {
            'selector' : 'pre',
            'code' : '<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>',
            'sections' : addPrefixToSectionsAndFields({
                'codeblockstyle' : {
                    name : 'Style',
                    fields : {
                        'codeblockscroll' : {
                            'type' : 'checkbox',
                            'name' : 'Scrollable',
                            'action' : 'apply_class',
                            'value' : 'pre-scrollable'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_code_block);

        var def_codekbd = new PgComponentType(prefix + 'code-kbd', 'Kbd', {
            'selector' : 'kbd',
            'code' : '<kbd>ctrl</kbd>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_codekbd);

        var def_codevar = new PgComponentType(prefix + 'code-var', 'Variable', {
            'selector' : 'var',
            'code' : '<var>variable</var>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_codevar);

        var def_codesample = new PgComponentType(prefix + 'code-sample', 'Sample', {
            'selector' : 'samp',
            'code' : '<samp>This text is meant to be treated as sample output from a computer program.</samp>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_codesample);


        var code = new PgFrameworkLibSection(prefix + 'codes', 'Code');
        code.setComponentTypes([def_code, def_code_block, def_codekbd, def_codevar, def_codesample]);
        f.addLibSection(code);


        // Form
        var def_form = new PgComponentType(prefix + 'form', 'Form', {
            tags: 'major',
            'selector' : 'form',
            'code' : '<form role="form">\
                <div class="form-group">\
                    <label for="exampleInputEmail1">Email address</label>\
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">\
                </div>\
                <div class="form-group">\
                    <label for="exampleInputPassword1">Password</label>\
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">\
                </div>\
                <div class="form-group">\
                    <label for="exampleInputFile">File input</label>\
                    <input type="file" id="exampleInputFile">\
                    <p class="form-text">Example block-level help text here.</p>\
                </div>\
                <div class="form-check">\
                    <input class="form-check-input" type="checkbox" value="" id="exampleInputCheck1">\
                    <label class="form-check-label" for="exampleInputCheck1">\
                        Check me out\
                    </label>\
                </div>\
                <button type="submit" class="btn btn-primary">Submit</button>\
            </form>',
            action_menu: {
                add: [prefix + 'form-group', prefix + 'form-textarea-group', prefix + 'form-checkbox-group', prefix + 'form-radio-group', prefix + 'form-group-select', prefix + 'form-input-group', prefix + 'form-range-group', prefix + 'form-file-group', prefix + 'form-fieldset', prefix + 'form-row']
            },
            'sections' : addPrefixToSectionsAndFields({
                'layout' : {
                    name : 'Form style',
                    fields : {
                        'formlayout' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'action' : 'apply_class',
                            'value' : 'form-inline'
                        },
                        'formvalidated' : {
                            'type' : 'checkbox',
                            'name' : 'Validated',
                            'action' : 'apply_class',
                            'value' : 'was-validated'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_form);

        var def_form_group = new PgComponentType(prefix + 'form-group', 'Form group', {
            'selector' : 'div.form-group',
            'parent_selector' : 'form,fieldset',
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-group">\
                    <label for="' + id + '">Name</label>\
                    <input type="text" class="form-control" id="' + id + '" placeholder="Enter name">\
                </div>'
            },
            action_menu: {
                add: [prefix + 'form-input', prefix + 'form-range', prefix + 'form-textarea', prefix + 'form-checkbox', prefix + 'form-radio', prefix + 'form-file-group', prefix + 'form-select', prefix + 'form-label',  prefix + 'form-text', prefix + 'form-feedback', prefix + 'form-input-group', prefix + 'form-range-group']
            },
            'sections' : addPrefixToSectionsAndFields({ })
        });
        f.addComponentType(def_form_group);

        var def_form_ta_group = new PgComponentType(prefix + 'form-textarea-group', 'Textarea group', {
            'selector' : null,
            parent_selector: 'form,fieldset',
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-group">\
                    <label for="' + id + '">Field label</label>\
                    <textarea class="form-control" rows="3" id="' + id + '"></textarea>\
                </div>'
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_ta_group);

        var attr_disabled = {
            type: 'checkbox',
            action: 'element_attribute',
            attribute: 'disabled',
            name: 'Disabled',
            value: 'disabled'
        };

        var class_disabled = {
            type: 'checkbox',
            action : 'apply_class',
            name: 'Disabled',
            value: 'disabled'
        };

        var readonly = {
            type: 'checkbox',
            action: 'element_attribute',
            attribute: 'readonly',
            name: 'ReadOnly',
            value: 'readonly'
        }

        var required = {
            type: 'checkbox',
            action: 'element_attribute',
            attribute: 'required',
            name: 'Required',
            value: 'required',
            empty_attribute: true
        };

        var control_sizing = {
            'type' : 'select',
            'name' : 'Size',
            'action' : 'apply_class',
            'show_empty' : true,
            'options' : [
                {key: 'form-control-sm', name: 'Small'},
                {key: '',                name: 'Default'},
                {key: 'form-control-lg', name: 'Large'}
            ]
        };

        var validation = {
            'type' : 'select',
            'name' : 'Validation',
            'action' : 'apply_class',
            'show_empty' : true,
            'options' : [
                {key: 'is-valid', name: 'Valid'},
                {key: 'is-invalid', name: 'Not valid'}
            ]
        };

        var form_inline =  {
            'type' : 'checkbox',
            'name' : 'Inline',
            'action' : 'custom',
            'value' : '1',
            get_value: function (pgel) {
                return pgel.hasClass('form-check-inline') ? "1" : null;
            },
            set_value: function (pgel, value, values, oldValue, eventType) {
                var pglabel = pgel.find('>label');

                if (value) {
                    pgel.addClass('form-check-inline');
                } else {
                    pgel.removeClass('form-check-inline');
                }
                return value;
            }
        }

        var def_form_input = new PgComponentType(prefix + 'form-input', 'Input', {
            'selector_new' : function(pgel) {
                if(pgel.tagName == 'input' && pgel.getAttribute('type') != 'checkbox' && pgel.getAttribute('type') != 'radio') return true;
                //if($el.is('div.form-group')) return true;
                return false;
            },
            'code' : '<input type="text" class="form-control" placeholder="Placeholder text">',
            'sections' : addPrefixToSectionsAndFields({
                'forminputdata' : {
                    name : 'Input options',
                    fields : {
                        'forminputtype' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'action' : 'custom',
                            'options' : [
                                {key: 'text', name: 'Text'},
                                {key: 'password', name: 'Password'},
                                {key: 'number', name: 'Number'},
                                {key: 'email', name: 'Email'},
                                {key: 'file', name: 'File'},
                                {key: 'url', name: 'Url'},
                                {key: 'search', name: 'Search'},
                                {key: 'tel', name: 'Tel'},
                                {key: 'color', name: 'Color'},
                                {key: 'datetime', name: 'Datetime'},
                                {key: 'datetime-local', name: 'Datetime local'},
                                {key: 'date', name: 'Date'},
                                {key: 'month', name: 'Month'},
                                {key: 'time', name: 'Time'},
                                {key: 'week', name: 'Week'}
                            ],
                            get_value: function (pgel) {
                                return pgel.getAttr('type');
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                pgel.setAttr('type', value);
                                return value;
                            }
                        },
                        'forminputvalue': {
                            type: 'text',
                            name: 'Value',
                            action: 'custom',
                            attribute: 'value',
                            get_value: function (pgel) {
                                return pgel.getAttr('value');
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                pgel.setAttr('value', value);
                                return value;
                            }
                        },
                        'forminputplaceholder': {
                            type: 'text',
                            name: 'Placeholder',
                            action: 'element_attribute',
                            attribute: 'placeholder'
                        },
                        'forminputcontrolsize' : control_sizing,
                        'forminputvalidation': validation,
                        'forminputdisabled': attr_disabled,
                        'forminputreadonly': readonly,
                        'forminputrequired': required
                    }
                }
            })
        });
        f.addComponentType(def_form_input);

        var def_form_range = new PgComponentType(prefix + 'form-range', 'Range', {
            'selector_new' : function(pgel) {
                if (pgel.tagName == 'input' && pgel.getAttribute('type') == 'range') return true;
                //if($el.is('div.form-group')) return true;
                return false;
            },
            'code' : '<input type="range" class="form-control-range">',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_range);

        var def_form_textarea = new PgComponentType(prefix + 'form-textarea', 'Textarea', {
            'selector' : 'textarea',
            'code' : '<textarea class="form-control" rows="3"></textarea>',
            'sections' : addPrefixToSectionsAndFields({
                'formtextareastyle' : {
                    name : 'Style',
                    fields : {
                        'formtextarearows' : {
                            'type' : 'text',
                            'name' : 'Rows',
                            'action' : 'element_attribute',
                            'attribute' : 'rows'
                        },
                        'formtextareacontrolsize' : control_sizing,
                        'formtextareavalidation': validation,
                        'formtextareareadonly': readonly,
                        'formtextareadisabled': attr_disabled
                    }
                }
            })
        });
        f.addComponentType(def_form_textarea);

        var def_form_file_group = new PgComponentType(prefix + 'form-file-group', 'File group', {
            'selector': null,
            parent_selector: 'form,fieldset',
            'code': function (env) {
                var id = getUniqueId('formFile');
                return '<div class="form-group">\
                    <label for="' + id + '">Example file input</label>\
                    <input type="file" class="form-control-file" id="' + id + '">\
                </div>';
            },
            'sections': addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_file_group);

        var def_form_file = new PgComponentType(prefix + 'form-file', 'File input', {
            'selector': '.form-control-file',
            'code': '<input type="file" class="form-control-file">',
            'sections': addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_file);

        var def_form_check_label = new PgComponentType(prefix + 'form-check-label', 'Check label', {
            'selector' : '.form-check-label',
            'code' : '<label class="form-check-label">Check me out</label>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_check_label);

        var def_form_checkbox_group = new PgComponentType(prefix + 'form-checkbox-group', 'Checkbox group', {
            'selector_new' : function(pgel) {
                if (pgel.hasClass('form-check')) {
                    var pgRadio = pgel.findOne('input[type="checkbox"]');
                    if (pgRadio) return true;
                }

                return false;
            },
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-check">\
                    <input class="form-check-input" type="checkbox" id="' + id + '" value="option1">\
                    <label class="form-check-label" for="' + id + '">\
                        Option one\
                    </label>\
                </div>'
            },
            action_menu: {
                add: [prefix + 'form-checkbox', prefix + 'form-check-label', prefix + 'form-text', prefix + 'form-feedback']
            },
            'sections' : addPrefixToSectionsAndFields({
                'checkboxgroupstyle' : {
                    name : 'Style',
                    fields : {
                        'checkboxgroupinline' : form_inline,
                        'checkboxgroupdisabled' : class_disabled
                    }
                }
            })
        });
        f.addComponentType(def_form_checkbox_group);

        var def_form_checkbox = new PgComponentType(prefix + 'form-checkbox', 'Checkbox', {
            'selector' : 'input.form-check-input[type="checkbox"]',
            'code' : '<input class="form-check-input" type="checkbox" value="option1">',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_checkbox);

        var def_form_radio_group = new PgComponentType(prefix + 'form-radio-group', 'Radio group', {
            'selector_new' : function(pgel) {
                if (pgel.hasClass('form-check')) {
                    var pgRadio = pgel.findOne('input[type="radio"]');
                    if (pgRadio) return true;
                }

                return false;
            },
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-check">\
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="' + id + '" value="option1">\
                    <label class="form-check-label" for="' + id + '">\
                        Option one\
                    </label>\
                </div>'
            },
            action_menu: {
                add: [prefix + 'form-radio', prefix + 'form-check-label', prefix + 'form-text', prefix + 'form-feedback']
            },
            'sections' : addPrefixToSectionsAndFields({
                'radiogroupstyle' : {
                    name : 'Style',
                    fields : {
                        'radiogroupgroup' : {
                            'type' : 'text',
                            'name' : 'name',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                var pginput = pgel.findOne('input[type="radio"]');
                                return pginput.getAttr('name');
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var pginput = pgel.findOne('input[type="radio"]');
                                pginput.setAttr('name', value);
                                return value;
                            }
                        },
                        'radiogroupinline' : form_inline,
                        'radiogroupdisabled' : class_disabled
                    }
                }
            })
        });
        f.addComponentType(def_form_radio_group);

        var def_form_radio = new PgComponentType(prefix + 'form-radio', 'Radio', {
            'selector' : 'input.form-check-input[type="radio"]',
            'code' : '<input class="form-check-input" type="radio" name="inlineRadioOptions" value="option1">',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_radio);

        var def_form_group_select = new PgComponentType(prefix + 'form-group-select', 'Select group', {
            selector : null,
            parent_selector: 'form,fieldset',
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-group">\
                    <label for="' + id + '">Field label</label>\
                    <select id="' + id + '" class="form-control">\
                        <option>1</option>\
                        <option>2</option>\
                        <option>3</option>\
                    </select>\
                </div>'
            },
            action_menu: {
                add: [prefix + 'form-select', prefix + 'form-label', prefix + 'form-text', prefix + 'form-feedback']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_group_select);

        var def_form_select = new PgComponentType(prefix + 'form-select', 'Select', {
            'selector' : 'select',
            'code' : '<select class="form-control">\
                <option>1</option>\
                <option>2</option>\
                <option>3</option>\
            </select>',
            action_menu: {
                add: [prefix + 'form-select-option']
            },
            'sections' : addPrefixToSectionsAndFields({
                'formselectstyle' : {
                    name : 'Select style',
                    fields : {
                        'formselectcontrolsize' : control_sizing,
                        'formselectmultiple' : {
                            'type' : 'checkbox',
                            'name' : 'Multiple',
                            'action' : 'element_attribute',
                            'attribute' : 'multiple',
                            'value' : 'multiple',
                            'attribute_without_value' : true
                        },
                        'formselectdisabled' : attr_disabled
                    }
                }
            })
        });
        f.addComponentType(def_form_select);

        var def_form_select_option = new PgComponentType(prefix + 'form-select-option', 'Select option', {
            'selector' : 'option',
            'code' : '<option value="value">Name</option>',
            'preview' : 'none',
            'sections' : addPrefixToSectionsAndFields({
                'selectoptiondata' : {
                    name : 'Data',
                    fields : {
                        'selectoptionvalue' : {
                            'type' : 'text',
                            'name' : 'Value',
                            'action' : 'element_attribute',
                            'attribute' : 'value'
                        },
                        'selectoptiontext' : {
                            'type' : 'text',
                            'name' : 'Name',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_form_select_option);

        var formlabelfor = {
            'type' : 'text',
            'name' : 'For field id',
            'action' : 'element_attribute',
            'attribute' : 'for'
        };

        var def_form_label = new PgComponentType(prefix + 'form-label', 'Label', {
            'selector' : 'label',
            'code' : '<label>Label</label>',
            'sections' : addPrefixToSectionsAndFields({
                'formlabelstyle' : {
                    name : 'Label options',
                    fields : {
                        'formlabelforid' : formlabelfor
                    }
                }
            })
        });
        f.addComponentType(def_form_label);

        var def_form_fieldset = new PgComponentType(prefix + 'form-fieldset', 'Fieldset', {
            'selector' : 'fieldset',
            parent_selector: 'form',
            'code' : '<fieldset></fieldset>',
            action_menu: {
                add: [prefix + 'form-group', prefix + 'form-textarea-group', prefix + 'form-checkbox-group', prefix + 'form-radio-group', prefix + 'form-group-select', prefix + 'form-file-group']
            },
            'sections' : addPrefixToSectionsAndFields({
                'formfieldsetstyle' : {
                    name : 'Fieldset style',
                    fields : {
                        formfieldsetdisabled: addPrefixToSectionsAndFields
                    }
                }
            })
        });
        f.addComponentType(def_form_fieldset);

        var def_form_row = new PgComponentType(prefix + 'form-row', 'Form row', {
            'selector' : '.form-row',
            parent_selector: 'form',
            'code' : '<div class="form-row"></div>',
            action_menu: {
                add: [prefix + 'form-group', prefix + 'form-textarea-group', prefix + 'form-checkbox-group', prefix + 'form-radio-group', prefix + 'form-group-select', prefix + 'form-file-group', prefix + 'column'],
                'on_add' : function(pgel, pgnew, newdef, prepend) {
                    if (newdef.type != prefix + 'column') {
                        pgnew.addClass('col-md-6');
                    }

                    if (prepend) {
                        pgel.prepend(pgnew);
                    } else {
                        pgel.append(pgnew);
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
                'formrowstyle' : {
                    name : 'Style',
                    fields : {
                        formrowdisabled: addPrefixToSectionsAndFields
                    }
                }
            })
        });
        f.addComponentType(def_form_row);

        var def_form_help = new PgComponentType(prefix + 'form-text', 'Help text', {
            'selector' : '.form-text',
            'code' : '<span class="form-text">A block of help text.</span>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_form_help);

        var def_form_feedback = new PgComponentType(prefix + 'form-feedback', 'Feedback', {
            'selector' : '.invalid-feedback',
            'code' : '<div class="invalid-feedback">A block of invalid feedback text.</div>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_form_feedback);

        var def_form_input_group = new PgComponentType(prefix + 'form-input-group', 'Input group', {
            'selector' : 'div.input-group',
            'priority' : 100,
            'code' : '<div class="input-group">\
                <div class="input-group-prepend">\
                    <div class="input-group-text">@</div>\
                </div>\
                <input type="text" class="form-control" placeholder="Username">\
            </div>',
            action_menu : {
                'add' : [prefix + 'input-group-append', prefix + 'input-group-prepend', prefix + 'form-input'],
                'on_add' : function(pgel, pgnew, newdef, prepend) {
                    if (newdef.type == prefix + 'input-group-append') {
                        pgel.append(pgnew);
                    }
                    else if (newdef.type == prefix + 'input-group-prepend') {
                        pgel.prepend(pgnew);
                    }
                    else {
                        if (prepend) {
                            pgel.prepend(pgnew);
                        } else {
                            pgel.append(pgnew);
                        }
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
                'inputgroupstyle' : {
                    name : 'Input group',
                    fields : {
                        inputgroupsize: {
                            name: 'Size',
                            type: 'select',
                            action: 'apply_class',
                            show_empty : true,
                            options: [
                                {key: 'input-group-lg', name: 'Large'},
                                {key: 'input-group-sm', name: 'Small'}
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_form_input_group);

        var def_form_range_group = new PgComponentType(prefix + 'form-range-group', 'Range group', {
            'priority' : 100,
            'code' : '<div class="form-group">\
                <label for="formControlRange">Example Range input</label>\
                <input type="range" class="form-control-range" id="formControlRange">\
            </div>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_form_range_group);

        var bsinputgroupspan = {
            name : 'Input group Addon',
            fields : {
                bsinputspanpos: {
                    type: 'select',
                    name: 'Position',
                    action: 'custom',
                    options: [
                        {key: 'input-group-prepend', name: 'Prepend'},
                        {key: 'input-group-append',  name: 'Append'}
                    ],
                    get_value: function (pgel) {
                             if (pgel.hasClass('input-group-prepend')) return 'input-group-prepend';
                        else if (pgel.hasClass('input-group-append'))  return 'input-group-append';
                    },
                    set_value: function (pgel, value, values, oldValue) {
                        if (value != oldValue) {
                            var pgp = pgel.parent;
                            if (value == 'input-group-prepend') {
                                pgel.prependTo(pgp);
                            }
                            else if (value == 'input-group-append') {
                                pgel.appendTo(pgp);
                            }
                        }
                    }
                }
            }
        }

        var def_input_group_prepend = new PgComponentType(prefix + 'input-group-prepend', 'Input group prepend', {
            'selector' : '.input-group-prepend',
            'code' : '<div class="input-group-prepend">\
                <div class="input-group-text">@</div>\
            </div>',
            action_menu : {
                'add' : [prefix + 'input-group-text']
            },
            'sections' : addPrefixToSectionsAndFields({
                'bsinputgroupspan' : bsinputgroupspan
            })
        });
        f.addComponentType(def_input_group_prepend);

        var def_input_group_append = new PgComponentType(prefix + 'input-group-append', 'Input group append', {
            'selector' : '.input-group-append',
            'code' : '<div class="input-group-append">\
                <div class="input-group-text">@</div>\
            </div>',
            action_menu : {
                'add' : [prefix + 'input-group-text']
            },
            'sections' : addPrefixToSectionsAndFields({
                'bsinputgroupspan' : bsinputgroupspan
            })
        });
        f.addComponentType(def_input_group_append);

        var def_input_group_text = new PgComponentType(prefix + 'input-group-text', 'Input group text', {
            'selector' : '.input-group-text',
            'code' : '<div class="input-group-text">@</div>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_input_group_text);

        var def_form_custom_checkbox = new PgComponentType(prefix + 'form-custom-checkbox', 'Custom checkbox', {
            'selector' : '.custom-checkbox',
            'code' : function () {
                var id = getUniqueId('formCustomCheckbox');
                return '<div class="custom-control custom-checkbox">\
                    <input type="checkbox" class="custom-control-input" id="' + id + '">\
                    <label class="custom-control-label" for="' + id + '">Remember my preference</label>\
                </div>';
            },
            action_menu: {
                add: [prefix + 'custom-checkbox-control-input', prefix + 'custom-control-label']
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_form_custom_checkbox);

        var def_form_custom_radio = new PgComponentType(prefix + 'form-custom-radio', 'Custom radio', {
            'selector' : '.custom-radio',
            'code' : function () {
                var id = getUniqueId('formCustomCheckbox');
                return '<div class="custom-control custom-radio">\
                    <input id="' + id + '" name="radio-stacked" type="radio" class="custom-control-input">\
                    <label class="custom-control-label" for="' + id + '">Remember my preference</label>\
                </div>';
            },
            action_menu: {
                add: [prefix + 'custom-radio-control-input', prefix + 'custom-control-label']
            },
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_form_custom_radio);

        var def_custom_checkbox_control = new PgComponentType(prefix + 'custom-checkbox-control-input', 'Custom control input', {
            'selector' : 'input.custom-control-input[type="checkbox"]',
            'code' : '<input type="checkbox" class="custom-control-input" required>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_custom_checkbox_control);

        var def_custom_radio_control = new PgComponentType(prefix + 'custom-radio-control-input', 'Custom control input', {
            'selector' : 'input.custom-control-input[type="radio"]',
            'code' : '<input name="radio-stacked" type="radio" class="custom-control-input" required>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_custom_radio_control);

        var def_custom_control_label = new PgComponentType(prefix + 'custom-control-label', 'Custom control label', {
            'selector' : '.custom-control-description',
            'code' : '<label class="custom-control-label">Remember my preference</label>',
            'sections' : addPrefixToSectionsAndFields({})
        });
        f.addComponentType(def_custom_control_label);

        var def_custom_select = new PgComponentType(prefix + 'custom-select', 'Custom select', {
            'selector' : '.custom-select',
            'code' : '<select class="custom-select">\
                <option selected>Open this select menu</option>\
                <option value="1">One</option>\
                <option value="2">Two</option>\
                <option value="3">Three</option>\
            </select>',
            action_menu: {
                add: [prefix + 'form-select-option']
            },
            'sections' : addPrefixToSectionsAndFields({
                bscustomselect : {
                    name : 'Custom select',
                    fields : {
                        bscustomselectsize : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'apply_class',
                            'show_empty' : 'true',
                            'options' : [
                                { key: 'custom-select-sm', name: 'Small' },
                                { key: 'custom-select-lg', name: 'Large' }
                            ]
                        },
                        bsselectsizeattr : {
                            'type' : 'slider',
                            'name' : 'Size Attr',
                            'slider_def_unit' : '',
                            'action' : 'element_attribute',
                            'attribute' : 'size',
                            'units' : false,
                            'min' : 0
                        }
                    }
                }
            })
        });
        f.addComponentType(def_custom_select);

        var def_custom_file = new PgComponentType(prefix + 'custom-file', 'Custom file', {
            'selector' : '.custom-file',
            'code' : function () {
                var id = getUniqueId('custom-file', null, 0);
                return '<div class="custom-file">\
                    <input type="file" class="custom-file-input" id="' + id + '">\
                    <label class="custom-file-label" for="' + id + '">Choose file</label>\
                </div>'
            },
            'action_menu' : {
                'add' : [prefix + 'custom-file-input', prefix + 'custom-file-label']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_custom_file);

        var def_custom_file_input = new PgComponentType(prefix + 'custom-file-input', 'Custom file input', {
            'selector' : '.custom-file-input',
            'code' : '<input type="file" class="custom-file-input">',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_custom_file_input);

        var def_custom_file_label = new PgComponentType(prefix + 'custom-file-label', 'Custom file label', {
            'selector' : '.custom-file-label',
            'code' : '<label class="custom-file-label">Choose file</label>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_custom_file_label);

        var form = new PgFrameworkLibSection(prefix + 'forms', 'Forms');
        form.setComponentTypes([def_form, def_form_group, def_form_ta_group, def_form_group_select, def_form_checkbox_group, def_form_file_group, def_form_custom_checkbox, def_form_radio_group, def_form_input_group, def_input_group_append, def_input_group_prepend, def_form_input, def_form_textarea, def_form_range, def_form_checkbox, def_form_radio, def_form_select, def_form_file, def_form_select_option, def_form_label, def_form_fieldset, def_form_row, def_form_help, def_form_feedback, def_form_custom_checkbox, def_form_custom_radio, def_custom_select, def_custom_file]);
        f.addLibSection(form);


        // Modals
        var def_modal = new PgComponentType(prefix + 'modal', 'Modal', {
            'selector' : '.modal',
            'code' : function() {
                var id = getUniqueId('modal', null, 0);
                return '<div class="modal fade pg-show-modal" id="' + id + '" tabindex="-1" role="dialog" aria-hidden="true">\
                    <div class="modal-dialog">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <h4 class="modal-title">Modal title</h4>\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            </div>\
                            <div class="modal-body">\
                                <p>One fine body&hellip;</p>\
                            </div>\
                            <div class="modal-footer">\
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                                <button type="button" class="btn btn-primary">Save changes</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
            },
            preview: '<div class="modal open fade in" style="display:block;opacity:1;height:300px;width:500px;position:relative;">\
                <div class="modal-dialog modal-sm">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <h4 class="modal-title">Modal title</h4>\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                        </div>\
                        <div class="modal-body">\
                            <p>One fine body&hellip;</p>\
                        </div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                            <button type="button" class="btn btn-primary">Save changes</button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            ',
            _editModalTriggers: function(pgel, $clicked) {
                var q = new PgQuickSelectElement({
                    title: 'Edit triggers for showing the modal',
                    description: '<p>Select an element (usually a button or a link) that should open the modal.</p>',
                    reselect: true,
                    target: $clicked,
                    current_col: function() {
                        var mid = pgel.getAttribute('id');
                        if(mid) {
                            var col = new PgCollection();
                            col.setList(pgel.document.findWithMultipleAttrValues([
                                {
                                    name: 'data-toggle',
                                    value: 'modal'
                                },
                                {
                                    name: 'data-target',
                                    value: '#' + mid
                                }
                            ]))
                            return col;
                        } else {
                            return null;
                        }
                    },
                    remove: true,
                    func: function(col, remove_col) {
                        var mid = pgel.getAttribute('id');
                        if(!mid) {
                            mid = pgel.getUniqueIdAttribute('modal');
                            pgel.setAttribute('id', mid);
                        }
                        var api = new PgApi();
                        api.setAttribute(col, [
                            {
                                name: 'data-toggle',
                                value: 'modal'
                            },
                            {
                                name: 'data-target',
                                value: '#' + mid
                            }
                        ])
                        api.removeAttribute(remove_col, ['data-toggle', 'data-target']);
                        pinegrow.showQuickMessage('The modal triggers are set.')
                    }
                })
            },
            on_get_menu_commands: function(pgel, list, $el) {
                var _this = this;
                list.push({
                    icon: 'icon-267',
                    label: 'Edit modal triggers...',
                    header: 'Modal',
                    tooltip: 'Edit triggers for showing the modal.',
                    action: function(pgel, $clicked) {
                        _this._editModalTriggers(pgel, $clicked || $el)
                    }
                })
            },
            tags: 'major',
            on_inserted : function(pgel, page) {
                showJavascriptMessage();
            },
            'sections' : addPrefixToSectionsAndFields({
                bsmodal : {
                    name : 'Modal options',
                    fields : {
                        bsmodalsize : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'custom',
                            'show_empty' : false,
                            'options' : [
                                {key: '', name: 'Normal', ahtml: bm.makeText('Normal')},
                                {key: 'modal-sm', name: 'Small', ahtml: bm.makeText('Small')},
                                {key: 'modal-lg', name: 'Large', ahtml: bm.makeText('Large')}
                            ],
                            toggle_buttons: false,
                            get_value: function (pgel) {
                                var pgm = pgel.findOne('.modal-dialog');

                                if (pgm && pgm.hasClass('modal-sm')) return 'modal-sm';
                                if (pgm && pgm.hasClass('modal-lg')) return 'modal-lg';
                                return null
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var pgm = pgel.findOne('.modal-dialog');

                                if(pgm) {
                                    pgm.removeClass('modal-sm');
                                    pgm.removeClass('modal-lg');
                                    if (value) pgm.addClass(value);
                                }
                                return value;
                            }
                        },
                        bsmodalbackdrop : {
                            'type' : 'select',
                            'name' : 'Backdrop',
                            'action' : 'element_attribute',
                            attribute : 'data-backdrop',
                            'show_empty' : true,
                            toggle_buttons: false,
                            'options' : [
                                {key: 'true', name: 'Yes (default)', ahtml: bm.makeText('Yes')},
                                {key: 'false', name: 'No', ahtml: bm.makeText('No')},
                                {key: 'static', name: 'Static', ahtml: bm.makeText('Static')}
                            ]
                        },
                        bsmodalcentered : {
                            type: 'checkbox',
                            name : 'Centered',
                            value: '1',
                            action: "custom",
                            get_value: function (pgel) {
                                var pgModalDialog = pgel.findOne('.modal-dialog');
                                if (pgModalDialog) {
                                    return pgModalDialog.hasClass('modal-dialog-centered') ? '1' : null;
                                }

                                return null;
                            },
                            set_value: function (pgel, value, values) {
                                var pgModalDialog = pgel.findOne('.modal-dialog');
                                if (value) {
                                    if (pgModalDialog) {
                                        pgModalDialog.addClass('modal-dialog-centered');
                                        return '1';
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else {
                                    if (pgModalDialog) {
                                        pgModalDialog.removeClass('modal-dialog-centered');
                                    }
                                }

                                return value;
                            }
                        },
                        bsmodalanimate : {
                            'type' : 'checkbox',
                            'name' : 'Animate',
                            'value' : 'fade',
                            'action' : 'apply_class'
                        },
                        bsmodalescape : {
                            'type' : 'select',
                            'name' : 'Close on ESC',
                            'type' : 'checkbox',
                            'value' : 'true',
                            default_value: 'true',
                            negvalue: 'false',
                            'action' : 'element_attribute',
                            attribute : 'data-keyboard'
                        },
                        bsmodalfocus : {
                            'type' : 'select',
                            'name' : 'Focus when open',
                            'type' : 'checkbox',
                            'value' : 'true',
                            default_value: 'true',
                            negvalue: 'false',
                            'action' : 'element_attribute',
                            attribute : 'data-focus'
                        },
                        bsmodaleditshow : {
                            'type' : 'checkbox',
                            'name' : 'Show during editing',
                            'value' : 'pg-show-modal',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                return pgel.hasClass('pg-show-modal') ? 'pg-show-modal' : null;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                if (value) {
                                    pgel.addClass(value);
                                } else {
                                    pgel.removeClass('pg-show-modal');
                                }
                                removeDisplayStyle(pgel);
                                return value;
                            }
                        },
                        bsmodaltriggers : {
                            'type' : 'button',
                            'action': 'button',
                            'name' : 'Modal triggers...',
                            'func' : function(pgel, $button) {
                                def_modal._editModalTriggers(pgel, $button);
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_modal);

        var modal_section = new PgFrameworkLibSection(prefix + 'modal', 'Modals');
        modal_section.setComponentTypes([def_modal]);
        f.addLibSection(modal_section);


        // Navbar
        var def_navbar = new PgComponentType(prefix + 'navbar', 'Navbar', {
            'selector' : '.navbar',
            'code' : function(env) {
                var id = getUniqueId('navbarToggler');
                return '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
                    <a class="navbar-brand" href="#">Brand</a>\
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#' + id + '" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">\
                        <span class="navbar-toggler-icon"></span>\
                    </button>\
                    <div class="collapse navbar-collapse" id="' + id + '">\
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">\
                            <li class="nav-item active">\
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link" href="#">Link</a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link disabled" href="#">Disabled</a>\
                            </li>\
                            <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Dropdown link\
                                </a>\
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">\
                                    <a class="dropdown-item" href="#">Action</a>\
                                    <a class="dropdown-item" href="#">Another action</a>\
                                    <a class="dropdown-item" href="#">Something else here</a>\
                                </div>\
                            </li>\
                        </ul>\
                        <form class="form-inline my-2 my-lg-0">\
                            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">\
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
                        </form>\
                    </div>\
                </nav>';
            },
            tags: 'major',
            'action_menu' : {
                'add' : [prefix + 'navbar-brand', 'link', prefix + 'navbar-collapse', prefix + 'navbar-toggler', prefix + 'form-navbar', prefix + 'navbar-list', prefix + 'navbar-nav-item', prefix + 'navbar-dropdown'],
                'on_add' : function(pgel, pgnew, newdef, prepend) {
                    if (['link', prefix + 'navbar-nav-item', prefix + 'navbar-dropdown'].indexOf(newdef.type) >= 0) {
                        var pgdiv = pgel.findOne('.navbar-collapse');
                        var pgul = pgdiv.findOne('ul');
                        if (!pgul) {
                            var pgul = pgCreateNodeFromHtml('<ul class="navbar-nav"></ul>');
                            pgdiv.append(pgul);
                        }

                        if(prepend) {
                            pgul.prepend(pgnew);
                        } else {
                            pgul.append(pgnew);
                        }
                    } else if([prefix + 'navbar-brand', prefix + 'navbar-collapse', prefix + 'navbar-toggler'].indexOf(newdef.type) >= 0) {
                        if (prepend) {
                            pgel.prepend(pgnew);
                        } else {
                            pgel.append(pgnew);
                        }
                    } else if([prefix + 'form-navbar', prefix + 'navbar-list'].indexOf(newdef.type) >= 0) {
                        var pgdiv = pgel.findOne('.navbar-collapse');
                        if (prepend) {
                            pgdiv.prepend(pgnew);
                        } else {
                            pgdiv.append(pgnew);
                        }
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
                navbar : {
                    name : 'Navbar style',
                    fields : {
                        navbarstyle : {
                            type: 'select',
                            name: 'Style',
                            action: "apply_class",
                            options: [
                                { key: 'navbar-light', name: 'Light' },
                                { key: 'navbar-dark',  name: 'Dark' }
                            ]
                        },
                        navbarbgcolor : {
                            name : 'Background',
                            type : 'select' ,
                            show_empty: true,
                            toggle_buttons: true,
                            action: "apply_class",
                            options: bgColorOptions
                        },
                        navbarcollapse : {
                            name : 'Collapsable',
                            'type': 'checkbox' ,
                            value: '1',
                            action: "custom",
                            get_value: function (pgel) {
                                return pgel.findOne('.navbar-collapse') ? '1' : null;
                            },
                            set_value: function (pgel, value, values) {
                                if (value) {
                                    var id = getUniqueId('navbarToggler');
                                    var pgbutton = pgCreateNodeFromHtml('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#' + id + '" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">\
                                        <span class="navbar-toggler-icon"></span>\
                                    </button>');
                                    pgel.append(pgbutton);

                                    var pgnav = pgel.find('.navbar-nav');
                                    var pgform = pgel.find('.form-inline');

                                    var pgcollapse = pgCreateNodeFromHtml('<div class="collapse navbar-collapse" id="' + id + '"></div>');
                                    pgel.append(pgcollapse);

                                    for (var i = 0; i < pgnav.length; i++) {
                                        pgcollapse.append(pgnav[i]);
                                    }
                                    for (var i = 0; i < pgform.length; i++) {
                                        pgcollapse.append(pgform[i]);
                                    }
                                }
                                else {
                                    var pgnavtoggle = pgel.findOne('.navbar-toggler');
                                    if (pgnavtoggle) pgnavtoggle.remove();

                                    var pgcollapse = pgel.findOne('.navbar-collapse');
                                    var pgchildren = pgcollapse.children;
                                    while (pgchildren.length > 0) {
                                        pgel.append(pgchildren[0]);
                                    }

                                    pgcollapse.remove();
                                }

                                return value;
                            }
                        },
                        navbartype : {
                            name : 'Type',
                            type : 'select' ,
                            show_empty: true,
                            action: "apply_class",
                            options: [
                                {key: "fixed-top", name: "Fixed - top", tip: "Add padding-top to body to prevent navbar overlapping the content."},
                                {key: "fixed-bottom", name: "Fixed - bottom", tip: "Add padding-bottom to body to prevent navbar overlapping the content."},
                                {key: "sticky-top", name: "Sticky - top"}
                            ]
                        },
                        navbarexpand : {
                            name : 'Expand',
                            type : 'select',
                            show_empty: true,
                            action: "apply_class",
                            options: [
                                {key: "navbar-expand",    name: "Xs"},
                                {key: "navbar-expand-sm", name: "Sm"},
                                {key: "navbar-expand-md", name: "Md"},
                                {key: "navbar-expand-lg", name: "Lg"},
                                {key: "navbar-expand-xl", name: "Xl"}
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_navbar);

        var def_nav_toggler = new PgComponentType(prefix + 'navbar-toggler', 'Navbar toggler', {
            'selector' : '.navbar-toggler',
            'code' : '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">\
                <span class="navbar-toggler-icon"></span>\
            </button>',
            'sections' : addPrefixToSectionsAndFields({
                navtoggler : {
                    name : 'Toggler',
                    fields : {
                        'navtogglertarget' : {
                            'type' : 'text',
                            'name' : 'Target',
                            'action' : 'custom',
                            get_value: function (pgel) {
                                var target = pgel.getAttr('data-target')
                                return target.length > 0 ? target.substr(1, target.length) : '';
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                pgel.setAttr('data-target', '#' + value);
                                pgel.setAttr('aria-controls', value);

                                var pgcollapse = pgel.siblingOne('.collapse');
                                pgcollapse.setAttr('id', value);

                                return value;
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_nav_toggler);

        var def_nav_collapse = new PgComponentType(prefix + 'navbar-collapse', 'Navbar collapse', {
            'selector' : '.navbar-collapse',
            'code' : '<div class="collapse navbar-collapse"></div>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_nav_collapse);

        var def_nav = new PgComponentType(prefix + 'nav', 'Nav', {
            'selector' : '.nav',
            'code' : '<ul class="nav">\
                <li class="nav-item">\
                    <a class="nav-link active" href="#">Active</a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link" href="#">Longer nav link</a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link" href="#">Link</a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link disabled" href="#">Disabled</a>\
                </li>\
            </ul>',
            'priority' : 100,
            'sections' : addPrefixToSectionsAndFields({
                nav : {
                    name : 'Nav',
                    fields : {
                        'navtype' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {'key' : 'nav-tabs', 'name' : 'Tabs'},
                                {'key' : 'nav-pills', 'name' : 'Pills'}
                            ]
                        },
                        'navfill' : {
                            name : 'Fill',
                            type : 'checkbox',
                            action : 'apply_class',
                            value : 'nav-fill'
                        },
                        'navjustified' : {
                            type: 'checkbox',
                            name: 'Justified',
                            action: 'apply_class',
                            value: 'nav-justified'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_nav);

        var def_nav_item = new PgComponentType(prefix + 'navbar-nav-item', 'Navbar nav item', {
            'selector' : '.nav-item',
            'code' : '<li class="nav-item">\
                <a class="nav-link" href="#">Link</a>\
            </li>',
            'priority' : 100,
            'action_menu' : {
                'add' : [prefix + 'navbar-nav-link']
            },
            'sections' : addPrefixToSectionsAndFields({
                navitem : {
                    name : 'Nav item Options',
                    fields : {
                        'navlinkactive' : {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'apply_class',
                            value: 'active'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_nav_item);

        var def_nav_link = new PgComponentType(prefix + 'navbar-nav-link', 'Nav link', {
            'selector' : '.nav-link',
            'parent_selector' : '.nav-item',
            'code' : '<a class="nav-link" href="#">Link</a>',
            'sections' : addPrefixToSectionsAndFields({
                navlink : {
                    name : 'Nav link Options',
                    fields : {
                        disabled: class_disabled
                    }
                }
            })
        });
        f.addComponentType(def_nav_link);

        var def_brand = new PgComponentType(prefix + 'navbar-brand', 'Navbar brand', {
            'selector' : '.navbar-brand',
            'code' : '<a class="navbar-brand" href="#">Brand</a>',
            'sections' : addPrefixToSectionsAndFields({
                brand : {
                    name : 'Link',
                    fields : {
                        'brandhref' : {name : 'Url', type : 'text', action: 'element_attribute', attribute: 'href'},
                        'brandtarget' : {name : 'Target', type : 'text', action: 'element_attribute', attribute: 'target'}
                    }
                }
            })
        });
        f.addComponentType(def_brand);

        var def_navbar_form = new PgComponentType(prefix + 'form-navbar', 'Form navbar', {
            'selector' : null,
            'code' : '<form class="form-inline">\
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">\
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
            </form>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_navbar_form);

        var def_navbar_list = new PgComponentType(prefix + 'navbar-list', 'Navbar list', {
            'selector' : 'ul.navbar-nav',
            'code' : '<ul class="navbar-nav"></ul>',
            tags: 'major',
            properity: 101,
            'action_menu' : {
                'add' : ['link', prefix + 'navbar-dropdown'],
                'on_add' : function (pgel, pgnew, newdef, prepend) {
                    // var pgli = new pgQuery().create('<li></li>');
                    var pgli = pgCreateNodeFromHtml('<li></li>');
                    pgel.append(pgli);

                    if (prepend) {
                        pgli.prepend(pgnew);
                    } else {
                        pgli.append(pgnew);
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_navbar_list);

        var def_navbar_dropdown = new PgComponentType(prefix + 'navbar-dropdown', 'Navbar dropdown', {
            'selector' : null,
            'code' : '<li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                    Dropdown link\
                </a>\
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">\
                    <a class="dropdown-item" href="#">Action</a>\
                    <a class="dropdown-item" href="#">Another action</a>\
                    <a class="dropdown-item" href="#">Something else here</a>\
                </div>\
            </li>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_navbar_dropdown);


        // Tabs
        var findTabsContentPanes = function(pgtabs) {
            var nextPg = pgtabs.next();
            if (nextPg && nextPg.isSelector('.tab-content')) {
                return nextPg;
            }
            var pga = pgtabs.findOne('a');
            if (pga) {
                if (pga.getAttr('data-toggle') == 'tab') {
                    var pgp = findTabPane(pga);
                    if (pgp) {
                        var pgdiv = pgp.parent;
                        if (pgdiv.isSelector('.tab-content')) return pgdiv;
                    }
                }
            }
            return null;
        }

        var findTabSel = function(pga) {
            var sel = pga.getAttr('data-target');
            if (!sel) sel = pga.getAttr('href');
            if (sel) sel = sel.replace('#','');
            if (sel && sel.length == 0) sel = null;
            return sel;
        }

        var findTabPane = function(pga) {
            var sel = findTabSel(pga);
            if (!sel) return null;
            try {
                var pgp = pga.closest('body').findOne(sel);
                return pgp;
            }
            catch(err) {}
            return null;
        }

        var def_tabs = new PgComponentType(prefix + 'tabs', 'Tabs', {
            'selector' : 'ul.nav-tabs,ul.nav-pills',
            'code' : '<ul class="nav nav-tabs" role="tablist">\
                <li class="nav-item">\
                    <a class="nav-link active" href="#" data-toggle="tab" role="tab" aria-controls="" aria-expanded="true">Home</a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link" href="#" data-toggle="tab" role="tab" aria-controls="" aria-expanded="true">Profile</a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link" href="#" data-toggle="tab" role="tab" aria-controls="" aria-expanded="true">Messages</a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link" href="#" data-toggle="tab" role="tab" aria-controls="" aria-expanded="true">Settings</a>\
                </li>\
            </ul>',
            'action_menu' : {
                'add': [prefix + 'navbar-nav-item', prefix + 'navbar-dropdown', prefix + 'tab-pane'],
                'on_add' : function(pgel, pgnew, newdef, prepend) {
                    var pgpanes = findTabsContentPanes(pgel);

                    if (pgnew.isSelector('.tab-pane')) {
                        if (!pgpanes) {
                            pgpanes = pgCreateNodeFromHtml('<div class="tab-content"></div>').insertAfter(pgel);
                        }

                        if (prepend) {
                            pgpanes.prepend(pgnew);
                        } else {
                            pgpanes.append(pgnew);
                        }
                    } else {
                        if (pgnew.tagName != 'li') {
                            pgnew = pgCreateNodeFromHtml('<li></li>').append(pgnew).addClass('dropdown');
                        }

                        if (prepend) {
                            pgel.prepend(pgnew);
                        } else {
                            pgel.append(pgnew);
                        }
                    }

                    if (pgpanes && pgnew.tagName == 'li') {
                        var pgaparent = pgnew;
                        if (newdef.type == prefix + 'navbar-dropdown') {
                            pgaparent = pgnew.findOne('.dropdown-menu');
                        }

                        var pgas = pgaparent.find('> a');
                        for (var i = 0; i < pgas.length; i++) {
                            var pga = pgas[i];
                            var sel = findTabSel(pga);
                            var pgp = findTabPane(pga);

                            if (!pgp || pgp.length == 0) {
                                if (!sel) {
                                    sel = getUniqueId('tab', null, 0);
                                    pga.setAttr('href', '#' + sel);
                                }
                                pga.setAttr('data-toggle', 'tab');

                                pgnew = pgCreateNodeFromHtml('<div class="tab-pane" id="' + sel + '"><p>Tab ' + sel + ' content goes here...</p></div>');
                                if (prepend) {
                                    pgpanes.prepend(pgnew);
                                } else {
                                    pgpanes.append(pgnew);
                                }
                            }
                        }
                    }
                    else {
                        var pgli = pgCreateNodeFromHtml('<li class="nav-item"><a class="nav-link" href="#" data-toggle="tab" role="tab" aria-controls="" aria-expanded="true">Link</a></li>');

                        var pga = pgli.findOne('> a');
                        var sel = getUniqueId('tab', null, 0);
                        pga.setAttr('href', '#' + sel);
                        pgnew.setAttr('id', sel);

                        if (prepend) {
                            pgel.prepend(pgli);
                        } else {
                            pgel.append(pgli);
                        }
                    }
                }
            },
            tags : 'major',
            'sections' : addPrefixToSectionsAndFields({
                'tabs' : {
                    name : 'Tabs and Pills',
                    fields : {
                        'tabswithpanes' : {
                            'type' : 'checkbox',
                            'name' : 'With panes',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function (pgel) {
                                return findTabsContentPanes(pgel) ? '1' : null;
                            },
                            set_value: function (pgel, value, values, oldValue, eventType) {
                                var pgpanes = findTabsContentPanes(pgel);

                                if (value) {
                                    var active = pgel.find('> li').indexOf(pgel.find('> li > a.active')[0]);
                                    if (active < 0) active = 0;

                                    if (!pgpanes) {
                                        var html = pgel.data['crsa-tab-panes'];
                                        if (html) {
                                            pgpanes = pgCreateNodeFromHtml(html);
                                        } else {
                                            pgpanes = pgCreateNodeFromHtml('<div class="tab-content"></div>');
                                            var pglilink = pgel.find('>li a');

                                            for (var i = 0; i < pglilink.length; i++) {
                                                var pgtab = pglilink[i];

                                                var sel = findTabSel(pgtab);
                                                if (!sel) {
                                                    sel = getUniqueId('tab', null, i);
                                                    pgtab.setAttr('data-target', '#' + sel);
                                                }
                                                pgtab.setAttr('data-toggle', 'tab');

                                                var pgp = pgCreateNodeFromHtml('<div class="tab-pane" id="' + sel + '">Tab ' + sel + ' content goes here...</div>');
                                                pgpanes.append(pgp);
                                                if (i == active) {
                                                    pgp.addClass('active');
                                                }
                                            }
                                        }
                                        pgpanes.insertAfter(pgel);
                                    }
                                } else {
                                    if (pgpanes) {
                                        pgel.data['crsa-tab-panes'] = pgpanes.get$DOMElement();
                                        pgpanes.remove();
                                    }
                                }
                                showJavascriptMessage();
                            }
                        }
                    }
                }
            })
        });
        f.addComponentType(def_tabs);

        var def_tab_content = new PgComponentType(prefix + 'tab-content', 'Tab content', {
            'selector' : '.tab-content',
            'code' : '<div class="tab-content"></div>',
            'action_menu' : {
                'add' : [prefix + 'tab-pane']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_tab_content);

        var def_tab_pane = new PgComponentType(prefix + 'tab-pane', 'Tab pane', {
            'selector' : '.tab-pane',
            parent_selector: '.tab-content',
            'code' : '<div class="tab-pane"><p>Tab content goes here...</p></div>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_tab_pane);

        // Breadcrumb
        var def_breadcrumb = new PgComponentType(prefix + 'breadcrumb', 'Breadcrumbs', {
            'tags' : 'major',
            'selector' : 'ol.breadcrumb',
            'code' : '<ol class="breadcrumb">\
                <li class="breadcrumb-item"><a href="#">Home</a></li>\
                <li class="breadcrumb-item"><a href="#">Library</a></li>\
                <li class="breadcrumb-item active">Data</li>\
            </ol>',
            'priority' : 100,
            'action_menu' : {
                'add' : [prefix + 'breadcrumb-item']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_breadcrumb);

        var def_breadcrumb_item = new PgComponentType(prefix + 'breadcrumb-item', 'Breadcrumb item', {
            'selector' : '.breadcrumb-item',
            'code' : '<li class="breadcrumb-item"><a href="#">Link</a></li>',
            'priority' : 100,
            'sections' : addPrefixToSectionsAndFields({
                'breadcrumb-item' : {
                    name : 'Breadcrumb item',
                    fields : {
                        'active' : {
                            'type' : 'checkbox',
                            'name' : 'Active',
                            'value' : 'active',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_breadcrumb_item);

        // Pagination
        var def_pagination = new PgComponentType(prefix + 'pagination', 'Pagination', {
            tags: 'major',
            'selector' : 'ul.pagination',
            'code' : '<ul class="pagination">\
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>\
                <li class="page-item"><a class="page-link" href="#">1</a></li>\
                <li class="page-item"><a class="page-link" href="#">2</a></li>\
                <li class="page-item"><a class="page-link" href="#">3</a></li>\
                <li class="page-item"><a class="page-link" href="#">Next</a></li>\
            </ul>',
            'priority' : 100,
            'action_menu' : {
                'add' : [prefix + 'pagination-item', prefix + 'pagination-previous', prefix + 'pagination-next'],
                'on_add' : function(pgel, pgnew, newdef, prepend) {
                    if (newdef.type == prefix + 'pagination-previous') {
                        pgel.prepend(pgnew);
                    } else if (newdef.type == prefix + 'pagination-next') {
                        pgel.append(pgnew);
                    } else {
                        var max = 0;
                        var pglist = pgel.find('>li');

                        for (var i = 0; i < pglist.length; i++) {
                            var pgli = pglist[i]
                            var val = parseInt(pgli.text());
                            if (val && val > max) max = val;
                        }

                        max++;
                        pgnew.html(pgnew.html().replace('_NUM_', max));

                        if (pglist.length > 0) {
                            var pglast = pglist[pglist.length - 1];
                            var t = pglast.text();
                            if (t.match(/(&raquo;|»)/i)) {
                                pgnew.insertBefore(pglast);
                            } else {
                                pgel.append(pgnew);
                            }
                        } else {
                            pgel.append(pgnew);
                        }
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
                'paginationlist' : {
                    name : 'Pagination',
                    fields : {
                        paginationstacked : {
                            type: 'select',
                            name: 'Size',
                            action: 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {'key' : 'pagination-lg', 'name' : 'Large'},
                                {'key' : 'pagination-sm', 'name' : 'Small'}
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_pagination);

        var def_pagination_item = new PgComponentType(prefix + 'pagination-item', 'Pagination item', {
            'selector' : '.page-item',
            'parent_selector' : 'ul.pagination',
            'priority' : 100,
            'code' : '<li class="page-item"><a class="page-link" href="#">_NUM_</a></li>',
            'sections' : addPrefixToSectionsAndFields({
                'paginationitem' : {
                    name : 'Pagination item',
                    fields : {
                        'paginationitemactive' : {
                            'type' : 'checkbox',
                            'name' : 'Active',
                            'value' : 'active',
                            'action' : 'apply_class'
                        },
                        paginationitemdisabled: class_disabled
                    }
                }
            })
        });
        f.addComponentType(def_pagination_item);

        var def_pagination_link = new PgComponentType(prefix + 'pagination-link', 'Pagination link', {
            'selector' : '.page-link',
            'parent_selector' : 'li.page-item',
            'code' : '<a class="page-link" href="#">_NUM_</a>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_pagination_link);

        var def_pagination_previous = new PgComponentType(prefix + 'pagination-previous', 'Pagination previous', {
            'selector' : null,
            'parent_selector' : 'ul.pagination',
            'code' : '<li class="page-item"><a class="page-link" href="#">&laquo;</a></li>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_pagination_previous);

        var def_pagination_next = new PgComponentType(prefix + 'pagination-next', 'Pagination next', {
            'selector' : null,
            'parent_selector' : 'ul.pagination',
            'code' : '<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_pagination_next);

        // Jumbotron
        var def_jumbotron = new PgComponentType(prefix + 'jumbotron', 'Jumbotron', {
            'tags' : 'major',
            'selector' : 'div.jumbotron',
            big_preview: true,
            'code' : '<div class="jumbotron">\
                <h1 class="display-3">Hello, world!</h1>\
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
                <hr class="my-4">\
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\
                <p class="lead">\
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\
                </p>\
            </div>',
            'action_menu' : {
                'add' : [prefix + 'jumbotron-h1', prefix + 'jumbotron-p', prefix + 'jumbotron-b'],
                'on_add' : function (pgel, pgnew, newdef, prepend) {
                    var pgc = pgel.find('.container,.container-fluid');
                    if (pgc.length > 0) {
                        pgel = pgc[0];
                    }
                    if (newdef.type == prefix + 'jumbotron-b') {
                        var pgbtns = pgel.find('.btn');
                        var pgbs = pgbtns[pgbtns.length - 1];
                        if (pgbs) {
                            pgnew.insertAfter(pgbs);
                            pgCreateNodeFromHtml('&nbsp;').insertBefore(pgnew);
                        } else {
                            var p = pgCreateNodeFromHtml('<p></p>');
                            p.append(pgnew);

                            pgnew = p;

                            if (prepend) {
                                pgel.prepend(pgnew);
                            } else {
                                pgel.append(pgnew);
                            }
                        }
                    } else {
                        if (prepend) {
                            pgel.prepend(pgnew);
                        } else {
                            pgel.append(pgnew);
                        }
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
                'jumbotron' : {
                    name : 'Jumbotron',
                    fields : {
                        jumbotronfullscreen : {
                            type: 'checkbox',
                            name: 'Full width',
                            action: 'custom',
                            value: "1",
                            get_value: function (pgel) {
                                var pgc = pgel.closest('.container,.container-fluid');
                                return !pgc ? '1' : null;
                            },
                            set_value: function (pgel, value, values) {
                                crsaWillChangeDom();

                                var putOutOfContainer = function() {
                                    var pgcon = pgel.closest('.container,.container-fluid');
                                    if (!pgcon) return;
                                    pgel.insertBefore(pgcon);
                                }

                                var putContentInContainer = function() {
                                    var pgc = pgel.findOne('> .container, > .container-fluid');
                                    if (!pgc) {
                                        pgc = pgCreateNodeFromHtml('<div class="container"></div>');
                                        pgel.append(pgc);
                                    }

                                    var pgelchildren = pgel.children.slice();
                                    for(var i = 0; i < pgelchildren.length; i++) {
                                        var child = pgelchildren[i];
                                        if(child != pgc) {
                                            pgc.append(child);
                                        }
                                    }
                                }

                                var putContentOutOfContainer = function() {
                                    var pgc = pgel.findOne('> .container, > .container-fluid');
                                    if (!pgc) return;

                                    pgc.detach();
                                    //pgel.html(pgc.html() + pgel.html());
                                    var pgcchildren = pgc.children;
                                    while (pgcchildren.length != 0) {
                                        var child = pgcchildren[0];
                                        child.detach();
                                        pgel.append(child);
                                    }
                                    pgc.remove();
                                }

                                var putInContainer = function() {
                                    var pgcon = pgel.closest('.container,.container-fluid');
                                    if (pgcon) return;

                                    var pgbody = pgel.closest('body');
                                    pgel.detach();
                                    var pgclist = pgbody.find('.container,.container-fluid');
                                    var pgc = null;

                                    for (var i = 0; i < pgclist.length; i++) {
                                        var ctr = pgclist[i];

                                        if(!ctr.closest('.navbar')) {
                                            pgc = ctr;
                                            break;
                                        }
                                    }

                                    if (!pgc) {
                                        pgc = pgCreateNodeFromHtml('<div class="container"></div>');
                                        pgbody.prepend(pgc);
                                    }
                                    pgc.prepend(pgel);
                                }

                                if (value) {
                                    putOutOfContainer();
                                    putContentInContainer();
                                } else {
                                    putInContainer();
                                    putContentOutOfContainer();
                                }
                                // $.fn.crsa('setNeedsUpdate');
                                return value;
                            }
                        },
                        jumbotronfluid : {
                            'type' : 'checkbox',
                            'name' : 'Fluid',
                            'value' : 'jumbotron-fluid',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_jumbotron);

        var def_jumbotron_p = new PgComponentType(prefix + 'jumbotron-p', 'Jumbotron text', {
            'selector' : null,
            'parent_selector' : '.jumbotron',
            'code' : '<p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_jumbotron_p);

        var def_jumbotron_h1 = new PgComponentType(prefix + 'jumbotron-h1', 'Jumbotron title', {
            'selector' : null,
            'parent_selector' : '.jumbotron',
            'code' : '<h1 class="display-3">Hello, world!</h1>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_jumbotron_h1);

        var def_jumbotron_button = new PgComponentType(prefix + 'jumbotron-b', 'Jumbotron button', {
            'selector' : null,
            parent_selector: '.jumbotron,.jumbotron p',
            'code' : '<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>',
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_jumbotron_button);


        var navigation_section = new PgFrameworkLibSection(prefix + 'navigation', 'Navigation');
        navigation_section.setComponentTypes([def_navbar, def_nav, def_tabs, def_breadcrumb, def_pagination, def_jumbotron]);
        f.addLibSection(navigation_section);

        // Tabs and panes
        var def_tabs_panes = new PgComponentType(prefix + 'tabs-panes', 'Tabs + Panes', {
            'selector' : null,
            'code' : function() {
                var id1 = getUniqueId('tab', null, 0);
                var id2 = getUniqueId('tab', null, id1);
                var id3 = getUniqueId('tab', null, id2);
                var id4 = getUniqueId('tab', null, id3);

                return '<ul class="nav nav-tabs" role="tablist">\
                    <li class="nav-item">\
                        <a class="nav-link active" href="#' + id1 + '" data-toggle="tab" role="tab" aria-controls="' + id1 + '" aria-expanded="true">Home</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link" href="#' + id2 + '" data-toggle="tab" role="tab" aria-controls="' + id2 + '" aria-expanded="true">Profile</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link" href="#' + id3 + '" data-toggle="tab" role="tab" aria-controls="' + id3 + '" aria-expanded="true">Messages</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link" href="#' + id4 + '" data-toggle="tab" role="tab" aria-controls="' + id4 + '" aria-expanded="true">Settings</a>\
                    </li>\
                </ul>';
            },
            tags: 'major',
            priority: 100,
            on_inserted : function(pgel) {
                var pgtc = pgCreateNodeFromHtml('<div class="tab-content"></div>').insertAfter(pgel);

                var pgelchildren = pgel.children;
                var j = 0;
                for (var i = 0; i < pgelchildren.length; i++) {
                    var pgt = pgelchildren[i];

                    if (pgt.closingTag == 'li') {
                        var id = pgt.findOne('> a').getAttr('href');
                        if (id) id = id.replace('#', '');
                        var pgp = pgCreateNodeFromHtml('<div class="tab-pane" role="tabpanel" aria-labelledby="' + id + '-tab"><p>Tab ' + (j+1) + ' content goes here...</p></div>');
                        if (id) pgp.setAttr('id', id);
                        if (j == 0) pgp.addClass('active');
                        pgtc.append(pgp);
                        j++;
                    }
                }
            },
            on_changed : function() {
                //showJavascriptMessage();
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_tabs_panes);

        // Accordion
        var def_accordion = new PgComponentType(prefix + 'accordion', 'Accordion', {
            'selector' : null,
            big_preview: true,
            'code' : function() {
                var pid = getUniqueId('panels', null, 0);
                var id1 = getUniqueId('collapse', null, 0);
                var id2 = getUniqueId('collapse', null, id1);
                var id3 = getUniqueId('collapse', null, id2);

                return '<div id="' + pid + '" role="tablist">\
                    <div class="card">\
                        <div class="card-header" role="tab">\
                            <h5 class="mb-0">\
                                <a data-toggle="collapse" href="#' + id1 + '" aria-expanded="true" aria-controls="' + id1 + '">\
                                    Collapsible Group Item #1\
                                </a>\
                            </h5>\
                        </div>\
                        <div id="' + id1 + '" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#' + pid + '">\
                            <div class="card-body">\
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\
                            </div>\
                        </div>\
                    </div>\
                    <div class="card">\
                        <div class="card-header" role="tab">\
                            <h5 class="mb-0">\
                                <a class="collapsed" data-toggle="collapse" href="#' + id2 + '" aria-expanded="false" aria-controls="' + id2 + '">\
                                    Collapsible Group Item #2\
                                </a>\
                            </h5>\
                        </div>\
                        <div id="' + id2 + '" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#' + pid + '">\
                            <div class="card-body">\
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\
                            </div>\
                        </div>\
                    </div>\
                    <div class="card">\
                        <div class="card-header" role="tab">\
                            <h5 class="mb-0">\
                                <a class="collapsed" data-toggle="collapse" href="#' + id3 + '" aria-expanded="false" aria-controls="' + id3 + '">\
                                    Collapsible Group Item #3\
                                </a>\
                            </h5>\
                        </div>\
                        <div id="' + id3 + '" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#' + pid + '">\
                            <div class="card-body">\
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            },
            tags: 'major',
            priority: 100,
            action_menu: {
                add: [prefix + 'accordion-item'],
                on_add : function (pgel, pgnew, newdef, prepend) {
                    var id = pgel.getAttr('id');
                    if (id) {
                        var pga = pgnew.find('.card-header > a');
                        if (pga.length > 0) {
                            pga = pga[0];
                            pga.setAttr('data-parent', '#' + id);
                        }
                    }

                    if (prepend) {
                        pgel.prepend(pgnew);
                    } else {
                        pgel.append(pgnew);
                    }
                }
            },
            on_inserted : function() {
                showJavascriptMessage();
            },
            on_changed : function() {
                //showJavascriptMessage();
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_accordion);

        var def_accordion_item = new PgComponentType(prefix + 'accordion-item', 'Accordion item', {
            'selector' : null,
            'code' : function() {
                var id1 = getUniqueId('collapse', null, 0);

                return '<div class="card">\
                    <div class="card-header" role="tab">\
                        <h5 class="mb-0">\
                            <a class="collapsed" data-toggle="collapse" href="#' + id1 + '" aria-expanded="false" aria-controls="' + id1 + '">\
                                Collapsible Group Item\
                            </a>\
                        </h5>\
                    </div>\
                    <div id="' + id1 + '" class="collapse" role="tabpanel" aria-labelledby="heading">\
                        <div class="card-body">\
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\
                        </div>\
                    </div>\
                </div>';
            },
            tags: 'major',
            priority: 100,
            on_inserted : function(pgel) {
                var pgp = pgel.parent;
                if (pgp) {
                    var pid = pgp.getAttr('id');
                    var pgcollapse = pgel.findOne('.collapse');
                    if (pgcollapse) {
                        pgcollapse.setAttr('data-parent', '#' + pid);
                    }
                }
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_accordion_item);

        var callSlider = function(pgel, func, msg) {
            var id = pgel.getId();
            var code = '$(\'[data-pg-id="' + id + '"]\').' + func + ';';

            pinegrow.setIgnoreClicks(true);
            pgel.executeScript(code);
            pinegrow.setIgnoreClicks(false);
            if(msg) {
                pinegrow.showQuickMessage(msg);
            }
        }

        var gotoSlide = function(pgel) {
            var slider = pgel.closest('.carousel');
            callSlider(slider, "carousel('pause')");
            var num = pgel.index();
            callSlider(slider, "carousel(" + (num) + ")", "Going to slide " + (num + 1) + "...");
        }

        var def_carousel = new PgComponentType(prefix + 'carousel', 'Carousel', {
            'selector' : '.carousel',
            'code' : function() {
                var pid = getUniqueId('carousel', null, 0);

                 return '<div id="' + pid + '" class="carousel slide" data-ride="carousel">\
                     <ol class="carousel-indicators">\
                        <li data-target="#' + pid + '" data-slide-to="0" class="active"></li>\
                        <li data-target="#' + pid + '" data-slide-to="1"></li>\
                        <li data-target="#' + pid + '" data-slide-to="2"></li>\
                    </ol>\
                    <div class="carousel-inner">\
                        <div class="carousel-item active">\
                            <img class="d-block w-100" src="' + getPlaceholderImage() + '" alt="First slide">\
                            <div class="carousel-caption d-none d-md-block">\
                                <h3>Slide label 1</h3>\
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\
                            </div>\
                        </div>\
                        <div class="carousel-item">\
                            <img class="d-block w-100" src="' + getPlaceholderImage() + '" alt="Second slide">\
                            <div class="carousel-caption d-none d-md-block">\
                                <h3>Slide label 2</h3>\
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\
                            </div>\
                        </div>\
                        <div class="carousel-item">\
                            <img class="d-block w-100" src="' + getPlaceholderImage() + '" alt="Third slide">\
                            <div class="carousel-caption d-none d-md-block">\
                                <h3>Slide label 3</h3>\
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\
                            </div>\
                        </div>\
                    </div>\
                    <a class="carousel-control-prev" href="#' + pid + '" role="button" data-slide="prev">\
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                        <span class="sr-only">Previous</span>\
                    </a>\
                    <a class="carousel-control-next" href="#' + pid + '" role="button" data-slide="next">\
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                        <span class="sr-only">Next</span>\
                    </a>\
                </div>'
            },
            tags: 'major',
            priority: 100,
            action_menu: {
                actions : [
                    {label: "Pause Carousel", action: function(pgel) {
                        callSlider(pgel, "carousel('pause')", "Carousel paused.");
                    }},
                    {label: "Resume Carousel", action: function(pgel) {
                        callSlider(pgel, "carousel('cycle')", "Carousel resumed.");
                    }},
                    {label: "Next Slide", action: function(pgel) {
                        callSlider(pgel, "carousel('next')");
                    }},
                    {label: "Previous Slide", action: function(pgel) {
                        callSlider(pgel, "carousel('prev')");
                    }}
                ],
                add: [prefix + 'carousel-item', prefix + 'carousel-prev', prefix + 'carousel-next'],
                on_add : function (pgel, pgnew, newdef, prepend) {
                    if (newdef.type == prefix + 'carousel-item') {
                        var pgol = pgel.find('.carousel-indicators');
                        var max = 0;
                        var pginner = pgel.find('.carousel-inner');
                        pginner = pginner[0];

                        var i = 0;
                        if (pginner) {
                            i = pginner.children.length;
                        }

                        var id = pgel.getAttr('id');
                        if (!id) id = '';
                        var pgli = pgCreateNodeFromHtml('<li data-target="#' + id + '" data-slide-to="' + i + '"></li>');
                        if (prepend) {
                            if (pginner) pginner.prepend(pgnew);
                            if (pgol.length > 0) pgol[0].prepend(pgli);
                        } else {
                            if (pgol.length > 0) pgol[0].append(pgli);
                            if (pginner) pginner.append(pgnew);
                        }
                    }
                    else if (newdef.type == prefix + 'carousel-prev' || newdef.type == prefix + 'carousel-next') {
                        pgel.append(pgnew);
                    }
                }
            },
            on_inserted : function() {
                // showJavascriptMessage();
            },
            on_changed : function() {
                //showJavascriptMessage();
            },
            'sections' : addPrefixToSectionsAndFields({
                carousel : {
                    name : 'Carousel options',
                    fields : {
                        carouselfade : {
                            'type' : 'checkbox',
                            'name' : 'Fade',
                            'action' : 'apply_class',
                            'value' : 'carousel-fade',
                            show_if: function() {
                                return reqVersion(4.1);
                            }
                        },
                        carouselinterval : {
                            'type' : 'text',
                            'name' : 'Interval',
                            'action' : 'element_attribute',
                            attribute : 'data-interval'
                        },
                        carouselpause : {
                            'type' : 'select',
                            'name' : 'Pause on',
                            'action' : 'element_attribute',
                            attribute : 'data-pause',
                            'show_empty' : true,
                            'options' : [
                                {key: 'hover', name: 'Hover'}
                            ]
                        },
                        carouselwrap : {
                            'type' : 'select',
                            'name' : 'Wrap',
                            'action' : 'element_attribute',
                            attribute : 'data-wrap',
                            'show_empty' : true,
                            'options' : [
                                {key: 'true', name: 'Yes'},
                                {key: 'false', name: 'No'}
                            ]
                        }
                    }
                }
            })
        });
        f.addComponentType(def_carousel);

        var def_carousel_item = new PgComponentType(prefix + 'carousel-item', 'Carousel slide', {
            'selector' : '.carousel-item',
            'parent_selector' : '.carousel-inner',
            'code' : function() {
                return '<div class="carousel-item">\
                    <img class="d-block w-100" src="' + getPlaceholderImage() + '" alt="Slide">\
                    <div class="carousel-caption d-none d-md-block">\
                        <h3>Slide label</h3>\
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\
                    </div>\
                </div>';
            },
            'action_menu': {
                add: [prefix + 'img', prefix + 'carousel-caption'],
            },
            tags: 'major',
            priority: 100,
            on_selected: function(pgel) {
                gotoSlide(pgel);
            },
            'sections' : addPrefixToSectionsAndFields({
                'carouselitemslide' : {
                    name : 'Slide',
                    fields : {
                        carouselitemactive : {
                            'type' : 'checkbox',
                            'name' : 'Active slide',
                            'action' : 'apply_class',
                            'value' : 'active'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_carousel_item);

        var def_carousel_caption = new PgComponentType(prefix + 'carousel-caption', 'Carousel caption', {
            'selector' : '.carousel-caption',
            'parent_selector' : '.carousel-inner',
            'code' : '<div class="carousel-caption d-none d-md-block">\
                <h3>Slide label</h3>\
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\
            </div>',
            tags: 'major',
            priority: 100,
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_carousel_caption);

        var def_carousel_inner = new PgComponentType(prefix + 'carousel-inner', 'Carousel inner', {
            'selector' : '.carousel-inner',
            parent_selector: '.carousel',
            'code' : '<div class="carousel-inner"></div>',
            action_menu: {
                add: [prefix + 'carousel-item']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_carousel_inner);

        var def_carousel_indicators = new PgComponentType(prefix + 'carousel-indicators', 'Carousel indicators', {
            'selector' : '.carousel-indicators',
            parent_selector: '.carousel',
            'code' : '<ol class="carousel-indicators"></ol>',
            action_menu: {
                add: [prefix + 'carousel-indicator']
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_carousel_indicators);

        var def_carousel_indicator = new PgComponentType(prefix + 'carousel-indicator', 'Carousel indicator', {
            'selector_new': function (pgel) {
                return pgel.parent && pgel.parent.hasClass('carousel-indicators');
            },
            'code' : '<li data-target="" data-slide-to=""></li>',
            action_menu: {
                add: [prefix + 'carousel-indicator']
            },
            'sections' : addPrefixToSectionsAndFields({
                'carouselindicator' : {
                    name : 'Carousel',
                    fields : {
                        carouselindicatordatatarget : {
                            type: 'text',
                            name: 'Data target',
                            type: 'text',
                            live_update: true,
                            action : 'custom',
                            get_value: function(pgel) {
                                return pgel.attr('data-target');
                            },
                            set_value: function(pgel, value, values, oldValue, eventType) {
                                if(value) {
                                    pgp = pgel.parent;
                                    if (pgp) {
                                        var allPgChildren = pgp.children;
                                        for (var i = 0; i < allPgChildren.length; i++) {
                                            if (allPgChildren[i].closingTag != 'text') {
                                                allPgChildren[i].setAttr('data-target', value);
                                            }
                                        }

                                        var pgcarousel = pgp.parent;
                                        if (pgcarousel) {
                                            pgcarousel.setAttr('id', value.replace('#', ''));

                                            var pgprev = pgcarousel.findOne('.carousel-control-prev');
                                            if (pgprev) pgprev.setAttr('href', value);

                                            var pgnext = pgcarousel.findOne('.carousel-control-next');
                                            if (pgnext) pgnext.setAttr('href', value);
                                        }
                                    }
                                    else {
                                         pgel.setAttr('data-target', value);
                                    }
                                } else {
                                    pgel.removeAttr('data-target');
                                }
                                showJavascriptMessage();
                                return value;
                            }
                        },
                        carouselindicatorslideto : {
                            type: 'text',
                            name: 'Slide to',
                            action: 'element_attribute',
                            attribute: 'data-slide-to'
                        }
                    }
                }
            })
        });
        f.addComponentType(def_carousel_indicator);

        var def_carousel_prev = new PgComponentType(prefix + 'carousel-prev', 'Carousel prev', {
            'selector' : '.carousel-control-prev',
            parent_selector: '.carousel',
            'code' : '<a class="carousel-control-prev" href="#" role="button" data-slide="prev">\
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                <span class="sr-only">Previous</span>\
            </a>',
            on_inserted : function(pgel, page) {
                var pgp = pgel.parent;
                if (pgp) {
                    var id = pgp.getAttr('id');
                    pgel.setAttr('href', '#' + id);
                }
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_carousel_prev);

        var def_carousel_next = new PgComponentType(prefix + 'carousel-next', 'Carousel next', {
            'selector' : '.carousel-control-next',
            parent_selector: '.carousel',
            'code' : '<a class="carousel-control-next" href="#" role="button" data-slide="next">\
                <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                <span class="sr-only">Next</span>\
            </a>',
            on_inserted : function(pgel, page) {
                var pgp = pgel.parent;
                if (pgp) {
                    var id = pgp.getAttr('id');
                    pgel.setAttr('href', '#' + id);
                }
            },
            'sections' : addPrefixToSectionsAndFields({
            })
        });
        f.addComponentType(def_carousel_next);

        var javascript_section = new PgFrameworkLibSection(prefix + 'javascript', 'Javascript');
        javascript_section.setComponentTypes([def_button_dropdown, def_tabs_panes, def_accordion, def_accordion_item, def_carousel]);
        f.addLibSection(javascript_section);


        f.on_get_menu_points = function(page, pgel, menu, points) {
            gh.getMenuPoints(page, pgel, menu, points);
        }

        f.on_page_view_resized = function(page, pv) {
            gh.onPageViewResized(page, pv);
        }



        //GRID
        f.on_get_device_sizes = function(page, list) {
            gh.getDeviceSizesForPageViewMenu(page, list);
        }

        f.on_page_shown_in_live_view = function(page, pv) {
            gh.show(pv);
        }

        var extension_added = false;

        var plugin_builder = null;

        f.on_plugin_activated = function(page, done) {
            gh.onFrameworkActivatedOnPage(page);

            if(!plugin_builder) {
                plugin_builder = new PgPluginBuilder(f);
                plugin_builder.usePreviewIframe();
            }


            if(extension_added) return;
            var ext = new PgEditableAreaExtension('bs4', 'Bootstrap', f);

            ext.addFieldFromProp('button-type', 'Button type', def_button.sections[prefix + 'button'].fields[prefix + 'buttontype'], '.btn');

            ext.addFieldFromProp('button-size', 'Button size', def_button.sections[prefix + 'button'].fields[prefix + 'buttonsize'], '.btn');

            pinegrow.addEditableAreaExtension(ext);
            extension_added = true;
            //end add extension*/

            if(done) done(f);
        }

        f.on_set_inline_style = function(page, o) {
            o.css += gh.getViewCss();

            //modals
            o.css += '\
            .pg-show-modal:not(.show) {\
            position: relative;\
            top: auto;\
            right: auto;\
            left: auto;\
            bottom: auto;\
            display: block !important;\
            opacity: 1;\
            }\
            .pg-show-modal:not(.show) .modal-dialog {\
            transform: translate(0, 1px);\
            }';
        }


        f.on_page_changes_done = function(page, info, page_col) {
            gh.updateHelpersAfterChange(page, info, page_col);
        }

        f.on_inline_editing_done = function(page, pgel) {
            gh.updateHelpersAfterChange(page, null, new PgCollection(pgel));
        }

        f.on_page_selected = function(page) {
            if(page) {
                getBootstrapVersionForPage(page);
            }
        }

        f.on_before_properties_shown = function(page) {
            if(page && !page.data.bootstrapVersion) {
                getBootstrapVersionForPage(page);
            }
        }

        f.on_get_page_libs = function(page, list) {
            gh.getPageLibs([
                {name: 'Components', url: 'index.html'}
            ]).forEach(function(item) {
                list.push(item);
            })
        }

        f.on_page_menu = function(page, items) {
            items.push({
                type: 'divider'
                //header: 'Components'
            })

            items.push({
                label: 'Customize Bootstrap Theme',
                action: function() {
                    pinegrow.getComponent('bootstrap-theme-before', function(pc) {
                        var html = pc.html;
                        pinegrow.showAlert(html, 'Want to customize Bootstrap with SASS variables?', 'No, maybe later', 'Sure, let\'s do it!', null, function() {
                            customizeBootstrap();
                        });
                    });
                }
            })
        }


        var res = new PgComponentTypeResource('https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        res.type = 'text/css';
        f.resources.add(res);

        res = new PgComponentTypeResource('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js');
        res.type = 'application/javascript';
        res.detect = /jquery/;
        res.footer = true;
        f.resources.add(res);

        res = new PgComponentTypeResource('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js');
        res.type = 'application/javascript';
        res.footer = true;
        f.resources.add(res);

        res = new PgComponentTypeResource('https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js');
        res.type = 'application/javascript';
        res.footer = true;
        f.resources.add(res);

        f.resources.description = "Include Bootstrap CSS and JS files from Bootstrap CDN. Updating resources will add the latest version of Bootstrap CSS and JS to the page. If you have older or local version of Bootstrap linked to the page, remove the old CSS and JS links from the page.";

        //Register starting page template
        var notRequiredFiles = ["carousel.css", "cover.css", "dashboard.css", "grid.css", "jumbotron.css", "jumbotron-narrow.css", "justified-nav.css", "product.css", "navbar.css", "pricing.css", "new.css", "non-responsive.css", "offcanvas.css", "starter-template.css", "sticky-footer.css", "sticky-footer-navbar.css", "style.css", "theme.css", "offcanvas.js", "offcanvas.min.js", "album.css", "blog.css", "sign-in.css", "form-validation.css"];
        var templatesOrder = ["index.html", "starter-template.html", "dashboard.html", "jumbotron.html", "jumbotron-narrow.html", "product.html", "justified-nav.html", "navbar.html", "pricing.html", "non-responsive.html", "offcanvas.html", "grid.html", "checkout.html", "sticky-footer.html", "sticky-footer-navbar.html", "theme.html", "carousel.html", "cover.html"];

        f.addTemplateProjectFromResourceFolder('template', null, 0, function (node) {
            var currentFilesName = notRequiredFiles.filter(function (fileName) {
                return node.name == fileName;
            });
            if (currentFilesName && currentFilesName.length > 0) {
                node.required = false;
            }

            var nodeIndex = templatesOrder.indexOf(node.name);
            if (nodeIndex >= 0) node.order = nodeIndex;
        });

        //Bootstrap theme
        var customizeBootstrap = function() {
            var project = pinegrow.getCurrentProject();
            var page = pinegrow.getSelectedPage();

            if(project) {
                var res = new PgComponentTypeResource(f.getResourceUrl('bootstrap_theme'));
                res.isFolder = true;
                res.relative_url = 'bootstrap_theme';
                res.source = res.url;

                var custom_file = crsaMakeFileFromUrl(project.getUrl() + '/bootstrap_theme/custom.scss');
                if(crsaIsFileExist(custom_file)) {
                    pinegrow.showAlert(`<p>File bootstrap_theme/custom.scss already exist and would be overwritten with this operation.</p><p>If you want to start the new customization process, first rename bootstrap_theme folder to bootstrap_theme_old or similar.</p>`, 'Customized theme already exists');
                    return;
                }


                res.copyFilesToProject(project, function() {
                    //find bs cs
                    page.stylesheetsThatContain(/bootstrap\sv4/i, /bootstrap/i, function(list) {
                        var cs = null;
                        for(var i = 0; i < list.length; i++) {
                            if(list[i].localFile) {
                                cs = list[i];
                                break;
                            }
                        }
                        if(!cs) {
                            pinegrow.showAlert('<p>Couldn\'t detect a local Bootstrap 4 stylesheet on the page.</p><p>Customizing the Bootstrap theme doesn\'t work if bootstrap.css is included remotly, from a CDN.</p><p>To proceed, include a local copy of bootstrap.css to your page and repeat the Customize Bootstrap Theme command.</p>', 'Local bootstrap.css not found on the page');
                        } else {
                            //set scss source for bs cs
                            var newStylesheet = PgSCSSStylesheet();
                            cs.ignore = false;

                            var url = project.getUrl() + '/bootstrap_theme/custom.scss';

                            newStylesheet.load(url, cs, function () {
                                pinegrow.dispatchEvent('on_stylesheet_closed', null, cs);
                                cs.setSourceStylesheet(newStylesheet);
                                $('body').trigger('crsa-stylesheets-changed');

                                pgcssh.setUrlOfStylesheetForOverrides(url, null, '-vars')
                                pinegrow.refreshCurrentProject();

                                pinegrow.showQuickMessage('Done');

                                pinegrow.getComponent('bootstrap-theme', function(pc) {
                                    var html = pc.html;
                                    pinegrow.showAlert(html, 'Customize your Bootstrap theme');
                                });
                            });
                        }
                    });
                }, false /* dont overwrite_existing */)
            } else {
                pinegrow.showAlert('<p>Customizing Bootstrap theme works with projects.</p><p>Open your page as a project first.</p>', 'Open the page as a project');
            }
        }

        //End Bootstrap theme

        if(pgIsDev()) {

            var base_url = 'http://getbootstrap.com/docs/4.0/components/';

            var sources = [
                {url: 'alerts'},
                {url: 'badge'},
                {url: 'breadcrumb'},
                {url: 'buttons'},
                {url: 'button-group'},
                {url: 'card'},
                {url: 'carousel'},
                {url: 'collapse'},
                {url: 'dropdowns'},
                {url: 'forms'},
                {url: 'images', import: 'images.html'},
                {url: 'input-group'},
                {url: 'jumbotron'},
                {url: 'list-group'},
                {
                    url: 'modal',
                    help: {
                        label: 'How to use Bootstrap modals in Pinegrow',
                        link: 'help://bs4.modals'
                    },
                    import: 'modals.html'
                },
                {url: 'navs'},
                {
                    url: 'navbar',
                    after_group: function(group) {
                        group.addClass('pg-lib-group-large');
                        group.find('img').forEach(function(img) {
                            if(img.getAttribute('src') == '/assets/brand/bootstrap-solid.svg') {
                                img.setAttribute('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MTIgNjEyIj4KICA8ZyBzb2RpcG9kaTpkb2NuYW1lPSJ0d2l0dGVyX2Jvb3RzdHJhcF9sb2dvLnN2ZyIgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC4xIHI5NzYwIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSI+CiAgICA8cGF0aCBmaWxsPSIjNTYzRDdDIiBkPSJNNjEyIDUxMGMwIDU2LjEtNDUuOSAxMDItMTAyIDEwMkgxMDJDNDUuOSA2MTIgMCA1NjYuMSAwIDUxMFYxMDJDMCA0NS45IDQ1LjkgMCAxMDIgMGg0MDhjNTYuMSAwIDEwMiA0NS45IDEwMiAxMDJ2NDA4eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTE2Ni4zIDEzM2gxNzMuNWMzMiAwIDU3LjcgNy4zIDc3IDIyczI5IDM2LjggMjkgNjYuNWMwIDE4LTQuNCAzMy40LTEzLjIgNDYuMi04LjggMTIuOC0yMS40IDIyLjgtMzcuOCAyOS44djFjMjIgNC43IDM4LjcgMTUuMSA1MCAzMS4yIDExLjMgMTYuMiAxNyAzNi40IDE3IDYwLjggMCAxNC0yLjUgMjcuMS03LjUgMzkuMi01IDEyLjItMTIuOCAyMi43LTIzLjUgMzEuNXMtMjQuMyAxNS44LTQxIDIxLTM2LjUgNy44LTU5LjUgNy44aC0xNjRWMTMzem02Mi41IDE0OS41aDEwMmMxNSAwIDI3LjUtNC4yIDM3LjUtMTIuOHMxNS0yMC44IDE1LTM2LjhjMC0xOC00LjUtMzAuNy0xMy41LTM4cy0yMi0xMS0zOS0xMWgtMTAydjk4LjZ6bTAgMTU2LjVoMTEwLjVjMTkgMCAzMy44LTQuOSA0NC4yLTE0LjggMTAuNS05LjggMTUuOC0yMy44IDE1LjgtNDEuOCAwLTE3LjctNS4yLTMxLjItMTUuOC00MC44cy0yNS4yLTE0LjItNDQuMi0xNC4ySDIyOC44VjQzOXoiLz4KICA8L2c+Cjwvc3ZnPgo=');
                            }
                        })
                    }
                },
                {url: 'pagination'},
                /*  {
                 url: 'popovers',
                 filter: function(node) {
                 return !node.hasClass('bd-example-popover-static');
                 }
                 },*/
                {
                    url: 'progress',
                    after: function(pgel) {
                        if(pgel.tagName == 'button') pgel.remove();
                    }
                }
                /* {url: 'scrollspy'},
                 {url: 'tooltips'}*/
            ]

           // gh.addBuildPageLibsFeature(base_url, sources);

        }

    });
});