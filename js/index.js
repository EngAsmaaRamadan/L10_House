let $navEle = $('nav.navbar');

if(JSON.parse(localStorage.getItem('saveLastNavCase')) != false){
	$navEle.addClass('scrolled');
}else{
	saveLastNavCase(false);
}

//remove active from previous active
$('.nav-link').click(function(){
	$(this).parents().find('.active').removeClass('active');
	$(this).addClass('active');
});
//efect on nav when scroll
$(window).scroll(function(e){
	console.log($(window).scrollTop());
	if($(window).scrollTop() > 5){
		$navEle.addClass('scrolled');
		saveLastNavCase(true);
	}else{
		$navEle.removeClass('scrolled');
		saveLastNavCase(false);
	}
});

(async function(){
	let response = await fetch("https://semicode.tech/api/v1/l10nhouse/services");
	let services = await response.json();
	console.log(services);
	for(let service of services){
		$('#Services .row').append(`
			<div class="col-lg-6 part">
				<div class="item text-center rounded-4">
					<img src="images/${service.icon}" alt="s1 service1" class="mb-3">
					<h5 class="mb-3">${service.title}</h5>
					<p>${prepareDesc(service.description.slice(0,150))}...<a class="firstColor fw-semibold">Read More</a></p>
				</div>
			</div>
		`);
	}
})();
	
