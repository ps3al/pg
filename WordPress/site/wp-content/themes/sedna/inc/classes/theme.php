<?php
if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS

if ( !class_exists( 'SMSedna' ) ):

class SMSednaTheme extends SMThemeLoader {

	public function __construct() {

		add_action('wp_enqueue_scripts', array(&$this,'load_scripts'));

		add_action('wp_enqueue_scripts', array(&$this,'load_styles'),10);

		add_action( 'after_setup_theme', array($this, 'load_functions' ),10);

		add_action( 'after_setup_theme', array($this, 'theme_supports' ),10);

		add_action( 'after_setup_theme', array($this, 'create_menus' ),10);


		require get_template_directory() . '/inc/classes/sidebars.php';
//		include(SM_THEMELOADERDIR . "/classes/sidebars.php");

		$is_login = in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ));
		if(!is_admin() && !$is_login){
			require get_template_directory() . '/inc/classes/navwalker.php';
//			include(SM_THEMELOADERDIR . "/classes/navwalker.php");
		} else {
			require get_template_directory() . '/inc/classes/admin.php';
			require get_template_directory() . '/inc/classes/options.php';
//			include(SM_THEMELOADERDIR . "/classes/admin.php");
//			include(SM_THEMELOADERDIR . "/classes/options.php");
		}

	}


	function load_scripts(){

		wp_enqueue_script('jquery');
		wp_enqueue_script('bootstrap', SM_THEMEURI  . '/js/bootstrap.min.js', array('jquery'), "", "true" );
		wp_enqueue_script('sedna-js-plugins', SM_THEMEURI  . '/js/plugins.js', array('jquery'), "", "true" );
		wp_enqueue_script('sedna-scripts', SM_THEMEURI  . '/js/main.js', 10000, "", "true" );

		/* Buraya Bak Lazım mı?*/
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
		/* END - Buraya Bak Lazım mı? */

	}

	function load_styles(){

		$ssl = is_ssl() ? 's' : '';

		wp_register_style('bootstrap', SM_THEMEURI . '/css/bootstrap.min.css');
		wp_register_style('sedna-css-plugins', SM_THEMEURI . '/css/plugins.css');
		wp_register_style('theme-style', SM_THEMEURI . '/style.css');
		wp_register_style('main-style', SM_THEMEURI . '/css/main.css');

		wp_enqueue_style('bootstrap');
		wp_enqueue_style('sedna-css-plugins');
		wp_enqueue_style('theme-style');
		wp_enqueue_style('main-style');


		wp_register_script( 'ie_html5shiv', get_bloginfo('stylesheet_url'). '/js/html5shiv.min.js', false, '3.7.2',false );
		wp_enqueue_script( 'ie_html5shiv');
		wp_script_add_data( 'ie_html5shiv', 'conditional', 'lt IE 9' );
		wp_register_script( 'ie_respond', get_bloginfo('stylesheet_url'). '/js/respond.min.js', false, '1.4.2',false );
		wp_enqueue_script( 'ie_respond');
		wp_script_add_data( 'ie_respond', 'conditional', 'lt IE 9' );

	}

	function load_functions() {
		require get_template_directory() . '/inc/functions/theme_functions.php';
//		include(SM_THEMELOADERDIR . "/functions/theme_functions.php");
	}

	function theme_supports(){

		add_theme_support( 'automatic-feed-links' );

		add_theme_support( 'title-tag' );

		add_theme_support( 'post-thumbnails' );

		/*
		 * This theme styles the visual editor to resemble the theme style,
		 * specifically font, colors, icons, and column width.
		 */
		add_editor_style( 'css/editor-style.css' );


		global $wp_version;
		if (version_compare($wp_version,"3.5.1","<")){
			add_filter( 'enable_post_format_ui', '__return_false' );
		}

		remove_filter( 'the_content', 'post_formats_compat', 7 );
	}

	function create_menus() {

		register_nav_menu( 'main-navigation', __( 'Main Navigation' , 'sedna') );

	}

}

	new SMSednaTheme();

endif;
