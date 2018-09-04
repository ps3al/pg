<?php
if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS

if ( !class_exists( 'SMAppStackAdmin' ) ):

class SMAppStackAdmin extends SMThemeLoader{


	public function __construct() {


//	function admin_init(){

		// Load text domain
//		load_theme_textdomain('sipsak', get_template_directory().'/languages' );

//		require_once (SM_THEMELOADERDIR.'/classes/options.php');


		//Load Scripts
		add_action('admin_enqueue_scripts', array(&$this,'load_admin_scripts'));
		
		//Load Styles
		add_action('admin_enqueue_scripts', array(&$this,'load_admin_styles'));	 
		

	} 

	#
	#	Load Admin Scripts
	#

	function load_admin_scripts(){

	}

	#
	#	Load Admin Styles
	#
	
	function load_admin_styles(){
		
	}



}

new SMAppStackAdmin();

endif;
?>
