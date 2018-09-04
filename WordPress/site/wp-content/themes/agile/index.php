<?php
/**
 * Index Template
 *
 * This is the default template.  It is used when a more specific template can't be found to display
 * posts.  It is unlikely that this template will ever be used, but there may be rare cases.
 *
 * @package Agile
 * @subpackage Template
 */

get_header(); ?>

<?php get_template_part( 'page-content' ); // Loads the reusable page-content.php template. ?>

<?php get_sidebar(); ?>

<?php get_footer();  ?>