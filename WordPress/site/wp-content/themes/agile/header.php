<?php
/**
 * Header Template
 *
 * This template is loaded for displaying header information for the website. Called from every page of the website.
 *
 * @package Agile
 * @subpackage Template
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>"/>

    <meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <title><?php wp_title('|', true, 'right');
        bloginfo('name'); ?></title>

    <!-- For use in JS files -->
    <script type="text/javascript">
        var template_dir = "<?php echo get_template_directory_uri(); ?>";
    </script>

    <link rel="profile" href="http://gmpg.org/xfn/11"/>

    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>

    <?php //mo_setup_theme_options_for_scripts(); ?>

    <?php wp_head(); // wp_head  ?>

</head>

<body <?php body_class(); ?>>

<?php

    echo '<div id="page-loading"></div>';

?>

<?php //mo_exec_action('start_body'); ?>

<?php echo '<a id="mobile-menu-toggle" href="#"><i class="icon-th-menu"></i>&nbsp;</a>'; ?>

<?php get_template_part('menu', 'mobile'); // Loads the menu-mobile.php template.    ?>

<div id="container">

    <?php //mo_exec_action('before_header'); ?>

    <?php
    $header_classes = apply_filters('mo_header_class', array());
    if (!empty($header_classes))
        $header_classes = 'class="' . implode(' ', $header_classes) . '"';
    else
        $header_classes = '';
    ?>

    <header id="header" <?php echo $header_classes; ?>>

        <div class="inner clearfix">

            <div class="wrap">

                <?php //mo_exec_action('start_header');

//                mo_site_logo();
                $heading_tag = (is_home() || is_front_page()) ? 'h1' : 'div';

                $blog_name = esc_attr(get_bloginfo('name'));

                $output = '<' . $heading_tag . ' id="site-logo"><a href="' . home_url('/') . '" title="' . $blog_name . '" rel="home">';

                $use_text_logo = get_field('agile_use_text_logo','option') ? true : false;
                $logo_url = get_field('agile_site_logo','option');

                // If no logo image is specified, use text logo
                if ($use_text_logo || empty ($logo_url)) {
                    $output .= '<span>' . $blog_name . '</span>';
                }
                else {
                    $output .= '<img class="standard-logo" src="' . $logo_url . '" alt="' . $blog_name . '"/>';
                }

                $output .= '</a></' . $heading_tag . '>';

                echo $output;





//                mo_site_description();
                $display_desc = get_field('agiple_display_site_desc','option') ? true : false;
                $display_desc = false; // no support for description now
                if ($display_desc) {
                    echo '<div id="site-description"><span>' . bloginfo('description') . '</span></div>';
                }







//                mo_display_sidebar('header');
                dynamic_sidebar('header');

//                mo_exec_action('header');

                get_template_part('menu', 'primary'); // Loads the menu-primary.php template.

//                mo_exec_action('end_header'); ?>


            </div>

        </div>

    </header>
    <!-- #header -->

    <?php //mo_exec_action('after_header'); ?>

    <?php

    $slider_type = get_post_meta(get_the_ID(), 'mo_slider_choice', true);
    if (!is_search() && !is_archive() && !empty($slider_type) && $slider_type != 'None') {
        $slider_manager = mo_get_slider_manager();
        $slider_manager->display_slider_area();
        return;
    }

    $remove_title_header = get_post_meta(get_the_ID(), 'mo_remove_title_header', true);
    if (!empty($remove_title_header))
        return;

    if (is_home() && mo_get_theme_option('mo_remove_homepage_tagline'))
        return;

    if (is_singular(array('post', 'page', 'portfolio'))) {


        $custom_heading = '';
        $custom_heading = get_post_meta(get_queried_object_id(), 'mo_custom_heading_content', true);



        if (!empty($custom_heading)) {
            echo '<header id="custom-title-area">';
            $wide_heading_layout = get_post_meta(get_queried_object_id(), 'mo_wide_heading_layout', true);
            if (empty($wide_heading_layout))
                echo '<div class="inner">';
            else
                echo '<div class="wide">';
            echo do_shortcode($custom_heading);
            echo '</div>';
            echo '</header> <!-- custom-title-area -->';
            return;
        }
    }

    echo '<header id="title-area" class="clearfix">';
    echo '<div class="inner">';

//    mo_populate_tagline();
    $done = apply_filters('mo_show_page_title', null);
    if ($done)
        return;

    /* Default tagline for blog */
    $tagline = get_field('mo_blog_tagline','option');

    if (is_attachment()) {
        echo '<h1>' . __('Media', 'mo_theme') . '</h1>';
    }
    elseif (is_home()) {
        /* If a separate front page has been set along with this posts page, use Blog as default title, else use Site Title as default */
        if (get_option('page_on_front'))
            $default_homepage_title = __('Blog', 'mo_theme');
        else
            $default_homepage_title = get_bloginfo('name');

        $blog_page_tagline = get_field('mo_posts_page_tagline', 'option');

        echo '<h2 class="tagline">' . $blog_page_tagline . '</h2>';
    }
    elseif (is_singular('post')) {
        echo '<h2 class="tagline">' . $tagline . '</h2>';
    }
    elseif (is_archive() || is_search()) {
        get_template_part('loop-meta'); // Loads the loop-meta.php template.
    }
    elseif (is_404()) {
        echo '<h1>' . __('404 Not Found', 'mo_theme') . '<h1>';
    }
    else {
//        echo mo_get_entry_title(); // populate entry title for page and custom post types like portfolio type

        global $post;

        if (is_front_page() && !is_home())
            $title = the_title('<h2 class="' . esc_attr($post->post_type) . '-title entry-title"><a href="' . get_permalink() . '"
                                                                                        title="' . get_the_title() . '"
                                                                                        rel="bookmark">', '</a></h2>',
                false);
        elseif (is_singular())
            $title = the_title('<h1 class="' . esc_attr($post->post_type) . '-title entry-title">', '</h1>', false);
        else
            $title = the_title('<h2 class="entry-title"><a href="' . get_permalink() . '" title="' . get_the_title() . '"
                                               rel="bookmark">', '</a></h2>', false);

        /* If there's no post title, return a default title */
        if (empty($title)) {
            if (!is_singular()) {
                $title = '<h2 class="entry-title no-entry-title"><a href="' . get_permalink() . '" rel="bookmark">' . __('(Untitled)',
                        'mo_theme') . '</a></h2>';
            }
            else {
                $title = '<h1 class="entry-title no-entry-title">' . __('(Untitled)', 'mo_theme') . '</h1>';
            }
        }

        echo $title;


    }
    $description = get_post_meta(get_queried_object_id(), 'mo_description', true);
    if (!empty ($description)) {
        echo '<div class="post-description">';
        echo '<p>' . $description . '</p>';
        echo '</div>';
    }





    echo '</div>';
    echo '</header> <!-- title-area -->';

    ?>

    <div id="main" class="clearfix">

        <?php //mo_exec_action('start_main'); ?>

        <div class="inner clearfix">