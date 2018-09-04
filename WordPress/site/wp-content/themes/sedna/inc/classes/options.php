<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // NO DIRECT ACCESS

if ( ! class_exists( 'SMSednaOptions' ) ):

	class SMSednaOptions extends SMThemeLoader {


		public function __construct() {

			add_action( 'init', array( $this, 'initSettings' ), 20 );

		}


//// THEME OPTIONS PANEL CONFIGURATION BEGINS

		public function initSettings() {
		}

// SET SECTION HOOKPOINTS -> START
// SET SECTION HOOKPOINTS -> FINISH

// SET THEME SPECIFIC OPTION TABS -> START
// SET THEME SPECIFIC OPTION TABS -> FINISH

//// THEME OPTIONS PANEL CONFIGURATION ENDS

	}

	new SMSednaOptions();

endif;

