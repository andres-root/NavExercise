var Nav = function(className) {
	this.element = document.querySelector(className);
	this.logo = this.element.querySelector('.logo');
	this.menu = this.element.querySelector('.menu');
};

Nav.prototype.init = function init() {
	console.log('Nav.init()');
	var self = this;

	this.logo.addEventListener('click', function handleToggleClick(event) {
		self.toggle();
	}, false);
};

Nav.prototype.toggle = function toggle() {
	this.menu.classList.toggle('visible');
};

topnav = new Nav('.hg-nav');
topnav.init();