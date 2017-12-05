/**
 * Navigation Component.
 * Andres Lujan 
 * 
 * @param {string} className
 * @class
 */

'use strict';

var Nav = function(className) {
	this.element = document.querySelector(className);
	this.logo = this.element.querySelector('.logo');
	this.menu = this.element.querySelector('.menu');
	this.icon = this.element.querySelector('.svg');
	this.overlay = document.querySelector('.overlay');
};


/**
 * init() initialize the Nav object
 * using data from API
 */
Nav.prototype.init = function init() {
	this.data('/api/nav.json');
};


/**
 * data() make request to API
 * @param {string} url
 */
Nav.prototype.data = function data(url) {
	var self = this;
	fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Error. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
      	// Call
				self.factory(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};


/**
 * data() makes request to API
 * @param {string} url
 */
Nav.prototype.createNode = function createNode(elementType) {
	return document.createElement(elementType);
};

Nav.prototype.appendNode = function appendNode(parent, el) {
  return parent.appendChild(el);
};

Nav.prototype.factory = function factory(data) {
	var self = this;
	var container = this.menu;

	var items = data.items;
	items.map(function (item) {
		var subitems = item.items;
		var li = self.createNode('li'),
				a = self.createNode('a');
		a.innerHTML = item.label;
		if (subitems.length > 0) {
			var img = self.createNode('img'),
					ul = self.createNode('ul');
			img.src = '/images/down-arrow.png';
			ul.className = 'secondary';
			self.appendNode(a, img);
			a.className = 'toggle-secondary';
			subitems.map(function (subitem) {
				var sli = self.createNode('li'),
						sa = self.createNode('a');
				sa.innerHTML = subitem.label;
				sa.href = subitem.url;
				self.appendNode(sli, sa);
				self.appendNode(ul, sli);
			});
		}
		a.href = item.url;
		self.appendNode(li, a);
		if (ul) {
			self.appendNode(li, ul);
		}
		self.appendNode(container, li);
	});
	this.toggleSecondary = this.element.querySelectorAll('.toggle-secondary');
	this.addEvents();
};


Nav.prototype.addEvents = function addEvents() {
	console.log('Nav.addEvents()');
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
