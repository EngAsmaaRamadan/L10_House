let $navEle = $('nav.navbar');

//efect on nav when scroll
$(window).scroll(function(e){
	console.log($(window).scrollTop());
	if($(window).scrollTop() > 5){
		$navEle.addClass('scrolled');
	}else{
		$navEle.removeClass('scrolled');
	}
});