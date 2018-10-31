$(function () {

	function myTrim(x) {
		return x.replace(/^\s+|\s+$/gm, '');
	}
	$("body").one("pinegrow-ready", function (e, pinegrow) {

		var fs = require('fs');

		var path = require('path');
		var f = new PgFramework("ZHelperPlugin", "Z Helper");

		var things = new PgComponentType('zh.things', 'THINGS');
		things.selector = function ($el) {
			return true
		};
		things.display_name = 'tag';
		things.not_main_type = true;
		things.sections = {
			'zh.things': {
				name: 'THINGS',
				fields: {
					'zh.things.select': {
						type: 'select',
						show_empty: true,
						action: 'apply_class_multiple',
						name: 'Name',
						multiple: true,
						live_update: true,
						options: [{
							key: 'anijs',
							name: "AniJS"
						},{
							key: 'animated',
							name: "Animations - Animated"
						},
							{
								key: 'wow',
								name: "Animations - Animated WOW"
							},
							{
								key: 'aos',
								name: "Animations - AOS"
							},
							{
								key: 'kenburns',
								name: "Animations - Kenburns"
							},
							{
								key: 'countdown',
								name: "Count Down"
							},
							{
								key: 'counterup',
								name: "Counter Up"
							},
							{
								key: 'easytabs',
								name: "Easy Tabs"
							},
							{
								key: 'che',
								name: "Effects - Caption Hover Effetcs"
							},
							{
								key: 'h',
								name: "Effects - Hover.css"
							},
							{
								key: 'hei',
								name: "Effects - Hover Effect Ideas"
							},
							{
								key: 'ih',
								name: "Effects - Image Hover"
							},
							{
								key: 'tilt',
								name: "Effects - Tilt.js"
							},
							{
								key: 'google-map',
								name: "Google Maps"
							},
							{
								key: 'isotope',
								name: "Isotope"
							},
							{
								key: 'light-gallery',
								name: "Light Gallery"
							},
							{
								key: 'magnific-popup',
								name: "Magnific Popup"
							},
							{
								key: 'js-player',
								name: "Media Plyr"
							},
							{
								key: 'owl-carousel',
								name: "OWL Carousel"
							},
							{
								key: 'jarallax',
								name: "Parallax"
							},
							{
								key: 'rellax',
								name: "Rellax"
							},
							{
								key: 'progressbar-circle',
								name: "ProgressBar Circle"
							},
							{
								key: 'progressbar-semicircle',
								name: "ProgressBar Semi Circle"
							},
							{
								key: 'progressbar-line',
								name: "ProgressBar Line"
							},
							{
								key: 'slick-slider',
								name: "Slick Slider"
							},
							{
								key: 'swiper-slider',
								name: "Swiper Slider"
							},
							{
								key: 'venobox',
								name: "VenoBox"
							}
						]
					},
				}
			}
		};
		f.addComponentType(things);




////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var prefix = 'zbs4.';

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

var size_values = [
//    {key: '-1', name: '-1'}
]
//var weight_values = []
for (var i = -1; i <= 8; i++) {
    size_values.push({key: '-' + i, name: i});
//    weight_values.push({key: '-' + i, name: i});
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
/*                        'on_changed' : function(pgel, prop, value) {
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
                        }*/
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

        //all section and field keys should be prefixed by prefix bs4.
        var addPrefixToSectionsAndFields = function (sections) {
            return gh.addPrefixToSectionsAndFields(sections);
        }

var columns_section_def = {
    name : "Z FONT",
    fields : {
        layout_control: {
            type: 'custom',
            name: 'layout_control',
            action: 'none',
            control: getGridControlFactory('column-span', [
                {
                    field_prefix: 'zfontsize',
                    class_prefix: 'fs',
                    values: size_values,
                    name: 'Font Size'
				}
				// ,
                // {
                //     field_prefix: 'zweight',
                //     class_prefix: 'zweight',
                //     values: weight_values,
                //     name: 'Font Weights'
				// }
            ])
		},
		zweight: {
			'type' : 'select',
			'name' : 'Font Weight',
			'action' : 'apply_class',
			'show_empty': true,
			'options' : [
				{ key: 'font-weight-100', name: '100' },
				{ key: 'font-weight-200', name: '200' },
				{ key: 'font-weight-300', name: '300' },
				{ key: 'font-weight-400', name: '400' },
				{ key: 'font-weight-500', name: '500' },
				{ key: 'font-weight-600', name: '600' },
				{ key: 'font-weight-700', name: '700' },
				{ key: 'font-weight-800', name: '800' },
				{ key: 'font-weight-900', name: '900' },
				{ key: 'font-weight-thin', name: 'Thin' },
				{ key: 'font-weight-extra-light', name: 'Extra Light' },
				{ key: 'font-weight-medium', name: 'Medium' },
				{ key: 'font-weight-semi-bold', name: 'Semi Bold' },
				{ key: 'font-weight-extra-bold', name: 'Extra Bold' },
				{ key: 'font-weight-black', name: 'Black' }				
			]
		}
    }
};


var def_all = new PgComponentType(prefix + 'all', 'All elements', {
    selector : function(pgel) { return true },
    name : 'Div',
    display_name : 'tag',
    priority : 2001,
    sections : addPrefixToSectionsAndFields({
		columns : columns_section_def,
	})
})
f.addComponentType(def_all);

/*


.fs--1 {
    font-size: .75rem
}

.fs-0 {
    font-size: 1rem
}

.fs-1 {
    font-size: 1.333rem
}

.fs-2 {
    font-size: 1.777rem
}

.fs-3 {
    font-size: 2.369rem
}

.fs-4 {
    font-size: 3.157rem
}

.fs-5 {
    font-size: 4.199rem
}

.fs-6 {
    font-size: 5.584rem
}

.fs-7 {
    font-size: 7.427rem
}

.fs-8 {
    font-size: 9.878rem
}

@media (min-width: 576px) {
    .fs-sm--1 {
        font-size:.75rem
    }

    .fs-sm-0 {
        font-size: 1rem
    }

    .fs-sm-1 {
        font-size: 1.333rem
    }

    .fs-sm-2 {
        font-size: 1.777rem
    }

    .fs-sm-3 {
        font-size: 2.369rem
    }

    .fs-sm-4 {
        font-size: 3.157rem
    }

    .fs-sm-5 {
        font-size: 4.199rem
    }

    .fs-sm-6 {
        font-size: 5.584rem
    }

    .fs-sm-7 {
        font-size: 7.427rem
    }

    .fs-sm-8 {
        font-size: 9.878rem
    }
}

@media (min-width: 768px) {
    .fs-md--1 {
        font-size:.75rem
    }

    .fs-md-0 {
        font-size: 1rem
    }

    .fs-md-1 {
        font-size: 1.333rem
    }

    .fs-md-2 {
        font-size: 1.777rem
    }

    .fs-md-3 {
        font-size: 2.369rem
    }

    .fs-md-4 {
        font-size: 3.157rem
    }

    .fs-md-5 {
        font-size: 4.199rem
    }

    .fs-md-6 {
        font-size: 5.584rem
    }

    .fs-md-7 {
        font-size: 7.427rem
    }

    .fs-md-8 {
        font-size: 9.878rem
    }
}

@media (min-width: 992px) {
    .fs-lg--1 {
        font-size:.75rem
    }

    .fs-lg-0 {
        font-size: 1rem
    }

    .fs-lg-1 {
        font-size: 1.333rem
    }

    .fs-lg-2 {
        font-size: 1.777rem
    }

    .fs-lg-3 {
        font-size: 2.369rem
    }

    .fs-lg-4 {
        font-size: 3.157rem
    }

    .fs-lg-5 {
        font-size: 4.199rem
    }

    .fs-lg-6 {
        font-size: 5.584rem
    }

    .fs-lg-7 {
        font-size: 7.427rem
    }

    .fs-lg-8 {
        font-size: 9.878rem
    }
}

@media (min-width: 1200px) {
    .fs-xl--1 {
        font-size:.75rem
    }

    .fs-xl-0 {
        font-size: 1rem
    }

    .fs-xl-1 {
        font-size: 1.333rem
    }

    .fs-xl-2 {
        font-size: 1.777rem
    }

    .fs-xl-3 {
        font-size: 2.369rem
    }

    .fs-xl-4 {
        font-size: 3.157rem
    }

    .fs-xl-5 {
        font-size: 4.199rem
    }

    .fs-xl-6 {
        font-size: 5.584rem
    }

    .fs-xl-7 {
        font-size: 7.427rem
    }

    .fs-xl-8 {
        font-size: 9.878rem
    }
}

.font-weight-100 {
    font-weight: 100!important
}

.font-weight-200 {
    font-weight: 200!important
}

.font-weight-300 {
    font-weight: 300!important
}

.font-weight-400 {
    font-weight: 400!important
}

.font-weight-500 {
    font-weight: 500!important
}

.font-weight-600 {
    font-weight: 600!important
}

.font-weight-700 {
    font-weight: 700!important
}

.font-weight-800 {
    font-weight: 800!important
}

.font-weight-900 {
    font-weight: 900!important
}

.font-weight-thin {
    font-weight: 100!important
}

.font-weight-extra-light {
    font-weight: 200!important
}

.font-weight-medium {
    font-weight: 500!important
}

.font-weight-semi-bold {
    font-weight: 600!important
}

.font-weight-extra-bold {
    font-weight: 800!important
}

.font-weight-black {
    font-weight: 900!important
}

*/

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////






		//name
		//classStr
		//pgStr
		//dataStr


		function creator(name, selectorStr, pgStr, dataStr, opts) {
			var temp = new PgComponentType('zh.' + pgStr + '_def', name);
			temp.selector = selectorStr;
			temp.sections = {};
			temp.sections[pgStr + '_options'] = {};
			temp.sections[pgStr + '_options']['name'] = name + " options";
			temp.sections[pgStr + '_options']['fields'] = {};

			for (var i = 0; i < opts.length; i++) {
				optionCreator(temp.sections[pgStr + '_options']['fields'], opts[i], pgStr, dataStr);
			}

			f.addComponentType(temp);
		}


		function creator2(name, selectorStr, pgStr, dataStr, opts) {
			var temp = new PgComponentType('zh.' + pgStr + '_def', name);

			var parentClass = selectorStr.replace('.','').split('>'); 
			if(parentClass[1]){
				temp.selector_new = function(pgel) {
//					return (pgel.parent.hasClass(parentClass[1].replace('.','')) && pgel.parent.parent.hasClass(parentClass[0].replace('.','')));


					var xtemp;
					try {

						xtemp = pgel.parent.hasClass(parentClass[1].replace('.','')) && pgel.parent.parent.hasClass(parentClass[0].replace('.',''));
						
					} catch (error) {
						xtemp = '';	
					}

					return xtemp;


				};
			}else{

					temp.selector_new = function(pgel) {


							//					console.warn('zzzzz ' + selectorStr);
							//					return (pgel.parents.hasClass(selectorStr.replace('.','')));
//							return (pgel.parent.hasClass(selectorStr.replace('.','')) || pgel.parent.parent.hasClass(selectorStr.replace('.','')));


						var ytemp;
						try {

							ytemp = pgel.parent.hasClass(selectorStr.replace('.','')) || pgel.parent.parent.hasClass(selectorStr.replace('.',''));
							
						} catch (yerror) {
							ytemp = '';	
						}

						return ytemp;
					}


			}
            temp.parent_selector= selectorStr;
			temp.sections = {};
			temp.sections[pgStr + '_options'] = {};
			temp.sections[pgStr + '_options']['name'] = name + " options";
			temp.sections[pgStr + '_options']['fields'] = {};

			for (var i = 0; i < opts.length; i++) {
				optionCreator(temp.sections[pgStr + '_options']['fields'], opts[i], pgStr, dataStr);
			}

			f.addComponentType(temp);
		}



		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		function optionCreator(comp, opts, pgStr, dataStr) {

//			console.warn(pgStr + "------------------------------------------------");
//			console.warn(opts);
			comp[pgStr + "_" + opts[0]] = {};
			comp[pgStr + "_" + opts[0]]["type"] = opts[1];
			comp[pgStr + "_" + opts[0]]["name"] = opts[2];
			comp[pgStr + "_" + opts[0]]["action"] = opts[3];
			comp[pgStr + "_" + opts[0]]["value"] = opts[4];
			comp[pgStr + "_" + opts[0]]["placeholder"] = opts[5];
			comp[pgStr + "_" + opts[0]]["live_update"] = opts[6];
			comp[pgStr + "_" + opts[0]]["slider_def_unit"] = opts[7];
			comp[pgStr + "_" + opts[0]]["file_picker"] = opts[8];
			comp[pgStr + "_" + opts[0]]["file_picker_no_proxy"] = opts[9];
			if (opts[10] != "") {
				comp[pgStr + "_" + opts[0]]["show_if"] = pgStr + "_" + opts[10];
			}
			if (opts[18] != "") {
				comp[pgStr + "_" + opts[0]]["attribute"] = pgStr + "_" + opts[18];
			}
			if (opts[19]) {
				comp[pgStr + "_" + opts[0]]["empty_attribute"] = true;
			}

			comp[pgStr + "_" + opts[0]]["options"] = opts[13];
			comp[pgStr + "_" + opts[0]]["show_empty"] = opts[14];
			comp[pgStr + "_" + opts[0]]["multiple"] = opts[15];

			if (opts[1] == "button") {
				comp[pgStr + "_" + opts[0]]["func"] = function (obj, $el) {
					pgShowQuickImageBrowser($el);
				};
			}

			if (opts[16] != "") {
				dataStr = opts[16];
			}

			if (opts[3] == "custom") {
				if (opts[11] != '') {
					comp[pgStr + "_" + opts[0]]["get_value"] = function (pgel) {
						return generalGet2(pgel, dataStr, opts[0], opts[11], opts[12], opts[17], opts);
					};
					comp[pgStr + "_" + opts[0]]["set_value"] = function (pgel, value, values, oldValue, eventType) {
						return generalSet2(pgel, value, values, oldValue, eventType, dataStr, opts[0], opts[11], opts[12], opts[17], opts[1], opts);
					}
				} else {
					comp[pgStr + "_" + opts[0]]["get_value"] = function (pgel) {
						return generalGet(pgel, dataStr, opts[0], opts[12], opts[17], opts);
					};
					comp[pgStr + "_" + opts[0]]["set_value"] = function (pgel, value, values, oldValue, eventType) {
						return generalSet(pgel, value, values, oldValue, eventType, dataStr, opts[0], opts[12], opts[17], opts[1], opts);
					}
				}
			}

		}

		function IsJsonString(str) {
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			return true;
		}

		function generalGet(pgel, dataname, attrname, valueisarray, attributeisvalue, opts) {

			console.warn(dataname);
			console.warn(attrname);
			console.warn(attributeisvalue);
			if (pgel) {
				var attr = pgel.getAttr(dataname);
				console.warn(attr);
				if (attr) {
					if (attributeisvalue) {
						return attr;
					}
					if (IsJsonString(attr)) {
						var obj = JSON.parse(attr);
						var xval = obj[attrname];
						if (valueisarray) {
							xval = JSON.stringify(obj[attrname]);
						}
						return xval;
					} else {
						return attr;
					}
				}
			}
			return null;
		}

		function generalGet2(pgel, dataname, attrname, parentel, valueisarray, attributeisvalue, opts) {
			if (pgel) {
				var attr = pgel.getAttr(dataname);
				if (attr) {
					if (attributeisvalue) {
						return attr;
					}
					if (IsJsonString(attr)) {
						var obj = JSON.parse(attr);
						if (obj[parentel]) {
							var xval = null;
							if (obj[parentel][attrname]) {
								xval = obj[parentel][attrname];
								if (valueisarray) {
									xval = JSON.stringify(obj[parentel][attrname]);
								}
							}
						}
						return xval;
					} else {
						return attr;
					}
				}
			}
			return null;
		}

		function generalSet(pgel, value, values, oldValue, eventType, dataname, attrname, valueisarray, attributeisvalue, type, opts) {
						// console.warn(value + " - generalSet - value");
						// console.warn(dataname + " - generalSet - dataname");
			if (pgel) {
				var attr = pgel.getAttr(dataname);
				//				console.warn(attr + " - attr");
				if (value) {
					if (attr) {
						if (attributeisvalue) {
							pgel.setAttr(dataname, value);
						}else{
						if (IsJsonString(attr)) {
							attr = attr.split('&quot;').join('"');
							var obj = JSON.parse(attr);
							switch (type) {
								case "text":
									obj[attrname] = value;
									break;
								case "checkbox":
									obj[attrname] = true;
									break;
								case "slider":
									if (opts[7] != "") {
										obj[attrname] = value;
										break;
									} else {
										obj[attrname] = parseInt(value);
										break;
									}
								default:
									obj[attrname] = value;
							}

							if (valueisarray) {
								obj[attrname] = JSON.parse(value);
							}
							attr = JSON.stringify(obj);
							pgel.setAttr(dataname, attr);
						} else {
							pgel.setAttr(dataname, value);
						}
					}
					} else {
						if (attributeisvalue) {
							pgel.setAttr(dataname, value);
						} else {
							if (valueisarray) {
								pgel.setAttr(dataname, '{"' + attrname + '":' + value + '}');
							} else {
								switch (type) {
									case "text":
										pgel.setAttr(dataname, '{"' + attrname + '":"' + value + '"}');
										break;
									case "checkbox":
										pgel.setAttr(dataname, '{"' + attrname + '":true}');
										break;
									case "slider":
										if (opts[7] != "") {
											pgel.setAttr(dataname, '{"' + attrname + '":"' + value + '"}');
											break;
										} else {
											pgel.setAttr(dataname, '{"' + attrname + '":' + parseInt(value) + '}');
											break;
										}
									default:
										pgel.setAttr(dataname, '{"' + attrname + '":"' + value + '"}');
								}
							}
						}
					}
				} else {
					if (attributeisvalue) {
						pgel.removeAttr(dataname);
					} else {
						if (attr) {
							if (IsJsonString(attr)) {
								//								console.warn("json");
								attr = attr.split('&quot;').join('"');
								var obj = JSON.parse(attr);
								delete obj[attrname];
								attr = JSON.stringify(obj);
								if (attr == "{}") {
									pgel.removeAttr(dataname);
								} else {
									pgel.setAttr(dataname, attr);
								}
							} else {
								pgel.removeAttr(dataname);
							}
						}
					}
				}
			}
			return value;
		}

		function generalSet2(pgel, value, values, oldValue, eventType, dataname, attrname, parentel, valueisarray, attributeisvalue, type, opts) {

			if (pgel) {
				var attr = pgel.getAttr(dataname);
				if (value) {
					if (attr) {
						if (attributeisvalue) {
							pgel.setAttr(dataname, value);
						}else{
						if (IsJsonString(attr)) {
							attr = attr.split('&quot;').join('"');
							var obj = JSON.parse(attr);
							if (!obj[parentel]) {
								obj[parentel] = {};
							}
							if (obj[parentel]) {

								switch (type) {
									case "text":
										obj[parentel][attrname] = value;
										break;
									case "checkbox":
										obj[parentel][attrname] = true;
										break;
									case "slider":
										if (opts[7] != "") {
											obj[parentel][attrname] = value;
											break;
										} else {
											obj[parentel][attrname] = parseInt(value);
											break;
										}
									default:
										obj[parentel][attrname] = value;
								}

								if (valueisarray) {
									obj[parentel][attrname] = JSON.parse(value);
								}
							}
							attr = JSON.stringify(obj);
							pgel.setAttr(dataname, attr);
						} else {
							pgel.setAttr(dataname, value);
						}
					}
					} else {
						if (attributeisvalue) {
							pgel.setAttr(dataname, value);
						} else {
							if (valueisarray) {
								pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":' + value + '}}');
							} else {

								switch (type) {
									case "text":
										pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":"' + value + '"}}');
										break;
									case "checkbox":
										pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":true}}');
										break;
									case "slider":
										if (opts[7] != "") {
											pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":"' + value + '"}}');
											break;
										} else {
											pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":' + parseInt(value) + '}}');
											break;
										}
									default:
										pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":"' + value + '"}}');
								}

							}
						}
					}
				} else {
					if (attributeisvalue) {
						pgel.removeAttr(dataname);
					} else {
						if (attr) {
							if (IsJsonString(attr)) {
								attr = attr.split('&quot;').join('"');
								var obj = JSON.parse(attr);
								if (obj[parentel]) {
									delete obj[parentel][attrname];
								}
								if (JSON.stringify(obj[parentel]) == "{}") {
									delete obj[parentel];
								}
								attr = JSON.stringify(obj);
								if (attr == "{}") {
									pgel.removeAttr(dataname);
								} else {
									pgel.setAttr(dataname, attr);
								}
							} else {
								pgel.removeAttr(dataname);
							}
						}
					}
				}
			}
			return value;
		}




		var attributeoptions = [{
				key: 'icon',
				name: 'icon'
			},
			{
				key: 'title',
				name: 'title'
			},
			{
				key: 'description',
				name: 'description'
			},
			{
				key: 'link',
				name: 'link'
			},
			{
				key: 'target',
				name: 'target'
			},
			{
				key: 'id',
				name: 'id'
			},
			{
				key: 'class',
				name: 'class'
			},
			{
				key: 'style',
				name: 'style'
			},
		];
		var shortcodestart = new PgComponentType('zh.shortcodestart', 'Shortcode START');
		shortcodestart.selector = '.shortcode';
		shortcodestart.parent_selector = 'body';
		shortcodestart.code = '\n<code class="shortcode" wp-template-part wp-template-part-slug="template-parts/shortcodes/icon_box" wp-template-part-content>\n\n\
            <?php\n\
            function icon_box( $atts, $content = null ) {\n\
                ob_start();\n\
                extract(shortcode_atts(\n\
                    array(\n\
                        \'icon\' =\> \'\',\n\
                        \'title\' =\> \'\',\n\
                        \'description\' =\> \'\',\n\
                        \'link\' =\> \'\',\n\
                        \'target\' =\> \'\',\n\
                        \'id\' =\> \'\',\n\
                        \'class\' =\> \'\',\n\
                        \'style\' =\> \'\',\n\
                    ),\n\
                    $atts\n\
                ));\n\
                ?\>\n\n\
                </code>';
		shortcodestart.tags = 'major';
		shortcodestart.sections = {
			'zh.shortcodestart': {
				name: 'SHORTCODE OPTIONS',
				fields: {
					'zh.shortcodestart.funcname': {
						type: 'text',
						action: 'custom',
						placeholder: 'icon_box',
						name: 'Name',
						get_value: function (obj) {
							return shortcodestart.getFuncName(obj);
						},
						set_value: function (obj, value, values, oldValue, eventType) {
							obj.attr('wp-template-part-slug', 'template-parts/shortcodes/' + value);
							var myString = obj.html();
							var myRegexp = /function .*(?=\()/g;
							var match = myRegexp.exec(myString);
							var xreturn = match ? match[1] : '';
							myString = myString.replace(myRegexp, "function " + value);
							obj.html(myString);
							return value;
						}
					},
					'zh.shortcodestart.attributes': {
						type: 'select',
						action: 'custom',
						multiple: true,
						can_add_items: true,
						options: attributeoptions,
						name: 'Attributes',
						get_value: function (pgel) {
							var x = pgel.html().split('array(');
							var x0 = x[0];
							var x1 = x[1].split('),')[0];
							var xmatch = myTrim((x1.replace(/\s/g, '')).split(" ").join("").split("'").join("").split(",").join("").split("=>").join(","));
							var lastChar = xmatch.slice(-1);
							if (lastChar == ',') {
								xmatch = xmatch.slice(0, -1);
							}
							xmatch = xmatch.replace(/,\s*$/, "");
							var xreturn = xmatch ? xmatch : '';
							return xreturn;
						},
						set_value: function (pgel, value, values, oldValue, eventType) {
							var x = pgel.html().split('array(');
							var x0 = x[0];
							var x1 = x[1].split('),')[0];
							var x2 = x[1].split('),')[1]
							var xvalue = [];
							var yvalue = "";
							if (value != null) {
								xvalue = myTrim(value.toString()).replace(/\s/g, '').split(",");
								for (var i = 0; i < xvalue.length; i++) {
									yvalue = yvalue + "'" + xvalue[i] + "\' =\> \'\',";
								}
							}
							var lastChar = yvalue.slice(-1);
							if (lastChar == ',') {
								yvalue = yvalue.slice(0, -1);
							}
							var myString = x0 + "array(" + yvalue + ")," + x2;
							pgel.html(myString);
							return value;
						}
					}
				}
			}
		};

		shortcodestart.getFuncName = function (obj) {
			var zhtml = obj.html();
			var myString = obj.html();
			var myRegexp = /function (.*)(?=\()/g;
			var match = myRegexp.exec(myString);
			var xreturn = match ? match[1] : '';
			return xreturn;
		}

		var shortcodeend = new PgComponentType('zh.shortcodeend', 'Shortcode END');
		shortcodeend.selector = null;
		shortcodeend.parent_selector = null;
		shortcodeend.tags = 'major';
		shortcodeend.code = '\n<?php\n\
            $render = ob_get_contents();\n\
            ob_end_clean();\n\
            return $render;\n\
        }\n\
			?>';
			
			
		f.addComponentType(shortcodestart);
		f.addComponentType(shortcodeend);








		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var anijsattributeoptions = [
			["code", "text", "Code", "custom", "if: click, on:h1, do: pulse animated, to:h2", "if: click, on:h1, do: pulse animated, to:h2", false, "", false, false, "", "", false, null, true, false, "", true, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("AniJS", ".anijs", "anijs", "data-anijs", anijsattributeoptions);



		var animations = [{
				key: 'bounce',
				name: 'bounce'
			},
			{
				key: 'flash',
				name: 'flash'
			},
			{
				key: 'pulse',
				name: 'pulse'
			},
			{
				key: 'rubberBand',
				name: 'rubberBand'
			},
			{
				key: 'shake',
				name: 'shake'
			},
			{
				key: 'headShake',
				name: 'headShake'
			},
			{
				key: 'swing',
				name: 'swing'
			},
			{
				key: 'tada',
				name: 'tada'
			},
			{
				key: 'wobble',
				name: 'wobble'
			},
			{
				key: 'jello',
				name: 'jello'
			},
			{
				key: 'bounceIn',
				name: 'bounceIn'
			},
			{
				key: 'bounceInDown',
				name: 'bounceInDown'
			},
			{
				key: 'bounceInLeft',
				name: 'bounceInLeft'
			},
			{
				key: 'bounceInRight',
				name: 'bounceInRight'
			},
			{
				key: 'bounceInUp',
				name: 'bounceInUp'
			},
			{
				key: 'bounceOut',
				name: 'bounceOut'
			},
			{
				key: 'bounceOutDown',
				name: 'bounceOutDown'
			},
			{
				key: 'bounceOutLeft',
				name: 'bounceOutLeft'
			},
			{
				key: 'bounceOutRight',
				name: 'bounceOutRight'
			},
			{
				key: 'bounceOutUp',
				name: 'bounceOutUp'
			},
			{
				key: 'fadeIn',
				name: 'fadeIn'
			},
			{
				key: 'fadeInDown',
				name: 'fadeInDown'
			},
			{
				key: 'fadeInDownBig',
				name: 'fadeInDownBig'
			},
			{
				key: 'fadeInLeft',
				name: 'fadeInLeft'
			},
			{
				key: 'fadeInLeftBig',
				name: 'fadeInLeftBig'
			},
			{
				key: 'fadeInRight',
				name: 'fadeInRight'
			},
			{
				key: 'fadeInRightBig',
				name: 'fadeInRightBig'
			},
			{
				key: 'fadeInUp',
				name: 'fadeInUp'
			},
			{
				key: 'fadeInUpBig',
				name: 'fadeInUpBig'
			},
			{
				key: 'fadeOut',
				name: 'fadeOut'
			},
			{
				key: 'fadeOutDown',
				name: 'fadeOutDown'
			},
			{
				key: 'fadeOutDownBig',
				name: 'fadeOutDownBig'
			},
			{
				key: 'fadeOutLeft',
				name: 'fadeOutLeft'
			},
			{
				key: 'fadeOutLeftBig',
				name: 'fadeOutLeftBig'
			},
			{
				key: 'fadeOutRight',
				name: 'fadeOutRight'
			},
			{
				key: 'fadeOutRightBig',
				name: 'fadeOutRightBig'
			},
			{
				key: 'fadeOutUp',
				name: 'fadeOutUp'
			},
			{
				key: 'fadeOutUpBig',
				name: 'fadeOutUpBig'
			},
			{
				key: 'flipInX',
				name: 'flipInX'
			},
			{
				key: 'flipInY',
				name: 'flipInY'
			},
			{
				key: 'flipOutX',
				name: 'flipOutX'
			},
			{
				key: 'flipOutY',
				name: 'flipOutY'
			},
			{
				key: 'lightSpeedIn',
				name: 'lightSpeedIn'
			},
			{
				key: 'lightSpeedOut',
				name: 'lightSpeedOut'
			},
			{
				key: 'rotateIn',
				name: 'rotateIn'
			},
			{
				key: 'rotateInDownLeft',
				name: 'rotateInDownLeft'
			},
			{
				key: 'rotateInDownRight',
				name: 'rotateInDownRight'
			},
			{
				key: 'rotateInUpLeft',
				name: 'rotateInUpLeft'
			},
			{
				key: 'rotateInUpRight',
				name: 'rotateInUpRight'
			},
			{
				key: 'rotateOut',
				name: 'rotateOut'
			},
			{
				key: 'rotateOutDownLeft',
				name: 'rotateOutDownLeft'
			},
			{
				key: 'rotateOutDownRight',
				name: 'rotateOutDownRight'
			},
			{
				key: 'rotateOutUpLeft',
				name: 'rotateOutUpLeft'
			},
			{
				key: 'rotateOutUpRight',
				name: 'rotateOutUpRight'
			},
			{
				key: 'hinge',
				name: 'hinge'
			},
			{
				key: 'rollIn',
				name: 'rollIn'
			},
			{
				key: 'rollOut',
				name: 'rollOut'
			},
			{
				key: 'zoomIn',
				name: 'zoomIn'
			},
			{
				key: 'zoomInDown',
				name: 'zoomInDown'
			},
			{
				key: 'zoomInLeft',
				name: 'zoomInLeft'
			},
			{
				key: 'zoomInRight',
				name: 'zoomInRight'
			},
			{
				key: 'zoomInUp',
				name: 'zoomInUp'
			},
			{
				key: 'zoomOut',
				name: 'zoomOut'
			},
			{
				key: 'zoomOutDown',
				name: 'zoomOutDown'
			},
			{
				key: 'zoomOutLeft',
				name: 'zoomOutLeft'
			},
			{
				key: 'zoomOutRight',
				name: 'zoomOutRight'
			},
			{
				key: 'zoomOutUp',
				name: 'zoomOutUp'
			},
			{
				key: 'slideInDown',
				name: 'slideInDown'
			},
			{
				key: 'slideInLeft',
				name: 'slideInLeft'
			},
			{
				key: 'slideInRight',
				name: 'slideInRight'
			},
			{
				key: 'slideInUp',
				name: 'slideInUp'
			},
			{
				key: 'slideOutDown',
				name: 'slideOutDown'
			},
			{
				key: 'slideOutLeft',
				name: 'slideOutLeft'
			},
			{
				key: 'slideOutRight',
				name: 'slideOutRight'
			},
			{
				key: 'slideOutUp',
				name: 'slideOutUp'
			}
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var animatedattributeoptions = [
			["animation", "select", "Animation", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["offset", "slider", "Offset", "custom", "50%", "50%", false, "%", false, false, "", "", false, null, false, false, "", false, "", false],
			["delay", "text", "Delay", "custom", "1000", "1000", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["triggerOnce", "checkbox", "Trigger Once", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Animations - Animated", ".animated", "animated", "data-animated-options", animatedattributeoptions);





		var aoseffects = [
			{ key:'fade',name:'fade'},
			{ key:'fade-up',name:'fade-up'},
			{ key:'fade-down',name:'fade-down'},
			{ key:'fade-left',name:'fade-left'},
			{ key:'fade-right',name:'fade-right'},
			{ key:'fade-up-right',name:'fade-up-right'},
			{ key:'fade-up-left',name:'fade-up-left'},
			{ key:'fade-down-right',name:'fade-down-right'},
			{ key:'fade-down-left',name:'fade-down-left'},
			{ key:'flip-up',name:'flip-up'},
			{ key:'flip-down',name:'flip-down'},
			{ key:'flip-left',name:'flip-left'},
			{ key:'flip-right',name:'flip-right'},
			{ key:'slide-up',name:'slide-up'},
			{ key:'slide-down',name:'slide-down'},
			{ key:'slide-left',name:'slide-left'},
			{ key:'slide-right',name:'slide-right'},
			{ key:'zoom-in',name:'zoom-in'},
			{ key:'zoom-in-up',name:'zoom-in-up'},
			{ key:'zoom-in-down',name:'zoom-in-down'},
			{ key:'zoom-in-left',name:'zoom-in-left'},
			{ key:'zoom-in-right',name:'zoom-in-right'},
			{ key:'zoom-out',name:'zoom-out'},
			{ key:'zoom-out-up',name:'zoom-out-up'},
			{ key:'zoom-out-down',name:'zoom-out-down'},
			{ key:'zoom-out-left',name:'zoom-out-left'},
			{ key:'zoom-out-right',name:'zoom-out-right'}
		];

		var aosanchorplacement = [
			{ key:'top-bottom', name:'top-bottom'},
			{ key:'top-center', name:'top-center'},
			{ key:'top-top', name:'top-top'},
			{ key:'center-bottom', name:'center-bottom'},
			{ key:'center-center', name:'center-center'},
			{ key:'center-top', name:'center-top'},
			{ key:'bottom-bottom', name:'bottom-bottom'},
			{ key:'bottom-center', name:'bottom-center'},
			{ key:'bottom-top', name:'bottom-top'}
		];

		var aoseasing = [
			{ key:'linear', name:'linear'},
			{ key:'ease', name:'ease'},
			{ key:'ease-in', name:'ease-in'},
			{ key:'ease-out', name:'ease-out'},
			{ key:'ease-in-out', name:'ease-in-out'},
			{ key:'ease-in-back', name:'ease-in-back'},
			{ key:'ease-out-back', name:'ease-out-back'},
			{ key:'ease-in-out-back', name:'ease-in-out-back'},
			{ key:'ease-in-sine', name:'ease-in-sine'},
			{ key:'ease-out-sine', name:'ease-out-sine'},
			{ key:'ease-in-out-sine', name:'ease-in-out-sine'},
			{ key:'ease-in-quad', name:'ease-in-quad'},
			{ key:'ease-out-quad', name:'ease-out-quad'},
			{ key:'ease-in-out-quad', name:'ease-in-out-quad'},
			{ key:'ease-in-cubic', name:'ease-in-cubic'},
			{ key:'ease-out-cubic', name:'ease-out-cubic'},
			{ key:'ease-in-out-cubic', name:'ease-in-out-cubic'},
			{ key:'ease-in-quart', name:'ease-in-quart'},
			{ key:'ease-out-quart', name:'ease-out-quart'},
			{ key:'ease-in-out-quart', name:'ease-in-out-quart'}
		];

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var aosattributeoptions = [
			["data-aos","select","Effect","custom","","",false,"",false,false,"","",false,aoseffects,true,false,"data-aos",true,"",false],
			["data-aos-offset","slider","Offset","custom","","",false,"",false,false,"","",false,null,true,false,"data-aos-offset",true,"",false],
			["data-aos-duration","slider","Duration","custom","","",false,"",false,false,"","",false,null,true,false,"data-aos-duration",true,"",false],
			["data-aos-easing","select","Easing","custom","","",false,"",false,false,"","",false,aoseasing,true,false,"data-aos-easing",true,"",false],
			["data-aos-delay","slider","Delay","custom","","",false,"",false,false,"","",false,null,true,false,"data-aos-delay",true,"",false],
			["data-aos-anchor","text","Anchor","custom","","",false,"",false,false,"","",false,null,true,false,"data-aos-anchor",true,"",false],
			["data-aos-anchor-placement","select","Anchor Placement","custom","","",false,"",false,false,"","",false,aosanchorplacement,true,false,"data-aos-anchor-placement",true,"",false],
			["data-aos-once","checkbox","Once","custom","true","",false,"",false,false,"","",false,null,false,false,"data-aos-once",true,"",false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Animations - AOS", ".aos", "aos", "data-aos-options", aosattributeoptions);




		var offsets = [
			{ key: '100', name: '100'},
			{ key: '200', name: '200'},
			{ key: '300', name: '300'},
			{ key: '400', name: '400'},
			{ key: '500', name: '500'},
			{ key: '600', name: '600'},
			{ key: '700', name: '700'},
			{ key: '800', name: '800'},
			{ key: '900', name: '900'},
			{ key: '1000', name: '1000'},
	];

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var wowattributeoptions = [
			["animation", "select", "Animation", "apply_class_multiple", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["offset", "text", "Offset", "custom", "10", "10", false, "%", false, false, "", "", false, offsets, true, false, "data-wow-offset", true, "", false],
			["delay", "text", "Delay", "custom", "5s", "5s", false, "", false, false, "", "", false, null, false, false, "data-wow-delay", true, "", false],
			["duration", "text", "Duration", "custom", "2s", "2s", false, "", false, false, "", "", false, null, false, false, "data-wow-duration", true, "", false],
			["iteration", "text", "Iteration", "custom", "", "infinite, 3", false, "", false, false, "", "", false, null, false, false, "data-wow-iteration", true, "", false],
			["mobile", "checkbox", "Disable On Mobile", "custom", "false", "", false, "", false, false, "", "", false, null, false, false, "data-wow-mobile", true, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Animations - Animated WOW", ".wow", "wow", "data-wow-options", wowattributeoptions);



		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var countdownattributeoptions = [
			["date", "text", "Date", "custom", "2032-04-23T18:25:43.511Z", "2032-04-23T18:25:43.511Z", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoStart", "checkbox", "Auto Start", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["text", "text", "Text", "custom", "%s days, %s hours, %s minutes, %s seconds", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fast", "checkbox", "Fast", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Count Down", ".countdown", "countdown", "data-countdown-options", countdownattributeoptions);


		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var counterupattributeoptions = [
			["time", "slider", "Time", "custom", "1000", "1000", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["delay", "slider", "Delay", "custom", "10", "10", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["offset", "slider", "Offset", "custom", "70", "70", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["beginAt", "slider", "Begin At", "custom", "100", "100", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Counter Up", ".counterup", "counterup", "data-counterup-options", counterupattributeoptions);



		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var easytabsattributeoptions = [
			["animate", "checkbox", "animate", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["animationSpeed", "slider", "animationSpeed", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cache", "checkbox", "cache", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["collapsedByDefault", "checkbox", "collapsedByDefault", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["collapsedClass", "text", "collapsedClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["collapsible", "checkbox", "collapsible", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["containerClass", "text", "containerClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cycle", "slider", "cycle", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["defaultTab", "text", "defaultTab", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["panelActiveClass", "text", "panelActiveClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["panelClass", "text", "panelClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["panelContext", "text", "panelContext", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabActiveClass", "text", "tabActiveClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabsClass", "text", "tabsClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabClass", "text", "tabClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabs", "text", "tabs", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionIn", "text", "transitionIn", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionInEasing", "text", "transitionInEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionOut", "text", "transitionOut", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionOutEasing", "text", "transitionOutEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionCollapse", "text", "transitionCollapse", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionCollapseEasing", "text", "transitionCollapseEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionUncollapse", "text", "transitionUncollapse", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionUncollapseEasing", "text", "transitionUncollapseEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["updateHash", "checkbox", "updateHash", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["uiTabs", "checkbox", "uiTabs", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["animate", "checkbox", "animate", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["animationSpeed", "slider", "animationSpeed", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cache", "checkbox", "cache", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["collapsedByDefault", "checkbox", "collapsedByDefault", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["collapsedClass", "text", "collapsedClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["collapsible", "checkbox", "collapsible", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["containerClass", "text", "containerClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cycle", "slider", "cycle", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["defaultTab", "text", "defaultTab", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["panelActiveClass", "text", "panelActiveClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["panelClass", "text", "panelClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["panelContext", "text", "panelContext", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabActiveClass", "text", "tabActiveClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabsClass", "text", "tabsClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabClass", "text", "tabClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tabs", "text", "tabs", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionIn", "text", "transitionIn", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionInEasing", "text", "transitionInEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionOut", "text", "transitionOut", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionOutEasing", "text", "transitionOutEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionCollapse", "text", "transitionCollapse", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionCollapseEasing", "text", "transitionCollapseEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionUncollapse", "text", "transitionUncollapse", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionUncollapseEasing", "text", "transitionUncollapseEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["updateHash", "checkbox", "updateHash", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["uiTabs", "checkbox", "uiTabs", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Easy Tabs", ".easytabs", "easytabs", "data-easytabs-options", easytabsattributeoptions);


		var cheeffects = [
			{key:'style1',name:'style1'},
			{key:'style2',name:'style2'},
			{key:'style3',name:'style3'},
			{key:'style4',name:'style4'},
			{key:'style5',name:'style5'},
			{key:'style6',name:'style6'}
		];

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var cheattributeoptions = [
			["effect", "select", "Effect", "apply_class", "", "", false, "", false, false, "", "", false, cheeffects, true, false, "", false, "", false],
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Effects - Caption Hover Effects", ".che", "che", "", cheattributeoptions);



		var heffects = [
			{key:'h-back-pulse',name:'back-pulse'},
			{key:'h-backward',name:'backward'},
			{key:'h-bob',name:'bob'},
			{key:'h-border-fade',name:'border-fade'},
			{key:'h-bounce-in',name:'bounce-in'},
			{key:'h-bounce-out',name:'bounce-out'},
			{key:'h-bounce-to-bottom',name:'bounce-to-bottom'},
			{key:'h-bounce-to-left',name:'bounce-to-left'},
			{key:'h-bounce-to-right',name:'bounce-to-right'},
			{key:'h-bounce-to-top',name:'bounce-to-top'},
			{key:'h-box-shadow-inset',name:'box-shadow-inset'},
			{key:'h-box-shadow-outset',name:'box-shadow-outset'},
			{key:'h-bubble-bottom',name:'bubble-bottom'},
			{key:'h-bubble-float-bottom',name:'bubble-float-bottom'},
			{key:'h-bubble-float-left',name:'bubble-float-left'},
			{key:'h-bubble-float-right',name:'bubble-float-right'},
			{key:'h-bubble-float-top',name:'bubble-float-top'},
			{key:'h-bubble-left',name:'bubble-left'},
			{key:'h-bubble-right',name:'bubble-right'},
			{key:'h-bubble-top',name:'bubble-top'},
			{key:'h-buzz',name:'buzz'},
			{key:'h-buzz-out',name:'buzz-out'},
			{key:'h-curl-bottom-left',name:'curl-bottom-left'},
			{key:'h-curl-bottom-right',name:'curl-bottom-right'},
			{key:'h-curl-top-left',name:'curl-top-left'},
			{key:'h-curl-top-right',name:'curl-top-right'},
			{key:'h-fade',name:'fade'},
			{key:'h-float',name:'float'},
			{key:'h-float-shadow',name:'float-shadow'},
			{key:'h-forward',name:'forward'},
			{key:'h-glow',name:'glow'},
			{key:'h-grow',name:'grow'},
			{key:'h-grow-rotate',name:'grow-rotate'},
			{key:'h-grow-shadow',name:'grow-shadow'},
			{key:'h-hang',name:'hang'},
			{key:'h-hollow',name:'hollow'},
			{key:'h-icon',name:'icon'},
			{key:'h-icon-back',name:'icon-back'},
			{key:'h-icon-bob',name:'icon-bob'},
			{key:'h-icon-bounce',name:'icon-bounce'},
			{key:'h-icon-buzz',name:'icon-buzz'},
			{key:'h-icon-buzz-out',name:'icon-buzz-out'},
			{key:'h-icon-down',name:'icon-down'},
			{key:'h-icon-drop',name:'icon-drop'},
			{key:'h-icon-fade',name:'icon-fade'},
			{key:'h-icon-float',name:'icon-float'},
			{key:'h-icon-float-away',name:'icon-float-away'},
			{key:'h-icon-forward',name:'icon-forward'},
			{key:'h-icon-grow',name:'icon-grow'},
			{key:'h-icon-grow-rotate',name:'icon-grow-rotate'},
			{key:'h-icon-hang',name:'icon-hang'},
			{key:'h-icon-pop',name:'icon-pop'},
			{key:'h-icon-pulse',name:'icon-pulse'},
			{key:'h-icon-pulse-grow',name:'icon-pulse-grow'},
			{key:'h-icon-pulse-shrink',name:'icon-pulse-shrink'},
			{key:'h-icon-push',name:'icon-push'},
			{key:'h-icon-rotate',name:'icon-rotate'},
			{key:'h-icon-shrink',name:'icon-shrink'},
			{key:'h-icon-sink',name:'icon-sink'},
			{key:'h-icon-sink-away',name:'icon-sink-away'},
			{key:'h-icon-spin',name:'icon-spin'},
			{key:'h-icon-up',name:'icon-up'},
			{key:'h-icon-wobble-horizontal',name:'icon-wobble-horizontal'},
			{key:'h-icon-wobble-vertical',name:'icon-wobble-vertical'},
			{key:'h-outline-in',name:'outline-in'},
			{key:'h-outline-out',name:'outline-out'},
			{key:'h-overline-from-center',name:'overline-from-center'},
			{key:'h-overline-from-left',name:'overline-from-left'},
			{key:'h-overline-from-right',name:'overline-from-right'},
			{key:'h-overline-reveal',name:'overline-reveal'},
			{key:'h-pop',name:'pop'},
			{key:'h-pulse',name:'pulse'},
			{key:'h-pulse-grow',name:'pulse-grow'},
			{key:'h-pulse-shrink',name:'pulse-shrink'},
			{key:'h-push',name:'push'},
			{key:'h-radial-in',name:'radial-in'},
			{key:'h-radial-out',name:'radial-out'},
			{key:'h-rectangle-in',name:'rectangle-in'},
			{key:'h-rectangle-out',name:'rectangle-out'},
			{key:'h-reveal',name:'reveal'},
			{key:'h-ripple-in',name:'ripple-in'},
			{key:'h-ripple-out',name:'ripple-out'},
			{key:'h-rotate',name:'rotate'},
			{key:'h-round-corners',name:'round-corners'},
			{key:'h-shadow',name:'shadow'},
			{key:'h-shadow-radial',name:'shadow-radial'},
			{key:'h-shrink',name:'shrink'},
			{key:'h-shutter-in-horizontal',name:'shutter-in-horizontal'},
			{key:'h-shutter-in-vertical',name:'shutter-in-vertical'},
			{key:'h-shutter-out-horizontal',name:'shutter-out-horizontal'},
			{key:'h-shutter-out-vertical',name:'shutter-out-vertical'},
			{key:'h-sink',name:'sink'},
			{key:'h-skew',name:'skew'},
			{key:'h-skew-backward',name:'skew-backward'},
			{key:'h-skew-forward',name:'skew-forward'},
			{key:'h-sweep-to-bottom',name:'sweep-to-bottom'},
			{key:'h-sweep-to-left',name:'sweep-to-left'},
			{key:'h-sweep-to-right',name:'sweep-to-right'},
			{key:'h-sweep-to-top',name:'sweep-to-top'},
			{key:'h-trim',name:'trim'},
			{key:'h-underline-from-center',name:'underline-from-center'},
			{key:'h-underline-from-left',name:'underline-from-left'},
			{key:'h-underline-from-right',name:'underline-from-right'},
			{key:'h-underline-reveal',name:'underline-reveal'},
			{key:'h-wobble-bottom',name:'wobble-bottom'},
			{key:'h-wobble-horizontal',name:'wobble-horizontal'},
			{key:'h-wobble-skew',name:'wobble-skew'},
			{key:'h-wobble-to-bottom-right',name:'wobble-to-bottom-right'},
			{key:'h-wobble-to-top-right',name:'wobble-to-top-right'},
			{key:'h-wobble-top',name:'wobble-top'},
			{key:'h-wobble-vertical',name:'wobble-vertical'},
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var hattributeoptions = [
			["effect", "select", "Effect", "apply_class", "", "", false, "", false, false, "", "", false, heffects, true, false, "", false, "", false],
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Effects - Hover.css", "*", "h", "", hattributeoptions);


		var heieffects = [
			{ key: 'effect-apollo', name: 'apollo'},
			{ key: 'effect-bubba', name: 'bubba'},
			{ key: 'effect-chico', name: 'chico'},
			{ key: 'effect-dexter', name: 'dexter'},
			{ key: 'effect-duke', name: 'duke'},
			{ key: 'effect-goliath', name: 'goliath'},
			{ key: 'effect-hera', name: 'hera'},
			{ key: 'effect-honey', name: 'honey'},
			{ key: 'effect-jazz', name: 'jazz'},
			{ key: 'effect-julia', name: 'julia'},
			{ key: 'effect-kira', name: 'kira'},
			{ key: 'effect-layla', name: 'layla'},
			{ key: 'effect-lexi', name: 'lexi'},
			{ key: 'effect-lily', name: 'lily'},
			{ key: 'effect-marley', name: 'marley'},
			{ key: 'effect-milo', name: 'milo'},
			{ key: 'effect-ming', name: 'ming'},
			{ key: 'effect-moses', name: 'moses'},
			{ key: 'effect-oscar', name: 'oscar'},
			{ key: 'effect-phoebe', name: 'phoebe'},
			{ key: 'effect-romeo', name: 'romeo'},
			{ key: 'effect-roxy', name: 'roxy'},
			{ key: 'effect-ruby', name: 'ruby'},
			{ key: 'effect-sadie', name: 'sadie'},
			{ key: 'effect-sarah', name: 'sarah'},
			{ key: 'effect-selena', name: 'selena'},
			{ key: 'effect-steve', name: 'steve'},
			{ key: 'effect-terry', name: 'terry'},
			{ key: 'effect-winston', name: 'winston'},
			{ key: 'effect-zoe', name: 'zoe'}
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var heiattributeoptions = [
			["effect", "select", "Effect", "apply_class", "", "", false, "", false, false, "", "", false, heieffects, true, false, "", false, "", false],
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Effects - Hover Effect Ideas", ".hei", "hei", "", heiattributeoptions);



		var iheffects = [
		// {key: 'imghvr-blur', name: 'blur'},
		// {key: 'imghvr-fade', name: 'fade'},
		// {key: 'imghvr-flip-diag-1', name: 'flip-diag-1'},
		// {key: 'imghvr-flip-diag-2', name: 'flip-diag-2'},
		// {key: 'imghvr-flip-horiz', name: 'flip-horiz'},
		// {key: 'imghvr-flip-vert', name: 'flip-vert'},
		// {key: 'imghvr-fold-down', name: 'fold-down'},
		// {key: 'imghvr-fold-left', name: 'fold-left'},
		// {key: 'imghvr-fold-right', name: 'fold-right'},
		// {key: 'imghvr-fold-up', name: 'fold-up'},
		// {key: 'imghvr-hinge-down', name: 'hinge-down'},
		// {key: 'imghvr-hinge-left', name: 'hinge-left'},
		// {key: 'imghvr-hinge-right', name: 'hinge-right'},
		// {key: 'imghvr-hinge-up', name: 'hinge-up'},
		// {key: 'imghvr-push-down', name: 'push-down'},
		// {key: 'imghvr-push-left', name: 'push-left'},
		// {key: 'imghvr-push-right', name: 'push-right'},
		// {key: 'imghvr-push-up', name: 'push-up'},
		// {key: 'imghvr-reveal-down', name: 'reveal-down'},
		// {key: 'imghvr-reveal-left', name: 'reveal-left'},
		// {key: 'imghvr-reveal-right', name: 'reveal-right'},
		// {key: 'imghvr-reveal-up', name: 'reveal-up'},
		// {key: 'imghvr-shutter-in-horiz', name: 'shutter-in-horiz'},
		// {key: 'imghvr-shutter-in-out-diag-1', name: 'shutter-in-out-diag-1'},
		// {key: 'imghvr-shutter-in-out-diag-2', name: 'shutter-in-out-diag-2'},
		// {key: 'imghvr-shutter-in-out-horiz', name: 'shutter-in-out-horiz'},
		// {key: 'imghvr-shutter-in-out-vert', name: 'shutter-in-out-vert'},
		// {key: 'imghvr-shutter-in-vert', name: 'shutter-in-vert'},
		// {key: 'imghvr-shutter-out-diag-1', name: 'shutter-out-diag-1'},
		// {key: 'imghvr-shutter-out-diag-2', name: 'shutter-out-diag-2'},
		// {key: 'imghvr-shutter-out-horiz', name: 'shutter-out-horiz'},
		// {key: 'imghvr-shutter-out-vert', name: 'shutter-out-vert'},
		// {key: 'imghvr-slide-down', name: 'slide-down'},
		// {key: 'imghvr-slide-left', name: 'slide-left'},
		// {key: 'imghvr-slide-right', name: 'slide-right'},
		// {key: 'imghvr-slide-up', name: 'slide-up'},
		// {key: 'imghvr-zoom-in', name: 'zoom-in'},
		// {key: 'imghvr-zoom-out', name: 'zoom-out'},
		// {key: 'imghvr-zoom-out-down', name: 'zoom-out-down'},
		// {key: 'imghvr-zoom-out-flip-horiz', name: 'zoom-out-flip-horiz'},
		// {key: 'imghvr-zoom-out-flip-vert', name: 'zoom-out-flip-vert'},
		// {key: 'imghvr-zoom-out-left', name: 'zoom-out-left'},
		// {key: 'imghvr-zoom-out-right', name: 'zoom-out-right'},
		// {key: 'imghvr-zoom-out-up', name: 'zoom-out-up'}
		{key:'imghvr-blinds-down',name:'blinds-down'},
		{key:'imghvr-blinds-horiz',name:'blinds-horiz'},
		{key:'imghvr-blinds-left',name:'blinds-left'},
		{key:'imghvr-blinds-right',name:'blinds-right'},
		{key:'imghvr-blinds-up',name:'blinds-up'},
		{key:'imghvr-blinds-vert',name:'blinds-vert'},
		{key:'imghvr-blocks-float-down',name:'blocks-float-down'},
		{key:'imghvr-blocks-float-left',name:'blocks-float-left'},
		{key:'imghvr-blocks-float-right',name:'blocks-float-right'},
		{key:'imghvr-blocks-float-up',name:'blocks-float-up'},
		{key:'imghvr-blocks-in',name:'blocks-in'},
		{key:'imghvr-blocks-out',name:'blocks-out'},
		{key:'imghvr-blocks-rotate-in-left',name:'blocks-rotate-in-left'},
		{key:'imghvr-blocks-rotate-in-right',name:'blocks-rotate-in-right'},
		{key:'imghvr-blocks-rotate-left',name:'blocks-rotate-left'},
		{key:'imghvr-blocks-rotate-right',name:'blocks-rotate-right'},
		{key:'imghvr-blocks-zoom-bottom-left',name:'blocks-zoom-bottom-left'},
		{key:'imghvr-blocks-zoom-bottom-right',name:'blocks-zoom-bottom-right'},
		{key:'imghvr-blocks-zoom-top-left',name:'blocks-zoom-top-left'},
		{key:'imghvr-blocks-zoom-top-right',name:'blocks-zoom-top-right'},
		{key:'imghvr-blur',name:'blur'},
		{key:'imghvr-book-open-down',name:'book-open-down'},
		{key:'imghvr-book-open-horiz',name:'book-open-horiz'},
		{key:'imghvr-book-open-left',name:'book-open-left'},
		{key:'imghvr-book-open-right',name:'book-open-right'},
		{key:'imghvr-book-open-up',name:'book-open-up'},
		{key:'imghvr-book-open-vert',name:'book-open-vert'},
		{key:'imghvr-border-reveal-bottom-left',name:'border-reveal-bottom-left'},
		{key:'imghvr-border-reveal-bottom-right',name:'border-reveal-bottom-right'},
		{key:'imghvr-border-reveal-cc-1',name:'border-reveal-cc-1'},
		{key:'imghvr-border-reveal-cc-2',name:'border-reveal-cc-2'},
		{key:'imghvr-border-reveal-cc-3',name:'border-reveal-cc-3'},
		{key:'imghvr-border-reveal-ccc-1',name:'border-reveal-ccc-1'},
		{key:'imghvr-border-reveal-ccc-2',name:'border-reveal-ccc-2'},
		{key:'imghvr-border-reveal-ccc-3',name:'border-reveal-ccc-3'},
		{key:'imghvr-border-reveal-corners-1',name:'border-reveal-corners-1'},
		{key:'imghvr-border-reveal-corners-2',name:'border-reveal-corners-2'},
		{key:'imghvr-border-reveal-horiz',name:'border-reveal-horiz'},
		{key:'imghvr-border-reveal-top-left',name:'border-reveal-top-left'},
		{key:'imghvr-border-reveal-top-right',name:'border-reveal-top-right'},
		{key:'imghvr-border-reveal-vert',name:'border-reveal-vert'},
		{key:'imghvr-bounce-in',name:'bounce-in'},
		{key:'imghvr-bounce-in-down',name:'bounce-in-down'},
		{key:'imghvr-bounce-in-left',name:'bounce-in-left'},
		{key:'imghvr-bounce-in-right',name:'bounce-in-right'},
		{key:'imghvr-bounce-in-up',name:'bounce-in-up'},
		{key:'imghvr-bounce-out',name:'bounce-out'},
		{key:'imghvr-bounce-out-down',name:'bounce-out-down'},
		{key:'imghvr-bounce-out-left',name:'bounce-out-left'},
		{key:'imghvr-bounce-out-right',name:'bounce-out-right'},
		{key:'imghvr-bounce-out-up',name:'bounce-out-up'},
		{key:'imghvr-center',name:'center'},
		{key:'imghvr-circle-bottom-left',name:'circle-bottom-left'},
		{key:'imghvr-circle-bottom-right',name:'circle-bottom-right'},
		{key:'imghvr-circle-down',name:'circle-down'},
		{key:'imghvr-circle-left',name:'circle-left'},
		{key:'imghvr-circle-right',name:'circle-right'},
		{key:'imghvr-circle-top-left',name:'circle-top-left'},
		{key:'imghvr-circle-top-right',name:'circle-top-right'},
		{key:'imghvr-circle-up',name:'circle-up'},
		{key:'imghvr-cube-down',name:'cube-down'},
		{key:'imghvr-cube-left',name:'cube-left'},
		{key:'imghvr-cube-right',name:'cube-right'},
		{key:'imghvr-cube-up',name:'cube-up'},
		{key:'imghvr-dive',name:'dive'},
		{key:'imghvr-dive-cc',name:'dive-cc'},
		{key:'imghvr-dive-ccc',name:'dive-ccc'},
		{key:'imghvr-fade',name:'fade'},
		{key:'imghvr-fade-in-down',name:'fade-in-down'},
		{key:'imghvr-fade-in-left',name:'fade-in-left'},
		{key:'imghvr-fade-in-right',name:'fade-in-right'},
		{key:'imghvr-fade-in-up',name:'fade-in-up'},
		{key:'imghvr-fall-away-cc',name:'fall-away-cc'},
		{key:'imghvr-fall-away-ccc',name:'fall-away-ccc'},
		{key:'imghvr-fall-away-horiz',name:'fall-away-horiz'},
		{key:'imghvr-fall-away-vert',name:'fall-away-vert'},
		{key:'imghvr-flip-diag-1',name:'flip-diag-1'},
		{key:'imghvr-flip-diag-2',name:'flip-diag-2'},
		{key:'imghvr-flip-horiz',name:'flip-horiz'},
		{key:'imghvr-flip-vert',name:'flip-vert'},
		{key:'imghvr-fold-down',name:'fold-down'},
		{key:'imghvr-fold-l',name:'fold-l'},
		{key:'imghvr-fold-right',name:'fold-right'},
		{key:'imghvr-fold-up',name:'fold-up'},
		{key:'imghvr-grad-bottom-left',name:'grad-bottom-left'},
		{key:'imghvr-grad-bottom-right',name:'grad-bottom-right'},
		{key:'imghvr-grad-down',name:'grad-down'},
		{key:'imghvr-grad-left',name:'grad-left'},
		{key:'imghvr-grad-radial-in',name:'grad-radial-in'},
		{key:'imghvr-grad-radial-out',name:'grad-radial-out'},
		{key:'imghvr-grad-right',name:'grad-right'},
		{key:'imghvr-grad-top-left',name:'grad-top-left'},
		{key:'imghvr-grad-top-right',name:'grad-top-right'},
		{key:'imghvr-grad-up',name:'grad-up'},
		{key:'imghvr-hinge-down',name:'hinge-down'},
		{key:'imghvr-hinge-left',name:'hinge-left'},
		{key:'imghvr-hinge-right',name:'hinge-right'},
		{key:'imghvr-hinge-up',name:'hinge-up'},
		{key:'imghvr-image-rotate-left',name:'image-rotate-left'},
		{key:'imghvr-image-rotate-right',name:'image-rotate-right'},
		{key:'imghvr-image-zoom-center',name:'image-zoom-center'},
		{key:'imghvr-image-zoom-out',name:'image-zoom-out'},
		{key:'imghvr-lightspeed-in-left',name:'lightspeed-in-left'},
		{key:'imghvr-lightspeed-in-right',name:'lightspeed-in-right'},
		{key:'imghvr-lightspeed-out-left',name:'lightspeed-out-left'},
		{key:'imghvr-lightspeed-out-right',name:'lightspeed-out-right'},
		{key:'imghvr-modal-hinge-down',name:'modal-hinge-down'},
		{key:'imghvr-modal-hinge-left',name:'modal-hinge-left'},
		{key:'imghvr-modal-hinge-right',name:'modal-hinge-right'},
		{key:'imghvr-modal-hinge-up',name:'modal-hinge-up'},
		{key:'imghvr-modal-slide-down',name:'modal-slide-down'},
		{key:'imghvr-modal-slide-left',name:'modal-slide-left'},
		{key:'imghvr-modal-slide-right',name:'modal-slide-right'},
		{key:'imghvr-modal-slide-up',name:'modal-slide-up'},
		{key:'imghvr-parallax-down',name:'parallax-down'},
		{key:'imghvr-parallax-left',name:'parallax-left'},
		{key:'imghvr-parallax-right',name:'parallax-right'},
		{key:'imghvr-parallax-up',name:'parallax-up'},
		{key:'imghvr-pivot-in-bottom-left',name:'pivot-in-bottom-left'},
		{key:'imghvr-pivot-in-bottom-right',name:'pivot-in-bottom-right'},
		{key:'imghvr-pivot-in-top-left',name:'pivot-in-top-left'},
		{key:'imghvr-pivot-in-top-right',name:'pivot-in-top-right'},
		{key:'imghvr-pivot-out-bottom-left',name:'pivot-out-bottom-left'},
		{key:'imghvr-pivot-out-bottom-right',name:'pivot-out-bottom-right'},
		{key:'imghvr-pivot-out-top-left',name:'pivot-out-top-left'},
		{key:'imghvr-pivot-out-top-right',name:'pivot-out-top-right'},
		{key:'imghvr-pixel-bottom-left',name:'pixel-bottom-left'},
		{key:'imghvr-pixel-bottom-right',name:'pixel-bottom-right'},
		{key:'imghvr-pixel-down',name:'pixel-down'},
		{key:'imghvr-pixel-left',name:'pixel-left'},
		{key:'imghvr-pixel-right',name:'pixel-right'},
		{key:'imghvr-pixel-top-left',name:'pixel-top-left'},
		{key:'imghvr-pixel-top-right',name:'pixel-top-right'},
		{key:'imghvr-pixel-up',name:'pixel-up'},
		{key:'imghvr-push-down',name:'push-down'},
		{key:'imghvr-push-left',name:'push-left'},
		{key:'imghvr-push-right',name:'push-right'},
		{key:'imghvr-push-up',name:'push-up'},
		{key:'imghvr-reveal-bottom-left',name:'reveal-bottom-left'},
		{key:'imghvr-reveal-bottom-right',name:'reveal-bottom-right'},
		{key:'imghvr-reveal-down',name:'reveal-down'},
		{key:'imghvr-reveal-left',name:'reveal-left'},
		{key:'imghvr-reveal-right',name:'reveal-right'},
		{key:'imghvr-reveal-top-left',name:'reveal-top-left'},
		{key:'imghvr-reveal-top-right',name:'reveal-top-right'},
		{key:'imghvr-reveal-up',name:'reveal-up'},
		{key:'imghvr-shift-bottom-left',name:'shift-bottom-left'},
		{key:'imghvr-shift-bottom-right',name:'shift-bottom-right'},
		{key:'imghvr-shift-top-left',name:'shift-top-left'},
		{key:'imghvr-shift-top-right',name:'shift-top-right'},
		{key:'imghvr-shutter-in-horiz',name:'shutter-in-horiz'},
		{key:'imghvr-shutter-in-out-diag-1',name:'shutter-in-out-diag-1'},
		{key:'imghvr-shutter-in-out-diag-2',name:'shutter-in-out-diag-2'},
		{key:'imghvr-shutter-in-out-horiz',name:'shutter-in-out-horiz'},
		{key:'imghvr-shutter-in-out-vert',name:'shutter-in-out-vert'},
		{key:'imghvr-shutter-in-vert',name:'shutter-in-vert'},
		{key:'imghvr-shutter-out-diag-1',name:'shutter-out-diag-1'},
		{key:'imghvr-shutter-out-diag-2',name:'shutter-out-diag-2'},
		{key:'imghvr-shutter-out-horiz',name:'shutter-out-horiz'},
		{key:'imghvr-shutter-out-vert',name:'shutter-out-vert'},
		{key:'imghvr-slide-bottom-left',name:'slide-bottom-left'},
		{key:'imghvr-slide-bottom-right',name:'slide-bottom-right'},
		{key:'imghvr-slide-down',name:'slide-down'},
		{key:'imghvr-slide-left',name:'slide-left'},
		{key:'imghvr-slide-right',name:'slide-right'},
		{key:'imghvr-slide-top-left',name:'slide-top-left'},
		{key:'imghvr-slide-top-right',name:'slide-top-right'},
		{key:'imghvr-slide-up',name:'slide-up'},
		{key:'imghvr-stack-bottom-left',name:'stack-bottom-left'},
		{key:'imghvr-stack-bottom-right',name:'stack-bottom-right'},
		{key:'imghvr-stack-down',name:'stack-down'},
		{key:'imghvr-stack-left',name:'stack-left'},
		{key:'imghvr-stack-right',name:'stack-right'},
		{key:'imghvr-stack-top-left',name:'stack-top-left'},
		{key:'imghvr-stack-top-right',name:'stack-top-right'},
		{key:'imghvr-stack-up',name:'stack-up'},
		{key:'imghvr-strip-horiz-bottom-left',name:'strip-horiz-bottom-left'},
		{key:'imghvr-strip-horiz-bottom-right',name:'strip-horiz-bottom-right'},
		{key:'imghvr-strip-horiz-down',name:'strip-horiz-down'},
		{key:'imghvr-strip-horiz-top-left',name:'strip-horiz-top-left'},
		{key:'imghvr-strip-horiz-top-right',name:'strip-horiz-top-right'},
		{key:'imghvr-strip-horiz-up',name:'strip-horiz-up'},
		{key:'imghvr-strip-shutter-down',name:'strip-shutter-down'},
		{key:'imghvr-strip-shutter-left',name:'strip-shutter-left'},
		{key:'imghvr-strip-shutter-right',name:'strip-shutter-right'},
		{key:'imghvr-strip-shutter-up',name:'strip-shutter-up'},
		{key:'imghvr-strip-vert-bottom-left',name:'strip-vert-bottom-left'},
		{key:'imghvr-strip-vert-bottom-right',name:'strip-vert-bottom-right'},
		{key:'imghvr-strip-vert-left',name:'strip-vert-left'},
		{key:'imghvr-strip-vert-right',name:'strip-vert-right'},
		{key:'imghvr-strip-vert-top-left',name:'strip-vert-top-left'},
		{key:'imghvr-strip-vert-top-right',name:'strip-vert-top-right'},
		{key:'imghvr-throw-in-down',name:'throw-in-down'},
		{key:'imghvr-throw-in-left',name:'throw-in-left'},
		{key:'imghvr-throw-in-right',name:'throw-in-right'},
		{key:'imghvr-throw-in-up',name:'throw-in-up'},
		{key:'imghvr-throw-out-down',name:'throw-out-down'},
		{key:'imghvr-throw-out-left',name:'throw-out-left'},
		{key:'imghvr-throw-out-right',name:'throw-out-right'},
		{key:'imghvr-throw-out-up',name:'throw-out-up'},
		{key:'imghvr-zoom-in',name:'zoom-in'},
		{key:'imghvr-zoom-out',name:'zoom-out'},
		{key:'imghvr-zoom-out-down',name:'zoom-out-down'},
		{key:'imghvr-zoom-out-flip-horiz',name:'zoom-out-flip-horiz'},
		{key:'imghvr-zoom-out-flip-vert',name:'zoom-out-flip-vert'},
		{key:'imghvr-zoom-out-left',name:'zoom-out-left'},
		{key:'imghvr-zoom-out-right',name:'zoom-out-right'},
		{key:'imghvr-zoom-out-up',name:'zoom-out-up'}
	];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var ihattributeoptions = [
			["effect", "select", "Effect", "apply_class", "", "", false, "", false, false, "", "", false, iheffects, true, false, "", false, "", false],
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Effects - Image Hover", ".ih", "ih", "", ihattributeoptions);

//		.ih .caption *
//ih-fade-down ih-delay-sm 
var ihceffects = [
	{key:'ih-fade',name:'fade'},
	{key:'ih-fade-up',name:'fade-up'},
	{key:'ih-fade-down',name:'fade-down'},
	{key:'ih-fade-left',name:'fade-left'},
	{key:'ih-fade-right',name:'fade-right'},
	{key:'ih-fade-up-big',name:'fade-up-big'},
	{key:'ih-fade-down-big',name:'fade-down-big'},
	{key:'ih-fade-left-big',name:'fade-left-big'},
	{key:'ih-fade-right-big',name:'fade-right-big'},
	{key:'ih-zoom-in',name:'zoom-in'},
	{key:'ih-zoom-out',name:'zoom-out'},
	{key:'ih-flip-x',name:'flip-x'},
	{key:'ih-flip-y',name:'flip-y'}
];
var ihcdelays = [
	{key:'ih-delay-xs',name:'Delay-xs'},
	{key:'ih-delay-sm',name:'Delay-sm'},
	{key:'ih-delay-md',name:'Delay-md'},
	{key:'ih-delay-lg',name:'Delay-lg'},
	{key:'ih-delay-xl',name:'Delay-xl'},
	{key:'ih-delay-xxl',name:'Delay-xxl'}
];
//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var ihcattributeoptions = [
			["effect", "select", "Effect", "apply_class", "", "", false, "", false, false, "", "", false, ihceffects, true, false, "", false, "", false],
			["delay", "select", "Delay", "apply_class", "", "", false, "", false, false, "", "", false, ihcdelays, true, false, "", false, "", false],
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator2("Effects - Image Hover Utility", ".ih>.caption", "ihcaptionel", "", ihcattributeoptions);



		var tiltaxis = [
			{key:'x',name:'X'},
			{key:'y',name:'Y'}
		];

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var tiltattributeoptions = [
			["maxTilt","slider","maxTilt","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["perspective","slider","perspective","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["easing","text","easing","custom","cubic-bezier(.03,.98,.52,.99)","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["scale","slider","scale","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["speed","slider","speed","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["transition","checkbox","transition","custom",true,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["disableAxis","select","disableAxis","custom","","",false,"",false,false,"","",false,tiltaxis,true,false,"",false,"",false],
			["reset","checkbox","reset","custom",true,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["glare","checkbox","glare","custom",true,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["maxGlare","slider","maxGlare","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["tiltParallax","checkbox","Parallax Items","apply_class","tilt-parallax","",false,"",false,false,"","",false,null,true,false,"",false,"",false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Effects - Tilt.js", ".tilt", "tilt", "data-tilt-options", tiltattributeoptions);

		var tiltparallaxitemattributeoptions = [
			["tiltParallaxItem","checkbox","Enable Item Parallax","apply_class","tilt-parallax-item","",false,"",false,false,"","",false,null,true,false,"",false,"",false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator2("Effects - Tilt.js Parallax Item", ".tilt-parallax", "tiltparallax", "", tiltparallaxitemattributeoptions);




		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var googlemapattributeoptions = [
			["lat", "text", "Latitude", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "data-lat", true, "", false],
			["lng", "text", "Longitude", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "data-lng", true, "", false],
			["zoom", "slider", "Zoom", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["zoomControl", "checkbox", "Zoom Control", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["disableDoubleClickZoom", "checkbox", "Disable Double Click Zoom", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["mapTypeControl", "checkbox", "Map Type Control", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["scaleControl", "checkbox", "Scale Control", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["scrollwheel", "checkbox", "Scroll Wheel", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["streetViewControl", "checkbox", "Street View Control", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["draggable", "checkbox", "Draggable", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["overviewMapControl", "checkbox", "Overview Map Control", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Google Maps", ".google-map", "googlemap", "data-google-map-options", googlemapattributeoptions);



		var layoutModes = [{
				key: 'masonry',
				name: 'Masonry'
			},
			{
				key: 'fitRows',
				name: 'FitRows'
			},
			{
				key: 'certical',
				name: 'Vertical'
			}
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var isotopeattributeoptions = [
			["itemSelector", "text", "itemSelector", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["filters", "text", "Filters Class", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["layoutMode", "select", "layoutMode", "custom", "", "", false, "", false, false, "", "", false, layoutModes, true, false, "", false, "", false],
			["percentPosition", "checkbox", "percentPosition", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["masonry", "object", "masonry", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fitRows", "object", "fitRows", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["vertical", "object", "vertical", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["columnWidth", "text", "columnWidth", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["gutter", "slider", "gutter", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["stamp", "text", "stamp", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["originLeft", "checkbox", "originLeft", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["originTop", "checkbox", "originTop", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["filter", "text", "filter", "custom", "", "*", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["getSortData", "object", "getSortData", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["sortBy", "text", "sortBy", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["sortAscending", "checkbox", "sortAscending", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["stagger", "slider", "stagger", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["transitionDuration", "slider", "transitionDuration", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["hiddenStyle", "object", "hiddenStyle", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["visibleStyle", "object", "visibleStyle", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["containerStyle", "text", "containerStyle", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["resize", "checkbox", "resize", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["initLayout", "checkbox", "initLayout", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cellsByRow", "object", "cellsByRow", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["columnWidth", "slider", "columnWidth", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["rowHeight", "slider", "rowHeight", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fitWidth", "checkbox", "fitWidth", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["horizontalOrder", "checkbox", "horizontalOrder", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Isotope Gallery", ".isotope", "isotope", "data-isotope-options", isotopeattributeoptions);



		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var lightgalleryattributeoptions = [
			["mode", "text", "mode", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cssEasing", "text", "cssEasing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "easing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["speed", "slider", "speed", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["height", "text", "height", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["width", "text", "width", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["addClass", "text", "addClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["startClass", "text", "startClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["backdropDuration", "slider", "backdropDuration", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["hideBarsDelay", "slider", "hideBarsDelay", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["useLeft", "checkbox", "useLeft", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["closable", "checkbox", "closable", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loop", "checkbox", "loop", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["escKey", "checkbox", "escKey", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["keyPress", "checkbox", "keyPress", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["controls", "checkbox", "controls", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slideEndAnimatoin", "bolean", "slideEndAnimatoin", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["hideControlOnEnd", "checkbox", "hideControlOnEnd", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["mousewheel", "checkbox", "mousewheel", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["getCaptionFromTitleOrAlt:", "checkbox", "getCaptionFromTitleOrAlt:", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["appendSubHtmlTo", "text", "appendSubHtmlTo", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["subHtmlSelectorRelative", "checkbox", "subHtmlSelectorRelative", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["preload", "slider", "preload", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["showAfterLoad", "checkbox", "showAfterLoad", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["selector", "text", "selector", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["selectWithin", "text", "selectWithin", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["nextHtml", "text", "nextHtml", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["prevHtml", "text", "prevHtml", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["index", "slider", "index", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["iframeMaxWidth", "text", "iframeMaxWidth", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["download", "checkbox", "download", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["counter", "checkbox", "counter", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["appendCounterTo", "text", "appendCounterTo", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["swipeThreshold", "slider", "swipeThreshold", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enableDrag", "checkbox", "enableDrag", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enableSwipe", "checkbox", "enableSwipe", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["dynamic", "checkbox", "dynamic", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["dynamicEl", "array", "dynamicEl", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["thumbnail", "checkbox", "thumbnail", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["animateThumb", "checkbox", "animateThumb", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["currentPagerPosition", "text", "currentPagerPosition", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["thumbWidth", "slider", "thumbWidth", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["thumbHeight", "text", "thumbHeight", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["thumbContHeight", "slider", "thumbContHeight", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["thumbMargin", "slider", "thumbMargin", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["exThumbImage", "text", "exThumbImage", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["showThumbByDefault", "checkbox", "showThumbByDefault", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["toogleThumb", "checkbox", "toogleThumb", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pullCaptionUp", "checkbox", "pullCaptionUp", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enableThumbDrag", "checkbox", "enableThumbDrag", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enableThumbSwipe", "checkbox", "enableThumbSwipe", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["swipeThreshold", "slider", "swipeThreshold", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loadYoutubeThumbnail", "checkbox", "loadYoutubeThumbnail", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["youtubeThumbSize", "slider", "youtubeThumbSize", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["loadVimeoThumbnail", "checkbox", "loadVimeoThumbnail", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["vimeoThumbSize", "text", "vimeoThumbSize", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loadDailymotionThumbnail", "checkbox", "loadDailymotionThumbnail", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoplay", "checkbox", "autoplay", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pause", "slider", "pause", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["progressBar", "checkbox", "progressBar", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fourceAutoplay", "checkbox", "fourceAutoplay", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoplayControls", "checkbox", "autoplayControls", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["appendAutoplayControlsTo", "text", "appendAutoplayControlsTo", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["videoMaxWidth", "text", "videoMaxWidth", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoplayFirstVideo", "checkbox", "autoplayFirstVideo", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["youtubePlayerParams", "object", "youtubePlayerParams", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["vimeoPlayerParams", "object", "vimeoPlayerParams", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["dailymotionPlayerParams", "object", "dailymotionPlayerParams", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["vkPlayerParams", "object", "vkPlayerParams", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["videojs", "checkbox", "videojs", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["videojsOptions", "object", "videojsOptions", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fullScreen", "checkbox", "fullScreen", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pager", "checkbox", "pager", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["zoom", "checkbox", "zoom", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["scale", "slider", "scale", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enableZoomAfter", "slider", "enableZoomAfter", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["actualSize", "checkbox", "actualSize", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["hash", "checkbox", "hash", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["galleryId", "text", "galleryId", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["share", "checkbox", "share", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["facebook", "checkbox", "facebook", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["facebookDropdownText", "text", "facebookDropdownText", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["twitter", "checkbox", "twitter", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["twitterDropdownText", "text", "twitterDropdownText", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["googlePlus", "checkbox", "googlePlus", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["googlePlusDropdownText", "text", "googlePlusDropdownText", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pinterest", "checkbox", "pinterest", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pinterestDropdownText", "text", "pinterestDropdownText", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Light Gallery", ".light-gallery", "lightgallery", "data-light-gallery-options", lightgalleryattributeoptions);


		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var magnificpopupattributeoptions = [
			["type", "text", "type", "custom", "", "image", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["delegate", "text", "delegate", "custom", "", "a", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["disableOn", "text", "disableOn", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["key", "text", "key", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["midClick", "checkbox", "midClick", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["mainClass", "text", "mainClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["preloader", "checkbox", "preloader", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["focus", "text", "focus", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["closeOnContentClick", "checkbox", "closeOnContentClick", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["closeOnBgClick", "checkbox", "closeOnBgClick", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["closeBtnInside", "checkbox", "closeBtnInside", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["showCloseBtn", "checkbox", "showCloseBtn", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enableEscapeKey", "checkbox", "enableEscapeKey", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["modal", "checkbox", "modal", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["alignTop", "checkbox", "alignTop", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["index", "slider", "index", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fixedContentPos", "select", "fixedContentPos", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["fixedBgPos", "select", "fixedBgPos", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["overflowY", "select", "overflowY", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["removalDelay", "slider", "removalDelay", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["closeMarkup", "text", "closeMarkup", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["prependTo", "text", "prependTo", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoFocusLast", "checkbox", "autoFocusLast", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["gallery", "object", "gallery", "none", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enabled", "checkbox", "enabled", "custom", true, "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["preload", "text", "preload", "custom", "", "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["navigateByImgClick", "checkbox", "navigateByImgClick", "custom", true, "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["arrowMarkup", "text", "arrowMarkup", "custom", "", "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["tPrev", "text", "tPrev", "custom", "", "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["tNext", "text", "tNext", "custom", "", "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["tCounter", "text", "tCounter", "custom", "", "", false, "", false, false, "", "gallery", false, null, true, false, "", false, "", false],
			["zoom", "checkbox", "zoom", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enabled2", "checkbox", "enabled2", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["duration", "slider", "duration", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "easing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["opener", "text", "opener", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Magnific Popup", ".magnific-popup", "magnificpopup", "data-magnific-popup-options", magnificpopupattributeoptions);




		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var owlcarouselattributeoptions = [
			["advanced", "checkbox", "Show Advanced", "element_attribute", "true", "", false, "", false, false, "", "", false, null, false, false, "", false, "advanced", true],
			["items", "slider", "Items", "custom", "", "3", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["margin", "slider", "Margin", "custom", "", "0", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["loop", "checkbox", "loop", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["center", "checkbox", "center", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["mouseDrag", "checkbox", "mouseDrag", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["touchDrag", "checkbox", "touchDrag", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["pullDrag", "checkbox", "pullDrag", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["freeDrag", "checkbox", "freeDrag", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["stagePadding", "slider", "stagePadding", "custom", "", "0", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["merge", "checkbox", "merge", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["mergeFit", "checkbox", "mergeFit", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["autoWidth", "checkbox", "autoWidth", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["startPosition", "slider", "startPosition", "custom", "", "0", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["URLhashListener", "checkbox", "URLhashListener", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["nav", "checkbox", "nav", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["navClass", "text", "navClass", "custom", "", "", false, "", false, false, "", "", true, null, false, false, "", false, "", false],
			["rewind", "checkbox", "rewind", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["navText", "text", "navText", "custom", "[&#x27;next&#x27;,&#x27;prev&#x27;]", "[&#x27;next&#x27;,&#x27;prev&#x27;]", false, "", false, false, "", "", true, null, false, false, "", false, "", false],
			["navElement", "text", "navElement", "custom", "", "div", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["slideBy", "slider", "slideBy", "custom", "", "1", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["slideTransition", "text", "slideTransition", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["dots", "checkbox", "dots", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["dotsEach", "checkbox", "dotsEach", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["dotsData", "checkbox", "dotsData", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["lazyLoad", "checkbox", "lazyLoad", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["lazyLoadEager", "slider", "lazyLoadEager", "custom", "", "0", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["autoplay", "checkbox", "autoplay", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["autoplayTimeout", "slider", "autoplayTimeout", "custom", "", "5000", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["autoplayHoverPause", "checkbox", "autoplayHoverPause", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["smartSpeed", "slider", "smartSpeed", "custom", "", "250", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["fluidSpeed", "checkbox", "fluidSpeed", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["autoplaySpeed", "slider", "autoplaySpeed", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["navSpeed", "slider", "navSpeed", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["dotsSpeed", "slider", "dotsSpeed", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["dragEndSpeed", "checkbox", "dragEndSpeed", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["callbacks", "checkbox", "callbacks", "custom", true, "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["responsive", "text", "responsive", "custom", "", "", false, "", false, false, "", "", true, null, false, false, "", false, "", false],
			["responsiveRefreshRate", "slider", "responsiveRefreshRate", "custom", "", "200", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["responsiveBaseElement", "text", "responsiveBaseElement", "custom", "", "window", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["video", "checkbox", "video", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["videoHeight", "slider", "videoHeight", "custom", "", "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["videoWidth", "slider", "videoWidth", "custom", "", "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["animateOut", "select", "animateOut", "custom", "", "", false, "", false, false, "", "", false, animations, false, false, "", false, "", false],
			["animateIn", "select", "animateIn", "custom", "", "", false, "", false, false, "", "", false, animations, false, false, "", false, "", false],
			["fallbackEasing", "text", "fallbackEasing", "custom", "", "swing", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["info", "text", "info", "custom", "", "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["nestedItemSelector", "text", "nestedItemSelector", "custom", "", "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["itemElement", "text", "itemElement", "custom", "", "div", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["stageElement", "text", "stageElement", "custom", "", "div", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["navContainer", "text", "navContainer", "custom", "", "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["dotsContainer", "text", "dotsContainer", "custom", "", "", false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false],
			["checkVisible", "checkbox", "checkVisible", "custom", true, true, false, "", false, false, "advanced", "", false, null, false, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("OWL Carousel", ".owl-carousel", "owlcarousel", "data-owl-carousel-options", owlcarouselattributeoptions);




		var parallaxtypes = [{
				key: 'scroll',
				name: 'Scroll'
			},
			{
				key: 'scale',
				name: 'Scale'
			},
			{
				key: 'opacity',
				name: 'Opacity'
			},
			{
				key: 'scroll-opacity',
				name: 'Scroll-Opacity'
			},
			{
				key: 'scale-opacity',
				name: 'Scale-Opacity'
			}
		];
		var parallaxrepeats = [{
				key: 'repeat',
				name: 'repeat'
			},
			{
				key: 'repeat-x',
				name: 'repeat-x'
			},
			{
				key: 'repeat-y',
				name: 'repeat-y'
			},
			{
				key: 'no-repeat',
				name: 'no-repeat'
			},
			{
				key: 'space',
				name: 'space'
			},
			{
				key: 'round',
				name: 'round'
			},
			{
				key: 'initial',
				name: 'initial'
			},
			{
				key: 'inherit',
				name: 'inherit'
			}
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var parallaxattributeoptions = [
			["type", "select", "type", "custom", "scroll", "scroll", false, "", false, false, "", "", false, parallaxtypes, false, false, "", false, "", false],
			["speed", "slider", "speed", "custom", "0.5", "0.5", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["imgSrc", "text", "imgSrc", "custom", "", "", false, "", true, false, "", "", false, null, false, false, "", false, "", false],
			["getmore", "button", "Get More", "", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["imgElement", "text", "imgElement", "custom", ".jarallax-img", ".jarallax-img", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["imgSize", "text", "imgSize", "custom", "cover", "cover/contain", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["imgPosition", "text", "imgPosition", "custom", "50% 50%", "50% 50%", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["imgRepeat", "select", "imgRepeat", "custom", "no-repeat", "no-repeat", false, "", false, false, "", "", false, parallaxrepeats, false, false, "", false, "", false],
			["keepImg", "checkbox", "keepImg", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["elementInViewport", "text", "elementInViewport", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["zIndex", "slider", "zIndex", "custom", "-100", "-100", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["disableParallax", "text", "disableParallax", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["disableVideo", "text", "disableVideo", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["automaticResize", "checkbox", "automaticResize", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["videoSrc", "text", "videoSrc", "custom", "", "", false, "", true, false, "", "", false, null, false, false, "", false, "", false],
			["videoStartTime", "slider", "videoStartTime", "custom", "0", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["videoEndTime", "slider", "videoEndTime", "custom", "0", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["videoVolume", "slider", "videoVolume", "custom", "0", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["videoPlayOnlyVisible", "checkbox", "videoPlayOnlyVisible", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Parallax", ".jarallax", "jarallax", "data-jarallax-options", parallaxattributeoptions);



		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var rellaxattributeoptions = [
			["speed","slider","speed","custom","","",false,"",false,false,"","",false,null,true,false,"data-rellax-speed",true,"",false],
			["center","checkbox","center","custom",true,"",false,"",false,false,"","",false,null,true,false,"data-rellax-center",true,"",false],
			["wrapper","text","wrapper","custom","","",false,"",false,false,"","",false,null,true,false,"data-rellax-wrapper",true,"",false],
			["relativetowrapper","checkbox","relativetowrapper","custom",true,"",false,"",false,false,"","",false,null,true,false,"data-rellax-relativetowrapper",true,"",false],
			["round","checkbox","round","custom",true,"",false,"",false,false,"","",false,null,true,false,"data-rellax-round",true,"",false],
			["vertical","checkbox","vertical","custom",true,"",false,"",false,false,"","",false,null,true,false,"data-rellax-vertical",true,"",false],
			["horizontal","checkbox","horizontal","custom",true,"",false,"",false,false,"","",false,null,true,false,"data-rellax-horizontal",true,"",false],
			["percentage","slider","percentage","custom","","",false,"",false,false,"","",false,null,true,false,"data-rellax-percentage",true,"",false],
			["zindex","slider","zindex","custom","","",false,"",false,false,"","",false,null,true,false,"data-rellax-zindex",true,"",false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Rellax", ".rellax", "rellax", "data-rellax-options", rellaxattributeoptions);



		var plyrtypes = [{
				key: 'youtube',
				name: 'Youtube'
			},
			{
				key: 'vimeo',
				name: 'Vimeo'
			}
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var plyrattributeoptions = [
			["type", "select", "Type", "custom", true, "", false, "", false, false, "", "", false, plyrtypes, true, false, "data-type", true, "", false],
			["videoid", "text", "Video Id", "custom", true, "", false, "", false, false, "", "", false, null, true, true, "data-video-id", true, "", false],
			["enabled", "checkbox", "enabled", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["debug", "checkbox", "debug", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["controls", "text", "controls", "custom", "['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["i18n", "Object", "i18n", "custom", "See defaults.js", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loadSprite", "checkbox", "loadSprite", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["iconUrl", "text", "iconUrl", "custom", "null", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["iconPrefix", "text", "iconPrefix", "custom", "plyr", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["blankUrl", "text", "blankUrl", "custom", "https://cdn.plyr.io/static/blank.mp4", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoplay", "checkbox", "autoplay", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autopause", "checkbox", "autopause", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["seekTime", "slider", "seekTime", "custom", "10", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["volume", "slider", "volume", "custom", "1", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["muted", "checkbox", "muted", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["clickToPlay", "checkbox", "clickToPlay", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["disableContextMenu", "checkbox", "disableContextMenu", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["hideControls", "checkbox", "hideControls", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["keyboard", "Object", "keyboard", "custom", "{ focused: true, global: false }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tooltips", "Object", "tooltips", "custom", "{ controls: false, seek: true }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["duration", "slider", "duration", "custom", "null", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["displayDuration", "checkbox", "displayDuration", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["toggleInvert", "checkbox", "toggleInvert", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["listeners", "Object", "listeners", "custom", "null", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["captions", "Object", "captions", "custom", "{ active: false, language: 'auto', update: false }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fullscreen", "Object", "fullscreen", "custom", "{ enabled: true, fallback: true, iosNative: false }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["ratio", "text", "ratio", "custom", "16:9", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["storage", "Object", "storage", "custom", "{ enabled: true, key: 'plyr' }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["speed", "Object", "speed", "custom", "{ selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["quality", "Object", "quality", "custom", "{ default: 'default', options: ['hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny', 'default'] }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loop", "Object", "loop", "custom", "{ active: false }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["ads", "Object", "ads", "custom", "{ enabled: false, publisherId: '' }", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Media Plyr", ".js-player", "plyr", "data-plyr", plyrattributeoptions);


		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var progressbarcircleattributeoptions = [
			["data", "text", "Data", "custom", "99", "99", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["strokeWidth", "text", "Stroke Width", "custom", "2", "2", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "Easing", "custom", "easeInOut", "easeInOut", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["duration", "text", "Duration", "custom", "1400", "1400", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["color", "text", "Color", "custom", "#f00", "#f00", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["trailColor", "text", "Trail Color", "custom", "#0f0", "#0f0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["trailWidth", "text", "Trail Width", "custom", "2", "2", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textcolor", "text", "Text Color", "custom", "#999", "#999", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textright", "text", "Text Right", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["texttop", "text", "Text Top", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textpadding", "text", "Text Padding", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textmargin", "text", "Text Margin", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Progress Bar Circle", ".progressbar-circle", "progressbarcircle", "data-progressbar-options", progressbarcircleattributeoptions);

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var progressbarsemicircleattributeoptions = [
			["data", "text", "Data", "custom", "99", "99", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["strokeWidth", "text", "Stroke Width", "custom", "2", "2", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "Easing", "custom", "easeInOut", "easeInOut", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["duration", "text", "Duration", "custom", "1400", "1400", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["color", "text", "Color", "custom", "#f00", "#f00", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["trailColor", "text", "Trail Color", "custom", "#0f0", "#0f0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["trailWidth", "text", "Trail Width", "custom", "2", "2", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textcolor", "text", "Text Color", "custom", "#999", "#999", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textright", "text", "Text Right", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["texttop", "text", "Text Top", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textpadding", "text", "Text Padding", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textmargin", "text", "Text Margin", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Progress Bar Semi Circle", ".progressbar-semicircle", "progressbarsemicircle", "data-progressbar-options", progressbarsemicircleattributeoptions);

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var progressbarlineattributeoptions = [
			["data", "text", "Data", "custom", "99", "99", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["strokeWidth", "text", "Stroke Width", "custom", "2", "2", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "Easing", "custom", "easeInOut", "easeInOut", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["duration", "text", "Duration", "custom", "1400", "1400", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["color", "text", "Color", "custom", "#f00", "#f00", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["trailColor", "text", "Trail Color", "custom", "#0f0", "#0f0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["trailWidth", "text", "Trail Width", "custom", "2", "2", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textcolor", "text", "Text Color", "custom", "#999", "#999", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textright", "text", "Text Right", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["texttop", "text", "Text Top", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textpadding", "text", "Text Padding", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["textmargin", "text", "Text Margin", "custom", "0", "0", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Progress Bar Line", ".progressbar-line", "progressbarline", "data-progressbar-options", progressbarlineattributeoptions);








		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var slicksliderattributeoptions = [
			["advanced", "checkbox", "Show Advanced", "element_attribute", "true", "", false, "", false, false, "", "", false, null, false, false, "", false, "advanced", true],
			["accessibility", "checkbox", "accessibility", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["adaptiveHeight", "checkbox", "adaptiveHeight", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoplay", "checkbox", "autoplay", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["autoplaySpeed", "slider", "autoplaySpeed", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["arrows", "checkbox", "arrows", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["asNavFor", "text", "asNavFor", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["appendArrows", "text", "appendArrows", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["appendDots", "text", "appendDots", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["prevArrow", "text", "prevArrow", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["nextArrow", "text", "nextArrow", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["centerMode", "checkbox", "centerMode", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["centerPadding", "text", "centerPadding", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["cssEase", "text", "cssEase", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["customPaging", "text", "customPaging", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["dots", "checkbox", "dots", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["dotsClass", "text", "dotsClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["draggable", "checkbox", "draggable", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fade", "checkbox", "fade", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["focusOnSelect", "checkbox", "focusOnSelect", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "easing", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["edgeFriction", "slider", "edgeFriction", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["infinite", "checkbox", "infinite", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["initialSlide", "slider", "initialSlide", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["lazyLoad", "text", "lazyLoad", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["mobileFirst", "checkbox", "mobileFirst", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["pauseOnFocus", "checkbox", "pauseOnFocus", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pauseOnHover", "checkbox", "pauseOnHover", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["pauseOnDotsHover", "checkbox", "pauseOnDotsHover", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["respondTo", "text", "respondTo", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["responsive", "checkbox", "responsive", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["rows", "slider", "rows", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slide", "element", "slide", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slidesPerRow", "slider", "slidesPerRow", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slidesToShow", "slider", "slidesToShow", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slidesToScroll", "slider", "slidesToScroll", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["speed", "slider", "speed", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["swipe", "checkbox", "swipe", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["swipeToSlide", "checkbox", "swipeToSlide", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["touchMove", "checkbox", "touchMove", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["touchThreshold", "slider", "touchThreshold", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["useCSS", "checkbox", "useCSS", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["useTransform", "checkbox", "useTransform", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["variableWidth", "checkbox", "variableWidth", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["vertical", "checkbox", "vertical", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["verticalSwiping", "checkbox", "verticalSwiping", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["rtl", "checkbox", "rtl", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["waitForAnimate", "checkbox", "waitForAnimate", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["zIndex", "slider", "zIndex", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Slick Slider", ".slick-slider", "slickslider", "data-slick-slider-options", slicksliderattributeoptions);




		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var swipersliderattributeoptions = [
			["advanced", "checkbox", "Show Advanced", "element_attribute", "true", "", false, "", false, false, "", "", false, null, false, false, "", false, "advanced", true],
			["init", "checkbox", "init", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["initialSlide", "slider", "initialSlide", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["direction", "text", "direction", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["speed", "slider", "speed", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["setWrapperSize", "checkbox", "setWrapperSize", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["virtualTranslate", "checkbox", "virtualTranslate", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["width", "slider", "width", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["height", "slider", "height", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["autoHeight", "checkbox", "autoHeight", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["roundLengths", "checkbox", "roundLengths", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["nested", "checkbox", "nested", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["uniqueNavElements", "checkbox", "uniqueNavElements", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["effect", "select", "effect", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["runCallbacksOnInit", "checkbox", "runCallbacksOnInit", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["watchOverflow", "checkbox", "watchOverflow", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["on", "checkbox", "on", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["spaceBetween", "slider", "spaceBetween", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slidesPerView", "slider", "slidesPerView", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slidesPerColumn", "slider", "slidesPerColumn", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slidesPerColumnFill", "text", "slidesPerColumnFill", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slidesPerGroup", "slider", "slidesPerGroup", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["centeredSlides", "checkbox", "centeredSlides", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["slidesOffsetBefore", "slider", "slidesOffsetBefore", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slidesOffsetAfter", "slider", "slidesOffsetAfter", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["normalizeSlideIndex", "checkbox", "normalizeSlideIndex", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["grabCursor", "checkbox", "grabCursor", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["touchEventsTarget", "text", "touchEventsTarget", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["touchRatio", "slider", "touchRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["touchAngle", "slider", "touchAngle", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["simulateTouch", "checkbox", "simulateTouch", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["shortSwipes", "checkbox", "shortSwipes", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["longSwipes", "checkbox", "longSwipes", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["longSwipesRatio", "slider", "longSwipesRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["longSwipesMs", "slider", "longSwipesMs", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["followFinger", "checkbox", "followFinger", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["allowTouchMove", "checkbox", "allowTouchMove", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["threshold", "slider", "threshold", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["touchMoveStopPropagation", "checkbox", "touchMoveStopPropagation", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["iOSEdgeSwipeDetection", "checkbox", "iOSEdgeSwipeDetection", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["iOSEdgeSwipeThreshold", "slider", "iOSEdgeSwipeThreshold", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["touchReleaseOnEdges", "checkbox", "touchReleaseOnEdges", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["passiveListeners", "checkbox", "passiveListeners", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["resistance", "checkbox", "resistance", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["resistanceRatio", "slider", "resistanceRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["preventInteractionOnTransition", "checkbox", "preventInteractionOnTransition", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["allowSlidePrev", "checkbox", "allowSlidePrev", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["allowSlideNext", "checkbox", "allowSlideNext", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["noSwiping", "checkbox", "noSwiping", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["noSwipingClass", "text", "noSwipingClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["noSwipingSelector", "text", "noSwipingSelector", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["swipeHandler", "text", "swipeHandler", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["preventClicks", "checkbox", "preventClicks", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["preventClicksPropagation", "checkbox", "preventClicksPropagation", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideToClickedSlide", "checkbox", "slideToClickedSlide", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeMode", "checkbox", "freeMode", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["freeModeMomentum", "checkbox", "freeModeMomentum", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeModeMomentumRatio", "slider", "freeModeMomentumRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeModeMomentumVelocityRatio", "slider", "freeModeMomentumVelocityRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeModeMomentumBounce", "checkbox", "freeModeMomentumBounce", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeModeMomentumBounceRatio", "slider", "freeModeMomentumBounceRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeModeMinimumVelocity", "slider", "freeModeMinimumVelocity", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["freeModeSticky", "checkbox", "freeModeSticky", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["watchSlidesProgress", "checkbox", "watchSlidesProgress", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["watchSlidesVisibility", "checkbox", "watchSlidesVisibility", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["preloadImages", "checkbox", "preloadImages", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["updateOnImagesReady", "checkbox", "updateOnImagesReady", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loop", "checkbox", "loop", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loopAdditionalSlides", "slider", "loopAdditionalSlides", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loopedSlides", "slider", "loopedSlides", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loopFillGroupWithBlank", "checkbox", "loopFillGroupWithBlank", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["breakpoints", "checkbox", "breakpoints", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["observer", "checkbox", "observer", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["observeParents", "checkbox", "observeParents", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["containerModifierClass", "text", "containerModifierClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideClass", "text", "slideClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideActiveClass", "text", "slideActiveClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideDuplicatedActiveClass", "text", "slideDuplicatedActiveClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideVisibleClass", "text", "slideVisibleClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideDuplicateClass", "text", "slideDuplicateClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideNextClass", "text", "slideNextClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideDuplicatedNextClass", "text", "slideDuplicatedNextClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slidePrevClass", "text", "slidePrevClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideDuplicatedPrevClass", "text", "slideDuplicatedPrevClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["wrapperClass", "text", "wrapperClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["navigation", "object", "navigation", 'none', "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["nextEl", "text", "nextEl", "custom", "", "", false, "", false, false, "", "navigation", false, null, true, false, "", false, "", false],
			["prevEl", "text", "prevEl", "custom", "", "", false, "", false, false, "", "navigation", false, null, true, false, "", false, "", false],
			["hideOnClick_p", "checkbox", "hideOnClick_p", "custom", "true", "", false, "", false, false, "", "navigation", false, null, true, false, "", false, "", false],
			["disabledClass", "text", "disabledClass", "custom", "", "", false, "", false, false, "", "navigation", false, null, true, false, "", false, "", false],
			["hiddenClass_p", "text", "hiddenClass_p", "custom", "", "", false, "", false, false, "", "navigation", false, null, true, false, "", false, "", false],
			["pagination", "object", "pagination", "none", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["el", "text", "el", "custom", "", "", false, "", false, false, "", "pagination", false, null, true, false, "", false, "", false],
			["type", "text", "type", "custom", "", "", false, "", false, false, "", "pagination", false, null, true, false, "", false, "", false],
			["bulletElement", "text", "bulletElement", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["dynamicBullets", "checkbox", "dynamicBullets", "custom", true, "", false, "", false, false, "", "pagination", false, null, true, false, "", false, "", false],
			["dynamicMainBullets", "slider", "dynamicMainBullets", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["hideOnClick", "checkbox", "hideOnClick", "custom", true, "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["clickable", "checkbox", "clickable", "custom", true, "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["progressbarOpposite", "checkbox", "progressbarOpposite", "custom", true, "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["renderBullet", "text", "renderBullet", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["renderFraction", "text", "renderFraction", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["renderProgressbar", "text", "renderProgressbar", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["renderCustom", "text", "renderCustom", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["bulletClass", "text", "bulletClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["bulletActiveClass", "text", "bulletActiveClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["modifierClass", "text", "modifierClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["currentClass", "text", "currentClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["totalClass", "text", "totalClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["hiddenClass", "text", "hiddenClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["progressbarFillClass", "text", "progressbarFillClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["clickableClass", "text", "clickableClass", "custom", "", "", false, "", false, false, "advanced", "pagination", false, null, true, false, "", false, "", false],
			["scrollbar", "checkbox", "scrollbar", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["el2", "text", "el2", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["hide", "checkbox", "hide", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["draggable", "checkbox", "draggable", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["snapOnRelease", "checkbox", "snapOnRelease", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["dragSize", "slider", "dragSize", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["lockClass", "text", "lockClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["dragClass", "text", "dragClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["autoplay", "checkbox", "autoplay", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["delay", "slider", "delay", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["stopOnLastSlide", "checkbox", "stopOnLastSlide", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["disableOnInteraction", "checkbox", "disableOnInteraction", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["reverseDirection", "checkbox", "reverseDirection", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["waitForTransition", "checkbox", "waitForTransition", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["lazy", "checkbox", "lazy", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["loadPrevNext", "checkbox", "loadPrevNext", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loadPrevNextAmount", "slider", "loadPrevNextAmount", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loadOnTransitionStart", "checkbox", "loadOnTransitionStart", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["elementClass", "text", "elementClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loadingClass", "text", "loadingClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["loadedClass", "text", "loadedClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["preloaderClass", "text", "preloaderClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["parallax", "checkbox", "parallax", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fadeEffect", "checkbox", "fadeEffect", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["crossFade", "checkbox", "crossFade", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["coverflowEffect", "checkbox", "coverflowEffect", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideShadows", "checkbox", "slideShadows", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["rotate", "slider", "rotate", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["stretch", "slider", "stretch", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["depth", "slider", "depth", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["modifier", "slider", "modifier", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["flipEffect", "checkbox", "flipEffect", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideShadows", "checkbox", "slideShadows", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["limitRotation", "checkbox", "limitRotation", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["cubeEffect", "checkbox", "cubeEffect", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slideShadows", "checkbox", "slideShadows", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["shadow", "checkbox", "shadow", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["shadowOffset", "slider", "shadowOffset", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["shadowScale", "slider", "shadowScale", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["zoom", "checkbox", "zoom", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["maxRatio", "slider", "maxRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["minRatio", "slider", "minRatio", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["toggle", "checkbox", "toggle", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["containerClass", "text", "containerClass", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["zoomedSlideClass", "text", "zoomedSlideClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["keyboard", "checkbox", "keyboard", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enabled", "checkbox", "enabled", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["onlyInViewport", "checkbox", "onlyInViewport", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["mousewheel", "checkbox", "mousewheel", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["forceToAxis", "checkbox", "forceToAxis", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["releaseOnEdges", "checkbox", "releaseOnEdges", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["invert", "checkbox", "invert", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["sensitivity", "slider", "sensitivity", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["eventsTarged", "text", "eventsTarged", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["virtual", "checkbox", "virtual", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["slides", "text", "slides", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["cache", "checkbox", "cache", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["renderSlide", "text", "renderSlide", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["renderExternal", "text", "renderExternal", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["hashNavigation", "checkbox", "hashNavigation", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["watchState", "checkbox", "watchState", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["replaceState", "checkbox", "replaceState", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["history", "checkbox", "history", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["replaceState", "checkbox", "replaceState", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["key", "text", "key", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["controller", "checkbox", "controller", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["control", "text", "control", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["inverse", "checkbox", "inverse", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["by", "text", "by", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["a11y", "checkbox", "a11y", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["enabled", "checkbox", "enabled", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["prevSlideMessage", "text", "prevSlideMessage", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["nextSlideMessage", "text", "nextSlideMessage", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["firstSlideMessage", "text", "firstSlideMessage", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["lastSlideMessage", "text", "lastSlideMessage", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["paginationBulletMessage", "text", "paginationBulletMessage", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["notificationClass", "text", "notificationClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Swiper Slider", ".swiper-slider", "swiperslider", "data-swiper-slider-options", swipersliderattributeoptions);



		var spinneroptions = [
			{ key: 'rotating-plane', name: 'rotating-plane'},
			{ key: 'rotating-plane', name: 'rotating-plane'},
			{ key: 'wave', name: 'wave'},
			{ key: 'wandering-cubes', name: 'wandering-cubes'},
			{ key: 'spinner-pulse', name: 'spinner-pulse'},
			{ key: 'three-bounce', name: 'three-bounce'},
			{ key: 'cube-grid', name: 'cube-grid'}
		];
		var venoboxtypes = [
			{ key: 'iframe', name: 'iframe'},
			{ key: 'inline', name: 'inline'},
			{ key: 'ajax', name: 'ajax'},
			{ key: 'video', name: 'video'}
		];
			
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var venoboxattributeoptions = [
			["vbtype", "select", "Type", "custom", "", "", false, "", false, false, "", "", false, venoboxtypes, true, false, "data-vbtype", true, "", false],
			["href", "text", "Link", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "data-href", true, "", false],
			["gall", "text", "Gallery", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "data-gall", true, "", false],
			["overlay", "text", "Overlay", "custom", "", "#ca294b rgba(95,164,255,0.8)", false, "", false, false, "", "", false, null, true, false, "data-overlay", true, "", false],
			["css", "text", "Custom CSS", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "data-css", true, "", false],
			["arrowsColor","text","arrowsColor","custom","#B6B6B6","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["autoplay","chekbox","autoplay","custom",false,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["bgcolor","text","bgcolor","custom","#ffffff","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["border","text","border","custom","0px","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["closeBackground","text","closeBackground","custom","#161617","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["closeColor","text","closeColor","custom","#d2d2d2","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["framewidth","text","framewidth","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["frameheight","text","frameheight","custom","","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["infinigall","checkbox","infinigall","custom",false,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["numeratio","checkbox","numeratio","custom",false,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["numerationBackground","text","numerationBackground","custom","#161617","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["numerationColor","text","numerationColor","custom","#d2d2d2","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["numerationPosition","text","numerationPosition","custom","top","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["overlayClose","checkbox","overlayClose","custom",true,"",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["overlayColor","text","overlayColor","custom","rgba(255,255,255,0.85)","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["titleattr","text","titleattr","custom","title","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["titleBackground","text","titleBackground","custom","#161617","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["titleColor","text","titleColor","custom","#d2d2d2","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["titlePosition","text","titlePosition","custom","top","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["spinColor","text","spinColor","custom","#d2d2d2","",false,"",false,false,"","",false,null,true,false,"",false,"",false],
			["spinner","select","spinner","custom","double-bounce","",false,"",false,false,"","",false,spinneroptions,true,false,"",false,"",false]
		];
		//name, selectorStr, pgStr, dataStr, opts) 
		creator("Veno Box", ".venobox", "venobox", "data-venobox-options", venoboxattributeoptions);








		pinegrow.addFramework(f);



		var toLocalPath = function (p) {
			return p.replace(/\//g, path.sep);
		}

		//add resources
		var res_files = [
			'css',
			'fonts',
			'img',
			'js',
			'css/aos.css',
			'css/che.css',
			'css/cle.css',
			'css/h.css',
			'css/hei.css',
			'css/ih.css',
			'css/slick.css',
			'css/lightgallery.min.css',
			'css/lg-transitions.min.css',
			'css/lg-fb-comment-box.min.css',
			'css/lhe.css',
			'css/owl.carousel.min.css',
			'css/owl.theme.default.min.css',
			'css/swiper.min.css',
			'css/jarallax.css',
			'css/plyr.css',
			'css/animate.min.css',
			'css/magnific-popup.css',
			'css/jquery.smartmenus.bootstrap-4.css',
			'css/venobox.css',
			'css/styles.css',
			'js/jquery.min.js',
			'js/anijs-min.js',
			'js/anijs-helper-dom-min.js',
			'js/anijs-helper-scrollreveal-min.js',
			'js/aos.js',
			'js/slick.min.js',
			'js/owl.carousel.min.js',
			'js/lightbox.min.js',
			'js/isotope.pkgd.min.js',
			'js/swiper.min.js',
			'js/jarallax.min.js',
			'js/jarallax-video.min.js',
			'js/jarallax-element.min.js',
			'js/rellax.js',
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
			'js/tilt.jquery.js',
			'js/tutorial.js',
			'js/wow.min.js',
			'js/venobox.min.js',
			'js/scripts.js',
		];
		for (var i = 0; i < res_files.length; i++) {
			var file = f.getResourceFile(res_files[i]);
			var r = new PgComponentTypeResource(file);
			r.relative_url = res_files[i];
			r.source = toLocalPath(file);
			r.footer = res_files[i].indexOf('.js') >= 0;
			f.resources.add(r);
		}
		f.resources.description = "CSS and JS files needed for Z Helper to work.";







		var libsection = new PgFrameworkLibSection("ZHelperPlugin_lib", "Z Helper");
		libsection.setComponentTypes([shortcodestart, shortcodeend]);

		f.addLibSection(libsection);














// SHORT CODE BLOCKS





var fs = require('fs');
var path = require('path');
var source_relative = 'code/';
var type_prefix = 'pg.zhelper';
var source_cache = {};
var source_base = f.getResourceUrl(source_relative);

var pgbGetSourceFileUrl = function (fn) {
	return source_base + fn;
}	

var pgbGetSourceNode = function (fn) {

	if (!(fn in source_cache)) {
		source_cache[fn] = pinegrow.getSourceNodeOfUrl(pgbGetSourceFileUrl(fn), true);
	}
	return source_cache[fn];
}
var components_map = {};
var combined_css = '';
var combined_css_file_included = {};

var getComponent = function (type) {
	return components_map[type_prefix + '.' + type];
}

var pgbAddSection = function (key, name, list) {
	var section = new PgFrameworkLibSection(type_prefix + '.' + key, name);
	section.setComponentTypes(list);
	f.addLibSection(section);
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

var sccomps = [];

function addShortCodeComponent(name, selector, opt, yn) {
	addTo(
		sccomps,
		f.pgbCreateComponent(
			'index.html',
			selector,
			name,
			function (pgel, c) {
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


// SHORT CODE BLOCKS END





	});
});
