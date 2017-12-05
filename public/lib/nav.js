/**
 * Navigation Component.
 * By Andres Lujan 
 * 
 * @param {String} className
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
 * @param {String} url
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
      	// Create menu
				self.factory(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};


/**
 * factory() create menu using API data
 * @param {JSON} data
 */
 Nav.prototype.factory = function factory(data) {
	var self = this;
	var container = this.menu;

	var items = data.items;

	// Go through items
	items.map(function (item) {
		var subitems = item.items;
		var li = self.createNode('li'),
				a = self.createNode('a');

		// Check if secondary navigation items exist
		if (subitems.length > 0) {
			var img = self.createNode('img'),
					ul = self.createNode('ul');

			// Add down arrow to secondary items header
			img.src = '/images/down-arrow.png';
			ul.className = 'secondary';
			self.appendNode(a, img);
			a.className = 'toggle-secondary';

			// Go through all subitems and create DOM Elements
			subitems.map(function (subitem) {
				var sli = self.createNode('li'),
						sa = self.createNode('a');
				sa.innerHTML = subitem.label;
				sa.href = subitem.url;
				self.appendNode(sli, sa);
				self.appendNode(ul, sli);
			});
		}

		// Continue creating item element
		a.innerHTML = item.label;
		a.href = item.url;
		self.appendNode(li, a);

		// If secondary items append list
		if (ul) {
			self.appendNode(li, ul);
		}
		self.appendNode(container, li);
	});

	this.toggleSecondary = this.element.querySelectorAll('.toggle-secondary');

	// Add event listeners after DOM elements are created
	this.addEvents();
};


/**
 * addEvents() add event listeners
 *
 */
Nav.prototype.addEvents = function addEvents() {
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


/**
 * toggleSubnav() show secondary items
 * @param {Element} secondary
 */
Nav.prototype.toggleSubnav = function toggle(secondary) {
	if (window.innerWidth >= 768) {
		this.removeOpened();
		this.overlay.classList.add('visible');
	}
	secondary.classList.toggle('visible');
};


/**
 * createNode() create DOM Element
 * @param {String} elementType
 */
Nav.prototype.createNode = function createNode(elementType) {
	return document.createElement(elementType);
};


/**
 * appendNode() append element to existing DOM Element
 * @param {Element} parent
 * @param {Element} el
 */
Nav.prototype.appendNode = function appendNode(parent, el) {
  return parent.appendChild(el);
};


/**
 * toggle() toggle navigation dropdowns
 * on Desktop and Mobile Breakpoints
 */
Nav.prototype.toggle = function toggle() {

	// If mobile toggle from left
	if (window.innerWidth < 768) {
		// Push from left
		this.element.classList.toggle('active');
		this.logo.classList.toggle('toggle-left');
		this.menu.classList.toggle('toggle-left');
		document.querySelector('.content').classList.toggle('toggle-left');
	} else {
	  // Remove current opened items
		this.removeOpened();
	}

	// Show overlay over content
	this.overlay.classList.toggle('visible');

	// Change toggle icon
	this.icon.classList.toggle('open');
};


/**
 * removeOpened() remove all opened items
 *
 */
Nav.prototype.removeOpened = function removeOpened() {
	var elements = this.menu.querySelectorAll('.open');
	this.cleanClass(elements, 'open');
	elements = this.menu.querySelectorAll('.visible');
	this.cleanClass(elements, 'visible');
	this.overlay.classList.add('visible');
};


/**
 * cleanClass() remove class name from list of elements
 * @param {List} elements
 * @param {String} className
 */
Nav.prototype.cleanClass = function cleanClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove(className);
	}
};

var navElements = document.querySelectorAll('.hg-nav');
var navList = [];
var topnav;

for (var i = 0; i < navElements.length; i++) {
	topnav = new Nav('.hg-nav');
	topnav.init();
	navList.push(topnav);
}
