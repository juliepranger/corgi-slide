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

    // individual nav list items
    this.list = document.getElementsByClassName('list');

    //secondary 'slide out' nav parent container
    this.secondaryNavWrapper = document.querySelector('.secondary-nav');
    // array of individual secondary slide out list
    this.secondaryList = document.getElementsByClassName('secondary');
    // flag to determine if the secondary nav is open or not
    this.secondaryIsOpen = false;

    //tertiary 'slide out' nav parent container
    this.tertiaryNavWrapper = document.querySelector('.tertiary-nav');
    // array of individual tertiary slide out list
    this.tertiaryList = document.getElementsByClassName('tertiary');
    // flag to determine if the tertiary nav is open or not
    this.tertiaryIsOpen = false;

    // button to initially expand nav
    this.slideOutBtn = document.getElementById('slide-out');
    this.slideOutBtn.style.left = '0px';

    this.goFlag = false;

    // start the secondary nav "closed"
    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].style.width = this.navWidth - 30;
        this.secondaryList[i].style.marginLeft =
            '-' + this.navWidth - 20 + 'px';
    }

    // start the tertiary nav "closed"
    for (var i = 0; i < this.tertiaryList.length; i++) {
        this.tertiaryList[i].style.width = this.navWidth - 60;
        this.tertiaryList[i].style.marginLeft =
            '-' + this.navWidth - 40 + 'px';
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

    // initialize listeners on tertiary nav elements
    for (var i = 0; i < this.secondaryList.length; i++) {
        this.initTertiaryListeners(this.secondaryList[i], i);
    }
};


/*
 * Initialize DOM listeners on secondary nav elements
 */
nav.prototype.initSecondaryListeners = function(element, index) {
    var element = element;

    element.addEventListener(
        'click',
        this.secondarySlide.bind(this, element, index)
    );
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
        !this.nav.children[0].contains(e.target) &&
        this.nav.classList.contains('open')) {
        if (this.secondaryIsOpen) {
            this.closeSecondarySlide();
        } else if (this.tertiaryIsOpen) {
            this.closeTertiarySlide();
        } else {
            this.nav.classList.remove('open');
            this.nav.style.marginLeft = '-' + this.navWidth + 'px';
            this.slideOutBtn.style.left = '0px';
        }
    } else if (!this.nav.contains(e.target) &&
        (this.slideOutBtn !== e.target) &&
        (!this.secondaryNavWrapper.contains(e.target)) &&
        (!this.tertiaryNavWrapper.contains(e.target))) {
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
        this.goFlag = false;
        this.secondaryIsOpen = false;
        secondary.classList.remove('open');
        secondary.style.marginLeft = '-' + this.navWidth + 'px';
    } else {
        this.goFlag = true;
        this.secondaryIsOpen = true;
        secondary.classList.add('open');
        secondary.style.marginLeft = '0px';
    }

    this.addSecondaryListeners(secondary, index);
};


/*
 * Initialize DOM listener on secondary nav item
 * Only triggered when element is opened
 * @param {Element} element The 'open' secondary nav element we are listening to
 */
nav.prototype.addSecondaryListeners = function(element, index) {

    if (element.classList.contains('open') && this.goFlag == true) {
        setTimeout(function() {
            element.addEventListener(
                'click',
                this.secondaryToggle.bind(this, element, index)
            );
        }.bind(this), 5);
    } else {
        return;
    }


};


/*
 * Toggle secondary navigation
 * @param {Element} element The secondary nav element that needs to be toggled
 * @aram {Event} e The click event on secondary nav element
 */
nav.prototype.secondaryToggle = function(element, index, e) {

    var element = element;
    console.log('e.target: ', e.target)
    console.log(element.children[0], element.children[0].contains(e.target))
    if (element.classList.contains('open') &&
        this.nav.contains(e.target)) {
        this.goFlag = false;
        this.closeSecondarySlide(element);
    }
    else if (element.classList.contains('open') &&
        element.contains(e.target) &&
        !element.children[0].contains(e.target)) {
            console.log('dont close, init click events!')
            this.goFlag = true;
            // initialize listeners on tertiary nav elements
            for (var i = 0; i < this.secondaryList.length; i++) {
                this.initTertiaryListeners(this.secondaryList[i], i);
            }
            // this.secondaryIsOpen = true;
    }
    else {
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
        this.goFlag = false;
        secondary.classList.remove('open');
        secondary.style.marginLeft = '-' + this.navWidth + 'px';
    }

    for (var i = 0; i < this.secondaryList.length; i++) {
        this.goFlag = false;
        this.secondaryList[i].classList.remove('open');
        this.secondaryList[i].style.marginLeft = '-' + this.navWidth + 'px';
    }
};



