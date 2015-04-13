(function($){
	
window.itemCatContentString = new Array(0);
window.itemCatContentSelect = new Array('');
window.itemCatFlitered = new Array(0);
window.itemCatFliteredIndex = new Array(0);
window.itemInitialArray = new Array(0,0);
window.columnSelectVar = 0;	
window.iterationCounter = 0;
/* FORM */

$(document).ready(function(){
	$('form').each(function(){
		$(this).find('input,textarea').focus(function(){
			if($(this).attr('data-value')==$(this).val()){
				$(this).val('');
			}	
		});
		$(this).find('input,textarea').focusout(function(){
			if($(this).val() === ''){
				$(this).val($(this).attr('data-value'));
			}	
		});
	});
	
/*  twitter  */
/*$('.tweet-list').each(function(){
	var $this = $(this);
	$.get('twitter.php?list=true',function(ret){
		$this.html(ret);
	});
});	

$('.single-twitter-post').each(function(){
	var $this = $(this);
	$.get('twitter.php',function(ret){
		$this.html(ret);
	});
});*/

var submitFlag = false;
$(document).on('click', 'form > input, form > button', function(e){
	e.preventDefault();
	var mailAdress = $(this).closest('form').find('input[placeholder="E-MAIL ADRESS"]').val();
	if(mailAdress.indexOf('@') > 0 && mailAdress.indexOf('.') > 0 && mailAdress.length > 6){
		$(this).closest('form').find('input[type="text"]').each(function(){
			var inputVal = $(this).val().trim();
			if(inputVal === "" && typeof $(this).val() !== "undefined") submitFlag = false;
			else submitFlag = true;
		});
		if(submitFlag === true)	$(this).closest('form').submit();
	}
});
$(document).on('submit', 'form', function(e){
	if(submitFlag !== true)	e.preventDefault();
});

$(document).on('click', '.submenu-trigger', function(e){
	e.preventDefault();
	if($(this).closest('li').find('ul').hasClass('opened')){
		$(this).closest('li').find('ul').stop(true).animate({height : 0},250,function(){$(this).removeClass('opened');});
	}
	else{
		var liHeight = $(this).closest('li').outerHeight()+1;
		var liLength = $(this).closest('li').find('li').length;
		$(this).closest('li').find('ul:first').addClass('opened').stop(true).animate({height : liHeight * liLength}, 200);
		$(this).closest('li').find('ul:not(:first)').each(function(){
			var subHeight = $(this).find('li').length * liHeight;
			$(this).css({height : subHeight},10);
		});
	}
});

		/*  Prevent Default - Default for all links  */
	$(document).on('click', 'a', function(e){
		if($(this).attr('href').length < 2)
		e.preventDefault();
	});
	
	$('.extension-on-hover').each(function(){
		var startLeft = $(this).parent().find('.cathegory-title').width() - 16;
		$(this).css({"left" : startLeft});
	});
	
	$(document).on('mouseenter', '.blog-image-wrap', function(){
		var $elementWidth = $(this).find('.cathegory-title').width() + 16;
		$(this).find('.extension-on-hover').stop(true).animate({left : $elementWidth}, 250);
	});
	$(document).on('mouseleave', '.blog-image-wrap', function(){
		var startLeft = $(this).find('.cathegory-title').width() - 16;
		$(this).find('.extension-on-hover').stop(true).animate({left : startLeft}, 250);
	});

	$(document).on('show', '.accordion', function (e) {
         $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    });

    $(document).on('hide', '.accordion', function (e) {
        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
    });
	
		/*  Blog search  */
		var $inpWid = $('input.search-query').closest('form').parent().width();
		$('input.search-query').closest('form').css({width : 94});
		$('input.search-query').css({width : 54});
	$('input.search-query').focusin(function(){
		var $inpWid = $(this).closest('form').parent().width();
		$(this).closest('form').addClass('search-border');
		$(this).closest('form').stop(true).animate({width : $inpWid-5}, 300);
		$(this).stop(true).animate({width : $inpWid - 45}, 300);
	});
	$('input.search-query').focusout(function(){
		$(this).closest('form').removeClass('search-border');
		$(this).closest('form').stop(true).animate({width : 94}, 300);
		$(this).stop(true).animate({width : 54}, 300);
	});
	
	/*  Footer submit  */
	$('.about-footer-txt .form-search input').focusin(function(){
		$(this).closest('form').addClass('search-border');
	});
	$('.about-footer-txt .form-search input').focusout(function(){
		$(this).closest('form').removeClass('search-border');
	});
	
	/*  Shop - Rating  */
	$('.product-rating').each(function(index){
		var $activeRating = $(this).find('a').attr('data-value');
		$(this).find('i').each(function(){
			if($(this).index()+1 <= $activeRating){
				$(this).addClass('rated');
			}
		});
	});
	$('.product-rating a i').click(function(){
		var rateClicked = $(this).index();
		$(this).parent().find('i').removeClass('rated');
		$(this).parent().find('i').each(function(){
			if($(this).index() <= rateClicked){
				$(this).addClass('rated');
			}
		});
	});
	$(document).on('click', '.team-members-list li', function(){
		var $blockHeight = $(this).find('.inner-hover-wrap').height();
		var $blockMargin = parseInt($(this).find('.inner-hover-wrap').css("marginTop"));
		var $elementH = $blockHeight + $blockMargin;
		if($(this).find('.hover-wrapper').data('closing') === true) {
			$(this).find('.hover-wrapper').data('closing', false);
		}
		else {
			$(this).parent().find('.opened').find('.team-close').trigger('click').closest('.hover-wrapper').removeClass('opened');
			$(this).find('.hover-wrapper').addClass('opened').stop(true).animate({height : $elementH}, 300);
		}
	});
	$(document).on('click', '.team-close', function(){
		$(this).parent().parent().data('closing', true).stop(true).animate({height : '2px'}, 200);
		$(this).parent().parent().removeClass('opened');
	});
	$(document).on('mouseenter', 'img.stat-team', function(){
		var $bgColor = $(this).attr('data-color');
		$(this).stop(true).animate({backgroundColor : $bgColor}, 300);
		$(this).parent().find('.img-triangle').stop(true).animate({borderLeftColor : $bgColor}, 300);
		$(this).parent().find('.img-triangle').stop(true).animate({borderTopColor : $bgColor}, 300);
	});
	$(document).on('mouseleave', 'img.stat-team', function(){
		$(this).stop(true).animate({backgroundColor : 'transparent'}, 200);
		$(this).parent().find('.img-triangle').stop(true).animate({borderColor : 'transparent'}, 200);
	});
	$(document).on('mouseenter' , '.port-item-socials a, .blogpost-socials a, .social-footer a', function(){
		var $bgColor = $(this).attr('data-color');
		$(this).find('.static').stop(true).animate({opacity : 0}, 300);
		$(this).find('.dynamic').stop(true).animate({opacity : 1}, 300);
		$(this).stop(true).animate({backgroundColor : $bgColor}, 300);
		$(this).find('.port-item-soch').stop(true).animate({borderLeftColor : $bgColor, borderTopColor : $bgColor}, 300);
	});
	$(document).on('mouseleave', '.port-item-socials a, .blogpost-socials a, .social-footer a', function(){
		$(this).find('.static').stop(true).animate({opacity : 1}, 300);
		$(this).find('.dynamic').stop(true).animate({opacity : 0}, 300);
		$(this).stop(true).animate({backgroundColor : 'transparent'}, 300);
		$(this).find('.port-item-soch').stop(true).animate({borderColor : 'transparent'}, 300);
	});
	$(document).on('click', 'a.reply-blog-post', function(){
		var $clonedForm = $('#blogpost-form').clone();
		var $formHeight = $('#blogpost-form').outerHeight();
		$clonedForm.css({height : 0});
		if(!$(this).closest('.post-reply-wrap').find('#blogpost-form').is(':animated')){
			if($(this).hasClass('formIn')){
				$(this).closest('.post-reply-wrap').find('#blogpost-form').stop(true).animate({height : 0}, 300,function(){
					$(this).remove();
				});
				$(this).removeClass('formIn');
			}
			else{
				$('.formIn').trigger('click');
				$(this).addClass('formIn');
				$(this).closest('.post-reply-wrap').append($clonedForm).find('#blogpost-form').stop(true).animate({height : $formHeight+24}, 300);
			}
		}
	});
	$('.square-portfolio li').each(function(){
		var $textWrapHeight = $(this).find('.image-text').outerHeight();
		$(this).find('.image-text').css({bottom : -$textWrapHeight});
	});
	$('.square-portfolio li a').hover(function(){
		var $singleImgHeight = $(this).find('.gal-port-imgs img').height();
			$(this).find('.gal-port-imgs').stop(true).animate({top : -$singleImgHeight},300);
			$(this).find('.image-text').stop(true).animate({bottom : 0},300);
		},function(){
			var $textWrapHeight = $(this).find('.image-text').outerHeight();
			$(this).find('.gal-port-imgs').stop(true).animate({top : 0},300);
			$(this).find('.image-text').stop(true).animate({bottom : -$textWrapHeight},300);
	});
	/*  Shop Hover  */
	var $textWrapHeight = $(this).find('.product-details-hover').outerHeight();
	$('.product-details-hover').css({bottom : -$textWrapHeight});
	$(document).on('mouseenter', '.single-product-wrapper', function(){
		var $singleImgHeight = $(this).find('img').height();
		$(this).find('.shop-port-imgs').stop(true).animate({top : -$singleImgHeight}, 300);
		$(this).find('.product-details-hover').stop(true).animate({bottom : 0}, 300);
	});
	$(document).on('mouseleave', '.single-product-wrapper', function(){
		$(this).find('.shop-port-imgs').stop(true).animate({top : 0}, 300);
		$(this).find('.product-details-hover').stop(true).animate({bottom : -$textWrapHeight}, 300);
	});
//					SLIDING TABS
	$('.sliding_tabs_wrapper.fullwidth_sliding_tabs').each(function(index){
		$(this).find('.sliding_tabs_content_wrapper').parent().append('<div class="sliding_tabs_target'+index+'"></div>');
		$(this).attr('data-index', index);
	}); 
	$(document).on('click', '.sliding_tabs_nav li a', function(e){
		e.preventDefault();
		if(!$(this).closest('li').hasClass('active')) {
			$(this).closest('.sliding_tabs_wrapper').find('.clone').animate({opacity :0}, 300, function(){$(this).remove();});
			$(this).closest('.sliding_tabs_nav').find('li').removeClass('active');
			$(this).closest('li').addClass('active');
			window.slidingTabsAnchor = $(this).attr('href');
			window.slidingTabsWidth = $(this).closest('.sliding_tabs_wrapper').find('.sliding_tabs_content_wrapper').width();
			$(this).closest('.sliding_tabs_wrapper').find('.sliding_tabs_content_wrapper').find('.sliding_tabs_visible').stop().animate({'left': -window.slidingTabsWidth}, 600, function(){
				$(this).removeClass('sliding_tabs_visible');
				$(this).closest('.sliding_tabs_content_wrapper').find(window.slidingTabsAnchor).addClass('sliding_tabs_visible');
				$(this).hide();	
			});
			$(this).closest('.sliding_tabs_wrapper').find(window.slidingTabsAnchor).addClass('sliding_tabs_visible');		
			$(this).closest('.sliding_tabs_wrapper').find('.sliding_tabs_content_wrapper').find(window.slidingTabsAnchor).css({'left' : window.slidingTabsWidth}).show().stop().animate({'left':0}, 600);
			if ($(this).closest('.sliding_tabs_wrapper').hasClass('fullwidth_sliding_tabs')){
				var fstSelectL = $(this).closest('li').index()-1;
				var fstSelectR = $(this).closest('li').index()+1;
				if(fstSelectL < 0) {fstSelectL = $(this).closest('.sliding_tabs_nav').find('li').length-1; }
				if(fstSelectR>$(this).closest('.sliding_tabs_nav').find('li').length-1) {fstSelectR = 0;}
				$this = $(this);
					var fstsel = $(this).closest('.sliding_tabs_wrapper');
					var fsttar = $(this).find('.sliding_tabs_target');
					var fstclone = fstsel.find('.sliding_tabs_content').eq(fstSelectL).clone().addClass('clone left_clone').insertAfter('.sliding_tabs_target'+fstsel.attr('data-index')).show().css({opacity :0,left:'-100%'}).show().stop(true).delay(400).animate({opacity: 0.4}, 600);
			}
		}
		
	});
	$('.sliding_tabs_nav').each(function(){	
		$(this).find('li a:first').trigger('click');
	});
	
//				blog posts 
$('.blog_main_image_wrapper').each(function(index){
		$(this).closest('.blog-post').attr({'id' : 'b-postid'+index});
		$(this).closest('.blog-post').find('.blog_opening_trigger').attr({'href' : '#b-postid'+index});
	});
$('.blog-initial-content-wrapper').each(function(){
	window.iterationCounter = 0;
	while (window.iterationCounter < $('.blog-initial-content-wrapper').find('.blog-post').length) {
		window.itemInitialArray[window.iterationCounter] = $(this).find('#b-postid'+window.iterationCounter).clone(true, true);
		window.iterationCounter++;
	}
	});
/*  CART  */
$(document).ready(function(){
	$('.cart_arr_up, .cart_arr_down').click(function(e){
		e.preventDefault();
		var value = parseInt($(this).parent().find('input').val());
		if($(this).hasClass('cart_arr_up')){
			value++;
			$(this).parent().find('input').val(value);
		}
		else{
			if(value>0){
				value--;
				$(this).parent().find('input').val(value);
			}
		}
	});
});
itemInitialSorting();

//		categories
	$('.blog-category-select').find('a').on('click', function(e){
		e.preventDefault();
		if(!$(this).parent().hasClass('active')){
			itemCategorization($(this));
			$(this).closest('.blog-category-select').children('li').removeClass('active');
			$(this).parent().addClass('active');
		}

	});
//		opening
	$(document).on('click', '.blog_content_opening_trigger', function(e){
		e.preventDefault();
		if (!$(this).hasClass('clicked')) {
			$(this).closest('.blog-post').find('.extension-on-hover i').removeClass('icon-arrow-down').addClass('icon-arrow-up');
			anchorToTarget($(this).closest('.blog-post').find('.blog_opening_trigger'));
			window.blogPostOpeningImgDataHeight = $(this).closest('.blog-post').find('.blog_main_image_wrapper img').height();
			$(this).closest('.blog-post').find('.blog_main_image_wrapper').stop(true).animate({height:window.blogPostOpeningImgDataHeight}, 300).find('img').stop(true).animate({top: 0}, 300);
			$(this).closest('.blog-post').find('.blog_main_content_wrapper').each(function(){
				window.blogPostOpeningContentHeight = $(this).children('div').height();
				$(this).children('div').stop(true).animate({opacity :1}, 150);
				$(this).stop(true).animate({height: window.blogPostOpeningContentHeight}, 300);
			});
			window.blogPostOpeningReadMore = $(this).children('span.read-more-text').html();
			$(this).attr('data-text', window.blogPostOpeningReadMore);
			$(this).html($(this).attr('data-alttext')+'<span class="read-more-plus">-</span>').addClass('clicked');
		
		} else {
			$(this).closest('.blog-post').find('.extension-on-hover i').removeClass('icon-arrow-up').addClass('icon-arrow-down');
			$(this).closest('.blog_initial_content_wrapper').find('.blog_main_image_wrapper img').each(function(){
				window.blogPostOpeningImgDataHeight = $(this).attr('data-height2');
			});
			
			$(this).closest('.blog-post').find('.blog_main_image_wrapper').stop(true).animate({height: 150}, 300);
			$(this).closest('.blog-post').find('.blog_main_image_wrapper img').stop(true).animate({top: -window.blogPostOpeningImgDataHeight/4}, 300);
			$(this).closest('.blog-post').find('.blog_main_content_wrapper').each(function(){
				window.blogPostOpeningContentHeight = $(this).children('div').height();
				$(this).children('div').stop(true).animate({opacity :0}, 150);
				$(this).stop(true).animate({height: 0}, 300);
			});
			
			window.blogPostOpeningReadMore =($(this).attr('data-text')+'<span class="read-more-plus">+</span>');
			$(this).html(window.blogPostOpeningReadMore).removeClass('clicked');
		}
		
	});	
	$(document).on('click', '.blog_opening_trigger', function(e){
		e.preventDefault();
		$(this).closest('.blog-post').find('.blog_content_opening_trigger').trigger('click');
		});
//		post comment	
	$(document).on('click', '.blog_content_form_trigger', function(e) {
		e.preventDefault();		
		if(!$(this).hasClass('opened')) {
		$(this).closest('.blog-post').find('.blog_content_comment_form').stop().animate({height : $(this).closest('.blog-post').find('.blog_content_comment_form > form').css('height'), 'margin-bottom': 24, opacity: 1}, 500);
		$(this).addClass('opened');
		} else {
			$(this).closest('.blog-post').find('.blog_content_comment_form').stop().animate({height : 0, 'margin-bottom': 0, opacity: 0}, 500);
			$(this).removeClass('opened');
		}
		
	});
//		comments opening
	$(document).on('click', '.blog_content_comments_trigger', function(e) {
		e.preventDefault();	
		if(!$(this).hasClass('opened')) {	
			$(this).closest('.blog-post').find('.blog_content_comments').stop().animate({height : $(this).closest('.blog-post').find('.blog_content_comments > div').css('height'), opacity: 1}, 500);
			$(this).closest('.blog-post').find('.blog_content_comment_form').stop().animate({height :$(this).closest('.blog-post').find('.blog_content_comment_form > form').css('height'), 'margin-bottom': 24, opacity: 1}, 500);
			$(this).closest('.blog-post').find('.blog_content_form_trigger').addClass('opened');
			$(this).addClass('opened');
		} else {
			$(this).closest('.blog-post').find('.blog_content_comments').stop().animate({height : 0, opacity: 0}, 500);
			$(this).removeClass('opened');
			$(this).closest('.blog-post').find('.blog_content_comment_form').stop().animate({height : 0, 'margin-bottom': 0, opacity: 0}, 500);
			$(this).closest('.blog-post').find('.blog_content_form_trigger').removeClass('opened');
		}
	});	
//		list type switch 
	$('.grid-layout-select').find('a').eq(1).on('click', function(e){
		e.preventDefault();
		$('.blog_content_opening_trigger').each(function(){
			if($(this).hasClass('clicked')) {
				$(this).trigger('click');
			}
		});
			if(!$(this).parent().hasClass('active')) {
				$('.blog-category-select').children('li').removeClass('active');
				$('.blog-category-select').children('li:first').addClass('active');
				$('.column_item_category_sorter_content').animate({opacity : 0}, 300, function(){
					itemInitialUnsorting();
				$(this).find('.blog_main_image_wrapper img').each(function(){
					var imgHeight = parseInt($(this).height())/2- parseInt($(this).parent().height())/2;
					$(this).css({top : -imgHeight}).attr('data-height', $(this).height());
				});
					$('.blog-initial-content-wrapper').animate({opacity : 1}, 300);
				});
				$(this).parent().parent().find('li').removeClass('active');
				$(this).parent().addClass('active');
			}
	});
	$('.grid-layout-select').find('a').eq(0).on('click', function(e){
		e.preventDefault();
		if(!$(this).parent().hasClass('active')) {
			$('.blog-category-select').children('li').removeClass('active');
			$('.blog-category-select').children('li:first').addClass('active');
			$('.blog-initial-content-wrapper').animate({opacity : 0}, 300, function(){
				itemInitialSorting();
				$(this).find('.blog_main_image_wrapper img').each(function(){
					var imgHeight = parseInt($(this).height())/2- parseInt($(this).parent().height())/2;
					$(this).css({top : -imgHeight}).attr('data-height', $(this).height());
				});
				$('.column_item_category_sorter_content').animate({opacity : 1}, 300);
			});
			
			$(this).parent().parent().find('li').removeClass('active');
			$(this).parent().addClass('active');
		}
	});	
});
$(window).load(function(){
//				sliding tabs
	$('.sliding_tabs_wrapper').each(function() {
		var $this = $(this);
		window.slidingTabsHeight = 0;
		$(this).find('.sliding_tabs_content_wrapper > ul').each(function(){
			$(this).children('li').each(function(ind){
				if($(this).height() > window.slidingTabsHeight) {
				window.slidingTabsHeight = $(this).height();
				}
				$(this).css('margin-bottom','20px');
				if($this.hasClass('multicolumn_responsive') && ind==1 && $(window).width() <= 991){	
					$('<li class="clearfix" style="float:none !important;"></li>').insertAfter($(this));		
				}
				if($this.hasClass('multicolumn_responsive') && $(window).width() <= 530){	
					$('<li class="clearfix" style="float:none !important;"></li>').insertAfter($(this));		
				}
			});
			
		});
		$(this).find('.sliding_tabs_content_wrapper').css({height : window.slidingTabsHeight+2});
		$(this).find('.sliding_tabs_content').css({height : window.slidingTabsHeight+2});
		if ($(window).width() <= 991 && $this.hasClass('multicolumn_responsive')){
			$(this).find('.sliding_tabs_content_wrapper').css({height : (window.slidingTabsHeight+2)*2});
			$(this).find('.sliding_tabs_content').css({height : (window.slidingTabsHeight+2)*2});
		}
		if ($(window).width() <= 530 && $this.hasClass('multicolumn_responsive')){
			$(this).find('.sliding_tabs_content_wrapper').css({height : (window.slidingTabsHeight+2)*4});
			$(this).find('.sliding_tabs_content_wrapper > ul').children('li').css({width: '100%'});
			$(this).find('.sliding_tabs_content').css({height : (window.slidingTabsHeight+2)*4});
		}
	});
//			blog posts opening
	
	$('.blog_main_image_wrapper').each(function(index){
		var imgHeight = parseInt($(this).find('img').height())/2- parseInt($(this).height())/2;
		$(this).find('img').css({top : -imgHeight}).attr('data-height', $(this).find('img').height());
		$(this).closest('.blog-post').css('height', 'auto');
	});
	$('.blog-category-select').find('a').each(function(index){
		$this = $(this);
		$(this).closest('.column_item_category_sorter').find('.column_item_category_sorter_content .blog-post').each(function(){
			window.itemCatContentString[index] = $(this).clone(true, true);
			if ($(this).attr('data-category').indexOf($this.attr('data-value')) >= 0 || $this.attr('data-value') == 'all'){
				if (window.itemCatContentSelect[index] === undefined){
					window.itemCatContentSelect[index] = '';
				}
				if (window.itemCatContentSelect[index] === '') {
					window.itemCatContentSelect[index] += ($(this).attr('id'));
				} else {
				window.itemCatContentSelect[index] += (',' + $(this).attr('id'));
				}
			}
			
		});
	});
	$('.grid-layout-select').children('li').each(function(){
		if($(this).hasClass('default')) {
			$(this).find('a').trigger('click');
		}
});	
});
$(window).resize(function(){
	$('.blog_main_image_wrapper').each(function(index){
		var imgHeight = parseInt($(this).find('img').height())/2- parseInt($(this).height())/2;
		$(this).find('img').css({top : -imgHeight}).attr('data-height', $(this).find('img').height());	
	});
});
function anchorToTarget(zeroAttTarget) {
	$(zeroAttTarget).each(function () {
		var target = this.hash,	
		$target = $(target);
		$('html, body').stop().animate({'scrollTop': $target.offset().top - 60}, 500, 'swing');
	});
}
function itemCategorization(catThis) {
	window.itemCatFliteredUnsorted = [];
	window.itemCatFlitered = [];
	window.itemCatFliteredUnsorted = window.itemCatContentSelect[catThis.parent().index()].split(',');
	window.iterationCounter = 0;
		while (window.iterationCounter < window.itemCatFliteredUnsorted.length) {
			window.itemCatFliteredUnsorted[window.iterationCounter] = parseInt(window.itemCatFliteredUnsorted[window.iterationCounter].substr(8));
			window.iterationCounter++;
		}
		window.itemCatFliteredUnsorted.sort(function(a,b){return a-b});
		window.iterationCounter = 0;
		while (window.iterationCounter < window.itemCatFliteredUnsorted.length) {
			window.itemCatFlitered[window.iterationCounter] = 'b-postid'+window.itemCatFliteredUnsorted[window.iterationCounter];
			window.iterationCounter++;
		}
	if($('.blog-initial-content-wrapper').length > 0) {
			itemSorting(catThis);	
	} else {
		if($('.column_item_category_sorter_content').length > 0) {
			$('.column_item_category_sorter_content').each(function(){
				itemSorting(catThis);		
			});
		}
	}
}
function itemSorting(refThis) {
	if($('.blog-initial-content-wrapper').length > 0) {
	refThis.closest('.column_item_category_sorter').find('.blog-initial-content-wrapper .blog-post').hide().parent().remove();
			window.iterationCounter = 0;
			while (window.itemCatFlitered[window.iterationCounter] != undefined) {
			$('.blog-initial-content-wrapper').append('<li></li>').find('li:last').html(window.itemInitialArray[parseInt(window.itemCatFlitered[window.iterationCounter].substr(8))].clone()).find('.blog-post').css({opacity : 0, 'display' : 'block'}).delay(300+window.iterationCounter*100).animate({opacity : 1}, 300);
			window.iterationCounter++;
		}
	} else {
		if($('.column_item_category_sorter_content').length > 0) {
			refThis.closest('.column_item_category_sorter').find('.column_item_category_sorter_content .blog-post').hide().remove();

				window.iterationCounter = 0;
				while (window.itemCatFlitered[window.iterationCounter] != undefined) {
					$('.column_item_category_sorter_content').children('li').eq(window.columnSelectVar).each(function(){
						$(this).append(window.itemInitialArray[parseInt(window.itemCatFlitered[window.iterationCounter].substr(8))].clone()).find('.blog-post').css({opacity : 0, 'display' : 'block'}).delay(300+window.iterationCounter*100).animate({opacity : 1}, 300);
			
					});
					if (window.columnSelectVar == 0){
						window.columnSelectVar++;
					} else {
						window.columnSelectVar--;
					}
					window.iterationCounter++;
				}			
		}
	}
}
function itemInitialSorting() {
	$('.blog-initial-content-wrapper').addClass('q-sand-blog-target column_item_category_sorter_content').html('<li></li><li></li>').removeClass('blog-initial-content-wrapper');
		window.iterationCounter = 0;
	while (window.itemInitialArray[window.iterationCounter] != undefined) {
		$('.column_item_category_sorter_content').children('li').eq(window.columnSelectVar).each(function(){
			$(this).append(window.itemInitialArray[window.iterationCounter]).find('.blog-post').css({opacity : 0, 'display' : 'block'}).delay(window.iterationCounter*50).animate({opacity : 1}, 300);
		});
		if (window.columnSelectVar == 0){
			window.columnSelectVar++;
		} else {
			window.columnSelectVar--;
		}
		window.iterationCounter++;
	}
}
function itemInitialUnsorting() {
	$('.column_item_category_sorter_content').addClass('blog-initial-content-wrapper').removeClass('q-sand-blog-target column_item_category_sorter_content').html(' ');
	
	
	
		window.iterationCounter = 0;
		$('.blog-initial-content-wrapper').each(function(){
			while (window.itemInitialArray[window.iterationCounter] != undefined) {
			$(this).append('<li></li>').find('li:last').append(window.itemInitialArray[window.iterationCounter]).find('.blog-post').css({opacity : 0, 'display' : 'block'}).delay(window.iterationCounter*50).animate({opacity : 1}, 300);
			
			window.iterationCounter++;
			
			}
			
		
		});
}

/*  Fotorama Custom Nav  */
$(document).ready(function(){
	if($('.fotorama').length > 0){
	/*  Fotorama Custom Thumbs  */
		var $elementWidth = $('.nav-thumb-wrap').outerWidth();
		var $wrapperWidth = $('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 3});
		var $thumbsHeight = $('.nav-thumb-wrap').css('height');
		$('.fotorama-nav-wrap-custom').css({'height' : $thumbsHeight});
		$('.nav-thumb-wrap').each(function(index){
			$(this).click(function(e){
				if($(this).hasClass('top-element')) {e.preventDefault();}
				$('.fotorama__thumbs-shaft > i').eq(index).trigger('click');
				$(this).closest('.fotorama-nav-wrap-custom').find('.active-thumb').removeClass('active-thumb');
				$(this).addClass('active-thumb');
				var $elementWidth = $('.nav-thumb-wrap').width();
				var $wrapperWidth = $('.fotorama-nav-wrap-custom').width();
				var $elementPosition = $(this).index();
				var $totalElements = $('.nav-thumb-wrap').length;
				var $windWidth = $(window).width();
				if($windWidth > 1180){
					if($elementPosition > 0){
						if($totalElements -1 != $elementPosition ){
							$(this).parent().stop(true).animate({left : - (($elementPosition - 1) * $elementWidth)}, 400);
						}
					}
				}
				if($windWidth < 1180){
					$('.fotorama-nav-wrap-custom').show();
					$('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 2});
					$('.fotorama-nav-wrap-custom').css({'margin-left' : -$elementWidth});
					var $elementPosition = $(this).index();
						if($totalElements - 1 != $elementPosition ){
							$(this).parent().stop(true).animate({left : - ($elementPosition * $elementWidth)}, 400);
						}
				}
				if($windWidth < 800){
					$('.fotorama-nav-wrap-custom').hide();
				}
			});			
		});
		fotoramaNavReset();
	}
});

$(window).resize(function(){
	if($('.fotorama').length > 0){
		fotoramaNavReset();
	}
})
	function fotoramaNavReset() {
		var $windWidth = $(window).width();
		var $elementWidth = $('.nav-thumb-wrap:first').width();
		var $this = $('.nav-thumb-wrap.active-thumb');
		var $elementPosition = $('.nav-thumb-wrap.active-thumb').index();
		var $totalElements = $('.nav-thumb-wrap').length;
		if($windWidth > 1180){
			$('.fotorama-nav-wrap-custom').show();
			$('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 3});
			$('.fotorama-nav-wrap-custom').css({'margin-left' : -1.5*$elementWidth});
			if($elementPosition > 0){
				if($totalElements -1 != $elementPosition ){
					$this.parent().stop(true).css({left : - (($elementPosition - 1) * $elementWidth)});
				}
				else {
					$this.parent().stop(true).css({left : - (($elementPosition - 2) * $elementWidth)});
				}
			}
		}
		if($windWidth < 1180){
			$('.fotorama-nav-wrap-custom').show();
			$('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 2});
			$('.fotorama-nav-wrap-custom').css({'margin-left' : -$elementWidth});
			if($elementPosition > 0){
				if($totalElements - 1 != $elementPosition ){
					$this.parent().stop(true).css({left : - ($elementPosition * $elementWidth)}, 400);
				}
				else {
					$this.parent().stop(true).css({left : - (($elementPosition-1) * $elementWidth)}, 400);
				}
			}
		}
		if($windWidth < 800){
			$('.fotorama-nav-wrap-custom').hide();
		}
	}

/*  Shindiri Counter  */

var currentPos =  new Array();
var clearFlag = new Array();
var countdownSelect = 0;
$(document).ready(function(){
	if($('.frb_countdown').length > 0){
		$('#frb_countdown2').frbCountdownInit('#e4e4e4','#35bff0');
	}
});	
//				Main Function
$.fn.frbCountdownInit=function(canvasBgColor, canvasMainColor){
	frbCountdownServe(this);
	var cdInput = parseInt(this.attr('data-initial-time'));
	var cdControl = frbCountdownInspect(this);
	frbCountdownSplit(this, cdInput, cdControl);
	if(this.hasClass('frb_countdown_circle-style')) {
		countdownSelect++;
		frbCountdownAnimationProc(this, canvasMainColor, cdControl, countdownSelect);

	}
	frbCountdownPaste(this, canvasBgColor, canvasMainColor, cdControl);
	frbCountdownUpdate(this, canvasBgColor, canvasMainColor, cdControl);
}
//			Initial parameter formatting
function frbCountdownServe($initThis) {
	var frbTargetTime = new Date($initThis.attr('data-end-date'));
	var frbStartTime = new Date($initThis.attr('data-initial-date'));
	frbStartTime = frbStartTime.getTime() / 1000;
	frbTargetTime = frbTargetTime.getTime() / 1000;
	var frbToday = new Date().getTime() / 1000;
	$initThis.attr({'data-initial-time' : frbTargetTime - frbToday});
	if ($initThis.find('.frb_countdown_day').length > 0) {
		var frbTimeLimit = Math.floor((frbTargetTime-frbStartTime)/86400);
	} else if ($initThis.find('.frb_countdown_hour').length > 0) {
		var frbTimeLimit = Math.floor((frbTargetTime-frbStartTime)/3600);
	} else if ($initThis.find('.frb_countdown_min').length > 0){
		var frbTimeLimit = Math.floor((frbTargetTime-frbStartTime)/60);
	} else {
		var frbTimeLimit = Math.floor(frbTargetTime-frbStartTime);
	}
	$initThis.attr({'data-limit' : frbTimeLimit});
}
function frbCountdownSplit($initThis, cdInput, cdControl) {	
	if (cdControl == 4){
	var cdDay = Math.floor(cdInput/86400);
	} else {cdDay=0;}
	if (cdControl >= 3){
	var cdHour = Math.floor((cdInput - cdDay*86400)/3600);
	} else {cdHour=0;}
	if (cdControl >= 2){
	var cdMin = Math.floor((cdInput - cdDay*86400 - cdHour*3600)/60);
	} else {cdMin=0;}
	var cdSec = Math.floor(cdInput - cdDay*86400 - cdHour*3600 - cdMin*60);
	$initThis.attr({'data-sec' : cdSec, 'data-min' : cdMin, 'data-hour' : cdHour, 'data-day' : cdDay,});
}
//			Digit update
function frbCountdownPaste($initThis, BgColor, MainColor, cdControl) {
	frbCountdownPasteSec($initThis, BgColor, MainColor, cdControl);
	frbCountdownPasteMin($initThis, BgColor, MainColor, cdControl);
	frbCountdownPasteHour($initThis, BgColor, MainColor, cdControl);
	frbCountdownPasteDay($initThis, BgColor, MainColor, cdControl);
}
function frbCountdownPasteSec($initThis, BgColor, MainColor, cdControl, prevSec) {
	if ($initThis.attr('data-sec').length == 1) {
		$initThis.attr({'data-sec' : '0' + $initThis.attr('data-sec')});
		}	
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_sec').html($initThis.attr('data-sec'));
	}	
	if ($initThis.hasClass('frb_countdown_circle-style')) {
		if (!$initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}
		if ($initThis.find('.frb_countdown_sec').length > 0) {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main'), MainColor, 1/60*parseInt($initThis.attr('data-sec')));
		 } else {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit')));
		}
	}	
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_sec'), $initThis.attr('data-sec'), prevSec);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_sec').html($initThis.attr('data-sec'));
		}, 370);		
	}	
}
function frbCountdownPasteMin($initThis, BgColor, MainColor, cdControl, prevMin) {
	if ($initThis.attr('data-min').length == 1) {
		$initThis.attr({'data-min' : '0' + $initThis.attr('data-min')});
		}		
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_min').html($initThis.attr('data-min'));
	}	
	if ($initThis.hasClass('frb_countdown_circle-style') && cdControl >= 2) {
		if (!$initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}		
		if ($initThis.find('.frb_countdown_hour').length > 0) {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main'), MainColor, 1/60*parseInt($initThis.attr('data-min')));
		} else {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit')));
		}
	}	
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_min'), $initThis.attr('data-min'), prevMin);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_min').html($initThis.attr('data-min'));
		}, 370);		
	}
}
function frbCountdownPasteHour($initThis, BgColor, MainColor, cdControl, prevHour) {
	if ($initThis.attr('data-hour').length == 1) {
		$initThis.attr({'data-hour' : '0' + $initThis.attr('data-hour')});
		}
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_hour').html($initThis.attr('data-hour'));
	}
	if ($initThis.hasClass('frb_countdown_circle-style') && cdControl >= 3) {
		if (!$initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}
		if ($initThis.find('.frb_countdown_day').length > 0) {		
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main'), MainColor, 1/24*parseInt($initThis.attr('data-hour')));
		} else {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit')));
		}	
	}
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_hour'), $initThis.attr('data-hour'), prevHour);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_hour').html($initThis.attr('data-hour'));
		}, 370);
	}
}
function frbCountdownPasteDay($initThis, BgColor, MainColor, cdControl, prevDay) {
	if ($initThis.attr('data-day').length == 1) {
		$initThis.attr({'data-day' : '0' + $initThis.attr('data-day')});
		}
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_day').html($initThis.attr('data-day'));
	}
	if ($initThis.hasClass('frb_countdown_circle-style') && cdControl >= 4) {
		if (!$initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}
		frbCountdownCanvasProgress($initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit'))*parseInt($initThis.attr('data-day')));
	}
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_day'), $initThis.attr('data-day'), prevDay);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_day').html($initThis.attr('data-day'));
		}, 370);		
	}
}
//			Number of digit positions selector
function frbCountdownInspect($initThis) {
	var cdControl = 1;
	if ($initThis.find('.frb_countdown_min').length > 0) {cdControl++;}
	if ($initThis.find('.frb_countdown_hour').length > 0) {cdControl++;}
	if ($initThis.find('.frb_countdown_day').length > 0) {cdControl++;}
	return cdControl;
}
//			Countdown autoadvance
function frbCountdownUpdate($initThis, canvasBgColor, canvasMainColor, cdControl) {
	var timer =  setInterval(function(){
		$initThis.each(function(){
			var prevSec = $initThis.attr('data-sec');
			var prevMin = $initThis.attr('data-min');
			var prevHour = $initThis.attr('data-hour');
			var prevDay = $initThis.attr('data-day');
		if (parseInt($initThis.attr('data-sec')) > 0){	
			$initThis.attr({'data-sec' : parseInt($initThis.attr('data-sec')) - 1});
			frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
		} else {
			if (parseInt($initThis.attr('data-min')) > 0){	
				$initThis.attr({'data-min' : parseInt($initThis.attr('data-min')) - 1});
				frbCountdownPasteMin($initThis, canvasBgColor, canvasMainColor, cdControl, prevMin);
				$initThis.attr('data-sec', 59);
				frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
			} else {
				if (parseInt($initThis.attr('data-hour')) > 0){	
					$initThis.attr({'data-hour' : parseInt($initThis.attr('data-hour')) - 1});
					frbCountdownPasteHour($initThis, canvasBgColor, canvasMainColor, cdControl, prevHour);
					$initThis.attr('data-min', 59);
					frbCountdownPasteMin($initThis, canvasBgColor, canvasMainColor, cdControl, prevMin);
					$initThis.attr('data-sec', 59);
					frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
				} else {
					if (parseInt($initThis.attr('data-day')) > 0){	
						$initThis.attr({'data-day' : parseInt($initThis.attr('data-day')) - 1});
						frbCountdownPasteDay($initThis, canvasBgColor, canvasMainColor, cdControl, prevDay);
						$initThis.attr('data-hour', 23);
						frbCountdownPasteHour($initThis, canvasBgColor, canvasMainColor, cdControl, prevHour);
						$initThis.attr('data-min', 59);
						frbCountdownPasteMin($initThis, canvasBgColor, canvasMainColor, cdControl, prevMin);
						$initThis.attr('data-sec', 59);
						frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
					} else {
									//	********* AJAX CALLBACK *********
							}
				}
			}
		}
		});
	}, 1000);
}
function frbCountdownCanvasBg($canvasThis, bgColor) {
	var c=$canvasThis;
	var ctx=c[0].getContext('2d');
	ctx.arc(100, 100, 90, 0, 2*Math.PI);
	ctx.strokeStyle = bgColor+'';
	ctx.lineWidth = 10;
	ctx.stroke();
}
function frbCountdownCanvasProgress($canvasThis, mainColor, cFactor) {
	var c=$canvasThis;
	var ctx=c[0].getContext('2d');
	ctx.clearRect(0,0,c.width(),c.height());
	ctx.beginPath();
	ctx.arc(100, 100, 90, -Math.PI/2,-Math.PI/2+2*Math.PI*cFactor);
	ctx.strokeStyle = mainColor+'';
	ctx.lineWidth = 10;
	ctx.stroke();
}
function frbCountdownAnimate($digitThis, step, MainColor, endVal, ind) {
		if (currentPos[ind] == undefined) {
			currentPos[ind] = 0;
		}
		var c=$digitThis;
		if (currentPos[ind]+step > endVal*2*Math.PI) {
			 currentPos[ind] = endVal*2*Math.PI;
			 step= 0;
			 clearFlag[ind]= 1;
			}
		var ctx=c[0].getContext('2d');
		ctx.clearRect(0,0,c.width(),c.height());
		ctx.beginPath();
		ctx.arc(100, 100, 90, -Math.PI/2,currentPos[ind]+step*2*Math.PI-Math.PI/2);
		currentPos[ind] = currentPos[ind]+step*2*Math.PI;
		ctx.strokeStyle = MainColor+'';
		ctx.lineWidth = 10;
		ctx.stroke();	
}
function frbCountdownAnimationProc($initThis, MainColor, cdControl, countdownSelect) {
		
	window.frbCountdownIntervalBreak = setInterval(function(){
		var tcdSec = parseInt($initThis.attr('data-sec'));
		var step = 2*Math.PI/600;
		var tcdMin = parseInt($initThis.attr('data-min'));
		var tcdHour = parseInt($initThis.attr('data-hour'));
		var tcdDay = parseInt($initThis.attr('data-day'));
		if (cdControl == 1) {
			frbCountdownAnimate($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdSec, 0+4*countdownSelect);
		} else {
			frbCountdownAnimate($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/60*tcdSec, 0+4*countdownSelect);	
		}
		if(cdControl >1){ 
			if(cdControl == 2){
				frbCountdownAnimate($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdMin, 1+4*countdownSelect);
			} else {
				frbCountdownAnimate($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/60*tcdMin, 1+4*countdownSelect);
			}
		}
		if(cdControl >2){
			if (cdControl == 3){
				frbCountdownAnimate($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdHour, 2+4*countdownSelect);
			}else {
				frbCountdownAnimate($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/24*tcdHour, 2+4*countdownSelect);
			}
		}
		if(cdControl >3){frbCountdownAnimate($initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdDay, 3+4*countdownSelect);}
		
	}, 10);	
}
function frbCountdownFlipAnimation($initThis, countPar, countParPrev) {
	
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_holder').children('span:not(.frb_countdown_flip_split)').html(countPar);
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_back').children('span:not(.frb_countdown_flip_split)').html(countPar);

	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_front').children('span:not(.frb_countdown_flip_split)').html(countParPrev);
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_card').css({'transition': 'transform 740ms', 'transform': 'rotateX(-179deg)', '-moz-transform': 'rotateX(-179deg)', '-o-transform': 'rotateX(-179deg)', '-webkit-transform': 'rotateX(-179deg)', '-ms-transform': 'rotateX(-179deg)'});
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_holder');
	
	var flipTimepout = setTimeout(function(){
		$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_card').css({'transition': 'transform 10ms', 'transform': 'rotateX(0deg)', '-moz-transform': 'rotateX(0deg)', '-o-transform': 'rotateX(0deg)', '-webkit-transform': 'rotateX(0deg)', '-ms-transform': 'rotateX(0deg)'});
		$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_holder');
		$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_front').children('span:not(.frb_countdown_flip_split)').html(countPar);
	}, 740);	
}

