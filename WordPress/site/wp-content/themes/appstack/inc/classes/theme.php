<?php
if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS

if ( !class_exists( 'SMAppStack' ) ):

class SMAppStackTheme extends SMThemeLoader {

	public function __construct() {

		add_action('wp_enqueue_scripts', array(&$this,'load_scripts'));
		add_action('wp_enqueue_scripts', array(&$this,'load_styles'),10);
		add_action( 'after_setup_theme', array(&$this, 'load_functions' ),10);
		add_action( 'after_setup_theme', array(&$this, 'theme_supports' ),10);
		add_action( 'after_setup_theme', array(&$this, 'create_menus' ),10);

		require get_template_directory() . '/inc/classes/sidebars.php';

		$is_login = in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ));
		if(!is_admin() && !$is_login){
			require get_template_directory() . '/inc/classes/navwalker.php';
		} else {
			require get_template_directory() . '/inc/classes/admin.php';
			require get_template_directory() . '/inc/classes/options.php';
		}

		add_filter( 'excerpt_length', array(&$this, 'stack_excerpt_length'), 999 );

//		add_filter( 'body_class', array(&$this, 'appstack_body_classes' ),999 );


	}
/*
	function appstack_body_classes( $classes ) {
		// Adds a class of group-blog to blogs with more than 1 published author.
		if ( is_multi_author() ) {
			$classes[] = 'group-blog';
		}

		return $classes;
	}
*/

	function stack_excerpt_length( $length ) {
		return 25;
	}


	function load_scripts(){

		wp_enqueue_script( 'appstack-modernizr', get_template_directory_uri() . '/js/modernizr.custom.js', array(), '20120206' );
		wp_enqueue_script( 'appstack-dynamics', get_template_directory_uri() . '/js/dynamics.min.js', array(), '20120206', true );
		wp_enqueue_script( 'appstack-main', get_template_directory_uri() . '/js/main.js', array('jquery'), '20150708', true );
		$site_parameters = array(
			'site_url' => get_site_url(),
			'theme_directory' => get_template_directory_uri()
		);
		wp_localize_script( 'appstack-main', 'SiteParameters', $site_parameters );

		if ( is_home() ) {
			wp_enqueue_script( 'masonry' );
		}
		wp_enqueue_script( 'appstack-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

	}


	function load_styles(){

		wp_enqueue_style( 'appstack-style', get_stylesheet_uri() );
		wp_enqueue_style('appstack-font-awesome', get_template_directory_uri() . "/css/font-awesome.min.css", 'screen');

		$query_args = array(
			'family' => 'Open+Sans:400italic,400,700,300,600',
			'subset' => 'latin,latin-ext',
		);
		wp_enqueue_style( 'appstack_google_fonts', add_query_arg( $query_args, "//fonts.googleapis.com/css" ), array(), null );

	}


	function load_functions() {
		require get_template_directory() . '/inc/functions/theme_functions.php';
	}


	function theme_supports(){

		add_image_size('stack-blog', 800, 500, true);
		add_image_size('stack-grid', 600, 400, true);
		add_image_size('stack-split', '', 600, true);
		add_image_size('stack-testimonial', '', 500, true);
		add_image_size('stack-phone', 160, 284, true);
		add_image_size('stack-tablet', 284, 412, true);
		add_image_size('stack-browser', 400, 640, true);
		add_image_size('stack-header', 1024, 678, true);
		add_image_size('stack-team', 400, 400, true);
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on AppStack, use a find and replace
		 * to change 'appstack' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'appstack', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		 */
		add_theme_support( 'post-thumbnails' );


		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/*
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'gallery',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'appstack_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );
	}


	function create_menus() {

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary Menu', 'appstack' ),
			'secondary' => esc_html__( 'Footer Menu', 'appstack' ),
		) );

	}

}

	new SMAppStackTheme();

endif;
