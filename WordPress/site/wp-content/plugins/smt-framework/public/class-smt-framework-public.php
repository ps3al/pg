<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://www.smthemes.com
 * @since      1.0.0
 *
 * @package    Smt_Framework
 * @subpackage Smt_Framework/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Smt_Framework
 * @subpackage Smt_Framework/public
 * @author     Smart Media Themes <semihmemis67@gmail.com>
 */
class Smt_Framework_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		/**
		 * Ben ekledim
		 */
		$this->smtframework_definitions();

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Smt_Framework_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Smt_Framework_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/smt-framework-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Smt_Framework_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Smt_Framework_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/smt-framework-public.js', array( 'jquery' ), $this->version, false );

	}


	/**
	 * Ben ekledim
	 */

	/**
	 * Definitions
	 * @return void
	 */
	public function smtframework_definitions() {

		if ( ! defined( 'SMT_FRAMEWORK_PUBLIC_PATH' ) ) {
			define( 'SMT_FRAMEWORK_PUBLIC_PATH', plugin_dir_path( __FILE__ ) );
		}

	}




	/**
	 * Ben ekledim - ACF
	 */
	function my_acf_settings_path( $path ) {

		// update path

		$path = plugin_dir_path( __FILE__ ) . '/advanced-custom-fields-pro/';

		// return
		return $path;

	}

	function my_acf_settings_dir( $dir ) {

		// update path
		$dir = plugin_dir_url( __FILE__ ) . '/advanced-custom-fields-pro/';

		// return
		return $dir;

	}


	public function smt_custom_fields() {

		$folder       = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/custom-fields/';
		$customfields = glob( $folder . '*.php' );

		foreach ( $customfields as $customfield ) {
			include_once( $customfield );
		}

	}

	public function remove_su_prefix( $shortcodes ) {
//			$shortcodes = array();
//			$shortcodes['heading'] = array();
//  		unset($shortcodes['heading']);
//			var_dump($shortcodes);
//			die;

		update_option( 'su_option_prefix', '' );

		return $shortcodes;
	}

	public function smt_shortcodes(){

		if(!function_exists('is_plugin_active')){
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		}


		add_filter( 'su/data/shortcodes', array( $this, 'remove_su_prefix' ), 0, 1 );

		$folder     = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/shortcodes/';
		$shortcodes = glob( $folder . '*.php' );


		foreach ( $shortcodes as $shortcode ) {
			$l  = pathinfo( $shortcode );
			$fn = $l['filename'];

			include_once( $shortcode );

			add_shortcode( $fn, $fn );

			if ( function_exists( 'vc_map' ) ) {
				add_action( 'init', $fn . '_vc' );
			}

			//King Composer

			if ( is_plugin_active( 'kingcomposer/kingcomposer.php' ) ){
				add_action('init', $fn . '_kc' );
			}


			// Shortcode Ultimate
			if ( function_exists( 'register_' . $fn . '_shortcode' ) ) {
				add_filter( 'su/data/shortcodes', 'register_' . $fn . '_shortcode', 0, 1 );
			}

		}
		if ( class_exists( 'Su_Data' ) ) {
			// Clear popup cache
			delete_transient( 'su/generator/popup' );
			// Clear shortcodes settings cache
			foreach ( array_keys( (array) Su_Data::shortcodes() ) as $shortcode ) {
				delete_transient( 'su/generator/settings/' . $shortcode );
			}
		}
		add_filter( 'widget_text', 'shortcode_unautop' );
		add_filter( 'widget_text', 'do_shortcode', 20 );

	}

	public function smt_posttypes() {

		$folder     = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/post-types/';
		$post_types = glob( $folder . '*.php' );

		foreach ( $post_types as $post_type ) {
			$l  = pathinfo( $post_type );
			$fn = $l['filename'];

			include_once( $post_type );

		}


	}


	/**
	 * Load WordPress Widgets
	 *
	 * @access public
	 * @return void
	 */
	public function smt_widgets() {

		$folder  = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/widgets/';
		$widgets = glob( $folder . '*.php' );

		foreach ( $widgets as $widget ) {
			include_once( $widget );
		}
	}

//SO Widgets
	function smt_widgets_collection( $folders ) {
		$folders[] = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/widgets/';

		return $folders;
	}

	function smt_active_widgets( $active ) {
		global $pagenow;

		$active['button']               = true;
		$active['contact']              = true;
		$active['cta']                  = true;
		$active['editor']               = true;
		$active['features']             = true;
		$active['google-map']           = true;
		$active['headline']             = true;
		$active['hero']                 = true;
		$active['icon']                = true;
		$active['image']                = true;
		$active['image-grid']           = true;
		$active['layout-slider']        = true;
		$active['post-carousel']        = true;
		$active['price-table']          = true;
		$active['simple-masonry']       = true;
		$active['slider']               = true;
		$active['social-media-buttons'] = true;
		$active['taxonomy']          = true;
		$active['testimonial']          = true;
		$active['video']                = true;

		$folder  = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/widgets/';
		$widgets = glob( $folder . '*/*.php' );
		foreach ( $widgets as $widget ) {
			$l                        = pathinfo( $widget );
			$active[ $l['filename'] ] = true;
		}

		if ( ( $pagenow == 'widgets.php' ) ) {
			$active['smt_portfolios_widget_so'] = false;
			$active['smt_button_widget_so'] = false;
		}

		return $active;
	}

//SO unset widgets
	function smt_hide_widgets( $widgets ) {

		unset( $widgets['SMT_Portfolios_Widget_WP'] );
		unset( $widgets['SMT_Galleries_Widget_WP'] );

		return $widgets;
	}




	function smt_layouts( $layouts ) {

//		global $kc;

		$folder            = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/layouts/';
		$pre_build_layouts = glob( $folder . '*.php' );

		foreach ( $pre_build_layouts as $layout ) {

			$l  = pathinfo( $layout );
			$fn = $l['filename'];

			include( $layout );

			$layouts[ $fn ] = wp_parse_args(
				array(
					'name'        => $data['name'],
					'description' => $data['description'],
				),
				unserialize( $data['value'] )
			);
			$data           = array();

//			$kc->locate_profile_sections( $fn.'.kc' );
//			echo $fn.'.kc';
//			die;
		}



		return $layouts;
	}

	function smt_page_layouts_vc() {

		$folder            = SMT_FRAMEWORK_PUBLIC_PATH . 'partials/layouts/';
		$pre_build_layouts = glob( $folder . '*.php' );
		foreach ( $pre_build_layouts as $layout ) {
			include( $layout );

			if ( $data['name'] ) {
				vc_add_default_templates( $data );
				$data = array();
			}

		}
	}




}