var $flagDrag = false;
var $dragStart;
var $flagReady = false;
$(document).ready(function(){
	var windWidth = $(window).width();
	if(windWidth < 975){
		$flagReady = true;
	}
	else{
		$flagReady = false;
	}
	swipe_screen();
});
$(window).on('resize orientationchange', function(){
	var windWidth = $(window).width();
	if(windWidth < 975){
		$flagReady = true;
	}
	else{
		$flagReady = false;
	}
	swipe_screen();
});
function swipe_screen(){
	if($flagReady === true){
		/*  responsive-menu opening - closing  */
		$(document).on('click', '.menu-trigger i', function(){
			var $contentWidth = $(this).parent().parent().width();
			$(this).parent().parent().css({width : $contentWidth});
			$(this).parent().parent().find('.responsive-nav').stop(true).animate({left : 0}, 200);
			$(this).parent().parent().animate({marginLeft : 230}, 200);
		});
		$(document).on('click', '.menu-closing i', function(){
			$(this).closest('.responsive-nav').stop(true).animate({left : -230}, 200);
			$(this).closest('.responsive-nav').parent().animate({marginLeft : 0}, 200, function(){
				$(this).css({width : 'auto'});
			});
		});
	   $('body').on('mousedown', function(event){
	   	if($flagReady === true){
		    if($flagDrag !== true) 
		     $dragStart = event.pageX;
		    $flagDrag = true;
		}
	   });
	   $('body').on('mouseup', function(event){
	   	if($flagReady === true){
		    event.preventDefault();
		    if($flagDrag === true){
		     var $dragMeasure = event.pageX;
		     var $dragResult = $dragMeasure - $dragStart;
		      if($dragResult > 200){
				var $contentWidth = $(this).parent().width();
				$(this).find('.responsive-nav').parent().css({width : $contentWidth});
				$(this).find('.responsive-nav').stop(true).animate({left : 0}, 200);
				$(this).find('.responsive-nav').parent().animate({marginLeft : 230}, 200);
				$dragStart = $dragMeasure;
		      }
		      if($dragResult < (-200)){
				$(this).find('.responsive-nav').stop(true).animate({left : -230}, 200);
				$(this).find('.responsive-nav').parent().animate({marginLeft : 0}, 200, function(){
					$(this).css({width : 'auto'});
				});
		        $dragStart = $dragMeasure;
		      }
		     }
		}
	    $flagDrag = false;
	   });
	}
}

