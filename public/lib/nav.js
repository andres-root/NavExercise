var Nav = function(className) {
	this.element = document.querySelector(className);
	this.logo = this.element.querySelector('.logo');
	this.menu = this.element.querySelector('.menu');
	this.icon = this.element.querySelector('.svg');
	this.toggleSecondary = this.element.querySelectorAll('.toggle-secondary');
	this.overlay = document.querySelector('.overlay');
};

Nav.prototype.init = function init() {
	console.log('Nav.init()');
	var self = this;

	this.logo.addEventListener('click', function handleToggle(event) {
		self.toggle();
	}, false);

	this.overlay.addEventListener('click', function handleOverlay(event) {
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
	if (window.innerWidth < 768) {
		// Push from left
		this.element.classList.toggle('active');
		this.logo.classList.toggle('toggle-left');
		this.menu.classList.toggle('toggle-left');
		document.querySelector('.content').classList.toggle('toggle-left');
	} else {
		this.removeOpened();
	}
	this.overlay.classList.toggle('visible');

	// Change toggle icon
	this.icon.classList.toggle('open');
};

Nav.prototype.cleanClass = function cleanClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove(className);
	}
};

Nav.prototype.removeOpened = function removeOpened() {
	var elements = this.menu.querySelectorAll('.open');
	this.cleanClass(elements, 'open');
	elements = this.menu.querySelectorAll('.visible');
	this.cleanClass(elements, 'visible');
	this.overlay.classList.add('visible');
};

Nav.prototype.toggleSubnav = function toggle(secondary) {
	if (window.innerWidth >= 768) {
		this.removeOpened();
		this.overlay.classList.add('visible');
	}
	secondary.classList.toggle('visible');
};


topnav = new Nav('.hg-nav');
topnav.init();