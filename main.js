var nav = function() {
    this.nav = document.getElementById('nav');
    this.secondaryNavWrapper = document.querySelector('.secondary-nav');
    this.navWidth = this.nav.style.width;
    this.navWidth = 200;
    this.slideOutBtn = document.getElementById('slide-out');
    this.nav.style.marginLeft = '-' + this.navWidth + 'px';
    this.slideOutBtn.style.left = '0px';
    this.list = document.getElementsByClassName('list');
    this.secondaryList = document.getElementsByClassName('secondary');
    this.secondaryIsOpen = false;

    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].style.width = this.navWidth - 30;
        this.secondaryList[i].style.marginLeft = '-' + this.navWidth - 20 + 'px';
    }

    this.initListeners();
};


nav.prototype.initListeners = function() {
    this.slideOutBtn.addEventListener('click', function(e) {
        this.slide(e);
    }.bind(this));

    document.addEventListener('click', function(e) {
        if (this.slideOutBtn === e.target) {
            return;
        } else {
            this.slide(e);
        }
    }.bind(this));

    for (var i = 0; i < this.list.length; i++) {
        this.initSecondaryListeners(this.list[i], i);
    }
};

nav.prototype.initSecondaryListeners = function(element, index) {
    var element = element;
    element.addEventListener('click', this.secondarySlide.bind(this, element, index));
};


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
            if(this.secondaryIsOpen) {
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


nav.prototype.addSecondaryListeners = function(element) {

    if(element.classList.contains('open')) {
        setTimeout(function() {
            element.addEventListener('click', this.secondaryToggle.bind(this, element));
        }.bind(this), 5)
    } else {
        return;
    }
};


nav.prototype.secondaryToggle = function(element, e) {

    var element = element;

    if (element.classList.contains('open') &&
        this.nav.contains(e.target)) {
        this.closeSecondarySlide(element);
    }
    else if (element.classList.contains('open') && element.contains(e.target) && element.children !== e.target){
        this.closeSecondarySlide(element);
    }
    else {
        return;
    }
};

nav.prototype.closeSecondarySlide = function(element) {
    var secondary = element;
    this.secondaryIsOpen = false;
    if(secondary) {
        secondary.classList.remove('open');
        secondary.style.marginLeft = '-' + this.navWidth + 'px';
    }

    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].classList.remove('open');
        this.secondaryList[i].style.marginLeft = '-' + this.navWidth + 'px';
    }
};


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














/* Triggered by clicking on the nav items
 * Releases a num of Corgis depending on the item clicked
 */
// nav.prototype.releaseTheCorgs = function(num) {
//     var number = (num + 1) * 10;
//     console.log(number)

    // randomly grab the number of images from the array and put into a new array


    // drop into the DOM at an interval
// }