/*  Selectpicker  */
$(window).on('load', function () {
	$('.selectpicker').selectpicker({
		'selectedText': 'cat'
	});
});

$(document).ready(function(){

/*  Swiper Slider Init  */
if($('[class*="swiper"]').length > 0){
	var mySwiper = new Swiper('.swiper-standard',{
		pagination: '.pagination',
		loop:true,
		grabCursor: true,
		paginationClickable: true,
		speed: 400
	});
	$('.arrow-left').on('click', function(e){
		e.preventDefault()
		mySwiper.swipePrev()
	});
	$('.arrow-right').on('click', function(e){
		e.preventDefault()
		mySwiper.swipeNext()
	});
	var mySwiper = new Swiper('.swiper-scroller',{
	slidesPerView: 'auto',
	//Enable Scrollbar
	scrollbar: {
	  container: '.swiper-scrollbar',
	  hide: false,
	  draggable: true,
	  snapOnRelease: true
	}
	});
}

/*  Fotorama Init  */
if($('.chr_slider').length > 0){
	$('.chr_slider').fotorama({
		cropToFit: true,
		transitionDuration: 500,
		zoomToFit: false,
		fitToWindowHeight: true,
		fitToWindowHeightMargin: 0,
		caption: 'overlay',
		nav: 'dots',
		onShowImg: function(data) {
			$('.fotorama-nav-wrap-custom .nav-thumb-wrap').eq(data.index).trigger('click');
			var $captionWidth = $('.fotorama__caption.fotorama__caption_overlay').width() / 2 + 48;
			$('.fotorama__caption.fotorama__caption_overlay').css({'margin-left' : -$captionWidth});
		}
	});
}

/*  Isotope  */
if($('#container').length > 0){
	var $container = $('#container');
	$container.isotope({
		masonry: {
			columnWidth: 1
		},
		sortBy: 'number',
		getSortData: {
			number: function( $elem ) {
				var number = $elem.hasClass('element') ? 
				$elem.find('.number').text() :
				$elem.attr('data-number');
				return parseInt( number, 10 );
			},
			alphabetical: function( $elem ) {
				var name = $elem.find('.name'),
				itemText = name.length ? name : $elem;
				return itemText.text();
			}
		}
	});
	var $optionSets = $('#options .option-set'),
	$optionLinks = $optionSets.find('a');
	$optionLinks.click(function(){
		var $this = $(this);
		if ( $this.hasClass('selected') ) {
			return false;
		}
		var $optionSet = $this.parents('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			// changes in layout modes need extra logic
			changeLayoutMode( $this, options )
		} else {
			// otherwise, apply new options
			$container.isotope( options );
		}
		return false;
	});
}

/*  waypoints scripts  */
	$(window).scroll(function(){
		if($('#mydiv').length > 0){
			if($('#mydiv').offset().top < $(window).scrollTop() + ($(window).innerHeight() * 4)/5){
				if(!$('#mydiv').hasClass('animated')){
					$('#mydiv').addClass('animated');
					progressBarsAnimate();
				}
			}
		}
		if($('.business-tablet-element').length > 0){
			if($('.business-tablet-element').offset().top < $(window).scrollTop() + ($(window).innerHeight() * 4)/5){
				if(!$('.business-tablet-element').hasClass('animated')){
					$('.business-tablet-element').addClass('animated');
					businessTabletElement();
				}
			}
		}
		if($('.background-image-15').length > 0){
			if($('.background-image-15').offset().top < $(window).scrollTop() + ($(window).innerHeight() * 4)/5){
				if(!$('.background-image-15').hasClass('animated')){
					$('.background-image-15').addClass('animated');
					iconsAndTabletHome();
				}
			}
		}
	});
	$(document).ready(function(){
		if($('#mydiv').length > 0){
			if($('#mydiv').offset().top < $(window).scrollTop() + ($(window).innerHeight() * 4)/5){
				if(!$('#mydiv').hasClass('animated')){
					$('#mydiv').addClass('animated');
					progressBarsAnimate();
				}
			}
		}
		if($('.business-tablet-element').length > 0){
			if($('.business-tablet-element').offset().top < $(window).scrollTop() + ($(window).innerHeight() * 4)/5){
				if(!$('.business-tablet-element').hasClass('animated')){
					$('.business-tablet-element').addClass('animated');
					businessTabletElement();
				}
			}
		}
		if($('.background-image-15').length > 0){
			if($('.background-image-15').offset().top < $(window).scrollTop() + ($(window).innerHeight() * 4)/5){
				if(!$('.background-image-15').hasClass('animated')){
					$('.background-image-15').addClass('animated');
					iconsAndTabletHome();
				}
			}
		}
	});
	
function progressBarsAnimate(){
	setTimeout(function(){
		$('.progress-bar').each(function(index) {
			var slidewidth = $(this).attr('data-width');
			$(this).delay(index*100).animate({width:slidewidth}, 300);
		});
	}, 100);
}
function businessTabletElement(){
	setTimeout(function() {
		$('.business-tablet-element').find('.col-md-6:first img').stop(true).delay(600).animate({opacity : 1}, 400, function(){
			$(this).closest('.business-tablet-element').find('.col-md-6:last .small-block-tablet').each(function(index){
				$(this).stop(true).delay(($(this).index())*300).animate({opacity : 1}, 400);
			});
		});
	}, 100);
}
function iconsAndTabletHome(){
	setTimeout(function(){
		var $blockHeight = $('.background-image-15').height();
		$('.tablet-image').css({top : $blockHeight});
		$('.background-image-15').find('.postslider').stop(true).delay(800).animate({opacity : 1},300,function(){
			$(this).closest('.row').find('.col-md-4').each(function(index){
				if($(this).index() == 3){
					$(this).find('.tablet-image').stop(true).animate({top : 0, opacity : 1}, 300, function(){
						$(this).parent().parent().find('.right-align div:first').stop(true).animate({opacity : 1}, 300, function(){
							$(this).parent().parent().find('.left-align div:first').stop(true).animate({opacity : 1}, 300, function(){
								$(this).parent().parent().find('.right-align div:last').stop(true).animate({opacity : 1}, 300, function(){
									$(this).parent().parent().find('.left-align div:last').stop(true).animate({opacity : 1}, 300);
								});
							});
						});
					});
				}
			});
		});
	}, 100);
}

/*  Pretty Photo Init   */
if($("a[rel^='prettyPhoto']").length > 0){
	$("a[rel^='prettyPhoto']").prettyPhoto();
}

/*  rCarousell Init  */
	if($('#carousel').length > 0){
		var $windowWidth = $(window).width();
		if($windowWidth > 1180){
			$( "#carousel" ).rcarousel({
				visible: 6,
				step: 1,
				width: 160,
				height: 45,
				speed: 400
			});
		}
		if($windowWidth <= 1180){
			if($windowWidth < 1000){
				if($windowWidth < 690){
					if($windowWidth < 530){
						if($windowWidth < 370){
							$( "#carousel" ).rcarousel({
								visible: 1,
								step: 1,
								width: 160,
								height: 45,
								speed: 400
							});
						}
						$( "#carousel" ).rcarousel({
							visible: 2,
							step: 1,
							width: 160,
							height: 45,
							speed: 400
						});
					}
					$( "#carousel" ).rcarousel({
						visible: 3,
						step: 1,
						width: 160,
						height: 45,
						speed: 400
					});
				}
				$( "#carousel" ).rcarousel({
					visible: 4,
					step: 1,
					width: 160,
					height: 45,
					speed: 400
				});
			}
			$( "#carousel" ).rcarousel({
				visible: 5,
				step: 1,
				width: 160,
				height: 45,
				speed: 400
			});
		}
	}
});



