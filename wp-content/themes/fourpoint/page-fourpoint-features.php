<?php
/**
 * Template for displaying Fourpoint Features
 */
 global $theme;
 get_header(); ?>
 <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
   <header>
   	<h1><?php the_title(); ?></h1>
   	<p><?php the_field('page_description'); ?></p>
   </header>
 <?php endwhile;
 $args = array(
   'post_type' => 'fourpoint-feature',
   'order' => 'menu_order',
   'post_status' => 'publish'
 );
 $press_release_qry = new WP_Query( $args );
 ?>
 <?php if ( $press_release_qry->have_posts() ) : ?>
   <div class="copy_split">
     <?php while ( $press_release_qry->have_posts() ) : $press_release_qry->the_post(); ?>
       	<div class="side-content">
       		<aside><p><?php the_field('post_display_date') ?></p></aside>
       		<article><p><?php the_title(); ?></p>
            <?php if( !(get_field('dont_show_read_more_link')) ) : ?>
              <?php if( get_field('external_link') ) { ?>
            <a href="<?php the_field('external_link'); ?>" target="_blank">Read More</a>
              <?php } else { ?>
            <a href="<?php the_permalink(); ?>">Read More</a>
              <?php } ?>
            <?php endif; ?>
          </article>
       	</div>
     <?php endwhile; ?>
   </div>
 <?php endif; ?>
 <?php get_footer(); ?>
