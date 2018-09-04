<?php
if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS

if ( !class_exists( 'SMAgile' ) ):

class SMAgileTheme extends SMThemeLoader {

	public function __construct() {

		add_action('wp_enqueue_scripts', array(&$this,'load_scripts'));
		add_action('wp_enqueue_scripts', array(&$this,'load_styles'),10);
		add_action( 'after_setup_theme', array(&$this, 'load_functions' ),10);
		add_action( 'after_setup_theme', array(&$this, 'theme_supports' ),10);
		add_action( 'after_setup_theme', array(&$this, 'create_menus' ),10);

		require SM_THEMEDIR . '/inc/classes/sidebars.php';

		$is_login = in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ));
		if(!is_admin() && !$is_login){
			require SM_THEMEDIR . '/inc/classes/navwalker.php';
		} else {
			require SM_THEMEDIR . '/inc/classes/admin.php';
			require SM_THEMEDIR . '/inc/classes/options.php';
		}

		add_filter( 'excerpt_length', array(&$this, 'stack_excerpt_length'), 999 );


	}

	function stack_excerpt_length( $length ) {
		return 25;
	}


	function load_scripts(){


		if (!is_admin()) {

			wp_enqueue_script('jquery-waypoints-sticky', SM_THEMEURI . '/js/libs/waypoints.sticky.min.js', array('jquery'), '2.0.2', true);

			
			wp_enqueue_script('jquery-easing', SM_THEMEURI . '/js/libs/jquery.easing.1.3.js', array('jquery'));
			wp_enqueue_script('jquery-tools', SM_THEMEURI . '/js/libs/jquery.tools.min.js', array('jquery'), '1.2.7', true);
			wp_enqueue_script('jquery-validate', SM_THEMEURI . '/js/libs/jquery.validate.min.js', array('jquery'), '1.9.0', true);
			wp_enqueue_script('agile-drop-downs', SM_THEMEURI . '/js/libs/drop-downs.js', array('jquery'), '1.4.8', true);
			wp_enqueue_script('jquery-waypoint', SM_THEMEURI . '/js/libs/waypoints.js', array('jquery'), '2.0.2', true);
			wp_enqueue_script('jquery-plugins-lib', SM_THEMEURI . '/js/libs/jquery.plugins.lib.js', array('jquery-easing'), '1.0', true);
			wp_enqueue_script('jquery-modernizr', SM_THEMEURI . '/js/libs/modernizr.js', array('jquery'), '2.7.1', true);
			wp_enqueue_script('jquery-ytpplayer', SM_THEMEURI . '/js/libs/jquery.mb.YTPlayer.js', array('jquery'), '1.0', true);



			/* Slider packs */
			wp_enqueue_script('jquery-flexslider', SM_THEMEURI . '/js/libs/jquery.flexslider.js', array('jquery-easing'), '1.2', true);
			wp_enqueue_script('jquery-owl-carousel', SM_THEMEURI . '/js/libs/owl.carousel.min.js', array('jquery-easing'), '4.1', true);
			$slider_type = get_post_meta(get_the_ID(), 'agile_slider_choice', true);
			if (!empty($slider_type) && $slider_type == 'Nivo')
				wp_enqueue_script('nivo-slider', SM_THEMEURI . '/js/libs/jquery.nivo.slider.pack.js', array('jquery'), '3.2', false);

			wp_enqueue_script('jquery-prettyphoto', SM_THEMEURI . '/js/libs/jquery.prettyPhoto.js', array('jquery'), '3.1.6', true);

			wp_enqueue_script('jquery-isotope', SM_THEMEURI . '/js/libs/jquery.isotope.min.js', array('jquery'), '1.5.19', true);

			$ajax_portfolio = get_field('agile_ajax_portfolio','option');
			$ajax_gallery = get_field('agile_ajax_gallery','option');
//			if (($layoutManager->is_portfolio_template() && $ajax_portfolio) || ($layoutManager->is_gallery_template() && $ajax_gallery))
				wp_enqueue_script('jquery-infinitescroll', SM_THEMEURI . '/js/libs/jquery.infinitescroll.min.js', array('jquery'), '2.0', true);

			$disable_smooth_scroll = get_field('agile_disable_smooth_scroll','option');
			if (empty($disable_smooth_scroll))
				wp_enqueue_script('jquery-nicescroll', SM_THEMEURI . '/js/libs/sscr.min.js', array('jquery'), '3.5', true);

			if (is_singular())
				wp_enqueue_script("comment-reply");

			wp_enqueue_script('agile-slider-js', SM_THEMEURI . '/js/slider.js', array('jquery'), '1.0', true);
			wp_enqueue_script('agile-theme-js', SM_THEMEURI . '/js/main.js', array('jquery'), '1.0', true);

			$localized_array = array(
				'name_required' => __('Please provide your name', 'agile'),
				'name_format' => __('Your name must consist of at least 5 characters', 'agile'),
				'email_required' => __('Please provide a valid email address', 'agile'),
				'url_required' => __('Please provide a valid URL', 'agile'),
				'phone_required' => __('Minimum 5 characters required', 'agile'),
				'human_check_failed' => __('The input the correct value for the equation above', 'agile'),
				'message_required' => __('Please input the message', 'agile'),
				'message_format' => __('Your message must be at least 15 characters long', 'agile'),
				'success_message' => __('Your message has been sent. Thanks!', 'agile')
			);

			$localized_array['blog_url'] = get_home_url();

			$localized_array['loading_portfolio'] = __('Loading the next set of posts...', 'agile');
			$localized_array['finished_loading'] = __('No more items to load...', 'agile');

			/* localized script attached to theme */
			wp_localize_script('agile-theme-js', 'agile', $localized_array);

		}

	}


	function load_styles(){

		wp_register_style('pretty-photo', SM_THEMEURI . '/css/prettyPhoto.css', array(), false, 'screen');
		wp_register_style('animate', SM_THEMEURI . '/css/animate.css', array(), false, 'screen');
		wp_register_style('icon-fonts', SM_THEMEURI . '/css/icon-fonts.css', array(), false, 'screen');

		wp_register_style('style-theme', get_stylesheet_uri(), array('pretty-photo', 'icon-fonts'), false, 'all');

		wp_register_style('style-ie8', SM_THEMEURI . '/css/ie8.css', array('style-theme'), false, 'screen');
		$GLOBALS['wp_styles']->add_data('style-ie8', 'conditional', 'IE 8');
		wp_enqueue_style('style-ie8');

		wp_register_style('style-ie9', SM_THEMEURI . '/css/ie9.css', array('style-theme'), false, 'screen');
		$GLOBALS['wp_styles']->add_data('style-ie9', 'conditional', 'IE 9');
		wp_enqueue_style('style-ie9');

		wp_register_style('style-html5', 'http://html5shiv.googlecode.com/svn/trunk/html5.js', array('style-elements'), false, 'screen');
		$GLOBALS['wp_styles']->add_data('style-html5', 'conditional', 'IE 8');
		wp_enqueue_style('style-html5');

		/* Enqueue all registered styles */
		wp_enqueue_style('pretty-photo');
		wp_enqueue_style('animate');
		wp_enqueue_style('style-theme');
		
	}


	function load_functions() {
		require SM_THEMEDIR . '/inc/functions/theme_functions.php';
	}


	function theme_supports(){

		add_image_size('medium-thumb', 550, 400, true);
		add_image_size('large-thumb', 820, 400, true);
		add_image_size('square-thumb', 450, 450, true);



		remove_theme_support('custom-background');
		remove_theme_support('custom-header');

		add_theme_support('post-thumbnails');

		add_theme_support('header-social-links');
		add_theme_support('single-page-site');

		//add_theme_support('post-thumbnails', array('post', 'page', 'portfolio', 'showcase_slide', 'product'));

		// Add default posts and comments RSS feed links to head
		add_theme_support('automatic-feed-links');

		/* Add support for excerpts and entry-views to the 'page' post type. */
		add_post_type_support('page', array('excerpt'));

//		add_theme_support('woocommerce');


	}


	function create_menus() {


	}

}

	new SMAgileTheme();

endif;
