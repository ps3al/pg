<?php
if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS

if ( !class_exists( 'SMSite1Sidebars' ) ):

	class SMSite1Sidebars extends SMThemeLoader{

		public $sm_sidebars               = array();
		public $sm_sidebar_descriptions   = array();
		public $sm_active_sidebars        = array(); 

		function __construct() {

			$this->sm_sidebar_descriptions = array(
				"sidebar-for-footer-column-1"    => __("Widget Area : Sidebar for Footer (column 1).", 'site1'),
				"sidebar-for-footer-column-2"    => __("Widget Area : Sidebar for Footer (column 2). ", 'site1'),
				"sidebar-for-footer-column-3"    => __("Widget Area : Sidebar for Footer (column 3). ", 'site1'),
				"sidebar-for-footer-column-4"    => __("Widget Area : Sidebar for Footer (column 4). ", 'site1'),
			);

			$this->sm_sidebars = array(
				"sidebar-for-footer-column-1"    => __("Sidebar For Footer (Column 1)", 'site1'),
				"sidebar-for-footer-column-2"    => __("Sidebar For Footer (Column 2)", 'site1'),
				"sidebar-for-footer-column-3"    => __("Sidebar For Footer (Column 3)", 'site1'),
				"sidebar-for-footer-column-4"    => __("Sidebar For Footer (Column 4)", 'site1'),
			);

			add_action('widgets_init',array(&$this,'register_sidebars'));

	 	}

		function register_sidebars(){

			foreach ($this->sm_sidebars as $sm_sidebarID => $sidebarName) {
				$this->register_sidebar($sm_sidebarID,$sidebarName);
			}


			$site1_opt = get_option( 'site1_opt' );

			if( $site1_opt['site1-custom-sidebars'] ){

				$custom_sidebars = $site1_opt['site1-custom-sidebars'];

				foreach($custom_sidebars as $sidebar){
					$this->register_sidebar($sidebar,$sidebar);
				}

			}

		}

		function register_sidebar($sm_sidebarID,$sidebarName){
			
				$description = ( isset( $this->sm_sidebar_descriptions[$sm_sidebarID] ) ) ? $this->sm_sidebar_descriptions[$sm_sidebarID] : __('User created sidebar', 'site1');
			 
				if(
					$sm_sidebarID=="sidebar-for-footer-column-1" ||
					$sm_sidebarID=="sidebar-for-footer-column-2" ||
					$sm_sidebarID=="sidebar-for-footer-column-3" ||
					$sm_sidebarID=="sidebar-for-footer-column-4"
				){

					register_sidebar(array(
						'id'            => $sm_sidebarID,
						'name'          => $sidebarName,
						'before_widget' => '<div class="footer_widget widget %2$s">',
						'description'   => $description,
						'after_widget'  => '</div>',
						'before_title'  => '<h5>',
						'after_title'   => '</h5>',
					));							
					
				}else{
					register_sidebar(array(
						'id'            => $sm_sidebarID,
						'name'          => $sidebarName,
						'before_widget' => '<div class="widget %2$s">',
						'description'   => $description,
						'after_widget'  => '</div>',
						'before_title'  => '<h5>',
						'after_title'   => '</h5>',
					));					
				} 
		} 

	}

	new SMSite1Sidebars();

endif;
?>