<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package AppStack
 */

$twitter  = get_field('twitter_text', 'option');
$facebook  = get_field('facebook_text', 'option');
$dribbble  = get_field('dribbble_text', 'option');
$pinterest  = get_field('pinterest_text', 'option');
$vimeo  = get_field('vimeo_text', 'option');
$flickr  = get_field('flickr_text', 'option');
$youtube  = get_field('youtube_text', 'option');
$behance  = get_field('behance_text', 'option');
$instagram  = get_field('instagram_text', 'option');
$linkedin  = get_field('linkedin_text', 'option');
?> 

	<footer class="site-footer">
		<div role="contentinfo" class="content">
			
			<div class="row">
				<div class="col">
			<div class="footer-links"><div></div><?php wp_nav_menu( array('menu' => 'secondary' )); ?></div>
		<div class="site-info">
			<span class="site-info-text">
				<?php $copyright = get_field('copyright', 'option'); //get_theme_mod( 'copyright' ) ?>
			<?php printf( esc_html__( '%1$s', 'appstack' ), $copyright ); ?>
			<span class="sep"> | </span>
			<?php $blog_title = get_bloginfo('name'); ?>
			<a href="<?php echo esc_attr(home_url()); ?>"><?php printf( esc_html__( '%1$s', 'appstack' ), $blog_title ); ?></a>
		</span></div><!-- .site-info -->
		
	</div>
<div class="col">
		<div class="socials"><nav>
				<ul>
									<?php if(!empty($facebook)){ ?>
									<li><a href="http://facebook.com/<?php echo esc_attr($facebook);?>" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a></li>
									<?php } ?>
									<?php if(!empty($twitter)){ ?>
									<li><a href="http://twitter.com/<?php echo esc_attr($twitter);?>" target="_blank" class="twitter"><i class="fa fa-twitter"></i></a></li>
									<?php } ?>
									<?php if(!empty($vimeo)){ ?>
									<li><a href="<?php echo esc_url($vimeo);?>" target="_blank" class="vimeo"><i class="fa fa-vimeo-square"></i></a></li>
									<?php } ?>
									<?php if(!empty($behance)){ ?>
									<li><a href="<?php echo esc_url($behance);?>" target="_blank" class="behance"><i class="fa fa-behance-square"></i></a></li>
									<?php } ?>
									<?php if(!empty($dribbble)){ ?>
									<li><a href="<?php echo esc_url($dribbble);?>" target="_blank" class="dribbble"><i class="fa fa-dribbble"></i></a></li>
									<?php } ?>
									<?php if(!empty($pinterest)){ ?>
									<li><a href="<?php echo esc_url($pinterest);?>" target="_blank" class="pinterest"><i class="fa fa-pinterest"></i></a></li>
									<?php } ?>
									<?php if(!empty($instagram)){ ?>
									<li><a href="<?php echo esc_url($instagram);?>" target="_blank" class="instagram"><i class="fa fa-instagram"></i></a></li>
									<?php } ?>
									<?php if(!empty($flickr)){ ?>
									<li><a href="<?php echo esc_url($flickr);?>" target="_blank" class="flickr"><i class="fa fa-flickr"></i></a></li>
									<?php } ?>
									<?php if(!empty($linkedin)){ ?>
									<li><a href="<?php echo esc_url($linkedin);?>" target="_blank" class="linkedin"><i class="fa fa-linkedin"></i></a></li>
									<?php } ?>
									<?php if(!empty($youtube)){ ?>
									<li><a href="<?php echo esc_url($youtube);?>" target="_blank" class="youtube"><i class="fa fa-youtube"></i></a></li>
									<?php } ?>
																			</ul>
			</nav></div>
		</div>
		
		</div>
	</div>
		</footer>
	<a href="#page" class="cd-top">Top</a>
</div></div>
<?php wp_footer();?>

</body>
</html>


