let $navEle = $('nav.navbar'),
	sections = $('section[id], header').get(),
	services = null,
	languages = null,
	headerHeight = 0.5 * ($('header').outerHeight());
console.log(headerHeight);
//to activate wow plugins
new WOW({
	animateClass: 'animate_animated',
}).init();

if(JSON.parse(localStorage.getItem('isDarkMode')) === true){
	changeMode();
}

if(JSON.parse(localStorage.getItem('saveLastNavCase')) != false){
	$navEle.addClass('scrolled');
}else{
	saveLastNavCase(false);
}

if(localStorage.getItem('lastActiveId') != null){
	$('.nav-link.active').removeClass('active');
	$(`.nav-link[href="${JSON.parse(localStorage.getItem('lastActiveId'))}"]`).addClass('active');
}else{
	storeLastActive();
}

$(window).on('load',function(){
	$('.loadingPage').addClass('hide');
	setTimeout(function(){
		$('.loadingPage').addClass('d-none');
	},2000);

});

//remove active from previous active
$('.nav-link').click(function(){
	$(this).parents().find('.active').removeClass('active');
	$(this).addClass('active');
});

//efect on nav when scroll
$(window).scroll(function(e){
	if( $(this).scrollTop() >= headerHeight ){
		$('.arrowTop').css({transform:"translate(50px, -50%)",});
	}else{
		$('.arrowTop').css({transform:"translate(100px, -50%)",});
	}
	sections.forEach(function(section){
		updateSection($(section).attr('id'));
	});
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
	services = await response.json();
	console.log(services);
	let i = 0;
	for(let service of services){
		$('#Services .row').append(`
			<div class="col-md-6 part wow ${((i + 1) % 2 == 0) ? 'animate__fadeInRight': 'animate__fadeInLeft'}" data-wow-delay="${i * 0.2}s" data-wow-duration="1s">
				<div class="item text-center rounded-4">
					<img src="images/${service.icon}" alt="s1 service1" class="mb-3">
					<h5 class="mb-3">${service.title}</h5>
					<p>${prepareDesc(service.description.slice(0,150))}... <a class="firstColor fw-semibold" onclick="showService(${i})">Read More</a></p>
				</div>
			</div>
		`);
		i++;
	}
})();

(async function(){
	let response = await fetch("https://semicode.tech/api/v1/l10nhouse/sectors");
	sectors = await response.json();
	console.log(sectors);
	let i = 0;
	for(let sector of sectors){
		$('.popup[popup-type-name="sectors"] .body .row').append(`
			<div class="col-lg-3">
				<div class="item rounded-3"><img src="images/sec/${sector.icon}" alt="" class="img-fluid mb-3">
					<div class="type w-100">
						<p class="mb-0 text-center">${sector.name}</p>
					</div>
				</div>
			</div>
		`);
		i++;
	}
})();
	
$('.popup .box').click(function(e){
	e.stopPropagation();
});