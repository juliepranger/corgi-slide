/*
 * slide out navigation controller
 * @constructor
 * @export
 */
var nav = function() {
    // primary nav
    this.nav = document.getElementById('nav');
    this.navWidth = this.nav.style.width;
    this.navWidth = 200;
    this.nav.style.marginLeft = '-' + this.navWidth + 'px';

    //secondary 'slide out' nav parent container
    this.secondaryNavWrapper = document.querySelector('.secondary-nav');

    // button to initially expand nav
    this.slideOutBtn = document.getElementById('slide-out');
    this.slideOutBtn.style.left = '0px';

    // array of individual secondary slide out list
    this.secondaryList = document.getElementsByClassName('secondary');
    // flag to determine if the secondary nav is open or not
    this.secondaryIsOpen = false;

    // individual nav list items
    this.list = document.getElementsByClassName('list');

    // start the secondary nav "closed"
    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].style.width = this.navWidth - 30;
        this.secondaryList[i].style.marginLeft = '-' + this.navWidth - 20 + 'px';
    }

    // kick off our click listeners
    this.initListeners();
};


/*
 * Initialize DOM listeners
 */
nav.prototype.initListeners = function() {

    // click event on "corgi" button
    this.slideOutBtn.addEventListener('click', function(e) {
        this.slide(e);
    }.bind(this));

    // document click listener
    // only trigger if you're not clicking the "corgi" button
    document.addEventListener('click', function(e) {
        if (this.slideOutBtn === e.target) {
            return;
        } else {
            this.slide(e);
        }
    }.bind(this));

    // initialize listeners on secondary nav elements
    for (var i = 0; i < this.list.length; i++) {
        this.initSecondaryListeners(this.list[i], i);
    }
};


/*
 * Initialize DOM listeners on secondary nav elements
 */
nav.prototype.initSecondaryListeners = function(element, index) {
    var element = element;
    element.addEventListener('click', this.secondarySlide.bind(this, element, index));
};


/*
 * Toggle "slide" movement on primary nav
 * @param {Event} e Click event
 */
nav.prototype.slide = function(e) {

    if (this.slideOutBtn === e.target) {
        if (this.nav.classList.contains('open')) {
            this.nav.classList.remove('open');
            this.nav.style.marginLeft = '-' + this.navWidth + 'px';
            this.slideOutBtn.style.left = '0px';
        } else {
            this.nav.classList.add('open');
            this.nav.style.marginLeft = '0px';
            this.slideOutBtn.style.left = this.navWidth - 20 + 'px';
        }
    } else if (this.nav.contains(e.target) &&
        !this.nav.children[0].contains(e.target) && this.nav.classList.contains('open')) {
        if (this.secondaryIsOpen) {
            this.closeSecondarySlide();
        } else {
            this.nav.classList.remove('open');
            this.nav.style.marginLeft = '-' + this.navWidth + 'px';
            this.slideOutBtn.style.left = '0px';
        }

    } else if (!this.nav.contains(e.target) &&
        (this.slideOutBtn !== e.target) &&
        (!this.secondaryNavWrapper.contains(e.target))) {
        this.closeAllSliders();
    }
};


/*
 * Toggle "slide" movement on secondary navigation
 * @param {Element} element The secondary nav element clicked on
 * @param {Integer} index The index of nav element clicked on
 */
nav.prototype.secondarySlide = function(element, index) {

    var secondary = this.secondaryList[index];
    secondary.style.marginLeft = '0px';

    if (secondary.classList.contains('open')) {
        this.secondaryIsOpen = false;
        secondary.classList.remove('open');
        secondary.style.marginLeft = '-' + this.navWidth + 'px';
    } else {
        this.secondaryIsOpen = true;
        secondary.classList.add('open');
        secondary.style.marginLeft = '0px';
    }

    this.addSecondaryListeners(secondary);
};


/*
 * Initialize DOM listener on secondary nav item
 * Only triggered when element is opened
 * @param {Element} element The 'open' secondary nav element we are listening to
 */
nav.prototype.addSecondaryListeners = function(element) {

    if (element.classList.contains('open')) {
        setTimeout(function() {
            element.addEventListener('click', this.secondaryToggle.bind(this, element));
        }.bind(this), 5)
    } else {
        return;
    }
};


/*
 * Toggle secondary navigation
 * @param {Element} element The secondary nav element that needs to be toggled
 * @aram {Event} e The click event on secondary nav element
 */
nav.prototype.secondaryToggle = function(element, e) {

    var element = element;

    if (element.classList.contains('open') &&
        this.nav.contains(e.target)) {
        this.closeSecondarySlide(element);
    } else if (element.classList.contains('open') &&
        element.contains(e.target) &&
        element.children !== e.target) {
        this.closeSecondarySlide(element);
    } else {
        return;
    }
};


/*
 * Close secondary slide
 * @param {Element} element The secondary nav element to close
 */
nav.prototype.closeSecondarySlide = function(element) {
    var secondary = element;
    this.secondaryIsOpen = false;
    if (secondary) {
        secondary.classList.remove('open');
        secondary.style.marginLeft = '-' + this.navWidth + 'px';
    }

    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].classList.remove('open');
        this.secondaryList[i].style.marginLeft = '-' + this.navWidth + 'px';
    }
};


/*
 * Close all sliders
 */
nav.prototype.closeAllSliders = function() {
    this.nav.classList.remove('open');
    this.nav.style.marginLeft = '-' + this.navWidth + 'px';
    this.slideOutBtn.style.left = '0px';
    this.secondaryIsOpen = false;

    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].classList.remove('open');
        this.secondaryList[i].style.width = this.navWidth - 30;
        this.secondaryList[i].style.marginLeft = '-' + this.navWidth - 20 + 'px';
    }
};
