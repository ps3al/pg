<?php

# Define Content Width
global $content_width;
if ( ! isset( $content_width ) ) {
	$content_width = 1140;
}

# Load the theme
if ( ! function_exists( "load_theme" ) ) {

	function load_theme() {
		require_once( get_template_directory() . '/inc/loader.php' );
		$smtheme = new SMThemeLoader();
		$smtheme->start( array( 'theme' => 'Agile', 'slug' => 'agile', 'version' => '1.0' ) );
	}

	load_theme();

}


add_action('init', 'your_init', 99 );

function your_init() {

	global $kc;
	$kc->locate_profile_sections( get_template_directory() . '/inc/layout1.kc' );
}





function dump_hook( $tag, $hook ) {
	ksort($hook);

	echo "<pre>>>>>>\t$tag<br>";

	foreach( $hook as $priority => $functions ) {

		echo $priority;

		foreach( $functions as $function )
			if( $function['function'] != 'list_hook_details' ) {

				echo "\t";

				if( is_string( $function['function'] ) )
					echo $function['function'];

				elseif( is_string( $function['function'][0] ) )
					echo $function['function'][0] . ' -> ' . $function['function'][1];

				elseif( is_object( $function['function'][0] ) )
					echo "(object) " . get_class( $function['function'][0] ) . ' -> ' . $function['function'][1];

				else
					print_r($function);

				echo ' (' . $function['accepted_args'] . ') <br>';
			}
	}

	echo '</pre>';
}



function list_hooks( $filter = false ){
	global $wp_filter;

	$hooks = $wp_filter;
	ksort( $hooks );

	foreach( $hooks as $tag => $hook )
		if ( false === $filter || false !== strpos( $tag, $filter ) )
			dump_hook($tag, $hook);
}

function list_hook_details( $input = NULL ) {
	global $wp_filter;

	$tag = current_filter();
	if( isset( $wp_filter[$tag] ) )
		dump_hook( $tag, $wp_filter[$tag] );

	return $input;
}

function list_live_hooks( $hook = false ) {
	if ( false === $hook )
		$hook = 'all';

	add_action( $hook, 'list_hook_details', -1 );
}

//list_live_hooks();