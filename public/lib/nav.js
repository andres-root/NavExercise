var Nav = function(className) {
	this.element = document.querySelector(className);
	this.logo = this.element.querySelector('.logo');
	this.menu = this.element.querySelector('.menu');
	this.icon = this.element.querySelector('.svg');
	this.toggleSecondary = this.element.querySelectorAll('.toggle-secondary');
};

Nav.prototype.init = function init() {
	console.log('Nav.init()');
	var self = this;

	this.logo.addEventListener('click', function handleToggle(event) {
		self.toggle();
	}, false);

	for (var i = 0; i < this.toggleSecondary.length; i++) {
		this.toggleSecondary[i].addEventListener('click', function handleToggleSecondary(event) {
			self.toggleSubnav(this.parentNode.querySelector('ul.secondary'));
			this.classList.toggle('open');
		}, false);
	}
};

Nav.prototype.toggle = function toggle() {
	// Push from left
	this.logo.classList.toggle('toggle-left');
	this.menu.classList.toggle('toggle-left');
	document.querySelector('.content').classList.toggle('toggle-left');

	// Change toggle icon
	this.icon.classList.toggle('open');
};

Nav.prototype.toggleSubnav = function toggle(secondary) {
	secondary.classList.toggle('visible');
	// this.classList.toggle('open');
};


topnav = new Nav('.hg-nav');
topnav.init();