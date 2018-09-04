<?php

class SMThemeLoader {

	function start( $v ) {

		$this->theme_constants( $v );
		$this->load_classes( $v );

	}

	function theme_constants( $v ) {
		if ( ! defined( 'SM_THEMENAME' ) ) {
			define( 'SM_THEMENAME', $v['theme'] );
		}
		if ( ! defined( 'SM_THEMESLUG' ) ) {
			define( 'SM_THEMESLUG', $v['slug'] );
		} // a unique slugname for this theme
		if ( ! defined( 'SM_THEMEVERSION' ) ) {
			define( 'SM_THEMEVERSION', $v['version'] );
		}
		if ( ! defined( 'SM_THEMEDIR' ) ) {
			define( 'SM_THEMEDIR', get_template_directory() );
		}
		if ( ! defined( 'SM_THEMEURI' ) ) {
			define( 'SM_THEMEURI', get_template_directory_uri() );
		}
		if ( ! defined( 'SM_THEMELOADERDIR' ) ) {
			define( 'SM_THEMELOADERDIR', get_template_directory() . '/inc' );
		}
		if ( ! defined( 'SM_WPADMINURI' ) ) {
			define( 'SM_WPADMINURI', get_admin_url() );
		}

		if ( ! defined( 'SM_BLOGURL' ) ) {
			if ( function_exists( 'icl_get_home_url' ) ) {
				define( 'SM_BLOGURL', icl_get_home_url() );
			} else {
				define( 'SM_BLOGURL', home_url() );
			}
		}

	}

	function load_classes( $v ) {

		if ( is_admin() ) {
			require get_template_directory() . '/inc/classes/admin.php';
//			require_once( SM_THEMELOADERDIR . '/classes/admin.php' );

			require get_template_directory() . '/inc/plugins/class-tgm-plugin-activation.php';
//			include( SM_THEMELOADERDIR . "/plugins/class-tgm-plugin-activation.php" );
			add_action( 'tgmpa_register', array( &$this, 'activate_plugins' ) );
		}

		require get_template_directory() . '/inc/classes/theme.php';
//		require_once( SM_THEMELOADERDIR . '/classes/theme.php' );

	}

	function activate_plugins() {

		$plugins = array(
			array(
				'name'               => 'SMT-FRAMEWORK | Extensions Plugin',
				// The plugin name
				'slug'               => 'smt-framework',
				// The plugin slug (typically the folder name)
				'source'             => 'https://github.com/smemis/WordPress/raw/master/assets/smt-framework.zip',
				// The plugin source
				'required'           => true,
				// If false, the plugin is only 'recommended' instead of required
				'version'            => '1.0',
				// E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
				'force_activation'   => false,
				// If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
				'force_deactivation' => false,
				// If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
				'external_url'       => 'https://github.com/smemis/WordPress/raw/master/assets/smt-framework.zip',
				// If set, overrides default API URL and points to an external URL
			),
			array(
				'name'               => 'Page Builder by SiteOrigin',
				// The plugin name
				'slug'               => 'siteorigin-panels',
				// The plugin slug (typically the folder name)
				'required'           => true,
				// If false, the plugin is only 'recommended' instead of required
			),
			array(
				'name'               => 'SiteOrigin Widgets Bundle',
				// The plugin name
				'slug'               => 'so-widgets-bundle',
				// The plugin slug (typically the folder name)
				'required'           => true,
				// If false, the plugin is only 'recommended' instead of required
			),
			array(
				'name'               => 'Shortcodes Ultimate',
				// The plugin name
				'slug'               => 'shortcodes-ultimate',
				// The plugin slug (typically the folder name)
				'required'           => false,
				// If false, the plugin is only 'recommended' instead of required
			),

		);

		// Change this to your theme text domain, used for internationalising strings
		$theme_text_domain = SM_THEMESLUG;

		/*  for PRO users! - *
		 * Array of configuration settings. Amend each line as needed.
		 * If you want the default strings to be available under your own theme domain,
		 * leave the strings uncommented.
		 * Some of the strings are added into a sprintf, so see the comments at the
		 * end of each line for what each argument will be.
		 */
		$config = array(
			'is_automatic'     => true,
			// Automatically activate plugins after installation or not
		);

		tgmpa( $plugins, $config );
	}

}

?>