/*  Navigation and header  */

var responsive_menu = false;
var $logowidth = 90;
$(document).ready(function(){
	var window_width = $(window).width();
	$logowidth = $('a.logo img').width();
	if (window_width < 752) {
		responsive_menu = true;
	}
	else {
		$('.header_nav .nav li').mouseenter(function(){
			var $count = $(this).children('ul').children('li').length;
			var liHeight = $(this).children('ul').children('li').outerHeight()+1;
			$(this).children('ul').stop(true).animate({height : $count * liHeight},(70 * $count*3)/4, function(){
				$(this).addClass('overflow-visible');
			});
		});
		$('.header_nav .nav li').mouseleave(function(){
			var $count = $(this).children('ul').children('li').length;
			$(this).children('ul').removeClass('overflow-visible').stop(true).animate({height : 0},(70 * $count*2)/3);
		});
		responsive_menu = false;
	}
});
$(window).on('resize orientationchange', function(){
	var window_width = $(window).width();
	if (window_width < 752) {
		responsive_menu = true;
		if($('.header_nav').hasClass('sticky')){
			$('.header_nav').removeClass('sticky');
		}
	}
	else {
		responsive_menu = false;
	}
});

var adminBar = 32;
var headHeight = 0;
var wind_scr = 0;
$(document).ready(function(){
	responsive_nav();
	zero_header();
	adminBar = $('#wpadminbar').outerHeight();
	wind_scr = $(window).scrollTop();
	
	$('.search-trigger a').click(function(){
		if(!$(this).hasClass('search-opened')){
			var $navHeight = $(this).closest('.white-bg').outerHeight();
			var $shopHeight = $(this).closest('.header_nav').find('.dark-gray-bg').outerHeight();
			var $searchOffset = $('.search-popout-block').height();
			$(this).closest('.header_nav').find('.search-popout-block').stop(true).animate({bottom : -$searchOffset},200,function(){
				$(this).closest('.header_nav').find('.search-trigger a').addClass('search-opened');
				$(this).find('input').trigger('focus');
			});
		}
	});
	$('.header-search-form input').focusout(function(){
		$(this).parent().find('.close-search').trigger('click');
	});
	$('.header-search-form .close-search').click(function(){
			var $searchOffset = $('.search-popout-block').height();
			$(this).closest('.search-popout-block').stop(true).animate({bottom : 0}, 200,function(){
				$('.search-trigger a.search-opened').removeClass('search-opened');
			});
	});
	$('.shop-button-header').hover(function(){
		$(this).find('.items-in-cart-wrapper, .items-in-wishlist-wrap').show().stop(true).animate({opacity : 1, top : 50}, 200);
	},function(){
		$(this).find('.items-in-cart-wrapper, .items-in-wishlist-wrap').stop(true).animate({opacity : 0, top : 100}, 200 ,function(){
			$(this).hide();
		});
	});
});
$(window).load(function(){
	adminBar = $('#wpadminbar').outerHeight();
	$('.header_nav').css({top : - wind_scr + adminBar});
	zero_header();
});
var animateLogo = false;
var animateNav = false;
$(window).scroll(function(){
	zero_header();
	adminBar = $('#wpadminbar').outerHeight();
	$('.header_nav').css({top : - wind_scr + adminBar});
});
function paralaxHeight(){
	var fullHeight = $(window).height();
	var headHeight = $('header').height();
	var calcHeight = fullHeight - headHeight;
	$('.sp-slideshow, .first-page-element').css({height : calcHeight});
}
function zero_header(){
	var animateNavBar = false;
	
	var $windowWidth = $(window).width();
	if($windowWidth > 975){
		wind_scr = $(window).scrollTop();
		if(wind_scr > 50){
			animateNavBar = true;
			wind_scr = 50;
		}
		else{
			animateNavBar = false;
		}
		$('.header_nav').css({top : - wind_scr + adminBar});
		var navPadding = 29 - (wind_scr / 3.571428);
		var logoPadding = 14 - (wind_scr / 3.571428);
		var searchPadding = 23 - (wind_scr / 3.571428);
		var headerMinHeight = 132 - (wind_scr / 3.571428)*2;
		if(animateNavBar == true){
			if(!$('header').hasClass('sticky')){
				$('.navbar .nav > li > a').stop(true).animate({'padding-top': navPadding, 'padding-bottom': navPadding}, 200,function(){
					var navLinkHeight = $('.navbar .nav > li > a').outerHeight();
					$('.navbar .nav .dropdown').css({top : navLinkHeight}, 200);
					if($('.search-trigger a').hasClass('search-opened')){
						var $searchHeight = $('.search-popout-block').outerHeight();
						$('.search-popout-block').stop(true).animate({bottom : -$searchHeight},200);
					}
				});
				$('.zero-logo a').stop(true).animate({'padding-top': logoPadding, 'padding-bottom': logoPadding}, 200);
				$('.search-trigger').stop(true).animate({'padding-top': searchPadding, 'padding-bottom': searchPadding}, 200);
				$('header').stop(true).animate({'min-height' : headerMinHeight}, 200);
				$('header').addClass('sticky');
				animateNavBar = false;
			}
		}
		else{
			if($('header').hasClass('sticky')){
				setTimeout(function(){
					navPadding = 29;
					logoPadding = 14;
					searchPadding = 23;
					headerMinHeight = 132;
					$('.navbar .nav > li > a').stop(true).animate({'padding-top': navPadding, 'padding-bottom': navPadding}, 200,function(){
						var navLinkHeight = $('.navbar .nav > li > a').outerHeight();
						$('.navbar .nav .dropdown').css({top : navLinkHeight}, 200);
						if($('.search-trigger a').hasClass('search-opened')){
							var $searchHeight = $('.search-popout-block').outerHeight();
							$('.search-popout-block').stop(true).animate({bottom : -$searchHeight},200);
						}
					});
					$('.zero-logo a').stop(true).animate({'padding-top': logoPadding, 'padding-bottom': logoPadding}, 200);
					$('.search-trigger').stop(true).animate({'padding-top': searchPadding, 'padding-bottom': searchPadding}, 200);
					$('header').stop(true).animate({'min-height' : headerMinHeight}, 200);
					$('header').removeClass('sticky');
				}, 20);
			}
		}
	}
}
function responsive_nav() {
	var $windowWidth = $(window).width();
		var $clonedMenu = $('.header-nav-wrap nav').clone().addClass('responsive-nav');
	$('.colorpicker-wrapper').parent().append($clonedMenu);
	$('.responsive-nav').find('.navbar-inner').addClass('relative').append('<div class="menu-closing"><i></i><div class="clearfix"></div></div>');
	$('.responsive-nav').parent().append('<div class="menu-trigger"><i></i></div>');
	$('.responsive-nav ul.nav li').each(function(){
		if($(this).children('ul').length > 0){
			$(this).prepend('<a href="#" class="submenu-trigger">+</a>');
		}
	});
}

