var Nav = function(className) {
	this.element = document.querySelector(className);
	this.logo = this.element.querySelector('.logo');
	this.menu = this.element.querySelector('.menu');
	this.icon = this.element.querySelector('.svg');
};

Nav.prototype.init = function init() {
	console.log('Nav.init()');
	var self = this;

	this.logo.addEventListener('click', function handleToggleClick(event) {
		self.toggle();
	}, false);
};

Nav.prototype.toggle = function toggle() {
	// Push from left
	this.logo.classList.toggle('toggle-left');
	this.menu.classList.toggle('toggle-left');
	document.querySelector('.content').classList.toggle('toggle-left');

	// Change toggle icon
	this.icon.classList.toggle('open');

};

topnav = new Nav('.hg-nav');
topnav.init();