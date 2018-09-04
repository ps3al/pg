<?php
/**
 * Created by PhpStorm.
 * User: MacBook
 * Date: 26.02.16
 * Time: 18:19
 */

//WP Button Shortcode
function smt_button( $atts, $content = null ) {

	extract(shortcode_atts(
		array(
			'style' => null,
			'color' => '',
			'align' => false,
			'id' => false,
			'type' => '',
			'class' => '',
			'href' => '',
			'target' => '_self'),
		$atts));

	$color = ' ' . $color;
	if (!empty($type))
		$type = ' ' . $type;
//	$button_text = mo_remove_wpautop($content);
//	$button_text = do_shortcode(shortcode_unautop($content));
	$button_text = $content;
	$id = $id ? ' id ="' . $id . '"' : '';
	$style = $style ? ' style="' . $style . '"' : '';

	$button_content = '<a' . $id . ' class= "button ' . $class . $color . $type . '"' . $style . ' href="' . $href . '" target="' . $target . '">' . $button_text . '</a>';
	if ($align)
		$button_content = '<div style="text-align:' . $align . ';float:' . $align . ';">' . $button_content . '</div>';
	return $button_content;

}

//VC
function smt_button_vc() {

	vc_map(array(
		"name" => __("SMT Button", "js_composer"),
		"base" => "smt_button",
		"icon" => "icon-button",
		"class" => "button_extended",
		"category" => __("Elements", "js_composer"),
		"description" => __("Insert Button Shortcode", "js_composer"),
		"params" => array(
			array(
				"param_name" => "id",
				"type" => "textfield",
				"heading" => __("Element Id", "js_composer"),
				"description" => __("The element id to be set for the button element created (optional)", "js_composer")
			),
			array(
				"param_name" => "class",
				"type" => "textfield",
				"heading" => __("Button Class", "js_composer"),
				"description" => __("Custom CSS class name to be set for the button element created (optional)", "js_composer")
			),
			array(
				"param_name" => "style",
				"type" => "textfield",
				"heading" => __("Button Style", "js_composer"),
				"description" => __("Inline CSS styling applied for the button element created eg.padding: 10px 20px; (optional)", "js_composer")
			),
			array(
				"param_name" => "color",
				"type" => "dropdown",
				"heading" => __("Color", "js_composer"),
				"value" => array(
					__("Default", "js_composer") => "default",
					__("Theme", "js_composer") => "theme",
					__("Black", "js_composer") => "black",
					__("Blue", "js_composer") => "blue",
					__("Cyan", "js_composer") => "cyan",
					__("Green", "js_composer") => "green",
					__("Orange", "js_composer") => "orange",
					__("Pink", "js_composer") => "pink",
					__("Red", "js_composer") => "red",
					__("Teal", "js_composer") => "teal",
					__("Trans", "js_composer") => "trans"
				),
				"description" => __("The color of the button.", "js_composer")
			),
			array(
				"param_name" => "align",
				"type" => "dropdown",
				"heading" => __("Alignment", "js_composer"),
				"value" => array(
					__("None", "js_composer") => "none",
					__("Left", "js_composer") => "left",
					__("Center", "js_composer") => "center",
					__("Right", "js_composer") => "right"
				),
				"description" => __(" Alignment of the button and text alignment of the button title displayed.", "js_composer")
			),
			array(
				"param_name" => "type",
				"type" => "dropdown",
				"heading" => __("Type", "js_composer"),
				"value" => array(
					__("Large", "js_composer") => "large",
					__("Small", "js_composer") => "small",
					__("Rounded", "js_composer") => "rounded"
				),
				"description" => __("Can be large, small or rounded.", "js_composer")
			),
			array(
				"param_name" => "href",
				"type" => "textfield",
				"heading" => __("URL", "js_composer"),
				"description" => __("The URL to which button should point to. The user is taken to this destination when the button is clicked.eg.http://targeturl.com", "js_composer")
			),
			array(
				"param_name" => "target",
				"type" => "dropdown",
				"heading" => __("Button Target", "js_composer"),
				"value" => array(
					__("Open link in the same window", "js_composer") => "_self",
					__("Open link in new window", "js_composer") => "_blank"
				),
				"description" => __("_self = open in same window. _blank = open in new window", "js_composer")
			),
			array(
				"param_name" => "content",
				"type" => "textfield",
				"admin_label" => true,
				"heading" => __("Title", "js_composer"),
				"description" => __("Specify the title of the button.", "js_composer")
			)
		),
		"show_settings_on_create" => true
	));

}


