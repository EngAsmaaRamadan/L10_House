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
}