<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://www.smthemes.com
 * @since      1.0.0
 *
 * @package    Smt_Framework
 * @subpackage Smt_Framework/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Smt_Framework
 * @subpackage Smt_Framework/includes
 * @author     Smart Media Themes <semihmemis67@gmail.com>
 */
class Smt_Framework {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Smt_Framework_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->plugin_name = 'smt-framework';
		$this->version = '1.0.0';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Smt_Framework_Loader. Orchestrates the hooks of the plugin.
	 * - Smt_Framework_i18n. Defines internationalization functionality.
	 * - Smt_Framework_Admin. Defines all hooks for the admin area.
	 * - Smt_Framework_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-smt-framework-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-smt-framework-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-smt-framework-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-smt-framework-public.php';


		/**
		 * Ben ekledim
		 */
// 4. Include ACF
		include_once( plugin_dir_path( dirname( __FILE__ ) ) . 'public/advanced-custom-fields-pro/acf.php' );



		$this->loader = new Smt_Framework_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Smt_Framework_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Smt_Framework_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Smt_Framework_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Smt_Framework_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );


		/**
		 * Ben ekledim
		 */
		$this->loader->add_action( 'after_setup_theme', $plugin_public, 'smt_custom_fields' );
		$this->loader->add_filter( 'siteorigin_panels_prebuilt_layouts', $plugin_public, 'smt_layouts' );


		if ( function_exists( 'vc_add_default_templates' ) ) {
			$this->loader->add_action( 'vc_load_default_templates_action', $plugin_public, 'smt_page_layouts_vc' ); // Hook in
		}

		$this->loader->add_action( 'after_setup_theme', $plugin_public, 'smt_posttypes' );
		$this->loader->add_action( 'after_setup_theme', $plugin_public, 'smt_shortcodes' );
		$this->loader->add_action( 'widgets_init', $plugin_public, 'smt_widgets' );
		$this->loader->add_filter( 'siteorigin_widgets_widget_folders', $plugin_public, 'smt_widgets_collection' );
		$this->loader->add_filter( 'siteorigin_widgets_active_widgets', $plugin_public, 'smt_active_widgets' );
		$this->loader->add_filter( 'siteorigin_panels_widgets', $plugin_public, 'smt_hide_widgets' , 11 );


		/**
		 * Ben ekledim - ACF
		 */
// 1. customize ACF path
		$this->loader->add_filter('acf/settings/path', $plugin_public, 'my_acf_settings_path');
// 2. customize ACF dir
		$this->loader->add_filter('acf/settings/dir', $plugin_public, 'my_acf_settings_dir');
// 3. Hide ACF field group menu item
//		add_filter('acf/settings/show_admin', '__return_false');



	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Smt_Framework_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
