<?php
/**
 * SM-Theme Button Widget
 *
 * @author SM-Themes
 * @version 1.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;


if ( ! ( class_exists( 'SMT_Button_Widget_WP' ) ) ) {
	class SMT_Button_Widget_WP extends WP_Widget {

		function SMT_Button_Widget_WP() {
			parent::__construct(
				'smt-button-widget-wp', // Base ID
				'SMT Button wp', // Name
				array( 'description' => 'SMT Button', ) // Args
			);
			$this->load_fields();
		}

		function widget( $args, $instance ) {

			extract( $args );
			$title       = apply_filters( 'widget_title', get_field( 'title', 'widget_'.$widget_id ) );

			$id = get_field( 'id', 'widget_'.$widget_id );
			$style = get_field( 'style', 'widget_'.$widget_id );
			$class = get_field( 'class', 'widget_'.$widget_id );
			$color = get_field( 'color', 'widget_'.$widget_id );
			$type = get_field( 'type', 'widget_'.$widget_id );
			$href = get_field( 'href', 'widget_'.$widget_id );
			$align = get_field( 'align', 'widget_'.$widget_id );
			$target = get_field( 'target', 'widget_'.$widget_id );
			$text = get_field( 'text', 'widget_'.$widget_id );

			echo do_shortcode('[smt_button id="' . $id . '" style="' . $style . '" class="' . $class . '" color="' . $color . '" type="' . $type . '" href="' . $href . '" align="' . $align . '" target="' . ($target? '_blank': '_self') . '" ]'. $text . '[/smt_button]');
		}


		public function form( $instance ) {
//			return 'noform';
		}

		public function load_fields(){


			if( function_exists('acf_add_local_field_group') ):

				acf_add_local_field_group(array (
					'key' => 'group_57d7df0896eab',
					'title' => 'SMT Button',
					'fields' => array (
						array (
							'key' => 'field_57d7df93f21bb',
							'label' => 'Title',
							'name' => 'title',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df1bd6fd5',
							'label' => 'ID',
							'name' => 'id',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df30d6fd6',
							'label' => 'Style',
							'name' => 'style',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df39d6fd7',
							'label' => 'Class',
							'name' => 'class',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df42d6fd8',
							'label' => 'Color',
							'name' => 'color',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df48d6fd9',
							'label' => 'Type',
							'name' => 'type',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df51d6fda',
							'label' => 'HREF',
							'name' => 'href',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df5ad6fdb',
							'label' => 'Align',
							'name' => 'align',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df5fd6fdc',
							'label' => 'Target',
							'name' => 'target',
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
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_57d7df6bd6fdd',
							'label' => 'Text',
							'name' => 'text',
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
							'readonly' => 0,
							'disabled' => 0,
						),
					),
					'location' => array (
						array (
							array (
								'param' => 'widget',
								'operator' => '==',
								'value' => 'smt-button-widget-wp',
							),
						),
					),
					'menu_order' => 0,
					'position' => 'normal',
					'style' => 'default',
					'label_placement' => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen' => '',
					'active' => 1,
					'description' => '',
				));

			endif;


		}

	}

}
register_widget( 'SMT_Button_Widget_WP' );


?>