//KC
function smt_button_kc(){

	global $kc;
	$kc->add_map(
		array(

			'smt_button' => array(

				'name' => 'SMT Button',
				'description' => __('Display hover effects on images', 'KingComposer'),
				'icon' => 'fa-picture-o',
				//'is_container' => true,
				'category' => 'KC Shortcodes Addon',
				//'css_box'    => true,

				'params' => array(
					array(
						'name' => 'hover_image',
						'label' => 'Hover Image',
						'type' => 'attach_image',
					),
					array(
						'name' => 'hover_heading',
						'label' => 'Heading',
						'type' => 'text',
						'value' => __('Heading Here', 'KingComposer')
					),
					array(
						'name' => 'hover_desc',
						'label' => 'Description',
						'type' => 'text',
						'value' => __('description here', 'KingComposer')
					),
					array(
						'name' => 'custom_link',
						'label' => 'Custom Link?',
						'type' => 'checkbox',
						'options' => array(
							'yes' => 'Yes',
						),
					),
					array(
						'name' => 'hover_link',
						'label' => 'Image Link',
						'type' => 'text',
						'relation' => array(
							'parent' => 'custom_link',
							'show_when' => 'yes'
						),
					),
					array(
						'name' => 'link_new_tab',
						'label' => 'Open Link in New Tab?',
						'type' => 'checkbox',
						'options' => array(
							'_blank' => 'Yes',
						),
						'relation' => array(
							'parent' => 'custom_link',
							'show_when' => 'yes'
						),
					),
					array(
						'name' => 'hover_style',
						'label' => 'Select Style',
						'type' => 'select',
						//'value' => 'bg_img', // Set default is value_2, remove this if you dont need to set default
						'options' => array(
							'none' => 'None',
							'circle' => 'Circle',
							'square' => 'Square',
						),

					),
					array(
						'name' => 'hover_effect',
						'label' => 'Select Effect',
						'type' => 'select',
						'options' => array(
							'effect1' => 'Effect 1',
							'effect2' => 'Effect 2',
							'effect3' => 'Effect 3',
							'effect4' => 'Effect 4',
							'effect5' => 'Effect 5',
							'effect6' => 'Effect 6',
							'effect7' => 'Effect 7',
							'effect8' => 'Effect 8',
							'effect9' => 'Effect 9',
							'effect10' => 'Effect 10',
							'effect11' => 'Effect 11',
							'effect12' => 'Effect 12',
							'effect13' => 'Effect 13',
							'effect14' => 'Effect 14',
							'effect15' => 'Effect 15',
							'effect16' => 'Effect 16',
							'effect17' => 'Effect 17',
							'effect18' => 'Effect 18',
							'effect19' => 'Effect 19',
							'effect20' => 'Effect 20',
						),
						'relation' => array(
							'parent' => 'hover_style',
							'show_when' => 'circle',
						),

					),
					array(
						'name' => 'hover_effect_square',
						'label' => 'Select Effect',
						'type' => 'select',
						'options' => array(
							'effect1' => 'Effect 1',
							'effect2' => 'Effect 2',
							'effect3' => 'Effect 3',
							'effect4' => 'Effect 4',
							'effect5' => 'Effect 5',
							'effect6' => 'Effect 6',
							'effect7' => 'Effect 7',
							'effect8' => 'Effect 8',
							'effect9' => 'Effect 9',
							'effect10' => 'Effect 10',
							'effect11' => 'Effect 11',
							'effect12' => 'Effect 12',
							'effect13' => 'Effect 13',
							'effect14' => 'Effect 14',
							'effect15' => 'Effect 15',
						),
						'relation' => array(
							'parent' => 'hover_style',
							'show_when' => 'square',
						),

					),
					array(
						'name' => 'hover_animation',
						'label' => 'Animation Direction',
						'type' => 'select',
						'options' => array(
							'left_to_right' => 'Left to Right',
							'right_to_left' => 'Right to Left',
							'top_to_bottom' => 'Top to Bottom',
							'bottom_to_top' => 'Bottom to Top',
						),
						'relation' => array(
							'parent' => 'hover_style',
							'show_when' => 'circle',
						),

					),
					array(
						'name' => 'hover_animation_square',
						'label' => 'Animation Direction',
						'type' => 'select',
						'options' => array(
							'left_to_right' => 'Left to Right',
							'right_to_left' => 'Right to Left',
							'top_to_bottom' => 'Top to Bottom',
							'bottom_to_top' => 'Bottom to Top',
							'left_and_right' => 'Left & Right',
						),
						'relation' => array(
							'parent' => 'hover_style',
							'show_when' => 'square',
						),

					),
					array(
						'name' => 'hover_image_width',
						'label' => 'Image Width',
						'type' => 'number_slider',
						'options' => array(
							'min' => 50,
							'max' => 1000,
							'unit' => 'px',
							'show_input' => true
						),
						'value' => 300,
						'description' => 'use custom image width, default is 300px'
					),
					array(
						'name' => 'hover_image_height',
						'label' => 'Image Height',
						'type' => 'number_slider',
						'options' => array(
							'min' => 50,
							'max' => 1000,
							'unit' => 'px',
							'show_input' => true
						),
						'value' => 300,
						'description' => 'use custom image height, default is 300px'
					),
					array(
						'name' => 'bg_color',
						'label' => 'Background Color',
						'type' => 'color_picker',
						//'value' => '#F2F2F2',
						//'description' => 'default color is #F2F2F2'
					),
					array(
						'name' => 'remove_border',
						'label' => 'Remove Border?',
						'type' => 'checkbox',
						'options' => array(
							'yes' => 'Yes',
						),
					),
					array(
						'name' => 'remove_hor_line',
						'label' => 'Remove Horizontal Line?',
						'type' => 'checkbox',
						'options' => array(
							'none' => 'Yes',
						),
					),
					array(
						'name' => 'heading_font_size',
						'label' => 'Heading Font Size',
						'type' => 'number_slider',
						'options' => array(
							'min' => 1,
							'max' => 50,
							'unit' => 'px',
							'show_input' => true
						),
						'value' => 15,
						'description' => 'use custom heading font size, default is 15px'
					),
					array(
						'name' => 'heading_color',
						'label' => 'Heading Color',
						'type' => 'color_picker',
						'value' => '#F2F2F2',
						'description' => 'default color is #F2F2F2'
					),
					array(
						'name' => 'desc_font_size',
						'label' => 'Description Font Size',
						'type' => 'number_slider',
						'options' => array(
							'min' => 1,
							'max' => 50,
							'unit' => 'px',
							'show_input' => true
						),
						'value' => 12,
						'description' => 'use custom description font size, default is 12px'
					),
					array(
						'name' => 'description_color',
						'label' => 'Description Color',
						'type' => 'color_picker',
						'value' => '#F2F2F2',
						'description' => 'default color is #F2F2F2'
					),


				)
			)
		)
	);


}

