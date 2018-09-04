<?php
if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS

if ( !class_exists( 'SMAgileSidebars' ) ):

	class SMAgileSidebars extends SMThemeLoader{

		public $sm_sidebars               = array();
		public $sm_sidebar_descriptions   = array();
		public $sm_active_sidebars        = array(); 

		function __construct() {

			$this->sm_sidebar_descriptions = array(
				"sidebar-1"    => __("Sidebar", 'agile'),
			);

			$this->sm_sidebars = array(
				"sidebar-1"    => __("Sidebar", 'agile'),
			);

			add_action('widgets_init',array(&$this,'register_sidebars'));

	 	}

		function register_sidebars(){

			foreach ($this->sm_sidebars as $sm_sidebarID => $sidebarName) {
				$this->register_sidebar($sm_sidebarID,$sidebarName);
			}

/*
			$agile_opt = get_option( 'agile_opt' );

			if( $agile_opt['agile-custom-sidebars'] ){

				$custom_sidebars = $agile_opt['agile-custom-sidebars'];

				foreach($custom_sidebars as $sidebar){
					$this->register_sidebar($sidebar,$sidebar);
				}

			}
*/

		}

		function register_sidebar($sm_sidebarID,$sidebarName){
			
				$description = ( isset( $this->sm_sidebar_descriptions[$sm_sidebarID] ) ) ? $this->sm_sidebar_descriptions[$sm_sidebarID] : __('User created sidebar', 'agile');
			 
					register_sidebar(array(
						'id'            => $sm_sidebarID,
						'name'          => $sidebarName,
						'before_widget' => '<aside id="%1$s" class="widget %2$s">',
						'description'   => $description,
						'after_widget'  => '</aside>',
						'before_title'  => '<h1 class="widget-title">',
						'after_title'   => '</h1>',
					));

		}

	}

	new SMAgileSidebars();

endif;
?>