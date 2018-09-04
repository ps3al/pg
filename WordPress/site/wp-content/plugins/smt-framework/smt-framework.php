<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.smthemes.com
 * @since             1.0.0
 * @package           Smt_Framework
 *
 * @wordpress-plugin
 * Plugin Name:       SM Themes Framework
 * Plugin URI:        http://www.smthemes.com/framework
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Smart Media Themes
 * Author URI:        http://www.smthemes.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       smt-framework
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-smt-framework-activator.php
 */
function activate_smt_framework() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-smt-framework-activator.php';
	Smt_Framework_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-smt-framework-deactivator.php
 */
function deactivate_smt_framework() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-smt-framework-deactivator.php';
	Smt_Framework_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_smt_framework' );
register_deactivation_hook( __FILE__, 'deactivate_smt_framework' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-smt-framework.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_smt_framework() {

	$plugin = new Smt_Framework();
	$plugin->run();

}
run_smt_framework();
