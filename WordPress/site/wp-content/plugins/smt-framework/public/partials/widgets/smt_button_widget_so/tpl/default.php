<?php
/**
 * @var $id
 * @var $style
 * @var $class
 * @var $color
 * @var $type
 * @var $href
 * @var $align
 * @var $target
 * @var $text
 */

var_dump($id);
die;

echo '1';
echo do_shortcode('[smt_button id="' . $id . '" style="' . $style . '" class="' . $class . '" color="' . $color . '" type="' . $type . '" href="' . $href . '" align="' . $align . '" target="' . ($target? '_blank': '_self') . '" ]'. $text . '[/smt_button]');
echo '2';
