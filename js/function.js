function prepareDesc(desc){
	let regex = /L10N House/gmi;
	return desc.replaceAll(regex,`<span class="fw-medium desc"><span class="firstColor">L10N</span> <span class="secondColor">House</span> </span>`);
}

function saveLastNavCase(NavCase){
	localStorage.setItem('saveLastNavCase',JSON.stringify(NavCase));
}

function showService(serviceIndex){
	let service = services[serviceIndex];
	prepareServiceSections(service.sections);
	$(`.popup[popup-type-name="service"] .box .body`).html(`
			<h4 class="text-center fw-bold secondColor mb-5">${service.title}</h4>
			<div class="row mb-4">
				<div class="col-lg-6">
					<div class="item">
						<p>${prepareDesc(service.description)}</p>
						
					</div>
				</div>
				<div class="col-lg-6">
					<div class="item">
						<img src="images/${service.img}" alt="service imgs" class="img-fluid rounded-3">
					</div>
				</div>
			</div>
			${prepareServiceSections(service.sections)}
	`);
	openPopup('service');
}

function prepareServiceSections(sections){
	let sectionEle = ``,
		i = 0;

	for(let section of sections){
		sectionEle += `
			<section class="${(i != 0) ? 'mt-3 mt-xl-4' : ''}">
				<h5 class="mb-3">${section.title}</h5>
				<ol>
					${prepareSectionPoints(section.points)}
				</ol>
			</section>
		`;
		i++;
	}

	return sectionEle;
}

function prepareSectionPoints(points){
	let lis = ``;

	for(let point of points){
		lis += `<li>${point}</li>`;
	}

	return lis;
}

function openPopup(popupName){
	$(`.popup[popup-type-name="${popupName}"]`).fadeIn(1000,function(){
		if(popupName == "languages"){
			$(this).find('.box').addClass('show');
		}
	});
	$('body').css({
		overflowY:"hidden",
	});
}

function closePopup(popupName){
	let $popup = $(`.popup[popup-type-name="${popupName}"]`);
	if(popupName == "languages"){
		$popup.find('.box').removeClass('show');
		$popup.delay(500).fadeOut(1000);
	}else{
		$popup.fadeOut(1000);
	}

	$('body').css({
		overflowY:"auto",
	});
}

function changeMode(){
	let ele = document.body;
	ele.classList.toggle('dark-mode');
	$("nav.navbar").toggleClass('darkMode');
	saveLastMode();
}

function updateSection(sectionId){
	let $section = $(`#${sectionId}`),
		topOfSection = $section.offset().top,
		sectionHeight = $section.outerHeight(true),
		navEleHeight = $navEle.outerHeight(true),
		sectionBottom = topOfSection + sectionHeight,
		scrollY = $(window).scrollTop();
	if(scrollY > topOfSection && scrollY < sectionBottom){
		$('.nav-link.active').removeClass('active');
		$(`.nav-link[href="#${sectionId}"]`).addClass('active');
		storeLastActive();
	}
	storeLastActive();
}

function storeLastActive(){
	localStorage.setItem('lastActiveId',JSON.stringify($('.nav-link.active').attr('href')));
}

function saveLastMode(){
	localStorage.setItem('isDarkMode',JSON.stringify($('body').eq(0).hasClass('dark-mode')));
}