/*  Blog Grid Reordering  */
$(window).on('resize orientationchange', function(){
	if($('.grid-layout-select').length > 0){
		var $win_width = $(window).width();
		if($win_width < 700){
			blog_splitting();
		}
		else{
			blog_normal();
		}
	}
});
$(window).load(function(){
	if($('.grid-layout-select').length > 0){
		var $win_width = $(window).width();
		if($win_width < 700){
			blog_splitting();
		}
		else{
			blog_normal();
		}
	}
});
function blog_normal(){
	$('.grid-layout-select').show();
	$('.grid-layout-select li:first a').trigger('click');
}
function blog_splitting(){
	$('.grid-layout-select li:last a').trigger('click');
	$('.grid-layout-select').hide();
}

/*  Blog layout Select  */
var $flagSelect = false;
var $flagResize = false;
$(document).ready(function(){
	if($('.blog-category-select.home-page-qsand-select').length > 0){
		var windWidth = $(window).width();
		if(windWidth < 400){
			$flagResize = true;
		}
		else{
			$flagResize = false;
		}
		blogSelectResize();
	}
});
$(window).on('resize orientationchange', function(){
	if($('.blog-category-select.home-page-qsand-select').length > 0){
		var windWidth = $(window).width();
		if(windWidth < 400){
			$flagResize = true;
		}
		else{
			$flagResize = false;
		}
		blogSelectResize();
	}
});
function blogSelectResize(){
	if($flagResize == true){
		var $selectMenu = $('.blog-category-select.home-page-qsand-select').clone() .addClass('cloned-select');
		if(!$('.blog-category-select.home-page-qsand-select').parent().hasClass('relative')){
			$('.blog-category-select.home-page-qsand-select').css({"display" : "none"}).addClass('original');
			$('.blog-category-select.home-page-qsand-select').parent().css({"padding-top" : 75}).prepend('<span class="selection-wrap"><span class="now-selected">Error</span></span>');
			$('.selection-wrap').append($selectMenu);
			$('.blog-category-select.home-page-qsand-select').parent().addClass('relative');
			blogSelectHover();
		}
	}
	if($flagResize == false){
		$('.blog-category-select.home-page-qsand-select').parent().css({"padding-top" : 0}).removeClass('relative');
		$('.selection-wrap').remove();
		$('.blog-category-select.home-page-qsand-select').css({"display" : "block"});
	}
}
function blogSelectHover(){
	var $liHeight = $('.cloned-select li').outerHeight();
	var $liLength = $('.cloned-select li').parent().find('li').length;
	var $ulHeight = $liHeight * $liLength;
	$('.cloned-select').css({"height" : 0});
	$('.selection-wrap').hover(function(){
		$(this).find('.cloned-select').stop(true).animate({height : $ulHeight},300);
	},function(){
		$(this).find('.cloned-select').stop(true).animate({height : 0},300);
	});
	var $selectedFilter = $('.cloned-select li.active').html();
	$('.now-selected').html($selectedFilter);
	$('.cloned-select li').each(function(index){
		$(this).click(function(e){
			e.preventDefault();
			var $selectedFilter = $(this).html();
			$('.original li a').eq(index).trigger('click');
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.selection-wrap').find('.now-selected').html($selectedFilter);
		});
	});
}

