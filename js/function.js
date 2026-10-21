function prepareDesc(desc){
	let regex = /L10N House/gmi;
	return desc.replaceAll(regex,`<span class="fw-medium desc"><span class="firstColor">L10N</span> <span class="secondColor">House</span> </span>`);
}

function saveLastNavCase(NavCase){
	localStorage.setItem('saveLastNavCase',JSON.stringify(NavCase));
}

function changeMode(){
	let ele = document.body;
	console.log(ele);
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