var nav = function() {
    this.nav = document.getElementById('nav');
    this.navWidth = this.nav.style.width;
    this.navWidth = 200;
    this.slideOutBtn = document.getElementById('slide-out');
    this.nav.style.marginLeft = '-' + this.navWidth + 'px';
    this.slideOutBtn.style.left = '0px';
    this.corgiList = document.getElementsByClassName('corgi');
    this.secondaryList = document.getElementsByClassName('secondary');

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

    for (var i = 0; i < this.corgiList.length; i++) {
        this.initSecondaryListeners(this.corgiList[i], i);
    }
};

nav.prototype.initSecondaryListeners = function(element, index) {
    var element = element;
    element.addEventListener('click', function(e) {
        // this.releaseTheCorgs(index);
        this.secondarySlide(element, index);
    }.bind(this));
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
    } else if (!this.nav.contains(e.target) &&
        (this.slideOutBtn !== e.target)) {
        this.nav.classList.remove('open');
        this.nav.style.marginLeft = '-' + this.navWidth + 'px';
        this.slideOutBtn.style.left = '0px';

        for (var i = 0; i < this.secondaryList.length; i++) {
            this.secondaryList[i].style.width = this.navWidth - 30;
            this.secondaryList[i].style.marginLeft = '-' + this.navWidth - 20 + 'px';
        }
    }
};



nav.prototype.secondarySlide = function(element, index) {
    var secondary = this.secondaryList[index];

    console.log(secondary, secondary.offsetTop)
    secondary.style.marginLeft = '0px';
    // secondary.style.top = '-' + element.offsetTop + 'px';
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
