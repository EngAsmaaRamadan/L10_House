function prepareDesc(desc){
	let regex = /L10N House/gmi;
	return desc.replaceAll(regex,`<span class="fw-medium desc"><span class="firstColor">L10N</span> <span class="secondColor">House</span> </span>`);
}

function saveLastNavCase(NavCase){
	localStorage.setItem('saveLastNavCase',JSON.stringify(NavCase));
}

function showService(serviceIndex){
	let service = services[serviceIndex];
	$(`.popup[popup-type-name="service"] .box`).html(`
		<div class="body px-3 py-3">
			<h4 class="text-center fw-bold secondColor mb-5">${service.title}</h4>
			<div class="row mb-5">
				<div class="col-lg-6">
					<div class="item">
						<p>${service.description}</p>
						
					</div>
				</div>
				<div class="col-lg-6">
					<div class="item">
						<img src="images/${service.img}" alt="service imgs" class="img-fluid rounded-3">
					</div>
				</div>
			</div>
			<section>
					<h5 class="mb-3">The translation process: attention to detail every step of the way</h5>
					<ol>
						<li>item</li>
						<li></li>
						<li></li>
						<li></li>
					</ol>
				</section>
				<section class="mt-4">
					<h5 class="mb-3">QA Procedures:</h5>
					<ol>
						<li></li>
						<li></li>
						<li>item</li>
						<li></li>
					</ol>
				</section>
		</div>
	`);
	openPopup('service');
}

function openPopup(popupName){
	$(`.popup[popup-type-name="${popupName}"]`).fadeIn(1000);
}

function changeMode(){
	let ele = document.body;
	ele.classList.toggle('dark-mode');
	$("nav.navbar").toggleClass('darkMode');
}

function updateSection(sectionId){
	let $section = $(`#${sectionId}`),
		topOfSection = $section.offset().top,
		sectionHeight = $section.height(),
		navEleHeight = $navEle.eq().height(),
		sectionBottom = topOfSection + sectionHeight;
	if($(window).scrollTop() >= topOfSection && $(window).scrollTop() <= sectionBottom){
		$('.nav-link.active').removeClass('active');
		$(`.nav-link[href="#${sectionId}"]`).addClass('active');
		storeLastActive();
	}
	storeLastActive();
}

function storeLastActive(){
	localStorage.setItem('lastActiveId',JSON.stringify($('.nav-link.active').attr('href')));
}