var nav = function() {
    this.nav = document.getElementById('nav');
    this.secondaryNavWrapper = document.querySelector('.secondary-nav');
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
    console.log('E.TARGET: ', e.target);
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
        (this.slideOutBtn !== e.target) &&
        (!this.secondaryNavWrapper.contains(e.target))) {
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
    secondary.style.marginLeft = '0px';

    if (secondary.classList.contains('open')) {
        secondary.classList.remove('open');
        secondary.style.marginLeft = '-' + this.navWidth + 'px';
    } else {
        secondary.classList.add('open');
        secondary.style.marginLeft = '0px';
    }

    this.addSecondaryListeners(secondary);
};


nav.prototype.addSecondaryListeners = function(element) {

    setTimeout(function() {
        document.addEventListener('click', function(e) {
                console.log('EL: ', element, 'CHILDREN: ', element.children, 'TARGET: ', e.target);
            if (element.classList.contains('open') &&
                this.nav.contains(e.target)) {
                    console.log('close the secondary slide!');
                    this.closeSecondarySlide(element);
            }
            else if (element.classList.contains('open') && element.contains(e.target) && element.children !== e.target){
                console.log('CLOSE IT')
                this.closeSecondarySlide(element);
            }
            else {
                return;
            }
        }.bind(this));
    }.bind(this), 250);

};


nav.prototype.closeSecondarySlide = function(element) {
    var secondary = element;
    console.log('secondary');
    secondary.classList.remove('open');
    secondary.style.marginLeft = '-' + this.navWidth + 'px';
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
