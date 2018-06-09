$(function () {
	function myTrim(x) {
		return x.replace(/^\s+|\s+$/gm, '');
	}
	$("body").one("pinegrow-ready", function (e, pinegrow) {



		var fs = require('fs');
		var path = require('path');


		var f = new PgFramework("ZHelperPlugin", "Z Helper");



		var things = new PgComponentType('zh.things', 'THINGS');
		things.selector = function ($el) { return true };
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
						options: [
							{ key: 'animated', name: "Animated" },
							{ key: 'countdown', name: "Count Down" },
							{ key: 'counterup', name: "Counter Up" },
							{ key: 'easytabs', name: "Easy Tabs" },
							{ key: 'google-map', name: "Google Maps" },
							{ key: 'isotope', name: "Isotope" },
							{ key: 'light-gallery', name: "Light Gallery" },
							{ key: 'magnific-popup', name: "Magnific Popup" },
							{ key: 'js-player', name: "Media Plyr" },
							{ key: 'owl-carousel', name: "OWL Carousel" },
							{ key: 'jarallax', name: "Parallax" },
							{ key: 'progressbar-circle', name: "ProgressBar Circle" },
							{ key: 'progressbar-semicircle', name: "ProgressBar Semi Circle" },
							{ key: 'progressbar-line', name: "ProgressBar Line" },
							{ key: 'slick-slider', name: "Slick Slider" },
							{ key: 'swiper-slider', name: "Swiper Slider" }
						]
					},
				}
			}
		};
		f.addComponentType(things);



		//name
		//classStr
		//pgStr
		//dataStr


		function creator(name, classStr, pgStr, dataStr, opts) {
			var temp = new PgComponentType('zh.' + pgStr + '_def', name);
			temp.selector = '.' + classStr;
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

			console.warn(pgStr + "------------------------------------------------");
			console.warn(opts);
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
						//						if (opts[16] != "") {
						return generalGet2(pgel, dataStr, opts[0], opts[11], opts[12], opts[17]);
						// }
						// else {
						// 	return generalGet2(pgel, dataStr, opts[0], opts[11], opts[12],false);
						// }
					};
					comp[pgStr + "_" + opts[0]]["set_value"] = function (pgel, value, values, oldValue, eventType) {
						return generalSet2(pgel, value, values, oldValue, eventType, dataStr, opts[0], opts[11], opts[12], opts[17], opts[1]);
					}
				} else {
					comp[pgStr + "_" + opts[0]]["get_value"] = function (pgel) {
						//						if (opts[16] != "") {
						return generalGet(pgel, dataStr, opts[0], opts[12], opts[17]);
						// }else{
						// 	return generalGet(pgel, dataStr, opts[0], opts[12],false);
						// }
					};
					comp[pgStr + "_" + opts[0]]["set_value"] = function (pgel, value, values, oldValue, eventType) {
						return generalSet(pgel, value, values, oldValue, eventType, dataStr, opts[0], opts[12], opts[17], opts[1]);
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
		function generalGet(pgel, dataname, attrname, valueisarray, attributeisvalue) {

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
		function generalGet2(pgel, dataname, attrname, parentel, valueisarray, attributeisvalue) {
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

		function generalSet(pgel, value, values, oldValue, eventType, dataname, attrname, valueisarray, attributeisvalue, type) {
//			console.warn(value + " - generalSet - value");
//			console.warn(dataname + " - generalSet - dataname");
			if (pgel) {
				var attr = pgel.getAttr(dataname);
//				console.warn(attr + " - attr");
				if (value) {
					if (attr) {
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
									obj[attrname] = parseInt(value);
									break;
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
										pgel.setAttr(dataname, '{"' + attrname + '":' + parseInt(value) + '}');
										break;
									default:
										pgel.setAttr(dataname, '{"' + attrname + '":"' + value + '"}');
								}
							}
						}
					}
				} else {
					if (attributeisvalue) {
						pgel.removeAttr(dataname);
					}
					else {
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
		function generalSet2(pgel, value, values, oldValue, eventType, dataname, attrname, parentel, valueisarray, attributeisvalue, type) {

			if (pgel) {
				var attr = pgel.getAttr(dataname);
				if (value) {
					if (attr) {
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
										obj[parentel][attrname] = parseInt(value);
										break;
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
										pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":' + parseInt(value) + '}}');
										break;
									default:
										pgel.setAttr(dataname, '{"' + parentel + '":{"' + attrname + '":"' + value + '"}}');
								}

							}
						}
					}
				} else {
					if (attributeisvalue) {
						pgel.removeAttr(dataname);
					}
					else {
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
							}
							else {
								pgel.removeAttr(dataname);
							}
						}
					}
				}
			}
			return value;
		}




		var attributeoptions = [
			{ key: 'icon', name: 'icon' },
			{ key: 'title', name: 'title' },
			{ key: 'description', name: 'description' },
			{ key: 'link', name: 'link' },
			{ key: 'target', name: 'target' },
			{ key: 'id', name: 'id' },
			{ key: 'class', name: 'class' },
			{ key: 'style', name: 'style' },
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











		var animations = [
			{ key: 'bounce', name: 'bounce' },
			{ key: 'flash', name: 'flash' },
			{ key: 'pulse', name: 'pulse' },
			{ key: 'rubberBand', name: 'rubberBand' },
			{ key: 'shake', name: 'shake' },
			{ key: 'headShake', name: 'headShake' },
			{ key: 'swing', name: 'swing' },
			{ key: 'tada', name: 'tada' },
			{ key: 'wobble', name: 'wobble' },
			{ key: 'jello', name: 'jello' },
			{ key: 'bounceIn', name: 'bounceIn' },
			{ key: 'bounceInDown', name: 'bounceInDown' },
			{ key: 'bounceInLeft', name: 'bounceInLeft' },
			{ key: 'bounceInRight', name: 'bounceInRight' },
			{ key: 'bounceInUp', name: 'bounceInUp' },
			{ key: 'bounceOut', name: 'bounceOut' },
			{ key: 'bounceOutDown', name: 'bounceOutDown' },
			{ key: 'bounceOutLeft', name: 'bounceOutLeft' },
			{ key: 'bounceOutRight', name: 'bounceOutRight' },
			{ key: 'bounceOutUp', name: 'bounceOutUp' },
			{ key: 'fadeIn', name: 'fadeIn' },
			{ key: 'fadeInDown', name: 'fadeInDown' },
			{ key: 'fadeInDownBig', name: 'fadeInDownBig' },
			{ key: 'fadeInLeft', name: 'fadeInLeft' },
			{ key: 'fadeInLeftBig', name: 'fadeInLeftBig' },
			{ key: 'fadeInRight', name: 'fadeInRight' },
			{ key: 'fadeInRightBig', name: 'fadeInRightBig' },
			{ key: 'fadeInUp', name: 'fadeInUp' },
			{ key: 'fadeInUpBig', name: 'fadeInUpBig' },
			{ key: 'fadeOut', name: 'fadeOut' },
			{ key: 'fadeOutDown', name: 'fadeOutDown' },
			{ key: 'fadeOutDownBig', name: 'fadeOutDownBig' },
			{ key: 'fadeOutLeft', name: 'fadeOutLeft' },
			{ key: 'fadeOutLeftBig', name: 'fadeOutLeftBig' },
			{ key: 'fadeOutRight', name: 'fadeOutRight' },
			{ key: 'fadeOutRightBig', name: 'fadeOutRightBig' },
			{ key: 'fadeOutUp', name: 'fadeOutUp' },
			{ key: 'fadeOutUpBig', name: 'fadeOutUpBig' },
			{ key: 'flipInX', name: 'flipInX' },
			{ key: 'flipInY', name: 'flipInY' },
			{ key: 'flipOutX', name: 'flipOutX' },
			{ key: 'flipOutY', name: 'flipOutY' },
			{ key: 'lightSpeedIn', name: 'lightSpeedIn' },
			{ key: 'lightSpeedOut', name: 'lightSpeedOut' },
			{ key: 'rotateIn', name: 'rotateIn' },
			{ key: 'rotateInDownLeft', name: 'rotateInDownLeft' },
			{ key: 'rotateInDownRight', name: 'rotateInDownRight' },
			{ key: 'rotateInUpLeft', name: 'rotateInUpLeft' },
			{ key: 'rotateInUpRight', name: 'rotateInUpRight' },
			{ key: 'rotateOut', name: 'rotateOut' },
			{ key: 'rotateOutDownLeft', name: 'rotateOutDownLeft' },
			{ key: 'rotateOutDownRight', name: 'rotateOutDownRight' },
			{ key: 'rotateOutUpLeft', name: 'rotateOutUpLeft' },
			{ key: 'rotateOutUpRight', name: 'rotateOutUpRight' },
			{ key: 'hinge', name: 'hinge' },
			{ key: 'rollIn', name: 'rollIn' },
			{ key: 'rollOut', name: 'rollOut' },
			{ key: 'zoomIn', name: 'zoomIn' },
			{ key: 'zoomInDown', name: 'zoomInDown' },
			{ key: 'zoomInLeft', name: 'zoomInLeft' },
			{ key: 'zoomInRight', name: 'zoomInRight' },
			{ key: 'zoomInUp', name: 'zoomInUp' },
			{ key: 'zoomOut', name: 'zoomOut' },
			{ key: 'zoomOutDown', name: 'zoomOutDown' },
			{ key: 'zoomOutLeft', name: 'zoomOutLeft' },
			{ key: 'zoomOutRight', name: 'zoomOutRight' },
			{ key: 'zoomOutUp', name: 'zoomOutUp' },
			{ key: 'slideInDown', name: 'slideInDown' },
			{ key: 'slideInLeft', name: 'slideInLeft' },
			{ key: 'slideInRight', name: 'slideInRight' },
			{ key: 'slideInUp', name: 'slideInUp' },
			{ key: 'slideOutDown', name: 'slideOutDown' },
			{ key: 'slideOutLeft', name: 'slideOutLeft' },
			{ key: 'slideOutRight', name: 'slideOutRight' },
			{ key: 'slideOutUp', name: 'slideOutUp' }
		];
		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var animatedattributeoptions = [
			["animation", "select", "Animation", "custom", "", "", false, "", false, false, "", "", false, animations, true, false, "", false, "", false],
			["offset", "slider", "Offset", "custom", "50%", "50%", false, "%", false, false, "", "", false, null, false, false, "", false, "", false],
			["delay", "text", "Delay", "custom", "1000", "1000", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
			["triggerOnce", "checkbox", "Trigger Once", "custom", true, "", false, "", false, false, "", "", false, null, false, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Animated", "animated", "animated", "data-animated-options", animatedattributeoptions);



		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var countdownattributeoptions = [
			["date", "text", "Date", "custom", "2032-04-23T18:25:43.511Z", "2032-04-23T18:25:43.511Z", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["fast", "checkbox", "Fast", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Count Down", "countdown", "countdown", "data-countdown-options", countdownattributeoptions);


		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var counterupattributeoptions = [
			["time", "text", "Time", "custom", "2000", "2000", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["delay", "text", "Delay", "custom", "500", "500", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Counter Up", "counterup", "counterup", "data-counterup-options", counterupattributeoptions);



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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Easy Tabs", "easytabs", "easytabs", "data-easytabs-options", easytabsattributeoptions);


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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Google Maps", "google-map", "googlemap", "data-google-map-options", googlemapattributeoptions);



		var layoutModes = [
			{ key: 'masonry', name: 'Masonry' },
			{ key: 'fitRows', name: 'FitRows' },
			{ key: 'certical', name: 'Vertical' }
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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Isotope Gallery", "isotope", "isotope", "data-isotope-options", isotopeattributeoptions);



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
			["galleryId", "slider", "galleryId", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Light Gallery", "light-gallery", "lightgallery", "data-light-gallery-options", lightgalleryattributeoptions);


		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var magnificpopupattributeoptions = [
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
			["gallery", "checkbox", "gallery", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enabled", "checkbox", "enabled", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["preload", "text", "preload", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["navigateByImgClick", "checkbox", "navigateByImgClick", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["arrowMarkup", "text", "arrowMarkup", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tPrev", "text", "tPrev", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tNext", "text", "tNext", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["tCounter", "text", "tCounter", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["zoom", "checkbox", "zoom", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["enabled", "checkbox", "enabled", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["duration", "slider", "duration", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["easing", "text", "easing", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["opener", "text", "opener", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Magnific Popup", "magnific-popup", "magnificpopup", "data-magnific-popup-options", magnificpopupattributeoptions);




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
			["responsive", "text", "responsive", "custom", "", "", false, "", false, false, "", "", false, null, false, false, "", false, "", false],
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
		//name, classStr, pgStr, dataStr, opts) 
		creator("OWL Carousel", "owl-carousel", "owlcarousel", "data-owl-carousel-options", owlcarouselattributeoptions);




		var parallaxtypes = [
			{ key: 'scroll', name: 'Scroll' },
			{ key: 'scale', name: 'Scale' },
			{ key: 'opacity', name: 'Opacity' },
			{ key: 'scroll-opacity', name: 'Scroll-Opacity' },
			{ key: 'scale-opacity', name: 'Scale-Opacity' }
		];
		var parallaxrepeats = [
			{ key: 'repeat', name: 'repeat' },
			{ key: 'repeat-x', name: 'repeat-x' },
			{ key: 'repeat-y', name: 'repeat-y' },
			{ key: 'no-repeat', name: 'no-repeat' },
			{ key: 'space', name: 'space' },
			{ key: 'round', name: 'round' },
			{ key: 'initial', name: 'initial' },
			{ key: 'inherit', name: 'inherit' }
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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Parallax", "jarallax", "jarallax", "data-jarallax-options", parallaxattributeoptions);



		var plyrtypes = [
			{ key: 'youtube', name: 'Youtube' },
			{ key: 'vimeo', name: 'Vimeo' }
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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Media Plyr", "js-player", "plyr", "data-plyr", plyrattributeoptions);


		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var progressbarcircleattributeoptions = [
			["data", "text", "Data", "custom", "99", "99", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Progress Bar Circle", "progressbar-circle", "progressbarcircle", "data-progressbar-options", progressbarcircleattributeoptions);

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var progressbarsemicircleattributeoptions = [
			["data", "text", "Data", "custom", "99", "99", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Progress Bar Semi Circle", "progressbar-semicircle", "progressbarsemicircle", "data-progressbar-options", progressbarsemicircleattributeoptions);

		//0-optName, 1-type, 2-name, 3-action, 4-value, 5-placeholder, 6-live_update, 7-slider_def_unit, 8-file_picker, 9-file_picker_no_proxy, 10-show_if, 11-parent, 12-valueisarray, 13-options, 14-show_empty, 15-multiple, 16-customattribute, 17-attributeisvalue, 18-attribute, 19-emptyattribute
		var progressbarlineattributeoptions = [
			["data", "text", "Data", "custom", "99", "99", false, "", false, false, "", "", false, null, true, false, "", false, "", false]
		];
		//name, classStr, pgStr, dataStr, opts) 
		creator("Progress Bar Line", "progressbar-line", "progressbarline", "data-progressbar-options", progressbarlineattributeoptions);








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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Slick Slider", "slick-slider", "slickslider", "data-slick-slider-options", slicksliderattributeoptions);




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
			["pagination", "checkbox", "pagination", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["el", "text", "el", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["type", "text", "type", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["bulletElement", "text", "bulletElement", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["dynamicBullets", "checkbox", "dynamicBullets", "custom", true, "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["dynamicMainBullets", "slider", "dynamicMainBullets", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["hideOnClick", "checkbox", "hideOnClick", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["clickable", "checkbox", "clickable", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["progressbarOpposite", "checkbox", "progressbarOpposite", "custom", true, "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["renderBullet", "text", "renderBullet", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["renderFraction", "text", "renderFraction", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["renderProgressbar", "text", "renderProgressbar", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["renderCustom", "text", "renderCustom", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["bulletClass", "text", "bulletClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["bulletActiveClass", "text", "bulletActiveClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["modifierClass", "text", "modifierClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["currentClass", "text", "currentClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["totalClass", "text", "totalClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["hiddenClass", "text", "hiddenClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["progressbarFillClass", "text", "progressbarFillClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["clickableClass", "text", "clickableClass", "custom", "", "", false, "", false, false, "advanced", "", false, null, true, false, "", false, "", false],
			["scrollbar", "checkbox", "scrollbar", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
			["el", "text", "el", "custom", "", "", false, "", false, false, "", "", false, null, true, false, "", false, "", false],
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
		//name, classStr, pgStr, dataStr, opts) 
		creator("Swiper Slider", "swiper-slider", "swiperslider", "data-swiper-slider-options", swipersliderattributeoptions);



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
			'css/slick.css',
			'css/owl.carousel.min.css',
			'css/owl.theme.default.min.css',
			'css/swiper.min.css',
			'css/jarallax.css',
			'css/plyr.css',
			'css/animate.min.css',
			'css/magnific-popup.css',
			'css/jquery.smartmenus.bootstrap-4.css',
			'js/jquery.min.js',
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
	});
});