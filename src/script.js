let hamburger = document.getElementById('hamburger');
let cancel = document.getElementById('close-icon');
let cover = document.querySelector('.cover');

hamburger.addEventListener('click', () => {
	document.querySelector('.nav').classList.add('show-nav');
	cover.classList.add('show-cover');
});

function closeNav() {
	document.querySelector('.nav').classList.remove('show-nav');
	cover.classList.remove('show-cover');
}
cancel.addEventListener('click', closeNav);
cover.addEventListener('click', closeNav);
/*Close navigation*/
// function exitNav() {
//   document.getElementById("sideBar").style.width = "0";
//   document.getElementById("sideNav").style.width = "0";
// }