/*
 * Initialize DOM listeners on secondary nav elements
 */
nav.prototype.initTertiaryListeners = function(element, index) {
    var element = element;

    if(this.goFlag === true) {
        console.log('GO')
        element.addEventListener(
            'click',
            this.tertiarySlide.bind(this, element, index)
        );
    }
    else {console.log('were not initializing anything for u, bozo')}

};


/*
 * Toggle "slide" movement on tertiary navigation
 * @param {Element} element The tertiary nav element clicked on
 * @param {Integer} index The index of nav element clicked on
 */
nav.prototype.tertiarySlide = function(element, index) {
    // console.log(this.secondaryList[index]
    var tertiary = this.tertiaryList[index];
    tertiary.style.marginLeft = '0px';
    console.log(this.goFlag)
    if(this.goFlag) {
        if (tertiary.classList.contains('open')) {
            this.tertiaryIsOpen = false;
            tertiary.classList.remove('open');
            tertiary.style.marginLeft = '-' + this.navWidth + 'px';
        } else {
            this.tertiaryIsOpen = true;
            tertiary.classList.add('open');
            tertiary.style.marginLeft = '0px';
        }
        this.addTertiaryListeners(tertiary, index);
    }
    else {
        this.goFlag = false;
        console.log(this.goFlag, 'flag changed, dont do anything')
    }
};


/*
 * Initialize DOM listener on secondary nav item
 * Only triggered when element is opened
 * @param {Element} element The 'open' secondary nav element we are listening to
 */
nav.prototype.addTertiaryListeners = function(element, index) {
    console.log('add tertiary listeners')
    console.log(element.classList)

    if (element.classList.contains('open') && this.goFlag === true) {
        setTimeout(function() {
            element.addEventListener(
                'click',
                this.tertiaryToggle.bind(this, element)
            );
        }.bind(this), 5);
    } else {
        console.log('flag raised, add tertiary listeners not fired');
    }

};


/*
 * Toggle tertiary navigation
 * @param {Element} element The tertiary nav element that needs to be toggled
 * @aram {Event} e The click event on tertiary nav element
 */
nav.prototype.tertiaryToggle = function(element, e) {
    console.log('toggle')
    var element = element;

    if (element.classList.contains('open') &&
        this.nav.contains(e.target)) {
        this.closeTertiarySlide(element);
    }
    //  else if (element.classList.contains('open') &&
    //     element.contains(e.target) &&
    //     element.children !== e.target) {
    //     this.closeTertiarySlide(element);
    // }
     else {
        return;
    }
};


/*
 * Close secondary slide
 * @param {Element} element The secondary nav element to close
 */
nav.prototype.closeTertiarySlide = function(element) {
    var tertiary = element;
    this.tertiaryIsOpen = false;
    if (tertiary) {
        tertiary.classList.remove('open');
        tertiary.style.marginLeft = '-' + this.navWidth + 'px';
    }

    for (var i = 0; i < this.tertiaryList.length; i++) {
        this.tertiaryList[i].classList.remove('open');
        this.tertiaryList[i].style.marginLeft = '-' + this.navWidth + 'px';
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
    this.tertiaryIsOpen = false;

    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].classList.remove('open');
        this.secondaryList[i].style.width = this.navWidth - 30;
        this.secondaryList[i].style.marginLeft =
            '-' + this.navWidth - 20 + 'px';
    }

    for (var i = 0; i < this.tertiaryList.length; i++) {
        this.tertiaryList[i].classList.remove('open');
        this.tertiaryList[i].style.width = this.navWidth - 30;
        this.tertiaryList[i].style.marginLeft =
            '-' + this.navWidth - 20 + 'px';
    }
};
