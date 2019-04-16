//= ../../node_modules/jquery/dist/jquery.js
//= ../../node_modules/jquery-validation/dist/jquery.validate.min.js
//= ../../node_modules/foundation-sites/dist/js/foundation.js

$('.questions span').on('click', function(){
	if($(this).hasClass('active')){
		$(this).css({'transition':'color .3s','color':'#666'});
		$('img', this).css({'transition':'width .3s','width':'0'});
		$(this).removeClass('active');
	}else{
		$('.active').css({'transition':'color .3s','color':'#666'}).next().slideToggle(200);
		
		$('.active img').css({'transition':'width .3s','width':'0'});
		$('.active').removeClass('active');
		
		$(this).css({'transition':'color .3s','color':'#93cb53'});
		$('img', this).css({'transition':'width .3s','width':'16'});
		$(this).addClass('active');
	}
	$(this).next().slideToggle(200);
});
$('.open').on('click', function(){
	$(this).css('display','none');
	$('.sideslide').show(200);
	$('.overlay').show();
	$('body').addClass('stop-scrolling');
	$('.close').css('display','inline-block');
});
$('.close, .overlay').on('click', function(){
	$('.close').css('display','none');
	$('.sideslide').hide(200);
	$('.overlay').hide();
	$('body').removeClass('stop-scrolling');
	$('.open').css('display','inline-block');
})
$('.phones li').on('click', function(){
	if($('.phones').hasClass('active')){
		$('.phones').css({"transition":"height .4s","height":"45","border-color":"#e0e0e0"});
		$('.phones').removeClass('active');
	}else{
		$('.phones').css({"transition":"height .4s","height":"180","border-color":"#93cb53"});
		$('.phones').addClass('active');
	}
});
$('.number1,.number2,.number3').on('click', function(){
	var chosen = $(this).html();
	$('.title').html(chosen);
});

$(".redirect").click(function () {
	$(this).parent().hide();
        var o = $(this).attr("href");
        return $(o).fadeIn(200), !1
})

$(".open_modal").click(function () {
	$('.overlay, .popup').fadeIn(200, function(){
		$('#cancel_form_1').show();
	});
})
$(".close_modal,.overlay,.x_mark").click(function () {
		$('#cancel_form_2,#cancel_form_3').hide();
	$('.overlay, .popup').fadeOut(200);
})


$("#contact").validate({
	rules: {
		email: {
			required: true,
			email: true
		},
		subject: {
			required: true
		},
		text: {
			required: true,
			minlength: 50
		}
	},
	messages: {
		email: {
			required: "Please enter valid email address",
			minlength: "Please enter valid email address"
		},
		subjest: "introduce yourself please",
		text: "Your message has to contain at least 50 characters"
	}
});

$("#cancel_form_1").validate({
	rules: {
		email: {
			required: true,
			email: true
		},
		password: {
            required: true,
            minlength: 5,
		}
	},
	messages: {
		email: {
			required: "Please enter a valid email address",
			email: "Please enter a valid email address"
		},
		password: {
			required: "Please enter your password",
			minlength: "Your password cand be shorter than 6 characters"
		}
	}
});

$("#cancel_form_2").validate({
	rules: {
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		email: "Please enter a valid email address",
		required: "Please enter a valid email address"
	}
});

$("#cancel_form_3").validate({
	rules: {
		ccn_1: {
			required: true,
			number: true,
			minlength: 6,
			maxlength: 6
		},
		ccn_2: {
			required: true,
			number: true,
			minlength: 4,
			maxlength: 4
		}
	},
	messages: {
		ccn_1: {
			required: "Please enter first 6 digits",
			number: "Digits only accepted",
			minlength: "There is not enough digits",
			maxlength: "There is too much digits"
		},
		ccn_2: {
			required: "Please enter last 4 digits",
			number: "Digits only accepted",
			minlength: "There is not enough digits",
			maxlength: "There is too much digits"
		},
	}
});

//WIDGET
var current_lang = $('.languages').data('current-lang');
var block_lang = $('#' + current_lang).html();


$('.language_selector').html(block_lang);	
	
var userLang = navigator.language;
var trigger = $('.language_selector');
var list = $('.languages');
var lang = $('.lang');
	
trigger.click(function() {
    trigger.toggleClass('active_selector');
      list.slideToggle(200);
});
$('.languages li a span').click(function() {
    trigger.toggleClass('active_selector');
  	// var texts = $(this).find("a").find("span").html();
    var texts = $(this).parent().parent().html();
//  	trigger.html(texts);
    list.slideToggle(200);
});