<?php
/**
 * Footer Template
 *
 * The footer template is generally used on every page of your site. Nearly all other
 * templates call it somewhere near the bottom of the file. It is used mostly as a closing
 * wrapper, which is opened with the header.php file. It also executes key functions needed
 * by the theme, child themes, and plugins.
 *
 * @package Agile
 * @subpackage Template
 */
?>

</div><!-- #main .inner -->

<?php //mo_exec_action('end_main'); ?>

</div><!-- #main -->

<?php
//$sidebar_manager = mo_get_sidebar_manager();

//if ($sidebar_manager->is_footer_area_active()):
    ?>
    <?php //mo_exec_action('before_footer'); ?>

    <footer id="footer">

        <div class="inner">

            <?php //mo_exec_action('start_footer'); ?>

            <div id="sidebars-footer" class="clearfix">

                <?php
                //mo_exec_action('start_sidebar_footer');

                //$sidebar_manager->populate_footer_sidebars();

                //mo_exec_action('end_sidebar_footer');
                ?>

            </div>
            <!-- #sidebars-footer -->

            <?php //mo_exec_action('end_footer'); ?>

        </div>

    </footer> <!-- #footer -->

    <?php //mo_exec_action('after_footer'); ?>

<?php //endif; ?>

<footer id="footer-bottom">

    <div class="inner">

        <?php get_template_part('menu', 'footer'); // Loads the menu-footer.php template.    ?>

        <?php
//        mo_footer_content();
        // Default footer text
        $site_link = '<a class="site-link" href="' . home_url() . '" title="' . esc_attr(get_bloginfo('name')) . '" rel="home"><span>' . get_bloginfo('name') . '</span></a>';
        $wp_link = '<a class="wp-link" href="http://wordpress.org" title="' . esc_attr__('Powered by WordPress', 'mo_theme') . '"><span>' . __('WordPress', 'mo_theme') . '</span></a>';
        if (function_exists('wp_get_theme')) {
            $my_theme = wp_get_theme();
            $theme_link = '<a class="theme-link" href="' . esc_url($my_theme->ThemeURI) . '" title="' . esc_attr($my_theme->Name) . '"><span>' . esc_attr($my_theme->Name) . '</span></a>';
        }
        else {
            $theme_data = get_theme_data(trailingslashit(get_template_directory()) . 'style.css');
            $theme_link = '<a class="theme-link" href="' . esc_url($theme_data['URI']) . '" title="' . esc_attr($theme_data['Name']) . '"><span>' . esc_attr($theme_data['Name']) . '</span></a>';
        }

        $footer_text = __('Copyright &#169; ', 'mo_theme') . date(__('Y', 'mo_theme')) . ' ' . $site_link . __('. Powered by ', 'mo_theme') . $wp_link . __(' and ', 'mo_theme') . $theme_link;
        $footer_text = '<div id="footer-bottom-text">' . get_field('mo_footer_insert', 'option') . '</div>';
        echo do_shortcode($footer_text);


        ?>

        <?php echo '<a id="go-to-top" href="#" title="' . __('Back to top', 'mo_theme') . '">' . __('Go Top', 'mo_theme') . '</a>'; ?>

    </div>

</footer><!-- #footer-bottom -->

</div><!-- #container -->

<?php //mo_exec_action('end_body'); ?>

<?php wp_footer(); // wp_footer    ?>

</body>
</html>