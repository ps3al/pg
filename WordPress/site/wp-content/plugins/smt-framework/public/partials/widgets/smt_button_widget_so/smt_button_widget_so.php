<?php

/*
Widget Name: SMT Button
Description: Renders a button with multiple styles.
Author: SM Themes
Author URI: http://portfoliotheme.org
*/

class SMT_Button_Widget_SO extends SiteOrigin_Widget {


    function __construct() {
        //Here you can do any preparation required before calling the parent constructor, such as including additional files or initializing variables.

        //Call the parent constructor with the required arguments.
        parent::__construct(
            "smt_button_widget_so",
            __("SMT Button", "agile"),
            array(
                "description" => __("SMT Renders a button with multiple styles..", "agile"),
                "panels_icon" => "dashicons dashicons-minus",
            ),
            array(),
            array(
                "widget_title" => array(
                    "type" => "text",
                    "label" => __("Title", "agile"),
                ),

                "id" => array(
                    "type" => "text",
                    "description" => __("The element id", "agile"),
                    "label" => __("Id", "agile")
                ),
                "style" => array(
                    "type" => "text",
                    "description" => __("Inline CSS styling for the button DIV element.", "agile"),
                    "label" => __("Style", "agile")
                ),
                "class" => array(
                    "type" => "text",
                    "description" => __("The CSS class name for the button DIV element.", "agile"),
                    "label" => __("Class", "agile"),
                    "default" => "",
                ),
                "color" => array(
                    "type" => "select",
                    "description" => __("The color of the button.", "agile"),
                    "label" => __("Color", "agile"),
                    "options" => array(
                        "default" => __("Default", "agile"),
                        "theme" => __("Theme", "agile"),
                        "black" => __("Black", "agile"),
                        "blue" => __("Blue", "agile"),
                        "cyan" => __("Cyan", "agile"),
                        "green" => __("Green", "agile"),
                        "orange" => __("Orange", "agile"),
                        "pink" => __("Pink", "agile"),
                        "red" => __("Red", "agile"),
                        "teal" => __("Teal", "agile"),
                        "trans" => __("Trans", "agile"),
                    )
                ),
                "type" => array(
                    "type" => "select",
                    "label" => __("Button Size", "agile"),
                    "options" => array(
                        "large" => __("Large", "agile"),
                        "small" => __("Small", "agile"),
                        "rounded" => __("Rounded", "agile"),
                    )
                ),
                "href" => array(
                    "type" => "link",
                    "description" => __("The URL to which button should point to.", "agile"),
                    "label" => __("Target URL", "agile"),
                    "default" => __("http://targeturl.com", "agile"),
                ),
                "align" => array(
                    "type" => "select",
                    "description" => __("Alignment of the button and text alignment of the button title displayed.", "agile"),
                    "label" => __("Align", "agile"),
                    "options" => array(
                        "center" => __("Center", "agile"),
                        "left" => __("Left", "agile"),
                        "right" => __("Right", "agile"),
                    )
                ),
                "target" => array(
                    "type" => "checkbox",
                    "description" => __("Open the link in new window.", "agile"),
                    "label" => __("Open the link in new window", "agile"),
                    "default" => true,
                ),
                "text" => array(
                    "type" => "text",
                    "description" => __("The button title or text. ", "agile"),
                    "label" => __("Button Text", "agile"),
                    "default" => __("Buy Now", "agile"),
                ),
            )
        );

        add_action( 'admin_head', array(&$this,'admin_inline_js' ));

    }

    function admin_inline_js(){
        ?>
        <script type="text/javascript">
            (function($) {
                $(document).ready(function () {
//						alert(1);
                    $("[id*='<?php echo '-button-widget-';?>']").remove();
                });
            })(jQuery);
        </script>
        <?php
    }

    function get_style_name($instance) {
        return '';
    }

    function get_template_name($instance) {
        return 'view';
    }

    function get_template_dir($instance) {
        return 'template';
    }


    function get_template_variables($instance, $args) {
//        var_dump($args);
//        die;
        return array(
            "id" => $instance["id"],
            "style" => $instance["style"],
            "class" => $instance["class"],
            "color" => $instance["color"],
            "type" => $instance["type"],
            "href" => (!empty($instance['href'])) ? sow_esc_url($instance['href']) : '',
            "align" => $instance["align"],
            "target" => $instance["target"],
            "text" => $instance["text"],
        );
    }


}

siteorigin_widget_register('smt_button_widget_so', __FILE__, 'SMT_Button_Widget_SO');

function button_img_src( $banner_url, $widget_meta ) {
    if( $widget_meta['ID'] == 'smt-button-widget-so') {
        $banner_url = plugin_dir_url(__FILE__) . 'inc/widgets/button/assets/banner.svg';
    }
    return $banner_url;
}
//add_filter( 'siteorigin_widgets_widget_banner', 'button_img_src', 10, 2);
