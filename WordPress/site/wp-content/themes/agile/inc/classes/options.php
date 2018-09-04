<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // NO DIRECT ACCESS

if ( ! class_exists( 'SMAgileOptions' ) ):

	class SMAgileOptions extends SMThemeLoader {


		public function __construct() {

			add_action( 'init', array( $this, 'initSettings' ), 20 );

		}


//// THEME OPTIONS PANEL CONFIGURATION BEGINS

		public function initSettings() {

			if( function_exists('acf_add_options_page') ) {

				acf_add_options_page(array(
					'page_title' 	=> '',
					'menu_title'	=> 'Theme Settings',
					'menu_slug' 	=> 'theme-general-settings',
					'capability'	=> 'edit_posts',
					'redirect'		=> false
				));


			}






/*
			if( function_exists('acf_add_local_field_group') ):

				acf_add_local_field_group(array (
					'key' => 'group_57d6baf6c27d1',
					'title' => 'THEME SETTINGS',
					'fields' => array (
						array (
							'key' => 'field_57d6bd79e8374',
							'label' => 'General',
							'name' => '',
							'type' => 'tab',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'placement' => 'left',
							'endpoint' => 0,
						),
						array (
							'key' => 'field_57d6bfb39dc4d',
							'label' => 'Logo',
							'name' => 'logo',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'thumbnail',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '',
							'mime_types' => '',
						),
						array (
							'key' => 'field_57d6bd9ce8375',
							'label' => 'Social Links',
							'name' => '',
							'type' => 'tab',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'placement' => 'left',
							'endpoint' => 0,
						),
						array (
							'key' => 'field_57d6b8e950018',
							'label' => 'Twitter username',
							'name' => 'twitter_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b90650019',
							'label' => 'Facebook username',
							'name' => 'facebook_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9165001a',
							'label' => 'Pinterest url',
							'name' => 'pinterest_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9255001b',
							'label' => 'Dribbble url',
							'name' => 'dribbble_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9335001c',
							'label' => 'Flickr url',
							'name' => 'flickr_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b94c5001d',
							'label' => 'YouTube url',
							'name' => 'youtube_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9645001e',
							'label' => 'Instagram url',
							'name' => 'instagram_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9845001f',
							'label' => 'Vimeo url',
							'name' => 'vimeo_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b99250020',
							'label' => 'Behance url',
							'name' => 'behance_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b99f50021',
							'label' => 'LinkedIn url',
							'name' => 'linkedin_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6be06e8376',
							'label' => 'Footer',
							'name' => '',
							'type' => 'tab',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'placement' => 'left',
							'endpoint' => 0,
						),
						array (
							'key' => 'field_57d6bf4467c33',
							'label' => 'Copyright',
							'name' => 'copyright',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
					),
					'location' => array (
						array (
							array (
								'param' => 'options_page',
								'operator' => '==',
								'value' => 'theme-general-settings',
							),
						),
					),
					'menu_order' => 0,
					'position' => 'acf_after_title',
					'style' => 'default',
					'label_placement' => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen' => '',
					'active' => 1,
					'description' => '',
				));

			endif;

*/







			if( function_exists('acf_add_local_field_group') ):

				acf_add_local_field_group(array (
					'key' => 'group_57d6baf6c27d1',
					'title' => 'THEME SETTINGS',
					'fields' => array (
						array (
							'key' => 'field_57d6bd79e8374',
							'label' => 'General',
							'name' => '',
							'type' => 'tab',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'placement' => 'left',
							'endpoint' => 0,
						),
						array (
							'key' => 'field_57d6bfb39dc4d',
							'label' => 'Logo',
							'name' => 'logo',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'thumbnail',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '',
							'mime_types' => '',
						),
						array (
							'key' => 'field_57d6e0c64ec51',
							'label' => 'Menu Button Text (optional)',
							'name' => 'nav_button',
							'type' => 'text',
							'instructions' => 'Enter text for menu button & select a form to link to below.',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6e13b4ec52',
							'label' => 'Enter Form Name',
							'name' => 'form_id',
							'type' => 'select',
							'instructions' => 'Enter the name of a CF7 form. (case sensitive)',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'choices' => array (
								'none' => '-none-',
								'Contact form 1' => 'Contact form 1',
								'Signup' => 'Signup',
								'Login' => 'Login',
							),
							'default_value' => array (
							),
							'allow_null' => 0,
							'multiple' => 0,
							'ui' => 0,
							'ajax' => 0,
							'return_format' => 'value',
							'placeholder' => '',
						),
						array (
							'key' => 'field_57d6bd9ce8375',
							'label' => 'Social Links',
							'name' => '',
							'type' => 'tab',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'placement' => 'left',
							'endpoint' => 0,
						),
						array (
							'key' => 'field_57d6b8e950018',
							'label' => 'Twitter username',
							'name' => 'twitter_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b90650019',
							'label' => 'Facebook username',
							'name' => 'facebook_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9165001a',
							'label' => 'Pinterest url',
							'name' => 'pinterest_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9255001b',
							'label' => 'Dribbble url',
							'name' => 'dribbble_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9335001c',
							'label' => 'Flickr url',
							'name' => 'flickr_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b94c5001d',
							'label' => 'YouTube url',
							'name' => 'youtube_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9645001e',
							'label' => 'Instagram url',
							'name' => 'instagram_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b9845001f',
							'label' => 'Vimeo url',
							'name' => 'vimeo_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b99250020',
							'label' => 'Behance url',
							'name' => 'behance_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6b99f50021',
							'label' => 'LinkedIn url',
							'name' => 'linkedin_text',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array (
							'key' => 'field_57d6be06e8376',
							'label' => 'Footer',
							'name' => '',
							'type' => 'tab',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'placement' => 'left',
							'endpoint' => 0,
						),
						array (
							'key' => 'field_57d6bf4467c33',
							'label' => 'Copyright',
							'name' => 'copyright',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
					),
					'location' => array (
						array (
							array (
								'param' => 'options_page',
								'operator' => '==',
								'value' => 'theme-general-settings',
							),
						),
					),
					'menu_order' => 0,
					'position' => 'acf_after_title',
					'style' => 'default',
					'label_placement' => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen' => '',
					'active' => 1,
					'description' => '',
				));

			endif;



		}

// SET SECTION HOOKPOINTS -> START
// SET SECTION HOOKPOINTS -> FINISH

// SET THEME SPECIFIC OPTION TABS -> START
// SET THEME SPECIFIC OPTION TABS -> FINISH

//// THEME OPTIONS PANEL CONFIGURATION ENDS

	}

	new SMAgileOptions();

endif;

