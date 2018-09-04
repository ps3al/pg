<?php

# Define Content Width
global $content_width;
if ( ! isset( $content_width ) ) {
	$content_width = 1170;
}

# Load the theme
if ( ! function_exists( "load_theme" ) ) {

	function load_theme() {
		require_once( get_template_directory() . '/inc/loader.php' );
		$smtheme = new SMThemeLoader();
		$smtheme->start( array( 'theme' => 'Sedna', 'slug' => 'sedna', 'version' => '1.0' ) );
	}

	load_theme();

}
