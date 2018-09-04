<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.smthemes.com
 * @since      1.0.0
 *
 * @package    Smt_Framework
 * @subpackage Smt_Framework/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Smt_Framework
 * @subpackage Smt_Framework/admin
 * @author     Smart Media Themes <semihmemis67@gmail.com>
 */
class Smt_Framework_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		if(!function_exists('is_plugin_active')){
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		}
		if ( is_plugin_active( 'kingcomposer/kingcomposer.php' ) ) {


//			global $my_class;
			remove_action( 'admin_init', 'kc_admin_init' );
			add_action( 'admin_init', array( &$this, 'kc_admin_init2' ) );
		}
	}


	function kc_admin_init2() {

		global $kc;

		if (get_option('kc_do_activation_redirect', false)) {

			delete_option('kc_do_activation_redirect');

			if (!isset($_GET['activate-multi'])) {
				$conflicts = array(
//					'js_composer/js_composer.php',
//					'siteorigin-panels/siteorigin-panels.php',
					'all-in-one-wp-builder/visual-editor.php',
					'aqua-page-builder/aqua-page-builder.php',
					'beaver-builder-lite-version/fl-builder.php',
					'beaver-builder/fl-builder.php',
					'beaver/beaver.php',
					'elementor/elementor.php',
					'fluxlive/plugneditflux.php',
					'forge/forge.php',
					'kopa-page-builder/kopa-page-builder.php',
					'live-composer-lite/lite-ds-live-composer.php',
					'live-composer-page-builder/ds-live-composer.php',
					'live-composer/live-composer.php',
					'motopress-content-editor-lite/motopress-content-editor.php',
					'motopress-content-editor/motopress-content-editor.php',
					'motopress/motopress-content-editor.php',
					'octonis-page-builder/oct.php',
					'pace-builder/pace-builder.php',
					'page-builder-sandwich/class-plugin.php',
					'page-layout-builder/page-layout-builder.php',
					'tailor/tailor.php',
					'tailor-portfolio/tailor-portfolio.php',
					'tx-onepager/tx-onepager.php',
					'wp-xprs-page-builder/wp-xprs.php',
					'wr-pagebuilder/wr-pagebuilder.php',
				);
				foreach ($conflicts as $i => $name)
				{
					deactivate_plugins ($name);
				}
				wp_redirect("admin.php?page=kingcomposer&screen=welcome");
			}
		}

		if(!function_exists('is_plugin_active'))
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

		if( $kc->action == 'live-editor' ){

			if( !class_exists( 'kc_pro' )  ){
				wp_redirect("admin.php?page=kingcomposer#kc_pro");
				exit;
			}

		}

		if( ( $kc->action == 'live-editor' || $kc->action == 'fonts-manager' ) && !defined('IFRAME_REQUEST') ){
			/*
			*	@live editor mode
			*	We sent the iframe request to wp system
			*/
			define( 'IFRAME_REQUEST', true );
		}

		/* register kc options */
		register_setting( 'kingcomposer_group', 'kc_options', 'kc_validate_options' );

		$roles = array( 'administrator', 'admin', 'editor' );

		foreach ( $roles as $role ) {
			if( ! $role = get_role( $role ) )
				continue;
			$role->add_cap( 'access_kingcomposer'  );
		}


	}


		/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/smt-framework-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/smt-framework-admin.js', array( 'jquery' ), $this->version, false );

	}

}
