<?php
/**
*
*	King Composer
*	(c) KingComposer.com
*
*/

if(!defined('KC_FILE')){
	header('HTTP/1.0 403 Forbidden');
	exit;
}

$kc = KingComposer::globe();
$live_tmpl = KC_PATH.KDS.'shortcodes'.KDS.'live_editor'.KDS;

$kc->add_map(

	array(

		'_value' => array(
			'name' => 'KC Element',
			'description' => 'KC Element',
			'icon' => 'sl-info',	   /* Class name of icon show on "Add Elements" */
			'category' => '',	  /* Category to group elements when "Add Elements" */
			'is_container' => false, /* Container has begin + end [name]...[/name] -  Single has only [name param=""] */
			'pop_width' => 580,		/* width of the popup will be open when clicking on the edit  */
			'system_only' => true, /* Use for system only and dont show up to Add Elements */
			'params' => array()
		),
		
		'_styling' => array(
			'system_only' => true,
			'options' => array(
				array(
					'screens' => "any",
					'Typography' => array(
						array('property' => 'color', 'label' => 'Color'),
						array('property' => 'font-size', 'label' => 'Font Size'),
						array('property' => 'font-weight', 'label' => 'Font Weight'),
						array('property' => 'font-style', 'label' => 'Font Style'),
						array('property' => 'font-family', 'label' => 'Font Family'),
						array('property' => 'text-align', 'label' => 'Text Align'),
						array('property' => 'text-shadow', 'label' => 'Text Shadow'),
						array('property' => 'text-transform', 'label' => 'Text Transform'),
						array('property' => 'text-decoration', 'label' => 'Text Decoration'),
						array('property' => 'line-height', 'label' => 'Line Height'),
						array('property' => 'letter-spacing', 'label' => 'Letter Spacing'),
						array('property' => 'overflow', 'label' => 'Overflow'),
						array('property' => 'word-break', 'label' => 'Word Break'),					
					),

					//Background group
					'Background' => array(
						array('property' => 'background'),
					),

					//Box group
					'Box' => array(
						array('property' => 'margin', 'label' => 'Margin'),
						array('property' => 'padding', 'label' => 'Padding'),
						array('property' => 'border', 'label' => 'Border'),
						array('property' => 'width', 'label' => 'Width'),
						array('property' => 'height', 'label' => 'Height'),
						array('property' => 'border-radius', 'label' => 'Border Radius'),
						array('property' => 'float', 'label' => 'Float'),
						array('property' => 'display', 'label' => 'Display'),
						array('property' => 'box-shadow', 'label' => 'Box Shadow'),
						array('property' => 'opacity', 'label' => 'Opacity'),
					),
					
					//Custom code css
					'Custom' => array(
						array('property' => 'custom', 'label' => 'Custom CSS')
					)
				),
				array(
					"screens" => "1024,999,767,479",
					'Typography' => array(
						array('property' => 'font-size', 'label' => 'Font Size'),
						array('property' => 'text-align', 'label' => 'Text Align'),
						array('property' => 'line-height', 'label' => 'Line Height'),
						array('property' => 'word-break', 'label' => 'Word Break'),
						array('property' => 'custom', 'label' => 'Custom CSS')
					),

					//Background group
					'Background' => array(
						array('property' => 'background'),
					),

					//Box group
					'Box' => array(
						array('property' => 'width', 'label' => 'Width'),
						array('property' => 'margin', 'label' => 'Margin'),
						array('property' => 'padding', 'label' => 'Padding'),
						array('property' => 'border', 'label' => 'Border'),
						array('property' => 'height', 'label' => 'Height'),
						array('property' => 'border-radius', 'label' => 'Border Radius'),
						array('property' => 'float', 'label' => 'Float'),
						array('property' => 'display', 'label' => 'Display'),
					),
					
					'Custom' => array(
						array('property' => 'custom', 'label' => 'Custom CSS')
					)
				)
			),
		),

		'kc_undefined' => array(
			'name' => 'Undefined Element',
			'icon' => 'sl-flag',
			'category' => '',
			'is_container' => true,
			'pop_width' => 750,
			'system_only' => true,
			'params' => array(
				array(
					'name' => 'content',
					'label' => 'Content',
					'type' => 'textarea_html',
					'value' => 'Sample Text',
					'admin_label' => true,
				)
			)
		),

		'kc_wp_widget' => array(
			'name' => 'Wordpress Widget',
			'icon' => 'kc-icon-wordpress',
			'category' => '',
			'pop_width' => 450,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'general' => array(
					array(
						'name' => 'data',
						'label' => 'Data',
						'type' => 'wp_widget',
						'admin_label' => true,
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),
		
		'kc_wp_sidebar' => array(
			'name' => 'Wordpress Sidebar',
			'icon' => 'kc-icon-sidebar',
			'category' => '',
			'pop_width' => 450,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'general' => array(
					array(
						'name' => 'name',
						'label' => 'Sidebar',
						'type' => 'wp_sidebars',
						'admin_label' => true,
						'description' => __('Select available sidebars, go to Widgets manager to add or remove widgets from sidebar', 'kingcomposer'),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),
					
		'kc_row' => array(
			'name' => 'Row',
			'description' => __( 'Place content elements inside the row', 'kingcomposer' ),
			'category' => '',
			'title' => 'Row Settings',
			'is_container' => true,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_row.php',
			'params' => array(
				'general' => array(
					
					array(
						'name' => 'row_id',
						'label' => 'Row ID',
						'type' => 'text',
						'description' => __('The unique identifier of the row.', 'kingcomposer'),
					),
					array(
						'name' => 'cols_gap',
						'type' => 'css',
						'options' => array(
							array(
								'group' => array(
									array('property' => 'gap', 'label' => 'Columns Gap', 'des' => __('The distance between the columns in this row', 'kingcomposer'), 'selector' => '.kc_column'),
									array('property' => 'max-width', 'label' => 'Max width container', 'des' => __('The default value of row container max-width: 1170px, you can change it here', 'kingcomposer'), 'selector' => '.kc-container'),
								)
							)
						)
					),
					array(
						'name' => 'use_container',
						'label' => 'Full width',
						'type' => 'radio',
						'value' => 'yes',
						'description' => sprintf( __('This is important option, please click here to %s', 'kingcomposer'), '<a href="http://docs.kingcomposer.com/row-full-width/" target=_blank>read more</a>'),
						'options' => array(
							'yes' => 'Stretch wrapper only',
							'no' => 'Stretch all content & wrapper'
						),
					),
					array(
						'name' => 'full_height',
						'label' => __( 'Full height?', 'kingcomposer' ),
						'type' => 'toggle',
						'description' => __( 'Set the 100% height of the row.', 'kingcomposer' ),
					),
					array(
						'name' => 'content_placement',
						'label' => __( 'Content position', 'kingcomposer' ),
						'type' => 'select',
						'options' => array(
							'top' => __( 'Top', 'kingcomposer' ),
							'middle' => __( 'Middle', 'kingcomposer' ),
						),
						'description' => __( 'Select content position within row when full-height.', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'full_height',
							'show_when' => 'yes'
						),
					),
					array(
						'name' => 'equal_height',
						'label' => __( 'Equal height?', 'kingcomposer' ),
						'type' => 'toggle',
						'description' => __( 'The height of columns will be same height.', 'kingcomposer' )
					),
					array(
						'name' => 'column_align',
						'label' => __( 'Content Vertical Align', 'kingcomposer' ),
						'type' => 'select',
						'value' => 'middle',
						'options' => array(
							'top' => __( 'Top', 'kingcomposer' ),
							'middle' => __( 'Middle', 'kingcomposer' ),
							'bottom' => __( 'Bottom', 'kingcomposer' ),
						),
						'description' => __( 'Select align  vertical for column content when they have same height.', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'equal_height',
							'show_when' => 'yes'
						),
					),
					array(
						'name' => 'video_bg',
						'label' => __( 'Use video background?', 'kingcomposer' ),
						'type' => 'toggle',
						'description' => __( 'Background video will be applied to the row.', 'kingcomposer' )
					),
					array(
						'name' => 'video_bg_url',
						'label' => __( 'YouTube link', 'kingcomposer' ),
						'type' => 'text',
						'value' => 'https://www.youtube.com/watch?v=dOWFVKb2JqM',
						'description' => __( 'Add YouTube link.', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'video_bg',
							'show_when' => 'yes'
						),
					),
					array(
						'name' => 'parallax',
						'label' => __( 'Parallax', 'kingcomposer' ),
						'type' => 'select',
						'options' => array(
							'' => __( 'None', 'kingcomposer' ),
							'yes' => __( 'Use Background Image', 'kingcomposer' ),
							'yes-new' => __( 'Upload New Image', 'kingcomposer' ),
						),
						'description' => __( 'Add a parallax scrolling to the row (Note: If no image is specified, the background image from Design Options will be utilized).', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'video_bg',
							'hide_when' => 'yes',
						),
					),
					array(
						'name' => 'parallax_image',
						'label' => __( 'Image', 'kingcomposer' ),
						'type' => 'attach_image',
						'value' => '',
						'description' => __( 'Select image from media library.', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'parallax',
							'show_when' => 'yes-new',
						),
					),
					array(
						'name' => 'container_class',
						'label' => __( 'Container extra classes name', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add classes custom to the Container.', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'use_container',
							'show_when' => 'yes',
						),
					),
					array(
						'name' => 'row_class',
						'label' => __( 'Row extra classes name', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add additional custom classes to the Row.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css'
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_row_inner' => array(
			'name' => 'Row Inner',
			'description' => 'nested rows & columns ',
			'icon' => 'kc-icon-row',
			'category' => '',
			'title' => 'Row Inner Settings',
			'is_container' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_row_inner.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'row_id',
						'label' => 'Row ID',
						'type' => 'text',
						'value' => __('', 'kingcomposer'),
						'description' => 'The unique identifier of the row'
					),
					array(
						'name' => 'cols_gap',
						'type' => 'css',
						'options' => array(
							array(
								'group' => array(
									array('property' => 'gap', 'label' => 'Columns Gap', 'des' => __('The distance between the columns in this row', 'kingcomposer'), 'selector' => '>.kc_column_inner, >div>.kc_column_inner'),
								)
							)
						)
					),
					array(
						'name' => 'equal_height',
						'label' => __( 'Equal height?', 'kingcomposer' ),
						'type' => 'toggle',
						'description' => __( 'If checked, all columns will be set to equal height ( not including columns of row inner ).', 'kingcomposer' )
					),
					array(
						'name' => 'column_align',
						'label' => __( 'Content Vertical Align', 'kingcomposer' ),
						'type' => 'select',
						'value' => 'middle',
						'options' => array(
							'top' => __( 'Top', 'kingcomposer' ),
							'middle' => __( 'Middle', 'kingcomposer' ),
							'bottom' => __( 'Bottom', 'kingcomposer' ),
						),
						'description' => __( 'Select align  vertical for column content when they have same height.', 'kingcomposer' ),
						'relation' => array(
							'parent' => 'equal_height',
							'show_when' => 'yes'
						),
					),
					array(
						'name' => 'row_class',
						'label' => __( 'Extra classes name', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'If you wish to style a particular content element differently, please add a class name to this field and refer to it in your custom CSS.', 'kingcomposer' ),
					),
					array(
						'name' => 'row_class_container',
						'label' => __( 'Extra container classes', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add additional classes name to the container in a row.', 'kingcomposer' ),
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_column' => array(
			'name' => 'Column',
			'category' => '',
			'title' => 'Column Settings',
			'is_container' => true,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_column.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'col_container_class',
						'label' => __( 'Container class name', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add additional classes name to the container in a column.', 'kingcomposer' )
					),
					array(
						'name' => 'col_class',
						'label' => __( 'Column class name', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add additional classes name to ther outer layer of a column.', 'kingcomposer' )
					),
					array(
						'name' => 'col_id',
						'label' => __( 'Column ID', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add ID attribute to ther outer layer of a column.', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_column_inner' => array(
			'name' => 'Column Inner',
			'category' => '',
			'title' => 'Column Inner Settings',
			'is_container' => true,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_column_inner.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'col_in_class',
						'label' => __( 'Extra class name', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'If you wish to style a particular content element differently, please add a class name to this field and refer to it in your custom CSS file.', 'kingcomposer' )
					),
					array(
						'name' => 'col_in_class_container',
						'label' => __( 'Extra container Class', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add class name for container into column.', 'kingcomposer' ),
					),
					array(
						'name' => 'col_id',
						'label' => __( 'Column ID', 'kingcomposer' ),
						'type' => 'text',
						'description' => __( 'Add ID attribute to ther outer layer of a column.', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css'
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_box' => array(
			'name' => 'KC Box',
			'category' => 'Content',
			'title' => 'KC Box Design',
			'icon' => 'kc-icon-box',
			'pop_width' => 900,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'description' => __( 'Helping design static block', 'kingcomposer' ),
			'live_editor' => $live_tmpl.'kc_box.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'css_code',
						'type' => 'hidden',
					),
					array(
						'name' => 'data',
						'type' => 'kc_box',
						'admin_label' => true,
						'value' => 'W3sidGFnIjoiZGl2IiwiY2hpbGRyZW4iOlt7InRhZyI6InRleHQiLCJjb250ZW50IjoiU2FtcGxlIFRleHQuIn1dfV0='
						/*This is special element, All will be built in template*/
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css'
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_tabs' => array(
			'name' => 'Tabs - Sliders',
			'description' => __( 'Tabbed or Sliders content', 'kingcomposer' ),
			'category' => 'Content',
			'icon' => 'kc-icon-tabs',
			'title' => 'Tabs - Sliders Settings',
			'is_container' => true,
			'views' => array(
				'type' => 'views_sections',
				'sections' => 'kc_tab'
			),
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_tabs.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'class',
						'label' => 'Extra Class',
						'type' => 'text'
					),
					array(
						'name' => 'type',
						'label' => __('How Display', 'kingcomposer'),
						'type' => 'select',
						'options' => array(
							'horizontal_tabs' => __('Horizontal Tabs', 'kingcomposer'),
							'vertical_tabs' => __('Vertical Tabs', 'kingcomposer'),
							'slider_tabs' => __('Owl Sliders', 'kingcomposer')
						),
						'description' => __('Use sidebar view of your tabs as horizontal, vertical or slider.', 'kingcomposer')
					),
					array(
						'name' => 'title_slider',
						'label' => 'Display Titles?',
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('Display tabs title above of the slider', 'kingcomposer')
					),
					array(
						'name' => 'items',
						'label' => 'Number Items?',
						'type' => 'select',
						'options' => array(
							'1' => '1',
							'2' => '2',
							'3' => '3',
							'4' => '4',
							'5' => '5',
							'6' => '6',
						),
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('Display number of items per each slide (Desktop Screen)', 'kingcomposer')
					),
					array(
						'name' => 'tablet',
						'label' => 'Items on tablet?',
						'type' => 'select',
						'options' => array(
							'1' => '1',
							'2' => '2',
							'3' => '3',
							'4' => '4',
							'5' => '5',
							'6' => '6',
						),
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('Display number of items per each slide (Tablet Screen)', 'kingcomposer')
					),
					array(
						'name' => 'mobile',
						'label' => 'Items on smartphone?',
						'type' => 'select',
						'options' => array(
							'1' => '1',
							'2' => '2',
							'3' => '3',
							'4' => '4',
						),
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('Display number of items per each slide (Smartphone Screen)', 'kingcomposer')
					),
					array(
						'name' => 'speed',
						'label' => 'Speed of slider',
						'type' => 'number_slider',
						'options' => array(
							'min' => 100,
							'max' => 1000,
							'show_input' => true
						),
						'value' => 450,
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('The speed of sliders in millisecond', 'kingcomposer')
					),
					array(
						'name' => 'navigation',
						'label' => 'Navigation',
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('Display the "Next" and "Prev" buttons.', 'kingcomposer')
					),
					array(
						'name' => 'pagination',
						'label' => 'Pagination',
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'value' => 'yes',
						'description' => __('Show the pagination.', 'kingcomposer')
					),
					array(
						'name' => 'autoplay',
						'label' => 'Auto Play',
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('The slider automatically plays when site loaded', 'kingcomposer')
					),
					array(
						'name' => 'autoheight',
						'label' => 'Auto Height',
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'show_when' => 'slider_tabs'
						),
						'description' => __('The slider height will change automatically', 'kingcomposer')
					),
					array(
						'name' => 'effect_option',
						'label' => 'Enable fadein effect?',
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'hide_when' => 'slider_tabs'
						),
						'description' => __('Quickly apply fade in and face out effect when users click on tab.', 'kingcomposer')
					),
					array(
						'name' => 'vertical_tabs_position',
						'label' => __('Position', 'kingcomposer'),
						'type' => 'select',
						'options' => array(
							'left' => __('Left', 'kingcomposer'),
							'right' => __('Right', 'kingcomposer')
						),
						'relation' => array(
							'parent' => 'type',
							'show_when' => array('vertical_tabs')
						),
						'description' => __('View tabs with at top or bottom', 'kingcomposer')
					),
					array(
						'name' => 'open_mouseover',
						'label' => __('Open on mouseover', 'kingcomposer'),
						'type' => 'toggle',
						'relation' => array(
							'parent' => 'type',
							'hide_when' => 'slider_tabs'
						),
					),
					array(
						'name' => 'active_section',
						'label' => __('Active section', 'kingcomposer'),
						'type' => 'text',
						'value' => '1',
						'relation' => array(
							'parent' => 'type',
							'hide_when' => 'slider_tabs'
						),
						'description' => __('Enter active section number.', 'kingcomposer')
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Tab' => array(
									array('property' => 'font-family', 'label' => 'Text Font Family', 'selector' => '.kc_tabs_nav, .kc_tabs_nav > li a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.kc_tabs_nav, .kc_tabs_nav > li a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc_tabs_nav, .kc_tabs_nav > li a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc_tabs_nav, .kc_tabs_nav > li a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
									array('property' => 'text-transform', 'label' => 'Text-transform', 'selector' => '.kc_tabs_nav, .kc_tabs_nav > li a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => '.kc_tabs_nav a i,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a i'),
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_tabs_nav a, .kc_tabs_nav,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc_tabs_nav a i,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_tabs_nav,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav'),
									array('property' => 'background-color', 'label' => 'Background Color tab item', 'selector' => '.kc_tabs_nav li,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav li'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_tabs_nav > li, .kc_tab.ui-tabs-body-active, .kc_tabs_nav,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav ~ div.kc_tab.ui-tabs-body-active,+.kc_vertical_tabs.tabs_right>.kc_wrapper>ul.ui-tabs-nav ~ div.kc_tab'),
									array('property' => 'padding', 'label' => 'Icon Spacing', 'selector' => '.kc_tabs_nav a i,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc_tabs_nav > li > a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a'),
								),

								'Tab Hover' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_tabs_nav li:hover a, .kc_tabs_nav li:hover, .kc_tabs_nav > .ui-tabs-active:hover a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a:hover,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li.ui-tabs-active > a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc_tabs_nav li:hover a i,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a:hover i,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li.ui-tabs-active > a i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_tabs_nav > li:hover, .kc_tabs_nav > li:hover a, .kc_tabs_nav > li > a:hover,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li>a:hover,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li.ui-tabs-active > a'),
								),
								'Tab Active' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_tabs_nav li.ui-tabs-active a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li.ui-tabs-active > a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc_tabs_nav li.ui-tabs-active a i, .kc_tabs_nav > .ui-tabs-active:focus a i,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li.ui-tabs-active > a i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_tabs_nav > .ui-tabs-active:focus, .kc_tabs_nav > .ui-tabs-active, .kc_tabs_nav > .ui-tabs-active > a,+.kc_vertical_tabs>.kc_wrapper>ul.ui-tabs-nav>li.ui-tabs-active > a'),
								),
								'Tab Body' => array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_tab'),
									array('property' => 'padding', 'label' => 'Spacing', 'selector' => '.kc_tab .kc_tab_content'),
								),


							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			),
			'content' => '[kc_tab title="New Tab"][/kc_tab]'
		),

		'kc_tab' => array(
			'name' => 'Tab',
			'category' => '',
			'title' => 'Tab Settings',
			'is_container' => true,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'body styling' => 'et-adjustments'
			),
			'live_editor' => $live_tmpl.'kc_tab.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'title',
						'label' => 'Title',
						'type' => 'text',
						'value' => __('New Tab', 'kingcomposer'),
					),
					array(
						'name' => 'advanced',
						'label' => 'Advance Title?',
						'type' => 'toggle',
						'description' => __('If you want more flexible options to display tab title', 'kingcomposer')
					),
					array(
						'name' => 'adv_title',
						'label' => 'Title Format',
						'type' => 'textarea',
						'value' => base64_encode( __('<a href="#">New Tab</a>', 'kingcomposer') ),
						'relation' => array(
							'parent' => 'advanced',
							'show_when' => 'yes'
						),
						'description' => __('You can use short varibles {title}, {icon} , {icon_class}, {image}, {image_id}, {image_url}, {image_thumbnail}, {image_medium}, {image_large}, {image_full}, {tab_id}', 'kingcomposer')
					),
					array(
						'name' => 'adv_icon',
						'label' => 'Icon Title',
						'type' => 'icon_picker',
						'value' => '',
						'relation' => array(
							'parent' => 'advanced',
							'show_when' => 'yes'
						)
					),
					array(
						'name' => 'adv_image',
						'label' => 'Image Title',
						'type' => 'attach_image',
						'value' => '',
						'relation' => array(
							'parent' => 'advanced',
							'show_when' => 'yes'
						)
					),
					array(
						array(
							'name' => 'icon',
							'label' => 'Icon Title',
							'type' => 'icon_picker',
							'value' => '',
							'description' => __('Choose an icon to display with title', 'kingcomposer'),
							'relation' => array(
								'parent' => 'icon_option',
								'show_when' => 'yes'
							)
						),				'name' => 'icon_option',
						'label' => 'Use Icon?',
						'type' => 'toggle',
						'description' => __('Display an icon beside the title', 'kingcomposer'),
						'relation' => array(
							'parent' => 'advanced',
							'hide_when' => 'yes'
						)
					),
					
					array(
						'name' => 'class',
						'label' => 'Extra Class',
						'type' => 'text'
					)
				),
				'body styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css'
					)
				),
			)
		),

		'kc_accordion' => array(
			'name' => 'Accordion',
			'description' => __( 'Collapsible content panels', 'kingcomposer' ),
			'category' => 'Content',
			'icon' => 'kc-icon-accordion',
			'title' => 'Accordion Settings',
			'is_container' => true,
			'views' => array(
				'type' => 'views_sections',
				'sections' => 'kc_accordion_tab',
				'display' => 'vertical'
			),
			'tab_icons' => array(
				'general' => 'et-tools',
				'global style' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_accordion.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'title',
						'label' => 'Title',
						'type' => 'text',
						'description' => __('Enter accordion title (Note: It is located above the content).', 'kingcomposer')
					),
					array(
						'name' => 'open_all',
						'label' => 'Collapse all?',
						'type' => 'toggle',
						'description' => __('Allow all accordion tabs able to open', 'kingcomposer')
					),
					array(
						'name' => 'class',
						'label' => 'Extra class name',
						'type' => 'text',
						'description' => __('If you wish to style particular content element differently, please add a class name to this field and refer to it in your custom CSS file.', 'kingcomposer')
					)
				),
				'global style' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Header' => array(
									array('property' => 'font-family', 'label' => 'Text Font Family', 'selector' => '.kc_accordion_header, .kc_accordion_header > a'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.kc_accordion_header, .kc_accordion_header > a'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => '.kc_accordion_header a i'),
									array('property' => 'text-align', 'label' => 'Text Alignment', 'selector' => '.kc_accordion_header'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc_accordion_header a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc_accordion_header a'),
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_accordion_header a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc_accordion_header a i'),
									array('property' => 'color', 'label' => 'State Icon Color', 'selector' => '.ui-icon'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_accordion_header'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_accordion_header'),
									array('property' => 'padding', 'label' => 'Icon Spacing', 'selector' => '.kc_accordion_header a i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc_accordion_header'),
								),
								'Active' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc-section-active .kc_accordion_header a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc-section-active .kc_accordion_header a i'),
									array('property' => 'color', 'label' => 'State Icon Color', 'selector' => '.kc-section-active .kc_accordion_header .ui-icon'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc-section-active .kc_accordion_header'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_accordion_header'),
								),
								'Hover' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_accordion_header:hover a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc_accordion_header:hover a i'),
									array('property' => 'color', 'label' => 'State Icon Color', 'selector' => '.kc_accordion_header:hover .ui-icon'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_accordion_header:hover'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_accordion_header'),
								),
								'Body' => array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc-panel-body'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_accordion_content'),
									array('property' => 'padding', 'label' => 'Spacing', 'selector' => '.kc-panel-body'),
								),


							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			),
			'content' => '[kc_accordion_tab title="Accordion Tab"][/kc_accordion_tab]'
		),

		'kc_accordion_tab' => array(
			'name' => 'Accordion Tab',
			'category' => '',
			'title' => 'Accordion Tab Settings',
			'is_container' => true,
			'system_only' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
			),
			'live_editor' => $live_tmpl.'kc_accordion_tab.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'title',
						'label' => __('Title', 'kingcomposer'),
						'value' => __('New Accordion Tab', 'kingcomposer'),
						'type' => 'text'
					),
					array(
						'name' => 'icon_option',
						'label' => 'Use Icon?',
						'type' => 'toggle',
						'description' => __('Display an icon beside the title', 'kingcomposer')
					),
					array(
						'name' => 'icon',
						'label' => 'Icon Title',
						'type' => 'icon_picker',
						'value' => '',
						'description' => __('Choose an icon to display with title', 'kingcomposer'),
						'relation' => array(
							'parent' => 'icon_option',
							'show_when' => 'yes'
						)
					),
					array(
						'name' => 'class',
						'label' => 'Extra class name',
						'type' => 'text',
						'description' => __('', 'kingcomposer')
					)
				),

			)
		),

		'kc_column_text' => array(
			'name' => 'Text Block',
			'description' => __('A block of text with TINYMCE editor', 'kingcomposer'),
			'icon' => 'kc-icon-text',
			'category' => 'Content',
			'is_container' => true,
			'pop_width' => 650,
			'admin_view'	=> 'text',
			'preview_editable' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_column_text.php',
			'params' => array(
				'general' => array(
					array(
						'name' => 'content',
						'label' => 'Content',
						'type' => 'textarea_html',
						'value' => 'Sample Text',
					),
					array(
						'name' => 'class',
						'label' => 'Extra Class',
						'type' => 'text',
					)
				),
				'styling' => array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Typography' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => ',p'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => ',p'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => ',p'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => ',p'),
									array('property' => 'font-style', 'label' => 'Font Style', 'selector' => ',p'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => ',p'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => ',p'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => ',p'),
									array('property' => 'letter-spacing', 'label' => 'Letter Spacing', 'selector' => ',p'),
								),
								'Box'    => array(
									array('property' => 'background', 'label' => 'Background'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'padding', 'label' => 'Padding'),
									array('property' => 'margin', 'label' => 'Margin'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_spacing' => array(
			'name' => 'Spacing',
			'description' => __('Custom the spacing between the blocks', 'kingcomposer'),
			'icon' => 'kc-icon-spacing',
			'category' => 'Content',
			'live_editor' => $live_tmpl.'kc_spacing.php',
			'params' => array(
				array(
					'name' => 'height',
					'label' => 'Height',
					'type' => 'number_slider',
					'value' => '20',
					'options' => array(
						'min' => 0,
						'max' => 500,
						'unit' => 'px',
						'show_input' => true
					),
					'admin_label' => true,
					'description' => __('Enter the value of spacing height', 'kingcomposer'),
				),
				array(
					'name' => 'class',
					'label' => __('Extra class name', 'kingcomposer'),
					'type' => 'text',
					'admin_label' => true,
					'description' => __('If you wish to style a particular content element differently, please add a class name to this field and refer to it in your custom CSS file.', 'kingcomposer')
				)
			)
		),

		'kc_raw_code' => array(
			'name' => 'Raw Code',
			'description' => __('Allow to put code: html, shortcode', 'kingcomposer'),
			'icon' => 'kc-icon-code',
			'category' => 'Content',
			'pop_width' => 750,
			'live_editor' => $live_tmpl.'kc_raw_code.php',
			'params' => array(
				array(
					'name' => 'code',
					'label' => 'Code',
					'type' => 'textarea',
					'value' => 'U2FtcGxlIENvZGU=',
					'admin_label' => true,
				)
			)
		),

		'kc_single_image' => array(
			'name' => 'Single Image',
			'description' => __('Single image', 'kingcomposer'),
			'icon' => 'kc-icon-image',
			'category' => 'Medias',
			'admin_view' => 'image',
			'preview_editable' => true,
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_single_image.php',
			'params' => array(
				'general' => array(
					array(
						'name'    => 'image_source',
						'label'   => __('Image Source', 'kingcomposer'),
						'type'    => 'select',
						'options' => array(
							'media_library'  => __('Media library', 'kingcomposer'),
							'external_link'  => __('External link', 'kingcomposer'),
							'featured_image' => __('Featured Image', 'kingcomposer'),
						),
						'description' => __('Select image source.', 'kingcomposer')
					),
					array(
						'name'        => 'image',
						'label'       => 'Upload Image',
						'type'        => 'attach_image',
						'admin_label' => true,
						'relation'    => array(
							'parent'    => 'image_source',
							'show_when' => 'media_library'
						)
					),
					array(
						'name'     => 'image_external_link',
						'label'    => 'Image external link',
						'type'     => 'text',
						'relation' => array(
							'parent'    => 'image_source',
							'show_when' => 'external_link'
						),
						'description' => __('Enter external link.', 'kingcomposer')
					),
					array(
						'name'          => 'image_size',
						'label'         => 'Image Size',
						'type'          => 'text',
						'value'         => 'thumbnail',
						'relation'      => array(
							'parent'    => 'image_source',
							'show_when' => array('media_library', 'featured_image')
						),
						'description'   => __('Set the image size: "thumbnail", "medium", "large" or "full"', 'kingcomposer'),
						'value'         => 'full'
					),
					array(
						'name'          => 'image_size_el',
						'label'         => 'Image Size',
						'type'          => 'text',
						'relation'      => array(
							'parent'    => 'image_source',
							'show_when' => 'external_link'
						),
						'description'   => __('Enter the image size in pixels. Example: 200x100 (Width x Height).', 'kingcomposer')
					),
					array(
						'name'        => 'alt',
						'label'       => 'Alt',
						'type'        => 'text',
						'description' => __('Enter the image alt property.', 'kingcomposer')
					),
					array(
						'name'        => 'caption',
						'label'       => 'Caption',
						'type'        => 'text',
						'description' => __('Enter the image caption bellow image.', 'kingcomposer')
					),
					array(
						'name'    => 'on_click_action',
						'label'   => __('On click event', 'kingcomposer'),
						'type'    => 'select',
						'options' => array(
							''                 => __('None', 'kingcomposer'),
							'op_large_image'   => __('Link to large image', 'kingcomposer'),
							'lightbox'         => __('Open Image In Lightbox', 'kingcomposer'),
							'open_custom_link' => __('Open Custom Link', 'kingcomposer')
						),
						'description' => __('Select the click event when users click on the image.', 'kingcomposer')
					),
					array(
						'name'     => 'custom_link',
						'label'    => __('Custom Link', 'kingcomposer'),
						'type'     => 'link',
						'value'    => '#',
						'relation' => array(
							'parent'    => 'on_click_action',
							'show_when' => 'open_custom_link'
						),
						'description' => __('The URL which image assigned to. You can select page/post or other post type', 'kingcomposer')
					),
					array(
						'name'          => 'overlay',
						'label'         => 'Overlay Hover Effect',
						'type'          => 'toggle',
						'description'   => __('Enable to add layer overlay will show up when hover on the image.', 'kingcomposer')
					),
					array(
						'name'     => 'icon',
						'label'    => __('Icon Overlay', 'kingcomposer'),
						'type'     => 'icon_picker',
						'value'    => 'fa-plus',
						'relation' => array(
							'parent'    => 'overlay',
							'show_when' => 'yes'
						),
						'description' => __('The icon show on center of overlay laver.', 'kingcomposer')
					),
					array(
						'name'        => 'ieclass',
						'label'       => __('Image extra class', 'kingcomposer'),
						'type'        => 'text',
						'description' => __('Add class name for img tag.', 'kingcomposer')
					),
					array(
						'name'        => 'class',
						'label'       => __('Wrapper extra class', 'kingcomposer'),
						'type'        => 'text',
						'description' => __('If you wish to style a particular content element differently, please add a class name to this field and refer to it in your custom CSS file.', 'kingcomposer'),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options'		=> array(
							array(
								'Image Style' => array(
									array('property' => 'text-align', 'label' => 'Image Alignment'),
									array('property' => 'display', 'label' => 'Image Display'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => 'img'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow', 'selector' => 'img'),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'img'),
									array('property' => 'width', 'label' => 'Width', 'selector' => 'img'),
									array('property' => 'height', 'label' => 'Height', 'selector' => 'img'),
									array('property' => 'max-width', 'label' => 'Max Width', 'selector' => 'img'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'img')
								),
								'Caption' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.scapt'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.scapt'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.scapt'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.scapt'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.scapt'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.scapt'),
									array('property' => 'text-align', 'label' => 'Text Alignment', 'selector' => '.scapt'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.scapt'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.scapt')
								),
								'Overlay Effect' => array(
									array('property' => 'background-color', 'label' => 'Box Background Color', 'selector' => '.kc-image-overlay'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc-image-overlay i'),
									array('property' => 'border-color', 'label' => 'Icon Border Color', 'selector' => '.kc-image-overlay i'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => '.kc-image-overlay i'),
								),
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_icon' => array(
			'name'		  => 'Icon',
			'description' => __('Display single icon', 'kingcomposer'),
			'icon'		  => 'kc-icon-icon',
			'category'	  => 'Content',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_icon.php',
			'params'	  => array(
				'general' => array(
					array(
						'name'	      => 'icon',
						'label'	      => 'Select Icon',
						'type'	      => 'icon_picker',
						'admin_label' => true,
					),
					array(
						'name'	      => 'use_link',
						'label'       => 'Add Link ?',
						'type'	      => 'toggle',
						'description' => __('Add a link for icon.', 'kingcomposer')
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'Link', 'kingcomposer' ),
						'name'			=> 'link',
						'description'	=> __( 'Add your relative URL. Each URL contains link, anchor text and target attributes.', 'kingcomposer' ),
						'relation'      => array(
							'parent'    => 'use_link',
							'show_when' => 'yes'
						)
					),
					array(
						'name'	      => 'class',
						'label'	      => __('Extra class name', 'kingcomposer'),
						'type'	      => 'text',
						'admin_label' => true,
						'description' => __('If you wish to style a particular content element differently, please add a class name to this field and refer to it in your custom CSS file.', 'kingcomposer')
					),
					array(
						'name'	        => 'icon_wrap_class',
						'label'	        => 'Wrapper class name',
						'type'	        => 'text',
						'description'   => __('Enter class name for wrapper', 'kingcomposer'),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options'		=> array(
							array(
								'Icon Style' => array(
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => 'i'),
									array('property' => 'background-color', 'label' => 'Icon BG Color', 'selector' => 'i'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => 'i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => 'i'),
                                    array('property' => 'text-align', 'label' => 'Icon Alignment'),
									array('property' => 'width', 'label' => 'Width', 'selector' => 'i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => 'i'),
									array('property' => 'border', 'label' => 'Icon Border', 'selector' => 'i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'i'),
									array('property' => 'padding', 'label' => 'Icon Padding', 'selector' => 'i')
								),
								'Icon Hover' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '+:hover i'),
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => '+:hover i'),
									array('property' => 'border-color', 'label' => 'Border Color', 'selector' => '+:hover i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '+:hover i'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_title' => array(
			'name'		  => 'Title',
			'description' => __('Heading titles H(n) Tag', 'kingcomposer'),
			'icon'		  => 'kc-icon-title',
			'category'	  => 'Content',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_title.php',
			'params'	  => array(
				'general' => array(
					array(
						'name'	      => 'text',
						'label'       => 'Text',
						'type'	      => 'textarea',
						'value'		  => base64_encode('The Title'),
						'admin_label' => true,
					),
					array(
						'name'	      => 'post_title',
						'label'       => 'Use Post Title?',
						'type'	      => 'toggle',
						'description' => __('Use the title of current post/page as content element instead of text input value.', 'kingcomposer')
					),
					array(
						'name'	  => 'type',
						'label'   => 'Type',
						'type'	  => 'select',
						'admin_label' => true,
						'options' => array(
							'h1'  => 'H1',
							'h2'  => 'H2',
							'h3'  => 'H3',
							'h4'  => 'H4',
							'h5'  => 'H5',
							'h6'  => 'H6',
							'div'  => 'div',
							'span'  => 'Span',
							'p'  => 'P'
						)
					),
					array(
						'name'	=> 'class',
						'label' => 'Extra Class',
						'type'	=> 'text'
					),
					array(
						'name'	      => 'title_wrap',
						'label'       => 'Advanced',
						'type'	      => 'toggle',
						'description' => __('Add a &lt;div&gt; tag around the head tag, more code before or after the head tag.', 'kingcomposer')
					),
					array(
						'name'	      => 'before',
						'label'       => 'Before Head Tag',
						'type'	      => 'textarea',
						'description' => __('Add HTML text before the head tag.', 'kingcomposer'),
						'relation'      => array(
							'parent'    => 'title_wrap',
							'show_when' => 'yes'
						)
					),
					array(
						'name'	      => 'after',
						'label'       => 'After Head Tag',
						'type'	      => 'textarea',
						'description' => __('Add HTML text after the head tag.', 'kingcomposer'),
						'relation'      => array(
							'parent'    => 'title_wrap',
							'show_when' => 'yes'
						)
					),
					array(
						'name'     => 'title_link',
						'label'    => __('Link Title', 'kingcomposer'),
						'type'     => 'link',
						'description' => __('Insert link for title', 'kingcomposer')
					),
					array(
						'name'	        => 'title_wrap_class',
						'label'         => 'Wrapper class name',
						'type'	        => 'text',
						'description'   => __('Enter class name for wrapper', 'kingcomposer'),
						'relation'      => array(
							'parent'    => 'title_wrap',
							'show_when' => 'yes'
						)
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options'		=> array(
							array(
								'Title Style' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'letter-spacing', 'label' => 'Letter Spacing', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'text-align', 'label' => 'Alignment', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '+.kc_title,.kc_title,.kc_title a.kc_title_link')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_google_maps' => array(

			'name'			   => __('Google Maps', 'kingcomposer'),
			'description'	   => __('Show google maps with embed', 'kingcomposer'),
			'icon'			   => 'kc-icon-map',
			'category'		   => 'Medias',
			'admin_view'	   => 'gmaps',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments'
			),
			'live_editor' => $live_tmpl.'kc_google_maps.php',
			'params'		   => array(
				'general' => array(
					array(
						'name'        => 'random_id',
						'label'       => '',
						'type'        => 'random',
						'description' => '',
					),
					array(
						'type'			=> 'textarea',
						'label'			=> __( 'Map Location', 'kingcomposer' ),
						'name'			=> 'map_location',
						'value'			=> base64_encode( '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.99697352976!2d105.81945407598418!3d21.02269575409132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1453961383169" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'),
						'description'	=> __( 'Go to <a href="https://www.google.com/maps/" target=_blank>Google Maps</a> and searh your Location. Click on menu near search text => Share or embed map => Embed map. Next copy iframe to this field', 'kingcomposer' )
					),
					array(
						'type'		=> 'text',
						'name'		=> 'map_height',
						'label'		=> __( 'Map Height (px)', 'kingcomposer' ),
						'value'		=> 350
					),
					array(
						'type'			     => 'toggle',
						'label'			     => __( 'Show overlap contact form', 'kingcomposer' ),
						'name'			     => 'show_ocf',
						'description'	     => __( 'Enable a contact form above the maps', 'kingcomposer' )
					),
					array(
						'type'			     => 'textarea',
						'label'			     => __( 'Contact form shortcode', 'kingcomposer' ),
						'name'			     => 'contact_form_sc',
						'description'	     => __( 'Shortcode content which generated by contact form 7. For example: [contact-form-7 id="4" title="Contact form 1"]', 'kingcomposer' ),
						'relation'		     => array(
							'parent'         => 'show_ocf',
							'show_when'      => 'yes'
						)
					),
					array(
						'type'			 => 'select',
						'label'			 => __( 'Contact area position', 'kingcomposer' ),
						'name'			 => 'contact_area_position',
						'options'		 => array(
							'left'  => __( 'Left', 'kingcomposer' ),
							'right' => __( 'Right', 'kingcomposer' ),
						),
						'description'	=> __( 'Set position for the contact form box', 'kingcomposer' ),
						'relation'		=> array(
							'parent' => 'show_ocf',
							'show_when' => 'yes'
						),
						'value'			=> 'left'
					),
					array(
						'name'		=> 'css_contact_style',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Contact Form' => array(
									array('property' => 'width', 'label' => 'Width Wrap', 'value' => '45%', 'selector' => '.map_popup_contact_form'),
									array('property' => 'color', 'label' => 'Color', 'value' => '#FFFFFF', 'selector' => '.map_popup_contact_form'),
									array('property' => 'background', 'selector' => '.map_popup_contact_form')
								),
								'Button Style' => array(
									array('property' => 'color', 'label' => 'Color', 'value' => '#393939', 'selector' => '.map_popup_contact_form .wpcf7-submit'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.map_popup_contact_form .wpcf7-submit'),
									array('property' => 'background', 'selector' => '.map_popup_contact_form .wpcf7-submit')
								),
								'Button Hover Style' => array(
									array('property' => 'color', 'label' => 'Color', 'value' => '#FFFFFF', 'selector' => '.map_popup_contact_form .wpcf7-submit:hover'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.map_popup_contact_form .wpcf7-submit:hover'),
									array('property' => 'background', 'selector' => '.map_popup_contact_form .wpcf7-submit:hover')
								)
							)
						),
						'relation'		=> array(
							'parent' => 'show_ocf',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=>  'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				)
			)
		),

		'kc_twitter_feed' => array(
			'name'			=> __('Twitter Feed', 'kingcomposer'),
			'description'	=> __('New tweets from twitter', 'kingcomposer'),
			'icon' => 'kc-icon-twitter',
			'category' => 'Socials',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Username', 'kingcomposer' ),
						'name'			=> 'username',
						'value'			=> 'KingTheme',
						'admin_label'	=> true
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Display Style', 'kingcomposer' ),
						'name'			=> 'display_style',
						'admin_label'	=> true,
						'options'		=> array(
							'1' => __( 'List View', 'kingcomposer' ),
							'2' => __( 'Slider tweets', 'kingcomposer' ),
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show navigation', 'kingcomposer' ),
						'name'			=> 'show_navigation',
						'value'			=> 'yes',
						'relation'		=> array(
							'parent'	=> 'display_style',
							'show_when'	=> '2'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show pagination', 'kingcomposer' ),
						'name'			=> 'show_pagination',
						'value'			=> 'yes',
						'relation'		=> array(
							'parent'	=> 'display_style',
							'show_when'	=> '2'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Auto height', 'kingcomposer' ),
						'name'			=> 'auto_height',
						'relation'		=> array(
							'parent'	=> 'display_style',
							'show_when'	=> '2'
						)
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number of tweets', 'kingcomposer' ),
						'name'			=> 'number_tweet',
						'admin_label'	=> true,
						'value'			=> '5',
						'options' 		=> array(
							'min' => 1,
							'max' => 20
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Time', 'kingcomposer' ),
						'name'			=> 'show_time',
						'description'	=> __( 'Show how long it was since a tweet was posted. For example: "30m ago"', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show reply link', 'kingcomposer' ),
						'name'			=> 'show_reply',
						'description'	=> __( 'Show Reply link to each tweet.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Allow Retweet', 'kingcomposer' ),
						'name'			=> 'show_retweet',
						'description'	=> __( 'Show Retweet link to each tweet.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Twitter avatar', 'kingcomposer' ),
						'name'			=> 'show_avatar',
						'description'	=> __( 'Show avatar of Twitter account beside each tweet.', 'kingcomposer' ),
						'relation' 		=> array(
							'parent'	=> 'display_style',
							'show_when' => '1'
						),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Follow button', 'kingcomposer' ),
						'name'			=> 'show_follow_button',
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Use Own API Key', 'kingcomposer' ),
						'name'			=> 'use_api_key'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Consumer Key (API Key)', 'kingcomposer' ),
						'name'			=> 'consumer_key',
						'value'			=> '',
						'relation'		=> array(
							'parent' => 'use_api_key',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Consumer Secret (API Secret)', 'kingcomposer' ),
						'name'			=> 'consumer_secret',
						'value'			=> '',
						'relation'		=> array(
							'parent' => 'use_api_key',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Access Token', 'kingcomposer' ),
						'name'			=> 'access_token',
						'value'			=> '',
						'relation'		=> array(
							'parent' => 'use_api_key',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Access Token Secret', 'kingcomposer' ),
						'name'			=> 'access_token_secrect',
						'value'			=> '',
						'relation'		=> array(
							'parent' => 'use_api_key',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
						'value'			=> ''
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Text - Icon' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.description'),
									array('property' => 'font-family', 'label' => 'Text Font Family', 'selector' => '.description'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.description'),
									array('property' => 'line-height', 'label' => 'Text Line Height', 'selector' => '.description'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.description'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.twitter-footer a'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => '.twitter-footer a i'),
									array('property' => 'line-height', 'label' => 'Icon Line Height', 'selector' => '.twitter-footer a i'),
									array('property' => 'color', 'label' => 'Date Color', 'selector' => '.twitter-footer .tweet_date'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.twitter-footer .tweet_date'),
								),
								'Follow Button' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_twitter_follow,.kc_twitter_follow i'),
									array('property' => 'font-size', 'label' => 'Text Font Size', 'selector' => '.kc_twitter_follow,.kc_twitter_follow i'),
									array('property' => 'background', 'label' => 'Background', 'selector' => '.kc_twitter_follow'),
									array('property' => 'color', 'label' => 'Text Hover Color', 'selector' => '.kc_twitter_follow:hover,.kc_twitter_follow:hover i'),
									array('property' => 'background', 'label' => 'Background Hover', 'selector' => '.kc_twitter_follow:hover'),
									array('property' => 'padding', 'label' => 'Button Size', 'selector' => '.kc_twitter_follow'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc_twitter_follow'),
								),
								'Box' => array(
									array('property' => 'background-color', 'label' => 'Background', 'selector' => '.result_twitter_feed', 'des' => __( 'The background of list posts', 'kingcomposer')),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.result_twitter_feed'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.result_twitter_feed', 'des' => __( 'The height of list posts', 'kingcomposer')),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.result_twitter_feed', 'des' => __( 'Spacing of list with wrapper', 'kingcomposer')),
								),
								'Post' => array(
									array('property' => 'background-color', 'label' => 'Post Background Color', 'selector' => '.result_twitter_feed ul li', 'des' => __( 'The background of post single', 'kingcomposer')),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.result_twitter_feed ul li'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.result_twitter_feed ul li'),
									array('property' => 'margin', 'label' => 'Spacing', 'selector' => '.result_twitter_feed ul li', 'des' => __( 'Spacing between each post', 'kingcomposer')),
									array('property' => 'border-top-color', 'label' => 'Line Background', 'selector' => '.twitter-footer.show_avatar', 'des' => __( 'Line between each post', 'kingcomposer')),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		/* Just for test icon
		---------------------------------------------------------- */

		'kc_instagram_feed' => array(

			'name' => __('Instagram Feed', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-instagram',
			'category' => 'Socials',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'description'	=> __( 'Title of Instagaram feed. Leave blank if no title is needed.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number of photos', 'kingcomposer' ),
						'name'			=> 'number_show',
						'description'	=> __( 'Set the number of photos displayed.', 'kingcomposer' ),
						'value'			=> '8',
						'options' => array(
							'min' => 1,
							'max' => 16
						),
						'admin_label'	=> true,
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Number of Columns', 'kingcomposer' ),
						'name'			=> 'columns_style',
						'options'			=> array(
							'1' => __( '1 Columns', 'kingcomposer' ),
							'2' => __( '2 Columns', 'kingcomposer' ),
							'3' => __( '3 Columns', 'kingcomposer' ),
							'4' => __( '4 Columns', 'kingcomposer' ),
							'5' => __( '5 Columns', 'kingcomposer' ),
							'6' => __( '6 Columns', 'kingcomposer' )
						),
						'description'	=> __( 'Set the photo columns.', 'kingcomposer' ),
						'value'			=> '4'
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Image Size', 'kingcomposer' ),
						'name'			=> 'image_size',
						'description'	=> __( '', 'kingcomposer' ),
						'options'		=> array(
							'low_resolution' => 'Low resolution',
							'thumbnail' => 'Thumbnail',
							'standard_resolution' => 'Standard resolution',
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Username', 'kingcomposer' ),
						'name'			=> 'username',
						'description'	=> __( 'The Instagaram username.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Access token', 'kingcomposer' ),
						'name'			=> 'access_token',
						'description'	=> __( 'You can get the Access token at http://instagram.pixelunion.net/', 'kingcomposer' ),
						'value'			=> ''
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options'		=> array(
							array(
								'Instagaram Style' => array(
									array('property' => 'border', 'label' => 'Border', 'selector' => 'ul li img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'ul li img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'ul li'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)

		),

		'kc_fb_recent_post' => array(

			'name' => __('FaceBook Post', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-facebook',
			'category' => 'Socials',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Facebook Page slug', 'kingcomposer' ),
						'name'			=> 'fb_page_id',
						'description'	=> __( 'Facebook page ID or slug. For example: wordpress', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Facebook App ID', 'kingcomposer' ),
						'name'			=> 'fb_app_id',
						'description'	=> __( 'Get your App ID at https://developers.facebook.com/apps', 'kingcomposer' ),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Facebook App Secret', 'kingcomposer' ),
						'name'			=> 'fb_app_secret',
						'description'	=> __( 'Get your App Secret from https://developers.facebook.com/apps', 'kingcomposer' ),
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number of posts', 'kingcomposer' ),
						'name'			=> 'number_post_show',
						'description'	=> __( 'The number of posts displayed', 'kingcomposer' ),
						'value'			=> '5',
						'admin_label'	=> true,
						'options' => array(
							'min' => 1,
							'max' => 50
						)
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number of words per post', 'kingcomposer' ),
						'name'			=> 'number_of_des',
						'description'	=> __( 'The number of words in each facebook post, for example: 25. Leave this field empty to show the full post. Ex 25', 'kingcomposer' ),
						'value'			=> '25',
						'admin_label'	=> true,
						'options' => array(
							'min' => 1,
							'max' => 200
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Image?', 'kingcomposer' ),
						'name'			=> 'show_image',
						'description'	=> __( 'Show featured image of the Facebook post.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Like Count?', 'kingcomposer' ),
						'name'			=> 'show_like_count',
						'description'	=> __( 'Show the Like count link in the Facebook post.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Comment Count?', 'kingcomposer' ),
						'name'			=> 'show_comment_count',
						'description'	=> __( 'Show Comment count link in the Facebook post.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Time', 'kingcomposer' ),
						'name'			=> 'show_time',
						'description'	=> __( 'Show how long it was since a post was published. For example: 4 days ago.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Open URL in a new tab', 'kingcomposer' ),
						'name'			=> 'open_link_new_window',
						'description'	=> __( 'All Facebook URLs will open in a new tab.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Follow Button', 'kingcomposer' ),
						'name'			=> 'show_profile_button',
						'description'	=> __( 'Show the follow button underneath the Facebook posts box.', 'kingcomposer' ),
						'value' => 'yes'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Folow Button Text', 'kingcomposer' ),
						'name'			=> 'follow_text',
						'description'	=> __( 'Use your own text for follow button. Default is : Go to [page slug] fan page', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'show_profile_button',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'name'    => 'custom_css',
						'type'    => 'css',
						'options' => array(
							array(
								'Text - Icon' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.fb-message'),
									array('property' => 'font-family', 'label' => 'Text Font Family', 'selector' => '.fb-message'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.fb-message'),
									array('property' => 'line-height', 'label' => 'Text Line Height', 'selector' => '.fb-message'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.fb-message'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.fb-post-info a span'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => '.fb-post-info a i, .fb-post-info a span'),
									array('property' => 'line-height', 'label' => 'Icon Line Height', 'selector' => '.fb-post-info a i, .fb-post-info a span'),
								),
								'Follow Button' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.fb-button-profile'),
									array('property' => 'font-size', 'label' => 'Text Font Size', 'selector' => '.fb-button-profile'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.fb-button-profile'),
									array('property' => 'color', 'label' => 'Text Hover Color', 'selector' => '.fb-button-profile:hover'),
									array('property' => 'background-color', 'label' => 'Background Hover Color', 'selector' => '.fb-button-profile:hover'),
									array('property' => 'padding', 'label' => 'Button Size', 'selector' => '.fb-button-profile'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.fb-button-profile'),
								),
								'Box' => array(
									array('property' => 'background-color', 'label' => 'Background', 'selector' => 'ul.list-posts', 'des' => __( 'The background of list posts', 'kingcomposer')),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'ul.list-posts'),
									array('property' => 'height', 'label' => 'Height', 'selector' => 'ul', 'des' => __( 'The height of list posts', 'kingcomposer')),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'ul.list-posts', 'des' => __( 'Spacing of list with wrapper', 'kingcomposer')),
								),
								'Post' => array(
									array('property' => 'background-color', 'label' => 'Post Background Color', 'selector' => 'ul.list-posts li', 'des' => __( 'The background of post single', 'kingcomposer')),
									array('property' => 'margin', 'label' => 'Spacing', 'selector' => 'ul.list-posts li', 'des' => __( 'Spacing between each post', 'kingcomposer')),
								)

							)
						)

					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)

		),

		'kc_flip_box' => array(
			'name' => __('Flip Box', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-flip',
			'category' => 'Content',
			'live_editor' => $live_tmpl.'kc_flip_box.php',
			'tab_icons' => array(
				'front' => 'et-adjustments',
				'back'  => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'front' => array(
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Icon', 'kingcomposer' ),
						'name'			=> 'show_icon',
						'value'			=> 'no',
						'description'	=> __( 'Show the icon in the front side', 'kingcomposer' )
					),
					array(
						'type' 			=> 'icon_picker',
						'name'		 	=> 'icon',
						'label' 		=> __( 'Icon', 'kingcomposer' ),
						'value'			=> 'sl-rocket',
						'description' 	=> __( 'Select icon display on front side', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'description'	=> __( 'Show the title in the front side.', 'kingcomposer' ),
						'admin_label'	=> true,
						'value'			=> __( 'Lorem ipsum dolor sit amet', 'kingcomposer')
					),
					array(
						'type'			=> 'textarea',
						'label'			=> __( 'Description', 'kingcomposer' ),
						'name'			=> 'description',
						'value'			=> base64_encode( __('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'kingcomposer')),
						'description'	=> __( 'Enter description for the front side, Shortcode are supported in this field.', 'kingcomposer' )
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Direction', 'kingcomposer' ),
						'name'			=> 'direction',
						'options'		=> array(
							'horizontal' => __( 'Horizontal', 'kingcomposer' ),
							'vertical' => __( 'Vertical', 'kingcomposer' ),
						),
						'description'	=> __( 'Direction of FlipBox', 'kingcomposer' ),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper Class', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
						'value'			=> ''
					),
					array(
						'name'     => 'css_custom_front',
						'type'     => 'css',
						'options' => array(
							array(
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.front i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.front i'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.front i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.front i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.front i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.front i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.front i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.front i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.front i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.front i'),
								),
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.front h3'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.front h3'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.front h3'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.front h3'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.front h3'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.front h3'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.front h3'),
								),
								'Desc' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.front p'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.front p'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.front p'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.front p'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.front p'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.front p'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.front p'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.front p'),
								),
								'Boxes' => array(
									array('property' => 'background', 'label' => 'Background', 'selector' => '.front'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.front, .back'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.front, .back'),
									array('property' => 'text-align', 'label' => 'Height', 'selector' => '.front .front-content'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.front'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.front'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.front'),
								)
							)
						)
					)
				),
				'back' => array(
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Icon', 'kingcomposer' ),
						'name'			=> 'b_show_icon',
						'value'			=> 'no',
						'description'	=> __( 'Show the icon in the back side', 'kingcomposer' )
					),
					array(
						'type' 			=> 'icon_picker',
						'name'		 	=> 'b_icon',
						'label' 		=> __( 'Icon', 'kingcomposer' ),
						'value'			=> 'sl-rocket',
						'description' 	=> __( 'Select icon display on back side', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'b_show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'b_title',
						'description'	=> __( 'Show the title in the back side. Title of the FlipBox. Leave blank if no title is needed.', 'kingcomposer' ),
						'value'			=> __( 'Lorem ipsum dolor sit amet', 'kingcomposer')
					),
					array(
						'type'			=> 'textarea',
						'label'			=> __( 'Description', 'kingcomposer' ),
						'name'			=> 'b_description',
						'value'			=> base64_encode( __('Lorem ipsum dolor sit amet, consectetur adipiscing.', 'kingcomposer')),
						'description'	=> __( 'Enter description for the back side, Shortcode are supported in this field.', 'kingcomposer' )
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Button', 'kingcomposer' ),
						'name'			=> 'b_show_button',
						'description'	=> __( 'Show the button in the back side', 'kingcomposer' )
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Text on button', 'kingcomposer' ),
						'name'			=> 'b_text_on_button',
						'description'	=> __( 'Set the text displayed on the button.', 'kingcomposer' ),
						'relation'	=> array(
							'parent' => 'b_show_button',
							'show_when' => 'yes'
						),
						'value'			=> 'Read more'
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'Link URL', 'kingcomposer' ),
						'name'			=> 'b_link',
						'description'	=> __( 'URL of the button in the back side.', 'kingcomposer' ),
						'relation'	=> array(
							'parent' => 'b_show_button',
							'show_when' => 'yes'
						)
					),
					array(
						'name'     => 'css_custom_back',
						'type'     => 'css',
						'options' => array(
							array(
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.back i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.back i'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.back i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.back i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.back i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.back i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.back i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.back i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.back i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.back i'),
								),
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.back h3'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.back h3'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.back h3'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.back h3'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.back h3'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.back h3'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.back h3'),
								),
								'Desc' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.back p'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.back p'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.back p'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.back p'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.back p'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.back p'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.back p'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.back p'),
								),
								'Button' => array(
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.flipper .back a.button'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.flipper .back a.button'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.flipper .back a.button'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.flipper .back a.button'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.flipper .back a.button'),
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.flipper .back a.button'),
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => '.flipper .back a.button'),
									array('property' => 'color', 'label' => 'Text Hover Color', 'selector' => '.flipper .back a.button:hover'),
									array('property' => 'background-color', 'label' => 'BG Hover Color', 'selector' => '.flipper .back a.button:hover'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.flipper .back a.button'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.flipper .back a.button'),
									array('property' => 'border-color', 'label' => 'Border Hover Color', 'selector' => '.flipper .back a.button:hover'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.flipper .back a.button')
								),
								'Boxes' => array(
									array('property' => 'background', 'label' => 'Background', 'selector' => '.back'),
									array('property' => 'text-align', 'label' => 'Border', 'selector' => '.back .des'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.back'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.back'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.back'),
								)
							)
						)
					)
				)
			)
		),

		'kc_pie_chart' => array(
			'name' 		=> __('Pie Chart', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon'		=> 'kc-icon-pie',
			'category'	=> 'Content',
			'tab_icons'	=> array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_pie_chart.php',
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Percent number', 'kingcomposer' ),
						'name'			=> 'percent',
						'description'	=> __( 'Drag slider to select the percentage number displayed.', 'kingcomposer' ),
						'admin_label'	=> true,
						'value' 		=> '50',
						'options'		=> array(
							'unit'		=> '%',
							'show_input'=> true
						)
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Circle Bar Width', 'kingcomposer' ),
						'name'			=> 'linewidth',
						'description'	=> __( 'Drag slider to change the Width of the circle bar in px.', 'kingcomposer' ),
						'admin_label'	=> true,
						'value' 		=> '10',
						'options'		=> array(
							'show_input'=> false,
							'min'	=> 1,
							'max'	=> 30
						)
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Pie size', 'kingcomposer' ),
						'name'			=> 'size',
						'description'	=> __( 'It is width and height of pie chart, unit (px).', 'kingcomposer' ),
						'admin_label'	=> true,
						'options'		=> array(
							'show_input'=> true,
							'min'	=> 50,
							'max'	=> 500
						),
						'value'			=> '120'
					),
					array(
						'name' => 'auto_width',
						'label' => 'Auto Width',
						'type' => 'toggle',
						'description' => __('Width pie chart auto set to 100% of wrapper element ', 'kingcomposer'),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Rounded corners', 'kingcomposer' ),
						'name'			=> 'rounded_corners_bar',
						'description'	=> __( 'Set rounded style for circle bar .', 'kingcomposer' )
					),
					array(
						'name' => 'icon_option',
						'label' => 'Add Icon?',
						'type' => 'toggle',
						'description' => __('Display an icon above the number', 'kingcomposer'),
					),
					array(
						'name' => 'icon',
						'label' => 'Select Icon',
						'type' => 'icon_picker',
						'value' => 'fa-leaf',
						'description' => __('Choose an icon to display with number', 'kingcomposer'),
						'relation' => array(
							'parent' => 'icon_option',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					),
				),
				'styling' => array(
					array(
						'type'			=> 'color_picker',
						'label'			=> __( 'Circle Bar Color', 'kingcomposer' ),
						'name'			=> 'barcolor',
						'description'	=> __( 'Color of the circle bar.', 'kingcomposer' ),
						'value'			=> '#42BCE2'
					),
					array(
						'type'			=> 'color_picker',
						'label'			=> __( 'Circle Bar Backgroud Color', 'kingcomposer' ),
						'name'			=> 'trackcolor',
						'description'	=> __( 'Color of the circle bar backgroud.', 'kingcomposer' ),
						'value'			=> '#e4e4e4'
					),
					array(
						'type'			=> 'css',
						'name'			=> 'custom_css',
						'options'		=> array(
							array(
								'screens' 	=> 'any',
								'Number Style' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.percent', 'des' => __( 'Set color for number percent text', 'kingcomposer' )),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.percent', 'des' => __( 'Set size of number percent text', 'kingcomposer' )),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.percent', 'des' => __( 'Set size of number percent text', 'kingcomposer' )),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.percent', 'des' => __( 'Set line height of number percent text', 'kingcomposer' )),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.percent', 'des' => __( 'Set line height of number percent text', 'kingcomposer' )),
									array('property' => 'margin', 'label' => 'Spacing', 'selector' => '.percent', 'des' => __( 'The spacing between icon and number', 'kingcomposer' )),
								),
								'Icon Style' => array(
									array('property' => 'color', 'label' => 'Color Icon ', 'selector' => '.pie_chart_percent i', 'des' => __( 'Set color for icon', 'kingcomposer' )),
									array('property' => 'font-size', 'label' => 'Size Icon', 'selector' => '.pie_chart_percent i', 'des' => __( 'Set size for icon', 'kingcomposer' )),
								),
								'Wrapper' => array(
									array('property' => 'background', 'label' => 'Background'),
									array('property' => 'margin', 'label' => 'Margin'),
									array('property' => 'padding', 'label' => 'Padding'),
								)
							)
						),
					),
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)

		),

		'kc_progress_bars' => array(

			'name' => __('Progress Bar', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-progress',
			'category' => 'Content',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_progress_bars.php',
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Style', 'kingcomposer' ),
						'name'			=> 'style',
						'description'	=> __( 'Select the style of progress bars.', 'kingcomposer' ),
						'options'		=> array(
							'1' => __('Style 1', 'kingcomposer'),
							'2' => __('Style 2 (Value in tooltip)', 'kingcomposer'),
							'3' => __('Style 3 (Value in progress bar)', 'kingcomposer')
						),
						'admin_label'	=> true,
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Animate Speed', 'kingcomposer' ),
						'name'			=> 'speed',
						'description'	=> __( 'Select speed for animation.', 'kingcomposer' ),
						'options'		=> array(
							'2000' => __('Normal', 'kingcomposer'),
							'1600' => __('Fast', 'kingcomposer'),
							'1200' => __('Very Fast', 'kingcomposer'),
							'2400' => __('Slow', 'kingcomposer'),
							'2800' => __('Very Slow', 'kingcomposer'),
						),
						'value'			=> '2000',
						'admin_label'	=> true,
					),
					array(
						'type'			=> 'group',
						'label'			=> __('Options', 'kingcomposer'),
						'name'			=> 'options',
						'description'	=> __( 'Repeat this fields with each item created, Each item corresponding processbar element.', 'kingcomposer' ),
						'options'		=> array('add_text' => __('Add new progress bar', 'kingcomposer')),

						'value' => base64_encode( json_encode(array(
							"1" => array(
								"label" => "Development",
								"value" => "90",
								"value_color" => "",
								"prob_color" => "",
							),
							"2" => array(
								"label" => "Design",
								"value" => "80",
								"value_color" => "",
								"prob_color" => "",
							),
							"3" => array(
								"label" => "Marketing",
								"value" => "70",
								"value_color" => "",
								"prob_color" => "",
							)
						) ) ),
						'params' => array(
							array(
								'type' => 'text',
								'label' => __( 'Label', 'kingcomposer' ),
								'name' => 'label',
								'description' => __( 'Enter text used as title of the bar.', 'kingcomposer' ),
								'admin_label' => true,
							),
							array(
								'type' => 'number_slider',
								'label' => __( 'Value', 'kingcomposer' ),
								'name' => 'value',
								'description' => __( 'Enter targeted value of the bar (From 1 to 100).', 'kingcomposer' ),
								'admin_label' => true,
								'options' 		=> array(
									'min'		=> 1,
									'max'		=> 100,
								),
								'value' => '80'
							),
							array(
								'type' => 'color_picker',
								'label' => __( 'Value Color', 'kingcomposer' ),
								'name' => 'value_color',
								'description' => __( 'Color of targeted value text. You can change color for all item from Styling tab.', 'kingcomposer' ),
							),
							array(
								'type' => 'color_picker',
								'label' => __( 'Progressbar Color', 'kingcomposer' ),
								'name' => 'prob_color',
								'description' => __( 'Customized progress bar color. You can change color for all item from Styling tab.', 'kingcomposer' ),
							),
						),
					),


					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'type'			=> 'css',
						'label'			=> __( 'css', 'kingcomposer' ),
						'name'			=> 'custom_css',
						'options'		=> array(
							array(
								'screens' => 'any',
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.progress-item span.label'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.progress-item span.label'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.progress-item span.label'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.progress-item span.label'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.progress-item span.label'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.progress-item span.label'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.progress-item span.label'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.progress-item span.label'),
								),
								'Value' => array(
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.progress-item .value'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.progress-item .value'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.progress-item .value'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.progress-item .value'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.progress-item .ui-label'),
								),
								'Item Style' => array(
									array('property' => 'height', 'label' => 'Progressbar Weight', 'selector' => '.kc-ui-progress-bar, .kc-ui-progress'),
									array('property' => 'background-color', 'label' => 'Progressbar Background Color', 'selector' => '.kc-ui-progress-bar'),
									array('property' => 'border-radius', 'label' => 'Trackbar Radius', 'selector' => '.kc-ui-progress-bar .kc-ui-progress, .kc-ui-progress-bar'),
									array('property' => 'padding', 'label' => 'Progressbar Spacing', 'selector' => '.progress-item'),
								),
								'Wrapper' => array(
									array('property' => 'width', 'label' => 'Width'),
									array('property' => 'margin', 'label' => 'Margin'),
									array('property' => 'padding', 'label' => 'Padding'),
									array('property' => 'background', 'label' => 'Background'),
								)

							)
						)
					),
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)

		),

		'kc_button' => array(

			'name' => __('Button', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-button',
			'category' => 'Content',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_button.php',
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'text_title',
						'description'	=> __( 'Add the text that appears on the button.', 'kingcomposer' ),
						'value' 			=> 'Text Button',
						'admin_label'	=> true
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'Link', 'kingcomposer' ),
						'name'			=> 'link',
						'description'	=> __( 'Add your relative URL. Each URL contains link, anchor text and target attributes.', 'kingcomposer' ),
					),
					array(
						'type' 			=> 'toggle',
						'name' 			=> 'show_icon',
						'label' 		=> __( 'Show Icon?', 'kingcomposer' ),
						'description' 	=> '',
					),
					array(
						'type' 			=> 'icon_picker',
						'name'		 	=> 'icon',
						'label' 		=> __( 'Icon', 'kingcomposer' ),
						'value'         => 'fa-leaf',
						'admin_label' 	=> true,
						'description' 	=> __( 'Select icon for button', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'dropdown',
						'name'			=> 'icon_position',
						'label'			=> __( 'Icon position', 'kingcomposer' ),
						'description'	=> '',
						'value'     	=> 'left',
						'options'		=> array(
							'left'	=> __('Left', 'kingcomposer'),
							'right'	=> __('Right', 'kingcomposer'),
						),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'On Click', 'kingcomposer' ),
						'name'			=> 'onclick',
						'description'	=> __( 'Content of on click attribute for element.', 'kingcomposer' ),
						'value' 			=> '',
					),
					array(
						'name'        => 'ex_class',
						'label'       => __('Button extra class', 'kingcomposer'),
						'type'        => 'text',
						'description' => __('Add class name for a tag.', 'kingcomposer')
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'type'			=> 'css',
						'label'			=> __( 'css', 'kingcomposer' ),
						'name'			=> 'custom_css',
						'options'		=> array(
							array(
								'screens' => 'any',
								'Button Style' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_button'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_button'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc_button'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.kc_button'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc_button'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc_button'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc_button'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc_button'),
									array('property' => 'text-align', 'label' => 'Align'),
									array('property' => 'letter-spacing', 'label' => 'Letter Spacing', 'selector' => '.kc_button'),
									array('property' => 'text-shadow', 'label' => 'Text Shadow', 'selector' => '.kc_button'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_button'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc_button'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc_button'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc_button'),
									array('property' => 'padding', 'label' => 'Icon Spacing', 'selector' => '.kc_button i')
								),
								'Mouse Hover' => array(
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.kc_button:hover'),
									array('property' => 'color', 'label' => 'Text Color', 'selector'=>'.kc_button:hover'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector'=>'.kc_button:hover'),
									array('property' => 'border', 'label' => 'Border', 'selector'=>'.kc_button:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector'=>'.kc_button:hover')
								)
							)
						)
					),
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_video_play' => array(

			'name' => __('Video Player', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-play',
			'category' => 'Medias',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_video_play.php',
			'params' => array(
				'general' => array(
					array(
						'type' 			=> 'select',
						'name' 			=> 'source',
						'label' 		=> __( 'Source', 'kingcomposer' ),
						'description' 	=> __('Choose source of video', 'kingcomposer'),
						'options' 		=> array(
							'upload' => __('From media library', 'kingcomposer'),
							'youtube' => __('From youtube or vimeo', 'kingcomposer'),
						)
					),
					array(
						'type'			=> 'attach_media',
						'label'			=> __( 'Video upload', 'kingcomposer' ),
						'name'			=> 'video_upload',
						'description'	=> __( 'Select video from media library', 'kingcomposer' ),
						'admin_label'	=> true,
						'relation'		=> array(
							'parent'	=> 'source',
							'show_when' => 'upload'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Video link', 'kingcomposer' ),
						'name'			=> 'video_link',
						'description'	=> __( 'Enter the Youtube or Vimeo URL. For example: https://www.youtube.com/watch?v=iNJdPyoqt8U', 'kingcomposer' ),
						'admin_label'	=> true,
						'value'			=> 'https://www.youtube.com/watch?v=iNJdPyoqt8U',
						'relation'		=> array(
							'parent'	=> 'source',
							'show_when' => 'youtube'
						)
					),
					array(
						'type' 			=> 'toggle',
						'name' 			=> 'full_width',
						'label' 		=> __( 'Video Fullwidth', 'kingcomposer' ),
						'description' 	=> __('Stretch the video to fit the content width.', 'kingcomposer'),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Video Width', 'kingcomposer' ),
						'name'			=> 'video_width',
						'description'	=> __( 'Set the width of the video. the height will be prorated = width*1.77', 'kingcomposer' ),
						'value'			=> 600,
						'relation'		=> array(
							'parent'	=> 'full_width',
							'hide_when' => 'yes'
						)
					),
					array(
						'type' 			=> 'toggle',
						'name' 			=> 'auto_play',
						'label' 		=> __( 'Auto Play', 'kingcomposer' ),
						'description' 	=> __('The video automatically plays when site loaded.', 'kingcomposer')
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)

		),

		'kc_counter_box' => array(
			'name' => __('Counter Box', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-counter',
			'category' => '',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_counter_box.php',
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Targeted number', 'kingcomposer' ),
						'name'			=> 'number',
						'description'	=> __( 'The targeted number to count up to (From zero).', 'kingcomposer' ),
						'admin_label'	=> true,
						'value'			=> '100'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Label', 'kingcomposer' ),
						'name'			=> 'label',
						'description'	=> __( 'The text description of the counter.', 'kingcomposer' ),
						'admin_label'	=> true,
						'value'			=> 'Percent number'
					),
					array(
						'type' 			=> 'toggle',
						'name' 			=> 'label_above',
						'label' 		=> __( 'Label above number', 'kingcomposer' ),
						'description' 	=> __('Place the label above the number counting. By default, it is placed underneath the number counting.', 'kingcomposer')
					),
					array(
						'type'	      => 'toggle',
						'name'	      => 'icon_show',
						'label'       => 'Display Icon',
						'description' => __('Display icon in box counter', 'kingcomposer')
					),
					array(
						'type'			=> 'icon_picker',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'name'			=> 'icon',
						'description'	=> __( 'Icon in counter box', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'icon_show',
							'show_when'	=> array( 'yes' )
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Label' => array(
									array('property' => 'color', 'label' => 'Label Color', 'selector' => 'h4'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => 'h4'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => 'h4'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => 'h4'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => 'h4'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => 'h4'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => 'h4'),
									array('property' => 'margin', 'label' => 'Label Margin', 'selector' => 'h4')
								),
								'Number' => array(
									array('property' => 'color', 'label' => 'Number Color', 'selector' => '.counterup'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.counterup'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.counterup'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.counterup'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.counterup'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.counterup'),
									array('property' => 'margin', 'label' => 'Number Margin', 'selector' => '.counterup'),
								),
								'Icon'=> array(
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => 'i'),
									array('property' => 'background-color', 'label' => 'Icon Background', 'selector' => 'i'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => 'i'),
									array('property' => 'line-height', 'label' => 'Icon Line Height', 'selector' => 'i'),
									array('property' => 'width', 'label' => 'Icon Width', 'selector' => 'i'),
									array('property' => 'height', 'label' => 'Icon Height', 'selector' => 'i'),
									array('property' => 'border', 'label' => 'Icon Border', 'selector' => 'i'),
									array('property' => 'border-radius', 'label' => 'Icon Border Radius', 'selector' => 'i'),
									array('property' => 'padding', 'label' => 'Icon Spacing', 'selector' => 'i'),
									array('property' => 'margin', 'label' => 'Icon Margin', 'selector' => 'i'),
								),
								'Box Style' => array(
									array('property' => 'background', 'label' => 'Background'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'padding', 'label' => 'Padding'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_post_type_list' => array(

			'name' => __('List Blog Posts', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-post',
			'category' => 'Blog Posts',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'description'	=> __( 'The title of the Post Type List. Leave blank if no title is needed.', 'kingcomposer' ),
						'value'			=> __( 'Recent post title', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number of posts displayed', 'kingcomposer' ),
						'name'			=> 'number_post',
						'description'	=> __( 'The number of posts you want to show.', 'kingcomposer' ),
						'value'			=> '5',
						'admin_label'	=> true,
						'options' => array(
							'min' => 1,
							'max' => 12
						)
					),
					array(
						'type'			=> 'post_taxonomy',
						'label'			=> __( 'Content Type', 'kingcomposer' ),
						'name'			=> 'post_taxonomy',
						'description'	=> __( '', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Order by', 'kingcomposer' ),
						'name'			=> 'order_by',
						'description'	=> __( '', 'kingcomposer' ),
						'admin_label'	=> true,
						'options' 		=> array(
							'ID'		=> __('Post ID', 'kingcomposer'),
							'author'	=> __('Author', 'kingcomposer'),
							'title'		=> __('Title', 'kingcomposer'),
							'name'		=> __('Post name (post slug)', 'kingcomposer'),
							'type'		=> __('Post type (available since Version 4.0)', 'kingcomposer'),
							'date'		=> __('Date', 'kingcomposer'),
							'modified'	=> __('Last modified date', 'kingcomposer'),
							'rand'		=> __('Random order', 'kingcomposer'),
							'comment_count'	=> __('Number of comments', 'kingcomposer')
						)
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Order post', 'kingcomposer' ),
						'name'			=> 'order_list',
						'description'	=> __( '', 'kingcomposer' ),
						'admin_label'	=> true,
						'options' 		=> array(
							'ASC'		=> __('ASC', 'kingcomposer'),
							'DESC'		=> __('DESC', 'kingcomposer'),
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show thumbnail', 'kingcomposer' ),
						'name'			=> 'thumbnail',
						'description'	=> __( 'Show the post thumbnail.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Image size', 'kingcomposer' ),
						'name'			=> 'image_size',
						'description'	=> __( 'Add your image size, For example: thumbnail, medium, large or full).', 'kingcomposer' ),
						'value'			=> 'thumbnail',
						'relation' 	=> array(
							'parent'	=> 'thumbnail',
							'show_when'		=> 'yes'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show date', 'kingcomposer' ),
						'name'			=> 'show_date',
						'description'	=> __( 'Show the date of the post.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show author', 'kingcomposer' ),
						'name'			=> 'show_author',
						'description'	=> __( 'Show the author of the post.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show tags', 'kingcomposer' ),
						'name'			=> 'show_tags',
						'description'	=> __( 'Show the tags of the post.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show categories', 'kingcomposer' ),
						'name'			=> 'show_category',
						'description'	=> __( 'Show the categories of the post.', 'kingcomposer' )
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Number of words', 'kingcomposer' ),
						'name'			=> 'number_word',
						'description'	=> __( 'Show a certain number of words in each post.', 'kingcomposer' ),
						'value'			=> '30'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show "Read more" button', 'kingcomposer' ),
						'name'			=> 'show_button',
						'description'	=> __( 'Show the "Read more" button in the post.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Read more text', 'kingcomposer' ),
						'name'			=> 'readmore_text',
						'description'	=> __( 'Edit the text that appears on the "Read more" button.', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'show_button',
							'show_when' => 'yes'
						),
						'value'			=> 'Read more'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.list-item h3 a'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.list-item h3 a'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.list-item h3 a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.list-item h3 a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.list-item h3 a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.list-item h3 a'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.list-item h3 a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.list-item h3 a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.list-item h3 a'),
								),
								'Meta Text' => array(
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc-entry_meta .date i, .kc-entry_meta i'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-entry_meta .date, .kc-entry_meta a'),
								),
								'Text' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.post-content .text'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.post-content .text'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.post-content .text'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.post-content .text'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.post-content .text'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.post-content .text'),
								),
								'Read More'=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.read-more'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.read-more'),
									array('property' => 'color', 'label' => 'Hover Color', 'selector' => '.read-more:hover'),
									array('property' => 'background-color', 'label' => 'Background Hover Color', 'selector' => '.read-more:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.read-more'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.read-more'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.read-more'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.read-more'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.read-more'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.read-more'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.read-more'),
									array('property' => 'padding', 'label' => 'Button Size', 'selector' => '.read-more'),
								),
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),
		'kc_carousel_images' => array(

			'name' => __('Image Carousel', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-icarousel',
			'category' => 'Medias',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_carousel_images.php',
			'params' => array(

				'general' => array(
					array(
						'type' 			=> 'attach_images',
						'label' 		=> __( 'Images', 'kingcomposer' ),
						'name'			=> 'images',
						'description' 	=> __( 'Select images from media library.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'        	=> 'text',
						'label'     	=> __( 'Image size', 'kingcomposer' ),
						'name' 		 	=> 'img_size',
						'description' 	=> __( 'Set the image size : thumbnail, medium, large or full.', 'kingcomposer' ),
						'value'       	=> 'full',
					),
					array(
						'type'     		=> 'dropdown',
						'label'  	 	=> __( 'Onclick event', 'kingcomposer' ),
						'name'			=> 'onclick',
						'options' 		=> array(
							'none' => __( 'None', 'kingcomposer' ),
							'lightbox' => __( 'Open on lightbox', 'kingcomposer' ),
							'custom_link' => __( 'Open custom links', 'kingcomposer' )
						),
						'description'	=> __( 'Select the click event when users click on an image.', 'kingcomposer' )
					),
					array(
						'type' 			=> 'number_slider',
						'label' 		=> __( 'Items per slide', 'kingcomposer' ),
						'name' 			=> 'items_number',
						'description' 	=> __( 'The number of items displayed per slide (not apply for autohight)', 'kingcomposer' ),
						'admin_label'	=> true,
						'value'			=> '3',
						'options' => array(
							'min' => 1,
							'max' => 15,
							'show_input' => true
						)
					),
					array(
						'type' 			=> 'number_slider',
						'label' 		=> __( 'Speed', 'kingcomposer' ),
						'name' 			=> 'speed',
						'description' 	=> __( 'Set the speed at which auto playing sliders will transition (in second).', 'kingcomposer' ),
						'value'			=> 500,
						'admin_label'	=> true,
						'options' => array(
							'min' => 100,
							'max' => 1500,
							'show_input' => true
						)
					),
					array(
						'type'        	=> 'textarea',
						'label'     	=> __( 'Custom links', 'kingcomposer' ),
						'name'  	=> 'custom_links',
						'description' 	=> __( 'Enter links for each slide (Note: divide links with linebreaks (Enter)).', 'kingcomposer' ),
						'relation'  	=> array(
							'parent'	=> 'onclick',
							'show_when' => 'custom_link'
						)
					),
					array(
						'type'        	=> 'dropdown',
						'label'     	=> __( 'Custom link target', 'kingcomposer' ),
						'name'  		=> 'custom_links_target',
						'description' 	=> __( 'Select how to open custom links.', 'kingcomposer' ),
						'options'       	=> array(
							'_self' => __( 'Same window', 'kingcomposer' ),
							'_blank' => __( 'New window', 'kingcomposer' )
						),
						'relation'  	=> array(
							'parent'	=> 'onclick',
							'show_when' => 'custom_link'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Navigation', 'kingcomposer' ),
						'name'			=> 'navigation',
						'description'	=> __( 'Display the "Next" and "Prev" buttons.', 'kingcomposer' ),
					),
					array(
						'type'        	=> 'dropdown',
						'label'     	=> __( 'Navigation Style', 'kingcomposer' ),
						'name'  		=> 'nav_style',
						'description' 	=> __( 'Select how navigation buttons display on slide.', 'kingcomposer' ),
						'options'       	=> array(
							'' => __( 'Buttons', 'kingcomposer' ),
							'arrow' => __( 'Arrow', 'kingcomposer' ),
							'round' => __( 'Rounded Arrow', 'kingcomposer' )
						),
						'relation'  	=> array(
							'parent'	=> 'navigation',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Pagination', 'kingcomposer' ),
						'name'			=> 'pagination',
						'description'	=> __( 'Show the pagination.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Auto height', 'kingcomposer' ),
						'name'			=> 'auto_height',
						'description'	=> __( 'Add height to div "owl-wrapper-outer" so you can use diffrent heights on slides. Use it only for one item per page setting.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Auto Play', 'kingcomposer' ),
						'name'			=> 'auto_play',
						'description'	=> __( 'The carousel automatically plays when site loaded.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Time delay', 'kingcomposer' ),
						'name'			=> 'delay',
						'description'	=> __( 'The delay time before moving on to a new slide', 'kingcomposer' ),
						'value'			=> '8',
						'options' => array(
							'min' => 1,
							'max' => 15,
							'show_input' => true
						),
						'relation'  	=> array(
							'parent'	=> 'auto_play',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Progress Bar', 'kingcomposer' ),
						'name'			=> 'progress_bar',
						'description'	=> __( 'Visualize the progression of displaying photos.', 'kingcomposer' )
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show thumbnail', 'kingcomposer' ),
						'name'			=> 'show_thumb',
						'description'	=> __( 'Show the thumbnails in carousel.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number Thumbnail View', 'kingcomposer' ),
						'name'			=> 'num_thumb',
						'description'	=> __( 'The number of images show in thumbnail view', 'kingcomposer' ),
						'value'			=> '5',
						'options' => array(
							'min' => 1,
							'max' => 15,
							'show_input' => true
						),
						'relation'  	=> array(
							'parent'	=> 'show_thumb',
							'show_when' => 'yes'
						)
					),

					array(
						'type' => 'text',
						'label' => __( 'Wrapper class name', 'kingcomposer' ),
						'name' => 'wrap_class',
						'description' => __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' )
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)

		),

		'kc_carousel_post' => array(

			'name' => __('Post Carousel', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-pcarousel',
			'category' => 'Blog Posts',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'description'	=> __( 'The title of the Post Carousel. Leave blank if no title is needed.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'post_taxonomy',
						'label'			=> __( 'Content Type', 'kingcomposer' ),
						'name'			=> 'post_taxonomy',
						'description'	=> __( 'Choose supported content type such as post, custom post type, etc.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Order by', 'kingcomposer' ),
						'name'			=> 'order_by',
						'description'	=> __( '', 'kingcomposer' ),
						'admin_label'	=> true,
						'options' 		=> array(
							'ID'		=> __('Post ID', 'kingcomposer'),
							'author'	=> __('Author', 'kingcomposer'),
							'title'		=> __('Title', 'kingcomposer'),
							'name'		=> __('Post name (post slug)', 'kingcomposer'),
							'type'		=> __('Post type (available since Version 4.0)', 'kingcomposer'),
							'date'		=> __('Date', 'kingcomposer'),
							'modified'	=> __('Last modified date', 'kingcomposer'),
							'rand'		=> __('Random order', 'kingcomposer'),
							'comment_count'	=> __('Number of comments', 'kingcomposer')
						)
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Order post', 'kingcomposer' ),
						'name'			=> 'order_list',
						'description'	=> __( '', 'kingcomposer' ),
						'admin_label'	=> true,
						'options' 		=> array(
							'ASC'		=> __('ASC', 'kingcomposer'),
							'DESC'		=> __('DESC', 'kingcomposer'),
						)
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Number of posts displayed', 'kingcomposer' ),
						'name'			=> 'number_post',
						'description'	=> __( 'The number of posts you want to show.', 'kingcomposer' ),
						'value'			=> '5',
						'admin_label'	=> true,
						'options' => array(
							'min' => 1,
							'max' => 20
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show thumbnail', 'kingcomposer' ),
						'name'			=> 'thumbnail',
						'description'	=> __( 'Show the post thumbnail.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Image size', 'kingcomposer' ),
						'name'			=> 'image_size',
						'description'	=> __( 'Set the image size : thumbnail, medium, large or full.', 'kingcomposer' ),
						'value'			=> 'thumbnail',
						'relation' 	=> array(
							'parent'	=> 'thumbnail',
							'show_when'		=> 'yes'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show date', 'kingcomposer' ),
						'name'			=> 'show_date',
						'description'	=> __( 'Show the post date.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show "Read more" button', 'kingcomposer' ),
						'name'			=> 'show_button',
						'description'	=> __( 'Show "Read more" button in the post.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type' 			=> 'number_slider',
						'label' 		=> __( 'Items per slide', 'kingcomposer' ),
						'name' 	=> 'items_number',
						'description' 	=> __( 'The number of items displayed per slide (not apply for auto-height).', 'kingcomposer' ),
						'value'			=> '3',
						'options' => array(
							'min' => 1,
							'max' => 10
						)
					),
					array(
						'type' 			=> 'number_slider',
						'label' 		=> __( 'Speed', 'kingcomposer' ),
						'name' 			=> 'speed',
						'description' 	=> __( 'Set the speed at which autoplaying sliders will transition in second.', 'kingcomposer' ),
						'value'			=> 500,
						'options' => array(
							'min' => 100,
							'max' => 1500,
							'show_input' => true
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Navigation', 'kingcomposer' ),
						'name'			=> 'navigation',
						'description'	=> __( 'Display the "Next" and "Prev" buttons.', 'kingcomposer' ),
					),
					array(
						'type'        	=> 'dropdown',
						'label'     	=> __( 'Navigation Style', 'kingcomposer' ),
						'name'  		=> 'nav_style',
						'description' 	=> __( 'Select how navigation buttons display on slide.', 'kingcomposer' ),
						'options'       	=> array(
							'' => __( 'Buttons', 'kingcomposer' ),
							'arrow' => __( 'Arrow', 'kingcomposer' ),
							'round' => __( 'Rounded Arrow', 'kingcomposer' )
						),
						'relation'  	=> array(
							'parent'	=> 'navigation',
							'show_when' => 'yes'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Pagination', 'kingcomposer' ),
						'name'			=> 'pagination',
						'description'	=> __( 'Show the pagination.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Auto height', 'kingcomposer' ),
						'name'			=> 'auto_height',
						'description'	=> __( 'Add height to owl-wrapper-outer so you can use diffrent heights on slides. Use it only for one item per page setting.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Auto Play', 'kingcomposer' ),
						'name'			=> 'auto_play',
						'description'	=> __( 'The carousel automatically plays when site loaded.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type' => 'text',
						'label' => __( 'Wrapper class name', 'kingcomposer' ),
						'name' => 'wrap_class',
						'description' => __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' )
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-owl-post-carousel .owl-item .title a, .kc-owl-post-carousel .caption a'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc-owl-post-carousel .caption'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-owl-post-carousel .title a, .kc-owl-post-carousel .caption a'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.kc-owl-post-carousel .title a, .kc-owl-post-carousel .caption a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-owl-post-carousel .owl-item .title a, .kc-owl-post-carousel .caption a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-owl-post-carousel .owl-item .title a, .kc-owl-post-carousel .caption a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-owl-post-carousel .owl-item .title a, .kc-owl-post-carousel .caption a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-owl-post-carousel .caption, .kc-owl-post-carousel .owl-item .title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-owl-post-carousel .caption, .kc-owl-post-carousel .owl-item .title'),
								),
								'Date' => array(
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.entry-date'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.entry-date'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.entry-date'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.entry-date'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.entry-date'),
									array('property' => 'color', 'label' => 'Color', 'selector' => '.entry-date'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.entry-date'),
								),
								'Text' => array(
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.in-post-content'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.in-post-content'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.in-post-content'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.in-post-content'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.in-post-content'),
									array('property' => 'color', 'label' => 'Color', 'selector' => '.in-post-content'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.in-post-content'),
								),
								'Read More'=> array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.read-more'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.read-more'),
									array('property' => 'color', 'label' => 'Text Hover Color', 'selector' => '.read-more:hover'),
									array('property' => 'background-color', 'label' => 'Background Hover Color', 'selector' => '.read-more:hover'),
									array('property' => 'font-family', 'label' => 'Text Font Family', 'selector' => '.read-more'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.read-more'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.read-more'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.read-more'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.read-more'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.read-more'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.read-more'),
									array('property' => 'padding', 'label' => 'Button Size', 'selector' => '.read-more'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.read-more'),
								),
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),

			)
		),

		'kc_image_gallery' => array(

			'name' => __('Image Gallery', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-gallery',
			'category' => 'Medias',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_image_gallery.php',
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'description'	=> __( 'The title of the Image Gallery. Leave blank if no title is needed.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'attach_images',
						'label'			=> __( 'Images', 'kingcomposer' ),
						'name'			=> 'images',
						'description'	=> __( 'Upload multiple image to the carousel with the SHIFT key holding.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Gallery type', 'kingcomposer' ),
						'name'			=> 'type',
						'description'	=> __( 'Select the gallery presentation type.', 'kingcomposer' ),
						'options' 		=> array(
							'grid' 		=> __( 'Images grid', 'kingcomposer' ),
							'image_masonry' 	=> __( 'Image masonry', 'kingcomposer' ),
						),
					),
					array(
						'type'			=> 'number_slider',
						'label'			=> __( 'Columns Images', 'kingcomposer' ),
						'name'			=> 'columns',
						'description'	=> __( 'Number of columns for grid', 'kingcomposer' ),
						'value'			=> '4',
						'options' => array(
							'min' => 1,
							'max' => 6,
							'show_input' => true
						),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Image size', 'kingcomposer' ),
						'name'			=> 'image_size',
						'description'	=> __( 'Set the image size : thumbnail, medium, large or full.', 'kingcomposer' ),
						'value'			=> 'full'
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Onclick event', 'kingcomposer' ),
						'name'			=> 'click_action',
						'description'	=> __( 'Select the click event when users click on an image.', 'kingcomposer' ),
						'options' 		=> array(
							'none' 			=> __( 'No action', 'kingcomposer' ),
							'large_image' 	=> __( 'Open large image', 'kingcomposer' ),
							'lightbox' 		=> __( 'Open on lightbox', 'kingcomposer' ),
							'custom_link' 	=> __( 'Open on custom link', 'kingcomposer' )
						),
					),
					array(
						'type'			=> 'textarea',
						'label'			=> __( 'Custom links', 'kingcomposer' ),
						'name'			=> 'custom_links',
						'description'	=> __( 'Each custom link per new line and corresponding to each image uploaded', 'kingcomposer' ),
						'relation'	=> array(
							'parent'	=> 'click_action',
							'show_when'	=> 'custom_link'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_coundown_timer' => array(
			'name' => __('Countdown Timer', 'kingcomposer'),
			'description' => __('', 'kingcomposer'),
			'icon' => 'kc-icon-coundown',
			'category' => 'Content',
			'tab_icons' => array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_coundown_timer.php',
			'params' => array(
				'general' => array(
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'description'	=> __( 'The title of Countdown Timer. Leave blank if no title is needed.', 'kingcomposer' ),
						'admin_label'	=> true
					),
					array(
						'type'			=> 'dropdown',
						'label'			=> __( 'Timer Style', 'kingcomposer' ),
						'name'			=> 'timer_style',
						'options'		=> array(
							'1' => __( 'Digit and Unit Side by Side', 'kingcomposer' ),
							'2' => __( 'Digit and Unit Up and Down', 'kingcomposer' ),
							'3' => __( 'Custom style template', 'kingcomposer' )
						),
						'description'	=> __( 'Select presentation style of the countdown timer.', 'kingcomposer' ),
					),
					array(
						'type'			=> 'textarea',
						'label'			=> __( 'Custom template', 'kingcomposer' ),
						'name'			=> 'custom_template',
						'description'	=> __( "For example: %D days %H:%M:%S.\n --- %Y: \"years\", %m: \"months\", %n: \"daysToMonth\", %w: \"weeks\", %d: \"daysToWeek\", %D: \"totalDays\", %H: \"hours\", %M: \"minutes\", %S: \"seconds\"", 'kingcomposer' ),
						'relation'	=> array(
							'parent'	=> 'timer_style',
							'show_when'	=> '3'
						)
					),
					array(
						'type'			=> 'date_picker',
						'label'			=> __( 'Date time', 'kingcomposer' ),
						'name'			=> 'datetime',
						'description'	=> __( 'Target date For Countdown.', 'kingcomposer' ),
						'admin_label'	=> true
					),

					array(
						'type'			=> 'text',
						'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
						'name'			=> 'wrap_class',
						'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
					),
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Number' => array(
									array('property' => 'color', 'label' => 'Color', 'value' => '#FFFFFF', 'selector' => '.timer'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.timer'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.timer'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.timer'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.timer'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.timer'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow', 'selector' => '.timer'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.timer'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.timer'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.timer'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.timer')
								),
								'Unit' => array(
									array('property' => 'color', 'label' => 'Number Color', 'value' => '#FFFFFF', 'selector' => '.unit'),
									array('property' => 'background-color', 'label' => 'Backgroud Color', 'selector' => '.unit'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.unit'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.unit'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.unit'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.unit'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.unit'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.unit'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.unit')
								),
								'Group'=> array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.group'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.group'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.group'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.group'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.group'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.group'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.group'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.group')
								),
								'Box'=> array(
									array('property' => 'background', 'label' => 'Background Color'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.kc-countdown-timer'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow', 'selector' => '.kc-countdown-timer'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'padding', 'label' => 'padding'),
									array('property' => 'margin', 'label' => 'Margin')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),

			)
		),

		'kc_divider' => array(
			'name'			=> __( 'Divider', 'kingcomposer' ),
			'title'			=> 'Divider Settings',
			'icon'			=> 'kc-icon-divider',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'description'	=> __( 'List of horizontal divider line', 'kingcomposer' ),
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_divider.php',
			'params'		=> array(
				'general'	=> array(
					array(
						'type'			=> 'select',
						'name'			=> 'style',
						'admin_label'	=> true,
						'label'			=> __( 'Select Style', 'kingcomposer' ),
						'description'	=> __( 'Style of divider', 'kingcomposer' ),
						'value'			=> '1',
						'options'		=> array(
							'1'	=> 'Line Simple',
							'2'	=> 'Line With Icon',
							'3'	=> 'Line With Text'
						)
					),
					array(
						'type'			=> 'icon_picker',
						'name'			=> 'icon',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'description'	=> __( 'Select icon on divider', 'kingcomposer' ),
						'value'			=> 'sl-heart',
						'relation'		=> array(
							'parent'	=> 'style',
							'show_when'	=> array('2')
						)
					),
					array(
						'type'			=> 'text',
						'name'			=> 'line_text',
						'label'			=> __( 'Text Line', 'kingcomposer' ),
						'description'	=> __( 'Text display center line.', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'style',
							'show_when'	=> array('3')
						)
					),
					array(
						'type'			=> 'text',
						'name'			=> 'class',
						'label'			=> __( 'Class', 'kingcomposer' ),
						'description'	=> __( 'Extra CSS class', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Line' => array(
									array('property' => 'border-color', 'label' => 'Line Color', 'selector' => '.divider_inner'),
									array('property' => 'border-style', 'label' => 'Divider Style', 'value' => 'solid', 'selector' => '.divider_inner'),
									array('property' => 'width', 'label' => 'Width Line', 'selector' => '.divider_inner'),
									array('property' => 'border-width', 'label' => 'Height Line', 'selector' => '.divider_inner'),
									array('property' => 'text-align', 'label' => 'Text Align'),
									array('property' => 'margin', 'label' => 'Spacing'),
								),
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => 'i'),
									array('property' => 'width', 'label' => 'Width', 'selector' => 'i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => 'i'),
									array('property' => 'font-size', 'label' => 'Size', 'selector' => 'i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => 'i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'i'),
								),
								'Text' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.line_text'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.line_text'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.line_text'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.line_text'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.line_text'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.line_text'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.line_text'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.line_text'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.line_text'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.line_text'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.line_text'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_box_alert'	=> array(
			'name'			=> __( 'Boxes Alert', 'kingcomposer' ),
			'title'			=> 'Boxes Alert Settings',
			'icon'			=> 'kc-icon-box-alert',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'description'	=> __( 'Display box alert for message', 'kingcomposer' ),
			'tab_icons'		=> array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'textarea',
						'name'			=> 'title',
						'label'			=> __( 'Text in Boxes', 'kingcomposer' ),
						'description'	=> __( 'Insert text display in boxes', 'kingcomposer' ),
						'value'			=> base64_encode( __( 'This is sample text for box alert.', 'kingcomposer') )
					),
					array(
						'type'			=> 'icon_picker',
						'name'			=> 'icon',
						'value'			=> 'fa-leaf',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'description'	=> __( 'Select icon on divider', 'kingcomposer' )
					),
					array(
						'type'			=> 'toggle',
						'name'			=> 'show_button',
						'label'			=> __( 'Show Button', 'kingcomposer' ),
						'description'	=> __('Show/Hide button click hidden boxes.', 'kingcomposer'),
					),
					array(
						'type'			=> 'text',
						'name'			=> 'class',
						'label'			=> __( 'Class', 'kingcomposer' ),
						'description'	=> __( 'Extra CSS class', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Text' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.message-box-wrap'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.message-box-wrap'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.message-box-wrap'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.message-box-wrap'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.message-box-wrap'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.message-box-wrap'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.message-box-wrap')
								),
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.message-box-wrap i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.message-box-wrap i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.message-box-wrap i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.message-box-wrap i'),
								),
								'Boxes' => array(
									array('property' => 'background', 'label' => 'Background', 'selector' => '.message-box-wrap'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.message-box-wrap'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.message-box-wrap'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.message-box-wrap'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.message-box-wrap'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_feature_box' => array(
			'name'			=> __( 'Feature Box', 'kingcomposer' ),
			'title'			=> 'Feature Box Settings',
			'icon'			=> 'kc-icon-feature-box',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_feature_box.php',
			'description'	=> __( 'Display feature boxes styles.', 'kingcomposer' ),
			'params'		=> array(
				'general'	=> array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/feature_box/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/feature_box/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/feature_box/layout-3.png',
							'4'	=> KC_URL . '/assets/frontend/images/feature_box/layout-4.png',
							'5'	=> KC_URL . '/assets/frontend/images/feature_box/layout-5.png'
						),
						'value'			=> '1'
					),
					array(
						'type'			=> 'text',
						'name'			=> 'title',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'value'			=> 'Text Title',
						'admin_label'	=> true
					),
					array(
						'name'		=> 'position',
						'label'		=> __( 'Sub Title', 'kingcomposer' ),
						'type'		=> 'text',
						'value'		=> 'WordPress',
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '4','5' )
						)
					),
					array(
						'type'	=> 'textarea',
						'name'	=> 'desc',
						'label'	=> __( 'Description', 'kingcomposer' ),
						'value'	=> base64_encode('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
					),
					array(
						'name'		=> 'image',
						'label'		=> __( 'Upload Image', 'kingcomposer' ),
						'type'		=> 'attach_image',
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '2','4' )
						)
					),
					array(
						'name'			=> 'icon',
						'label'			=> __( 'Select Icon', 'kingcomposer' ),
						'type'			=> 'icon_picker',
						'description'	=> __( 'Select icon display in box', 'kingcomposer' ),
						'value'			=> 'et-envelope',
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1','3' )
						)
					),
					array(
						'name'		=> 'show_button',
						'label'		=> __( 'Display Button', 'kingcomposer' ),
						'type'		=> 'toggle',
						'value'		=> 'yes',
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1','2','4','5' )
						)
					),
					array(
						'name'		=> 'button_text',
						'label'		=> __( 'Text Button', 'kingcomposer' ),
						'type'		=> 'text',
						'value'		=> 'Read more',
						'relation'	=> array(
							'parent'	=> 'show_button',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'		=> 'button_link',
						'label'		=> __( 'Link Button', 'kingcomposer' ),
						'type'		=> 'link',
						'value'		=> '#',
						'relation'	=> array(
							'parent'	=> 'show_button',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling'	=> array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-title'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+:hover .content-title'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-title'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-title'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-title'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-title'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-title'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-title'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-title'),
								),
								'SubTitle' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-position'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+:hover .content-position'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-position'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-position'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-position'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-position'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-position'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-position'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-position'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-position'),
								),
								'Desc' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-desc'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+:hover .content-desc'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-desc'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-desc'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-desc'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-desc'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-desc'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-desc'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-desc'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-desc'),
								),
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-icon i'),
									array('property' => 'color', 'label' => 'Hover Color', 'selector' => '+:hover .content-icon i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-icon i'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '+:hover .content-icon i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-icon i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.content-icon i'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.content-icon i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-icon i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-icon i'),
									array('property' => 'border-color', 'label' => 'Hover Border', 'selector' => '+:hover .content-icon i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-icon i'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector' => '+:hover .content-icon i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-icon i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-icon i')
								),
								'Image' => array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-image img'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.content-image'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-image img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-image img'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-image img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-image img'),
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Button Color', 'selector' => '.content-button a'),
									array('property' => 'color', 'label' => 'Button Hover Color', 'selector' => '.content-button a:hover'),
									array('property' => 'background-color', 'label' => 'Button BG Color', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'Button BG Hover Color', 'selector' => '.content-button a:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-button a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-button a'),
									array('property' => 'border', 'label' => 'Button Border', 'selector' => '.content-button a'),
									array('property' => 'border-color', 'label' => 'Button Border Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-button a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-button a')
								),
								'Boxes' => array(
									array('property' => 'background'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '+:hover'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow Hover', 'selector' => '+:hover'),
									array('property' => 'text-align', 'label' => 'Text Align'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '+:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector' => '+:hover'),
									array('property' => 'margin', 'label' => 'Position Hover', 'selector' => '+:hover'),
									array('property' => 'margin', 'label' => 'Margin'),
									array('property' => 'padding', 'label' => 'Padding'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_testimonial' => array(
			'name'			=> __( 'Testimonial', 'kingcomposer' ),
			'title'			=> 'Testimonial Settings',
			'icon'			=> 'kc-icon-testi',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor' => $live_tmpl.'kc_testimonial.php',
			'description'	=> __( 'Display testimonials styles.', 'kingcomposer' ),
			'params'		=> array(
				'general'	=> array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/testimonial/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/testimonial/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/testimonial/layout-3.png',
							'4'	=> KC_URL . '/assets/frontend/images/testimonial/layout-4.png',
							'5'	=> KC_URL . '/assets/frontend/images/testimonial/layout-5.png'
						),
						'value'			=> '1'
					),
					array(
						'type'			=> 'text',
						'name'			=> 'title',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'value'			=> 'Text Title',
						'admin_label'	=> true
					),
					array(
						'name'	=> 'position',
						'label'	=> __( 'Position', 'kingcomposer' ),
						'type'	=> 'text',
						'value'	=> 'Lead Manager'
					),
					array(
						'type'	=> 'textarea',
						'name'	=> 'desc',
						'label'	=> __( 'Description', 'kingcomposer' ),
						'value'	=> base64_encode('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
					),
					array(
						'name'		=> 'image',
						'label'		=> __( 'Upload Image', 'kingcomposer' ),
						'type'		=> 'attach_image',
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1','3','4','5' )
						)
					),
					array(
						'type'			=> 'select',
						'label'			=> __( 'Image Size', 'kingcomposer' ),
						'name'			=> 'img_size',
						'value'			=> 'full',
						'description'	=> __('Set the image size: "full", "thumbnail", "medium", "large" or other size ', 'kingcomposer'),
						'options'		=> array(
							'full' 		 => __( 'Full Size', 'kingcomposer' ),
							'120x120xct' => __( 'Size 120x120', 'kingcomposer' ),
							'220x220xct' => __( 'Size 220x220', 'kingcomposer' ),
							'400x400xct' => __( 'Size 400x400', 'kingcomposer' )
						),
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1','3','4','5' )
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling'	=> array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-title'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-title'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-title'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-title'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-title'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-title'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-title'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-title'),
								),
								'Subtitle' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-position'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-position'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-position'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-position'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-position'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-position'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-position'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-position'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-position'),
								),
								'Desc' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-desc'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-desc'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-desc'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-desc'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-desc'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-desc'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-desc'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-desc'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-desc'),
								),
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-icon i'),
									array('property' => 'color', 'label' => 'Hover Color', 'selector' => '.content-icon:hover i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-icon i'),
									array('property' => 'background-color', 'label' => 'Hover BG Color', 'selector' => '.content-icon:hover i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-icon i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-icon i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-icon i'),
									array('property' => 'border-color', 'label' => 'Hover Border', 'selector' => '.content-icon:hover i'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-icon i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-icon i'),
								),
								'Image' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-image img'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-image img'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.content-image'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-image img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-image img'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-image img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-image img'),
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Button Color', 'selector' => '.content-button a'),
									array('property' => 'color', 'label' => 'Button Hover Color', 'selector' => 'content-button:hover a'),
									array('property' => 'background-color', 'label' => 'Button BG Color', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'Button BG Hover Color', 'selector' => 'content-button:hover a'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-button a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-button a'),
									array('property' => 'border', 'label' => 'Button Border', 'selector' => '.content-button a'),
									array('property' => 'border-color', 'label' => 'Button Border Color Hover', 'selector' => 'content-button:hover a'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-button a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-button a')
								),
								'Boxes' => array(
									array('property' => 'background'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '+:hover'),
									array('property' => 'text-align', 'label' => 'Text Align'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '+:hover'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow Hover', 'selector' => '+:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector' => '+:hover'),
									array('property' => 'margin', 'label' => 'Position Hover', 'selector' => '+:hover'),
									array('property' => 'padding', 'label' => 'Padding'),
									array('property' => 'margin', 'label' => 'Margin'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_team'	=> array(
			'name'			=> __( 'Team', 'kingcomposer' ),
			'title'			=> 'Team Settings',
			'icon'			=> 'kc-icon-team',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'socials'	=> 'sl-link',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
	        'live_editor' => $live_tmpl.'kc_team.php',
			'description'	=> __( 'Display teams layout style.', 'kingcomposer' ),
			'params'		=> array(
				'general'	=> array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/team/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/team/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/team/layout-3.png'
						),
						'value'			=> '1'
					),
					array(
						'name'	=> 'image',
						'label'	=> __( 'Avatar Image', 'kingcomposer' ),
						'type'	=> 'attach_image'
					),
					array(
						'type'			=> 'select',
						'label'			=> __( 'Image Size', 'kingcomposer' ),
						'name'			=> 'img_size',
						'value'			=> 'full',
						'description'   => __('Set the image size: "full", "thumbnail", "medium", "large" or other size ', 'kingcomposer'),
						'options'		=> array(
							'full' => 'Full Size',
							'thumbnail' => 'Thumbnail',
							'medium' => 'Medium',
							'large' => 'Large',
							'120x120xct' => __( 'Size 120x120', 'kingcomposer' ),
							'220x220xct' => __( 'Size 220x220', 'kingcomposer' ),
							'400x400xct' => __( 'Size 400x400', 'kingcomposer' )
						)
					),
					array(
						'type'			=> 'text',
						'name'			=> 'title',
						'label'			=> __( 'Name', 'kingcomposer' ),
						'value'			=> 'Your Name',
						'admin_label'	=> true
					),
					array(
						'name'		=> 'subtitle',
						'label'		=> __( 'Subtitle', 'kingcomposer' ),
						'type'		=> 'text',
						'value'		=> 'Manager'
					),
					array(
						'type'	=> 'textarea',
						'name'	=> 'desc',
						'label'	=> __( 'Description', 'kingcomposer' ),
						'value'	=> base64_encode('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
					),
					array(
						'name'	=> 'show_button',
						'label'	=> __( 'Display Button', 'kingcomposer' ),
						'type'	=> 'toggle',
						'value'	=> 'yes',
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1', '3' )
						)
					),
					array(
						'name'		=> 'button_text',
						'label'		=> __( 'Text Button', 'kingcomposer' ),
						'type'		=> 'text',
						'value'		=> __( 'Read More', 'kingcomposer' ),
						'relation'	=> array(
							'parent'	=> 'show_button',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'		=> 'button_link',
						'label'		=> __( 'Link Button', 'kingcomposer' ),
						'type'		=> 'link',
						'value'		=> '#',
						'relation'	=> array(
							'parent'	=> 'show_button',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'socials'   => array(
					array(
						'name'			=> 'facebook',
						'label'			=> __( 'Facebook Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '#',
						'description'	=> __( 'Insert link facebook. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'twitter',
						'label'			=> __( 'Twitter Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '#',
						'description'	=> __( 'Insert link twitter. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'google_plus',
						'label'			=> __( 'Google Plus Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '#',
						'description'	=> __( 'Insert link google plus. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'linkedin',
						'label'			=> __( 'Linkedin Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link linkedin. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'pinterest',
						'label'			=> __( 'Pinterest Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link pinterest. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'flickr',
						'label'			=> __( 'Flickr Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link flickr. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'instagram',
						'label'			=> __( 'Instagram Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link instagram. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'dribbble',
						'label'			=> __( 'Dribbble Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link dribbble. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'reddit',
						'label'			=> __( 'Reddit Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link reddit. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'			=> 'email',
						'label'			=> __( 'Email Link', 'kingcomposer' ),
						'type'			=> 'text',
						'value'			=> '',
						'description'	=> __( 'Insert link email. It hidden when field blank.', 'domain' ),
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
				),
				'styling'	=> array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Title'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-title'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-title'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-title'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-title'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-title'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-title'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-title'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-title'),
								),
								'Subtitle'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-subtitle'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-subtitle'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-subtitle'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-subtitle'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-subtitle'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-subtitle'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-subtitle'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-subtitle'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-subtitle'),
								),
								'Desc'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-desc'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-desc'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-desc'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-desc'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-desc'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-desc'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-desc'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-desc'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-desc'),
								),
								'Image'	=> array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-image img'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-image img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-image img'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-image img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-image img'),
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Button Color', 'selector' => '.content-button a'),
									array('property' => 'color', 'label' => 'Button Hover Color', 'selector' => '.content-button:hover a'),
									array('property' => 'background-color', 'label' => 'Button BG Color', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'Button BG Hover Color', 'selector' => '.content-button:hover a'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-button a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-button a'),
									array('property' => 'border', 'label' => 'Button Border', 'selector' => '.content-button a'),
									array('property' => 'border-color', 'label' => 'Button Border Color Hover', 'selector' => '.content-button:hover a'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-button a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-button a')
								),
								'Social'	=> array(
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.content-socials a i'),
									array('property' => 'color', 'label' => 'Icon Color Hover', 'selector' => '.content-socials a:hover i'),
									array('property' => 'background-color', 'selector' => '.content-socials a'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '.content-socials a:hover'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-socials a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-socials a'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.content-socials a'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.content-socials a'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-socials a'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '.content-socials a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-socials a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-socials a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-socials a'),
								),
								'Box'	=> array(
									array('property' => 'background'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '+:hover'),
									array('property' => 'text-align', 'label' => 'Box Align'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-color', 'label' => 'Border Color Hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow', 'selector' => '+.kc-team'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow Hover', 'selector' => '+.kc-team:hover'),
									array('property' => 'margin', 'label' => 'Margin'),
									array('property' => 'padding', 'label' => 'Padding'),
									array('property' => 'margin', 'label' => 'Position Hover', 'selector' => '+.kc-team:hover')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_pricing'	=> array(
			'name'			=> __( 'Pricing', 'kingcomposer' ),
			'title'			=> 'Pricing Settings',
			'icon'			=> 'kc-icon-pricing',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
	        'live_editor' => $live_tmpl.'kc_pricing.php',
			'description'	=> __( 'Display pricing tables layout style.', 'kingcomposer' ),
			'params'		=> array(
				'general'	=> array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/pricing/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/pricing/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/pricing/layout-3.png',
							'4'	=> KC_URL . '/assets/frontend/images/pricing/layout-4.png'
						),
						'value'			=> '1'
					),
					array(
						'name'		=> 'show_icon_header',
						'label'		=> __( 'Show Icon Header', 'kingcomposer' ),
						'type'		=> 'toggle',
						'value'		=> 'yes',
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1', '4' )
						)
					),
					array(
						'name'			=> 'icon_header',
						'label'			=> __( 'Icon Header', 'kingcomposer' ),
						'type'			=> 'icon_picker',
						'value'			=> 'sl-cloud-upload',
						'relation'		=> array(
							'parent'	=> 'show_icon_header',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'name'			=> 'title',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'value'			=> 'Text Title',
						'admin_label'	=> true
					),
					array(
						'type'			=> 'text',
						'name'			=> 'subtitle',
						'label'			=> __( 'Sub Title', 'kingcomposer' ),
						'value'			=> ''
					),
					array(
						'name'	=> 'price',
						'label'	=> __( 'Price', 'kingcomposer' ),
						'type'	=> 'text',
						'value'	=> '99'
					),
					array(
						'name'	=> 'currency',
						'label'	=> __( 'Currency', 'kingcomposer' ),
						'type'	=> 'text',
						'value'	=> '$'
					),
					array(
						'name'			=> 'show_on_top',
						'label'			=> __( 'Price Format', 'kingcomposer' ),
						'description'	=> __( 'Price format default <b>$99</b>.<br> When turn on price format <b>99$</b>', 'kingcomposer' ),
						'type'			=> 'toggle',
						'value'			=> 'no'
					),
					array(
						'name'	=> 'duration',
						'label'	=> __( 'Per', 'kingcomposer' ),
						'type'	=> 'text',
						'value'	=> '/month'
					),
					array(
						'type'			=> 'textarea',
						'name'			=> 'desc',
						'label'			=> __( 'Attributes', 'kingcomposer' ),
						'description'	=> __( 'Insert tag &lt;strong&gt; when you want highlight text.<br> Example: &lt;strong&gt;<strong>24/7</strong>&lt;/strong&gt; Support', 'kingcomposer' ),
						'value'			=> base64_encode("Unlimited Web Space \nFREE Site Building Tools \nFREE Domain Registar \n24/7/365 Support \nFREE Marketing & SEO Tools \n99.9% Service Uptime \n30 Day Money Back Guarantee")
					),
					array(
						'name'	=> 'show_button',
						'label'	=> __( 'Display Button', 'kingcomposer' ),
						'type'	=> 'toggle',
						'value'	=> 'yes'
					),
					array(
						'name'		=> 'button_text',
						'label'		=> __( 'Text Button', 'kingcomposer' ),
						'type'		=> 'text',
						'value'		=> 'Purchase',
						'relation'	=> array(
							'parent'	=> 'show_button',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'		=> 'button_link',
						'label'		=> __( 'Link Button', 'kingcomposer' ),
						'type'		=> 'link',
						'value'		=> '#',
						'relation'	=> array(
							'parent'	=> 'show_button',
							'show_when'	=> 'yes'
						)
					),
					array(
						'name'	=> 'show_icon',
						'label'	=> __( 'Show Icon Attributes', 'kingcomposer' ),
						'type'	=> 'toggle',
						'value'	=> 'no'
					),
					array(
						'name'			=> 'icon',
						'label'			=> __( 'Icon Attributes', 'kingcomposer' ),
						'type'			=> 'icon_picker',
						'value'			=> 'fa-check',
						'relation'		=> array(
							'parent'	=> 'show_icon',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling'	=> array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Title'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-title'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+:hover .header-pricing .content-title,+:hover .content-title'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-title'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-title'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-title'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-title'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-title'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-title'),
									array('property' => 'background-color', 'label' => 'Bg Color', 'selector' => '.content-title'),
									array('property' => 'background-color', 'label' => 'Bg Color Hover', 'selector' => '+.kc-pricing-tables:hover .content-title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-title'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-title'),
								),
								'SubTitle'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-sub-title'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+:hover .header-pricing .content-sub-title,+:hover .content-sub-title'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-sub-title'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-sub-title'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-sub-title'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-sub-title'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-sub-title'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-sub-title'),
									array('property' => 'background-color', 'label' => 'Bg Color', 'selector' => '.content-sub-title'),
									array('property' => 'background-color', 'label' => 'Bg Color Hover', 'selector' => '+.kc-pricing-tables:hover .content-sub-title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-sub-title'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-sub-title'),
								),
								'Price'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-price'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+.kc-pricing-tables:hover .content-price'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-price'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-price'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-price'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.header-pricing .kc-pricing-price'),
									array('property' => 'background-color', 'label' => 'Wrapper Bg Price', 'selector' => '.kc-pricing-price'),
									array('property' => 'background-color', 'label' => 'Wrapper Bg Price Hover', 'selector' => '+.kc-pricing-tables:hover .kc-pricing-price'),
									array('property' => 'border', 'label' => 'Wrapper Border', 'selector' => '+.kc-pricing-tables .kc-pricing-price'),
									array('property' => 'border-color', 'label' => 'Wrapper Border Hover', 'selector' => '+.kc-pricing-tables:hover .kc-pricing-price'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-price'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-price'),
									array('property' => 'padding', 'label' => 'Wrapper padding', 'selector' => '.kc-pricing-price'),
								),
								'Currency'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-currency'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+.kc-pricing-tables:hover .content-currency'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-currency'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-currency'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-currency'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-currency'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-currency'),
								),
								'Per'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+.kc-pricing-tables:hover .kc-pricing-price span.content-duration'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-pricing-price span.content-duration'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-pricing-price span.content-duration'),
								),
								'Attributes'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-desc li'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '+:hover .content-desc li'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-desc'),
									array('property' => 'background-color', 'label' => 'Background Color 2', 'des' => 'Background color line highlight', 'selector' => '.content-desc li:nth-of-type(2n+1)'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-desc li'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-desc li'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-desc li'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-desc li'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-desc li'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-desc li'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-desc li'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-desc li'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-desc li:last-child,.content-desc li:first-child'),
									array('property' => 'margin', 'label' => 'Icon Spacing', 'selector' => '.content-desc li i'),
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Button Color', 'selector' => '.content-button a'),
									array('property' => 'color', 'label' => 'Button Hover Color', 'selector' => '.content-button a:hover'),
									array('property' => 'background-color', 'label' => 'Button BG Color', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'Button BG Hover Color', 'selector' => '.content-button a:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-button a'),
									array('property' => 'text-align', 'label' => 'Button Align', 'selector' => '.content-button'),
									array('property' => 'border', 'label' => 'Button Border', 'selector' => '.content-button a'),
									array('property' => 'border-color', 'label' => 'Button Border Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'Wrapper Button BG Color', 'selector' => '.content-button'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-button a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-button a'),
								),
								'Icon'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-icon-header i'),
									array('property' => 'color', 'label' => 'Hover Color', 'selector' => '+.kc-pricing-tables:hover .content-icon-header i'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-icon-header i'),
									array('property' => 'background-color', 'label' => 'Hover BG Color', 'selector' => '+.kc-pricing-tables:hover .content-icon-header i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-icon-header i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-icon-header i'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.content-icon-header i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.content-icon-header i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-icon-header i'),
									array('property' => 'border-color', 'label' => 'Hover Border', 'selector' => '+.kc-pricing-tables:hover .content-icon-header i'),
									array('property' => 'background-color', 'label' => 'Wrapper Bg', 'selector' => '+.kc-pricing-tables .content-icon-header'),
									array('property' => 'background-color', 'label' => 'Wrapper Bg Hover', 'selector' => '+.kc-pricing-tables:hover .content-icon-header'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-icon-header i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-icon-header i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-icon-header i'),
								),
								'Boxes'	=> array(
									array('property' => 'background'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '+:hover'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow', 'selector' => '+.kc-pricing-tables'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow Hover', 'selector' => '+:hover'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '+.kc-pricing-tables:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector' => '+:hover'),
									array('property' => 'margin', 'label' => 'Position Hover', 'selector' => '+:hover'),
									array('property' => 'margin', 'label' => 'Margin'),
									array('property' => 'padding', 'label' => 'Padding'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_dropcaps'	=> array(
			'name'			=> __( 'Dropcaps', 'kingcomposer' ),
			'title'			=> 'Dropcaps Settings',
			'icon'			=> 'kc-icon-dropcaps',
			'category'		=> 'Content',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_dropcaps.php',
			'description'	=> __( 'Display dropcaps styles.', 'kingcomposer' ),
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'editor',
						'name'			=> 'desc',
						'label'			=> __( 'Text Paragraph', 'kingcomposer' ),
						'value'			=> base64_encode('<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>'),
						'admin_label'	=> true,
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Dropcaps'	=> array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.dropcaps-text'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.dropcaps-text'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.dropcaps-text'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.dropcaps-text'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.dropcaps-text'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.dropcaps-text'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.dropcaps-text'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.dropcaps-text'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.dropcaps-text'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.dropcaps-text'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.dropcaps-text'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.dropcaps-text'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.dropcaps-text')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_image_fadein'	=> array(
			'name'			=> __('Image FadeIn Slider', 'kingcomposer'),
			'description'	=> __('', 'kingcomposer'),
			'category'		=> 'Medias',
			'icon'			=> 'kc-icon-image-fade',
			'live_editor'	=> $live_tmpl.'kc_image_fadein.php',
			'params'		=> array(
				array(
					'type'			=> 'text',
					'label'			=> __( 'Title', 'kingcomposer' ),
					'name'			=> 'title',
					'description'	=> __( 'The title of the Image Gallery. Leave blank if no title is needed.', 'kingcomposer' ),
					'admin_label'	=> true
				),
				array(
					'type'			=> 'attach_images',
					'label'			=> __( 'Images', 'kingcomposer' ),
					'name'			=> 'images',
					'description'	=> __( 'Upload multiple image to the carousel with the SHIFT key holding.', 'kingcomposer' ),
					'admin_label'	=> true
				),
				array(
					'type'			=> 'select',
					'label'			=> __( 'Effect Speed', 'kingcomposer' ),
					'name'			=> 'transition',
					'options'		=> array(
						''		=> 'Normal',
						'fast'	=> 'Fast',
						'slow'	=> 'Slow',
					)
				),
				array(
					'type'			=> 'number_slider',
					'label'			=> __( 'Rotate delay time', 'kingcomposer' ),
					'name'			=> 'delay',
					'description'	=> __( 'Rotate time each slide. For example 5000 (minisecond)', 'kingcomposer' ),
					'admin_label'	=> true,
					'value' 		=> '3000',
					'options' 		=> array(
						'min' => 1000,
						'max' => 8000,
						'show_input' => true
					)
				),
				array(
					'type'			=> 'toggle',
					'label'			=> __( 'Force size?', 'kingcomposer' ),
					'name'			=> 'force_size',
					'description'	=> __( 'Set with and height for all images', 'kingcomposer' ),
				),
				array(
					'type'			=> 'text',
					'label'			=> __( 'Width', 'kingcomposer' ),
					'name'			=> 'width',
					'value'			=> 250,
					'description'	=> __( 'Width of slides in px', 'kingcomposer' ),
					'relation'		=> array(
						'parent'	=> 'force_size',
						'show_when'	=> 'yes'
					)
				),
				array(
					'type'			=> 'text',
					'label'			=> __( 'Height', 'kingcomposer' ),
					'name'			=> 'height',
					'value'			=> 250,
					'description'	=> __( 'Height of slides in px', 'kingcomposer' ),
					'relation'		=> array(
						'parent'	=> 'force_size',
						'show_when'	=> 'yes'
					)
				),
				array(
					'type'			=> 'select',
					'label'			=> __( 'Position cutting', 'kingcomposer' ),
					'name'			=> 'position',
					'options'		=> array(
						'c' => 'Center Center',
						'ct' => 'Center Top',
						'cl' => 'Center Left',
						'cr' => 'Center Right',
						'cb' => 'Center Bottom',
					),
					'relation'		=> array(
						'parent'	=> 'force_size',
						'show_when'	=> 'yes'
					),
					'description'	=> __( 'Select position to cut', 'kingcomposer' ),
				),
				array(
					'type'			=> 'text',
					'label'			=> __( 'Wrapper class name', 'kingcomposer' ),
					'name'			=> 'wrap_class',
					'description'	=> __( 'Custom class for wrapper of the shortcode widget.', 'kingcomposer' ),
				)
			)
		),

		'kc_image_hover_effects'	=> array(
			'name'			=> __( 'Image Hover Effects', 'kingcomposer' ),
			'title'			=> 'Image Hover Effects Settings',
			'icon'			=> 'kc-icon-image-hover',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_image_hover_effects.php',
			'description'	=> __( 'Display image background, title and button link.', 'kingcomposer' ),
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/banner/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/banner/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/banner/layout-3.png',
							'4'	=> KC_URL . '/assets/frontend/images/banner/layout-4.png',
							'5'	=> KC_URL . '/assets/frontend/images/banner/layout-5.png'
						),
						'value'			=> '1'
					),
					array(
						'name'	=> 'image',
						'label'	=> __( 'Upload Image', 'kingcomposer' ),
						'type'	=> 'attach_image',
					),
					array(
						'type'		=> 'select',
						'label'		=> __( 'Image Size', 'kingcomposer' ),
						'name'		=> 'img_size',
						'options'	=> array(
							'full'			=> __( 'Full Size', 'kingcomposer' ),
							'1170x700xct'	=> __( 'Size X-Large', 'kingcomposer' ),
							'1024x1024xct'	=> __( 'Size Large', 'kingcomposer' ),
							'300x300xct'	=> __( 'Size Medium', 'kingcomposer' ),
						),
						'value'		=> 'full'
					),
					array(
						'type'		=> 'select',
						'label'		=> __( 'Onclick Event', 'kingcomposer' ),
						'name'		=> 'event_click',
						'options'	=> array(
							'none'			=> __( '--None--', 'kingcomposer' ),
							'lightbox'		=> __( 'Lightbox', 'kingcomposer' ),
							'custom_link'	=> __( 'Custom Link', 'kingcomposer' )
						),
						'value'		=> 'lightbox',
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1', '2', '3', '5' )
						)
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'Custom Link', 'kingcomposer' ),
						'name'			=> 'custom_link',
						'description'	=> __( 'Add link to image.', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'event_click',
							'show_when'	=> 'custom_link'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'admin_label'	=> true,
						'description'	=> __( 'Enter title for form.', 'kingcomposer' ),
						'value'			=> 'KingComposer',
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '1', '2', '3', '4' )
						)
					),
					array(
						'type'	=> 'textarea',
						'name'	=> 'desc',
						'label'	=> __( 'Description', 'kingcomposer' ),
						'value'	=> base64_encode('Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '2', '3', '4' )
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Button Text', 'kingcomposer' ),
						'name'			=> 'button_text',
						'description'	=> __( 'Enter text button.', 'kingcomposer' ),
						'value'			=> 'Start Now',
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '4' )
						)
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'Button URL (Link)', 'kingcomposer' ),
						'name'			=> 'button_link',
						'description'	=> __( 'Add link to button.', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '4' )
						)
					),
					array(
						'name'			=> 'icon',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'type'			=> 'icon_picker',
						'admin_label'	=> true,
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> '5'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling'	=> array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-title'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-title'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-title'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-title'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-title'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-title'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-title'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-title'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-title')
								),
								'Desc' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-desc'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-desc'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-desc'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-desc'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-desc'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-desc'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-desc'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-desc'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-desc')
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.content-button a'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-button a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-button a'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.content-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-button a'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-button a'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-button a'),
									array('property' => 'margin', 'label' => 'Margin Button', 'selector' => '.content-button a')
								),
								'Image' => array(
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => 'img'),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'img'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'img'),
								),
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'i'),
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => 'i'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => 'i:hover'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => 'i:hover'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => 'i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => 'i'),
									array('property' => 'height', 'label' => 'Height', 'selector' => 'i'),
									array('property' => 'width', 'label' => 'Line Height', 'selector' => 'i'),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'i'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => 'i:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'i'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'i'),
								),
								'Overlay' => array(
									array('property' => 'background-color', 'label' => 'Background', 'selector' => '.overlay-effects'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.overlay-effects'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.overlay-effects'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.overlay-effects')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_creative_button'	=> array(
			'name'			=> __( 'Creative Button', 'kingcomposer' ),
			'title'			=> 'Creative Button Settings',
			'icon'			=> 'kc-icon-creative-button',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_creative_button.php',
			'description'	=> __( 'Display creative button styles.', 'kingcomposer' ),
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'select',
						'label'			=> __( 'Button Style', 'kingcomposer' ),
						'name'			=> 'style',
						'admin_label'	=> true,
						'options'		=> array(
							'main'	=> __( 'Default', 'kingcomposer' ),
							'1'		=> __( 'Style 1', 'kingcomposer' ),
							'2'		=> __( 'Style 2', 'kingcomposer' ),
							'3'		=> __( 'Style 3', 'kingcomposer' ),
							'4'		=> __( 'Style 4', 'kingcomposer' ),
							'5'		=> __( 'Style 5', 'kingcomposer' ),
							'6'		=> __( 'Style 6', 'kingcomposer' ),
							'7'		=> __( 'Style 7', 'kingcomposer' ),
							'8'		=> __( 'Style 8', 'kingcomposer' ),
							'9'		=> __( 'Style 9', 'kingcomposer' ),
							'10'	=> __( 'Style 10', 'kingcomposer' )
						),
						'value'			=> 'main'
					),
					array(
						'type'			=> 'text',
						'name'			=> 'title',
						'label'			=> __( 'Title Button', 'kingcomposer' ),
						'value'			=> 'Button Text',
						'admin_label'	=> true
					),
					array(
						'type'	=> 'toggle',
						'label'	=> __( 'Display Icon', 'kingcomposer' ),
						'name'	=> 'icon_show',
						'value'	=> 'no'
					),
					array(
						'name'			=> 'icon',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'type'			=> 'icon_picker',
						'description'	=> __( 'Icon in button', 'kingcomposer' ),
						'admin_label'	=> true,
						'relation'		=> array(
							'parent'	=> 'icon_show',
							'show_when'	=> array('yes')
						)
					),
					array(
						'type'		=> 'select',
						'label'		=> __( 'Icon Float', 'kingcomposer' ),
						'name'		=> 'icon_float',
						'options'	=> array(
							'before'	=> __( 'Left', 'kingcomposer' ),
							'after'		=> __( 'Right', 'kingcomposer' )
						),
						'value'		=> 'after',
						'relation'	=> array(
							'parent'	=> 'icon_show',
							'show_when'	=> array('yes')
						)
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'URL (Link)', 'kingcomposer' ),
						'name'			=> 'link',
						'description'	=> __( 'Add link to button (default #).', 'kingcomposer' ),
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Button' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'a'),
									array('property' => 'background', 'selector' => 'a'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => 'a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => 'a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => 'a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => 'a'),
									array('property' => 'text-align', 'label' => 'Button Align'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => 'a'),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'a'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'a'),
									array('property' => 'float', 'label' => 'Float'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'a')
								),
								'Hover Button' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'a:hover'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => 'a:hover'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => 'a:hover'),
									array('property' => 'border', 'label' => 'Border', 'selector' => 'a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'a:hover'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => 'a:hover')
								),
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => 'i'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => 'i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'i')
								),
								'Hover Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'a:hover i'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => 'a:hover i'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => 'a:hover i')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_call_to_action'	=> array(
			'name'			=> __( 'Call To Action', 'kingcomposer' ),
			'title'			=> 'Call To Action Settings',
			'icon'			=> 'kc-icon-call-action',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
            'live_editor'	=> $live_tmpl.'kc_call_to_action.php',
			'description'   => __( 'Display call to action styles.', 'kingcomposer' ),
			'params'        => array(
				'general' => array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'2'	=> KC_URL . '/assets/frontend/images/callto/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/callto/layout-3.png'
						),
						'value'			=> '2'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Title', 'kingcomposer' ),
						'name'			=> 'title',
						'admin_label'	=> true,
						'value'			=> __( 'WordPress Theme', 'domain' ),
						'description'	=> __( 'Enter title for form.', 'kingcomposer' )
					),
					array(
						'type'	=> 'textarea',
						'name'	=> 'desc',
						'label'	=> __( 'Description', 'kingcomposer' ),
						'value'	=> base64_encode('Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Button', 'kingcomposer' ),
						'name'			=> 'button_show',
						'description'	=> __( 'Display button in form.', 'kingcomposer' ),
						'value'			=> 'yes'
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Button Text', 'kingcomposer' ),
						'name'			=> 'button_text',
						'description'	=> __( 'Enter text button.', 'kingcomposer' ),
						'value'			=> 'Start Now',
						'relation'		=> array(
							'parent'	=> 'button_show',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'Button URL (Link)', 'kingcomposer' ),
						'name'			=> 'button_link',
						'description'	=> __( 'Add link to button.', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'button_show',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'toggle',
						'label'			=> __( 'Show Icon', 'kingcomposer' ),
						'name'			=> 'icon_show',
						'description'	=> __( 'Display icon in button. Icon only display when button display.', 'kingcomposer' ),
					),
					array(
						'name'			=> 'icon',
						'type'			=> 'icon_picker',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'description'	=> __( 'The icon display on button', 'kingcomposer' ),
						'value'			=> 'fa-hand-o-right',
						'relation'		=> array(
							'parent'	=> 'icon_show',
							'show_when'	=> 'yes'
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Custom class', 'kingcomposer' ),
						'name'			=> 'custom_class',
						'description'	=> __( 'Enter extra custom class', 'kingcomposer' )
					)
				),
				'styling'	=> array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.kc-cta-desc h2'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-cta-desc h2')
								),
								'Description' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.kc-cta-desc .kc-cta-text'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-cta-desc .kc-cta-text')
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-cta-button a'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc-cta-button a'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-cta-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-cta-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-cta-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-cta-button a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-cta-button a'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.kc-cta-button a'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow', 'selector' => '.kc-cta-button a'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc-cta-button a'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc-cta-button a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-cta-button a'),
									array('property' => 'margin', 'label' => 'Margin Button', 'selector' => '.kc-cta-button a'),
									array('property' => 'margin', 'label' => 'Margin Spacing Icon', 'selector' => '.kc-cta-icon')
								),
								'Button Hover' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-cta-button a:hover'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc-cta-button a:hover'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc-cta-button a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc-cta-button a:hover')
								),
								'Boxes' => array(
									array('property' => 'width', 'label' => 'Width'),
									array('property' => 'background', 'label' => 'Background Color'),
									array('property' => 'text-align', 'label' => 'Text Align'),
									array('property' => 'box-shadow', 'label' => 'Box Shadow'),
									array('property' => 'border', 'label' => 'Border'),
									array('property' => 'border-radius', 'label' => 'Border Radius'),
									array('property' => 'padding', 'label' => 'Padding')
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),

		'kc_tooltip'	=> array(
			'name'			=> __('Popover & Tooltip', 'kingcomposer'),
			'title'			=> 'Popover & Tooltip Settings',
			'icon'			=> 'kc-icon-tooltip',
			'category'		=> 'Content',
			'wrapper_class'	=> 'clearfix',
			'description'	=> __( 'Tooltip for a link button', 'kingcomposer' ),
			'tab_icons'		=> array(
				'general'	=> 'et-tools',
				'styling'	=> 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_tooltip.php',
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/tooltip/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/tooltip/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/tooltip/layout-3.png'
						),
						'value'			=> '1'
					),
					array(
						'type'		=> 'select',
						'name'		=> 'position',
						'label'		=> __( 'Position', 'kingcomposer' ),
						'value'		=> 'top',
						'options'	=> array(
							'top'		=> __('Top', 'kingcomposer'),
							'right'		=> __('Right', 'kingcomposer'),
							'bottom' 	=> __('Bottom', 'kingcomposer'),
							'left'		=> __('Left', 'kingcomposer'),
						)
					),
					array(
						'type'			=> 'icon_picker',
						'name'			=> 'icon',
						'label'			=> __( 'Icon', 'kingcomposer' ),
						'admin_label'	=> true,
						'description'	=> __( 'Select icon', 'kingcomposer' ),
						'value'			=> 'et-clipboard',
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array('1')
						)
					),
					array(
						'type'			=> 'attach_image',
						'name'			=> 'image',
						'label'			=> __( 'Upload Image', 'kingcomposer' ),
						'description'	=> __( 'Upload image', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array('2')
						)
					),
					array(
						'type'			=> 'select',
						'label'			=> __( 'Image Size', 'kingcomposer' ),
						'name'			=> 'img_size',
						'value'			=> 'full',
						'description'	=> __('Set the image size: "full", "thumbnail", "medium", "large" or other size ', 'kingcomposer'),
						'options'		=> array(
							'full' 		 => __( 'Full Size', 'kingcomposer' ),
							'120x120xct' => __( 'Size 120x120', 'kingcomposer' ),
							'320x320xct' => __( 'Size 320x320', 'kingcomposer' ),
							'640x640xct' => __( 'Size 640x640', 'kingcomposer' )
						),
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array( '2' )
						)
					),
					array(
						'type'		=> 'text',
						'name'		=> 'button_text',
						'label'		=> __( 'Text title', 'kingcomposer' ),
						'value'		=> __( 'Read More', 'kingcomposer' ),
						'relation'	=> array(
							'parent'	=> 'layout',
							'show_when'	=> array('3')
						)
					),
					array(
						'type'			=> 'link',
						'label'			=> __( 'URL (Link)', 'kingcomposer' ),
						'name'			=> 'button_link',
						'description'	=> __( 'Add link to button.', 'kingcomposer' ),
						'relation'		=> array(
							'parent'	=> 'layout',
							'show_when'	=> array('3')
						)
					),
					array(
						'type'			=> 'textarea',
						'name'			=> 'text_tooltip',
						'label'			=> __( 'Text tooltip', 'kingcomposer' ),
						'description'	=> __( 'Text for tooltip', 'kingcomposer' ),
						'value'			=> base64_encode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt')
					),
					array(
						'type'			=> 'text',
						'name'			=> 'custom_class',
						'label'			=> __( 'Class', 'kingcomposer' ),
						'description'	=> __( 'Extra CSS class', 'kingcomposer' )
					)
				),
				'styling' => array(
					array(
						'name'		=> 'css_custom',
						'type'		=> 'css',
						'options'	=> array(
							array(
								'Icon' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '.kc_tooltip:hover .fati17'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'background-color', 'label' => 'Background Color Hover', 'selector' => '.kc_tooltip:hover .fati17'),
									array('property' => 'font-size', 'label' => 'Size', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'height', 'label' => 'Height', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '.kc_tooltip:hover .fati17'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc_tooltip .fati17'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector' => '.kc_tooltip:hover .fati17'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc_tooltip .fati17'),
								),
								'Image' => array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.kc_tooltip'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.kc_tooltip img'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_tooltip img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc_tooltip img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc_tooltip'),
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.content-button a'),
									array('property' => 'color', 'label' => 'Text Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.content-button a'),
									array('property' => 'background-color', 'label' => 'Background Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.content-button a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.content-button a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.content-button a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.content-button a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.content-button a'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.content-button a'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.content-button a'),
									array('property' => 'border-radius', 'label' => 'Border Radius Hover', 'selector' => '.content-button a:hover'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.content-button a'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.content-button a'),
								),
								'Tooltip' => array(
									array('property' => 'color', 'label' => 'Text Color', 'selector' => '.kc_tooltip span'),
									array('property' => 'background', 'label' => 'Background Color', 'selector' => '.kc_tooltip span'),
									array('property' => 'width', 'label' => 'Width', 'selector' => '.kc_tooltip span'),
									array('property' => 'font-family', 'label' => 'Text Family', 'selector' => '.kc_tooltip span'),
									array('property' => 'font-size', 'label' => 'Text Size', 'selector' => '.kc_tooltip span'),
									array('property' => 'line-height', 'label' => 'Line-height', 'selector' => '.kc_tooltip span'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc_tooltip span'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc_tooltip span'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.kc_tooltip span'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc_tooltip span'),
									array('property' => 'background-color', 'label' => 'Arrow Color', 'selector' => '.kc_tooltip.top span:before,.kc_tooltip.right span:before,.kc_tooltip.bottom span:before,.kc_tooltip.left span:before'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc_tooltip span'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc_tooltip span'),
								),
								'Box' => array(
									array('property' => 'background-color', 'label' => 'Background Color', 'selector' => '.fati17, .kc_tooltip img, .kc_tooltip.style2'),
									array('property' => 'text-align', 'label' => 'Text Align'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.fati17, .kc_tooltip.style2'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.fati17, .kc_tooltip.style2'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.fati17, .kc_tooltip.style2'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		),
		
		'kc_multi_icons' => array(
			'name'			=> __( 'Multi Icons', 'kingcomposer' ),
			'title'			=> 'Multi Icons Settings',
			'icon'			=> 'kc-icon-multi-icons',
			'category'		=> 'Content',
			'description'	=> __( 'List of icon with link. Apply for soical.', 'kingcomposer' ),
			'tab_icons'		=> array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'live_editor'	=> $live_tmpl.'kc_multi_icons.php',
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'text',
						'name'			=> 'custom_class',
						'label'			=> __( 'Class', 'kingcomposer' ),
						'description'	=> __( 'Extra CSS class', 'kingcomposer' )
					),
					array(
						'type'			=> 'group',
						'label'			=> __('Icons', 'kingcomposer'),
						'name'			=> 'icons',
						'description'	=> __( 'Repeat this fields with each item created, Each item corresponding an icon element.', 'kingcomposer' ),
						'options'		=> array('add_text' => __('Add new icon', 'kingcomposer')),
						
						'value' => base64_encode( json_encode(array(
							"1" => array(
								"label" => "Facebook",
								"icon" => "fa-facebook",
								"link" => "",
							),
							"2" => array(
								"label" => "Twitter",
								"icon" => "fa-twitter",
								"link" => "",
							),
							"3" => array(
								"label" => "Google+",
								"icon" => "fa-google-plus",
								"link" => "",
							),
							
						) ) ),
						'params' => array(
							array(
								'type' => 'text',
								'label' => __( 'Label', 'kingcomposer' ),
								'name' => 'label',
								'description' => __( 'Enter text used as title of the icon.', 'kingcomposer' ),
								'admin_label' => true,
							),
							array(
								'name' => 'icon',
								'label' => 'Icon',
								'type' => 'icon_picker',
								'description' => __('Choose an icon to display', 'kingcomposer'),
							),
							array(
								'name'     => 'link',
								'label'    => __('Icon Link', 'kingcomposer'),
								'type'     => 'link',
								'description' => __('The URL which icon assigned to. You can select page/post or other post type', 'kingcomposer')
							),
						),
					),
				
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							array(
								'Icon Style' => array(
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => 'i'),
									array('property' => 'background-color', 'label' => 'Icon BG Color', 'selector' => 'a'),
									array('property' => 'font-size', 'label' => 'Icon Size', 'selector' => 'i'),
									array('property' => 'border', 'label' => 'Icon Border', 'selector' => 'a'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'a'),
									array('property' => 'padding', 'label' => 'Icon Padding', 'selector' => 'a'),
									array('property' => 'margin-right', 'label' => 'Icon gap', 'selector' => 'a'),
								),
								'Icon Hover' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => 'a:hover i'),
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => 'a:hover'),
									array('property' => 'border-color', 'label' => 'Border Color', 'selector' => 'a:hover'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => 'a:hover'),
								),
								'Box' => array(
									array('property' => 'text-align', 'label' => 'Icon Align'),
									array('property' => 'padding', 'label' => 'Padding'),
								)
							),
						),
					),
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			),
		),

		'kc_blog_posts'	=> array(
			'name'			=> __( 'Blog Posts', 'kingcomposer' ),
			'title'			=> 'Blog Posts Settings',
			'icon'			=> 'kc-icon-blog-posts',
			'category'		=> 'Blog Posts',
			'wrapper_class'	=> 'clearfix',
			'description'	=> __( 'List of latest post with more layouts.', 'kingcomposer' ),
			'tab_icons'		=> array(
				'general' => 'et-tools',
				'styling' => 'et-adjustments',
				'animate' => 'et-lightbulb'
			),
			'params'		=> array(
				'general' => array(
					array(
						'type'			=> 'multiple',
						'label'			=> __( 'Select Categories', 'kingcomposer' ),
						'name'			=> 'tax_term',
						'options'		=> kc_tools::get_terms( 'category', 'slug' ),
						'height'		=> '120px',
						'admin_label'	=> true,
						'description'	=> __( 'Select category which you chosen for posts ( hold ctrl or shift to select multiple )', 'kingcomposer' )
					),
					array(
						'type'			=> 'radio_image',
						'label'			=> __( 'Select Template', 'kingcomposer' ),
						'name'			=> 'layout',
						'admin_label'	=> true,
						'options'		=> array(
							'1'	=> KC_URL . '/assets/frontend/images/blog/layout-1.png',
							'2'	=> KC_URL . '/assets/frontend/images/blog/layout-2.png',
							'3'	=> KC_URL . '/assets/frontend/images/blog/layout-3.png',
							'4'	=> KC_URL . '/assets/frontend/images/blog/layout-4.png'
						),
						'value'			=> '1'
					),
					array(
						'name'			=> 'items',
						'label'			=> __( 'Items Limit', 'kingcomposer' ),
						'type'			=> 'number_slider',
						'value'			=> '3',
						'description'	=> __('Specify number of post that you want to show. Enter -1 to get all team', 'kingcomposer'),
						'options'		=> array(
							'min'			=> 1,
							'max'			=> 15,
							'unit'			=> '',
							'show_input'	=> false
						)
					),
					array(
						'type'			=> 'select',
						'label'			=> __( 'Items On Row', 'kingcomposer' ),
						'name'			=> 'number_item',
						'description'	=> __( 'Enter number item per row', 'kingcomposer' ),
						'value'			=> '3',
						'options'		=> array(
							'1'	=> __( '1 Items', 'kingcomposer' ),
							'2'	=> __( '2 Items', 'kingcomposer' ),
							'3'	=> __( '3 Items', 'kingcomposer' ),
							'4'	=> __( '4 Items', 'kingcomposer' )
						),
						'relation'    => array(
							'parent'    => 'layout',
							'show_when' => array('3', '4')
						)
					),
					array(
						'type'			=> 'text',
						'label'			=> __( 'Limit Words', 'kingcomposer' ),
						'name'			=> 'words',
						'value'			=> 20,
						'description'	=> __( 'Limit words you want show as short description', 'kingcomposer' )
					),
					array(
						'type'			=> 'toggle',
						'name'			=> 'show_date',
						'label'			=> __( 'Show Meta', 'kingcomposer' ),
						'value'			=> 'yes',
						'description'	=> __('Display meta of post in post items.', 'kingcomposer')
					),
					array(
						'type'		=> 'select',
						'label'		=> __( 'Order By', 'kingcomposer' ),
						'name'		=> 'order',
						'options'	=> array(
							'DESC'	=> __( 'Descending', 'kingcomposer' ),
							'ASC'	=> __( 'Ascending', 'kingcomposer' )
						)
					),
					array(
						'type'	=> 'text',
						'label'	=> __( 'Extra Class', 'kingcomposer' ),
						'name'	=> 'custom_class',
						'value'	=> ''
					)
				),
				'styling' => array(
					array(
						'name'    => 'css_custom',
						'type'    => 'css',
						'options' => array(
							
							array(
								"screens" => "any",
								'Title' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a:hover,.kc-list-item-1 .post-title-alt a:hover,.kc-list-item-2 .post-title-alt a:hover,.kc-list-item-3 .post-title-alt a:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
								),
								'Desc' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'text-align', 'label' => 'Text Align', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .post-content p,.kc-list-item-2 .post_details p,.kc-list-item-3 .entry-excerpt p'),
								),
								'Image' => array(
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => '.kc-list-item-4 .kc-post-header img,.kc-list-item-1 img,.kc-list-item-2 img,.post-grid .kc-list-item-3 img'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc-list-item-4 .kc-post-header img,.kc-list-item-1 img,.kc-list-item-2 img,.post-grid .kc-list-item-3 img'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc-list-item-4 .kc-post-header img,.kc-list-item-1 img,.kc-list-item-2 img,.post-grid .kc-list-item-3 img'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .kc-post-header img,.kc-list-item-1 img,.kc-list-item-2 img,.post-grid .kc-list-item-3 img'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-list-item-4 .kc-post-header img,.kc-list-item-1 img,.kc-list-item-2 img,.post-grid .kc-list-item-3 img'),
								),
								'Meta' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'font-family', 'label' => 'Font Family', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'color', 'label' => 'Icon Color', 'selector' => '.kc-list-item-2 .post-meta span i', 'des' => 'Just applied for layout 2' ),
								),
								'Button' => array(
									array('property' => 'color', 'label' => 'Color', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'color', 'label' => 'Color Hover', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn:hover,.kc-list-item-2 .post-2-button:hover'),
									array('property' => 'background-color', 'label' => 'BG Color', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn:hover,.kc-list-item-2 .post-2-button:hover'),
									array('property' => 'font-family', 'label' => 'Font Family', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'font-size', 'label' => 'Font Size', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'line-height', 'label' => 'Line Height', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'text-transform', 'label' => 'Text Transform', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'border', 'label' => 'Border', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'margin', 'label' => 'Margin', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'padding', 'label' => 'Padding', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
								),
								'Socials' => array(
									array('property' => 'color', 'label' => 'Color', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'color', 'label' => 'Color Hover', 'selector' => '.kc-list-item-4 .post-footer .social-share li a:hover', 'des' => 'Just applied for layout default'),
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'background-color', 'label' => 'BG Color Hover', 'selector' => '.kc-list-item-4 .post-footer .social-share li a:hover', 'des' => 'Just applied for layout default'),
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'border-color', 'label' => 'Border Color Hover', 'selector' => '.kc-list-item-4 .post-footer .social-share li a:hover', 'des' => 'Just applied for layout default'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'border-top-color', 'label' => 'Border Top Color', 'selector' => '.kc-list-item-4 .post-footer', 'des' => 'Just applied for layout default'),
									array('property' => 'border-bottom-color', 'label' => 'Border Bottom Color', 'selector' => '.kc-list-item-4 .post-footer', 'des' => 'Just applied for layout default'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
								),
								'Boxes' => array(
									array('property' => 'background-color', 'label' => 'BG Color', 'selector' => '.kc-list-item-4,.kc-list-item-1,.kc-list-item-2,.kc-list-item-3'),
									array('property' => 'border', 'label' => 'Border', 'selector' => '.kc-list-item-4,.kc-list-item-1,.kc-list-item-2,.kc-list-item-3'),
									array('property' => 'border-radius', 'label' => 'Border Radius', 'selector' => '.kc-list-item-4,.kc-list-item-1,.kc-list-item-2,.kc-list-item-3'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4,.kc-list-item-1,.kc-list-item-2,.kc-list-item-3'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-list-item-4,.kc-list-item-1,.kc-list-item-2,.kc-list-item-3'),
								)
							),
							
							array(
								"screens" => "1024,999,767,479",
								'Title' => array(
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .kc-post-header .post-title-alt a,.kc-list-item-1 .post-title-alt a,.kc-list-item-2 .post-title-alt a,.kc-list-item-3 .post-title-alt a'),
								),
								'Meta' => array(
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .post-meta a,.kc-list-item-1 .post-date,.kc-list-item-2 .post-meta span a,.kc-list-item-3 .entry-meta a'),
								),
								'Button' => array(
									array('property' => 'font-size', 'label' => 'Font Size', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'line-height', 'label' => 'Line Height', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'font-weight', 'label' => 'Font Weight', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'margin', 'label' => 'Margin', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
									array('property' => 'padding', 'label' => 'Padding', 'des' => 'Just applied for layout 1 and layout 2', 'selector' => '.kc-list-item-1 .post-details .btn,.kc-list-item-2 .post-2-button'),
								),
								'Socials' => array(
									array('property' => 'font-size', 'label' => 'Font Size', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'line-height', 'label' => 'Line Height', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'padding', 'label' => 'Padding', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
									array('property' => 'margin', 'label' => 'Margin', 'selector' => '.kc-list-item-4 .post-footer .social-share li a', 'des' => 'Just applied for layout default'),
								),
								'Boxes' => array(
									array('property' => 'width', 'label' => 'Item Width', 'des' => 'Just apply for layout grid', 'selector' => '+.kc-blog-posts-3.kc-blog-grid .post-grid.grid-3'),
								)
							)
						)
					)
				),
				'animate' => array(
					array(
						'name'    => 'animate',
						'type'    => 'animate'
					)
				),
			)
		)


	),

	'core'

);

