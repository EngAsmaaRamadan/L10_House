let $navEle = $('nav.navbar'),
	sections = $('section[id], header').get(),
	services = null;
console.log(sections);

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

//remove active from previous active
$('.nav-link').click(function(){
	$(this).parents().find('.active').removeClass('active');
	$(this).addClass('active');
});

//efect on nav when scroll
$(window).scroll(function(e){
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
			<div class="col-md-6 part">
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
	
$('.popup .box').click(function(e){
	e.stopPropagation();
});