/*  Color Picker functions  */
$(document).on('click','.select-icon i.cp-trigger', function(){
	if(parseInt($('.colorpicker-wrapper').css('right')) != 0){
		$(this).parent().parent().stop(true).animate({right : 0},250);
		$(this).addClass('cp-open');
	}
	else{
		$(this).parent().parent().stop(true).animate({right : '-200px'},250);
		$(this).removeClass('cp-open');
	}
});
$(document).on('click', '.cp-select-list li a', function(){
	var $cpColor = $(this).attr('class');
	$('.colorpicker-wrapper').parent().attr('class', $cpColor);
});

$(document).on('click', '.box-layout a', function(){
	$(this).parent().parent().find('.active').removeClass('active');
	$(this).addClass('active');
	$('.footer-bg, header, .header_nav, .fullwidthbanner-container, .sp-slideshow').addClass('container');
	$('.full-width-container, .header_height').css({"padding-left" : "15px", "padding-right" : "15px"});
	$('.sliding_tabs_content_wrapper.creative-page').parent().css({"overflow" : "hidden"});
	$('.full-width-container').each(function(){
		$(this).addClass('container');
	});
	$('.paralax-space-wrapper').each(function(){
		$(this).addClass('container');
	});
	$('.usquare_module_wrapper').closest('.full-width-container').css({"padding" : "0"});
});
$(document).on('click','.wide-layout a', function(){
	$(this).parent().parent().find('.active').removeClass('active');
	$(this).addClass('active');
	$('.full-width-container, .header_height').css({"padding-left" : "0", "padding-right" : "0"});
	$('.footer-bg, header, .header_nav, .fullwidthbanner-container, .sp-slideshow').removeClass('container');
	$('.full-width-container').each(function(){
		$(this).removeClass('container');
	});
	$('.paralax-space-wrapper').each(function(){
		$(this).removeClass('container');
	});
});

})(jQuery);