//SU
function register_smt_button_shortcode( $shortcodes ) {


	// Add new shortcode
	$shortcodes['smt_button'] = array(
		// Shortcode name
		'name'     => __( 'SMT Button', 'agile' ),
		// Shortcode type. Can be 'wrap' or 'single'
		// Example: [b]this is wrapped[/b], [this_is_single]
		'type'     => 'wrap',
		// Shortcode group.
		// Can be 'content', 'box', 'media' or 'other'.
		// Groups can be mixed, for example 'content box'
		'group'    => 'content',
		// List of shortcode params (attributes)
		'atts'     => array(
			'style' => array(
				'type' => 'text',
				'name' => 'Style',
				'desc' => ''
			),
			'color' => array(
				'type' => 'text',
				'name' => 'Color',
				'desc' => ''
			),
			'align' => array(
				'type' => 'text',
				'name' => 'Align',
				'desc' => ''
			),
			'id' => array(
				'type' => 'text',
				'name' => 'ID',
				'desc' => ''
			),
			'type' => array(
				'type' => 'text',
				'name' => 'Type',
				'desc' => ''
			),
			'class' => array(
				'type' => 'text',
				'name' => 'Class',
				'desc' => ''
			),
			'href' => array(
				'type' => 'text',
				'name' => 'Href',
				'desc' => ''
			),
			'target' => array(
				'type' => 'text',
				'name' => 'Target',
				'desc' => ''
			)
		),
		// Default content for generator (for wrap-type shortcodes)
		'content'  => __( 'Button Content', 'agile' ),
		// Shortcode description for cheatsheet and generator
		'desc'     => __( 'Custom Button', 'agile' ),
		// Custom icon (font-awesome)
		'icon'     => 'plus',
		// Name of custom shortcode function
		'function' => 'sm_button'
	);

	return $shortcodes;
}







