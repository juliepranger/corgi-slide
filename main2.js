var slideOutNav = function() {

    // initialize variables
    this.OPEN_CLASS = 'open';

    // primary nav
    this.primaryNav = document.getElementById('nav');

    // individual primary nav list items
    this.primaryList = document.getElementsByClassName('list');

    //secondary 'slide out' nav parent container
    this.secondaryNav = document.querySelector('.secondary-nav');
    // array of individual secondary slide out list
    this.secondaryList = document.getElementsByClassName('secondary');

    //tertiary 'slide out' nav parent container
    this.tertiaryNav = document.querySelector('.tertiary-nav');
    // array of individual tertiary slide out list
    this.tertiaryList = document.getElementsByClassName('tertiary');

    // flag to determine if the primary nav is open or not
    this.primaryIsOpen = false;
    // flag to determine if the secondary nav is open or not
    this.secondaryIsOpen = false;
    // flag to determine if the tertiary nav is open or not
    this.tertiaryIsOpen = false;

    // button to initially expand nav
    this.slideOutBtn = document.getElementById('slide-out');


    // init listeners
    this.init();
};


slideOutNav.prototype.init = function()
{

    // add listener for document - close if hitting anything besides:
        // the slideOut button
        // any navigation element
    document.addEventListener('click', function(e)
    {
        if (this.slideOutBtn === e.target)
        {
            return;
        }
        else if (this.primaryNav.children[0].contains(e.target)) {
            this.togglePrimaryNav();
        }
        else
        {
            this.closeAll(e)
        }
    }.bind(this));

    // add listener for slide out button - trigger primary nav toggle function
    this.slideOutBtn.addEventListener('click', function(e)
    {
        this.togglePrimaryNav(e);
    }.bind(this));

    // add listener for clicking on primary nav elements - trigger secondary nav toggle function

    // add listener for clicking on secondary nav elements - trigger tertiary nav toggle function


    ///////////////


    // if all navs are open and user clicks on open secondary nav, close tertiary nav

    // if all navs are open and user clicks on open primary nav, close tertiary and secondary nav

    // if secondary and primary navs are open and user clicks on open primary nav, close secondary nav

    // if primary nav is open and user clicks anywhere outside of that and the slideout button, close primary nav

};


slideOutNav.prototype.togglePrimaryNav = function(e)
{

    // if primary nav has class, remove class
    if (this.primaryNav.classList.contains(this.OPEN_CLASS))
    {
        this.primaryIsOpen = false;
        this.removeClass(this.slideOutBtn, this.OPEN_CLASS);
        this.removeClass(this.primaryNav, this.OPEN_CLASS);
    }
    // else, add class
    else
    {
        this.primaryIsOpen = true;
        this.addClass(this.slideOutBtn, this.OPEN_CLASS);
        this.addClass(this.primaryNav, this.OPEN_CLASS);
    }
};


slideOutNav.prototype.toggleSecondaryNav = function()
{

    // if primary nav is open

        // if secondary nav has class, remove class

        // else, add class

};


slideOutNav.prototype.toggleTertiaryNav = function()
{

    // if primary nav is open && secondary nav is open

        // if secondary nav has class, remove class

        // else, add class
};


slideOutNav.prototype.closeAll = function()
{
    this.removeClass(this.slideOutBtn, this.OPEN_CLASS);
    this.removeClass(this.primaryNav, this.OPEN_CLASS);
    this.removeClass(this.secondaryNav, this.OPEN_CLASS);
    this.removeClass(this.tertiaryNav, this.OPEN_CLASS)
}


slideOutNav.prototype.addClass = function(el, className)
{
    console.log('add class to : ', el)
    el.classList.add(className);

};


slideOutNav.prototype.removeClass = function(el, className)
{
    console.log('remove class from : ', el)
    el.classList.remove(className);
};
