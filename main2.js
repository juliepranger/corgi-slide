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

    this.activeIndex;


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
        // console.log(this.containsElement(this.primaryNav.children[0], e.target))
        // console.log(this.containsElement(this.secondaryNav.children[0], e.target))
        // console.log(this.containsElement(this.tertiaryNav.children[0], e.target))
        if (this.slideOutBtn === e.target)
        {
            return;
        }
        else if (this.containsElement(this.primaryNav, e.target))
        {
            console.log('target within primary nav!')
            if (this.containsElement(this.secondaryNav, e.target) && !this.containsElement(this.secondaryNav.children[0], e.target) && this.secondaryIsOpen)
            {
                console.log('secondary clicked on and open!')
                this.toggleSecondaryNav(this.activeIndex);
            }
            else if (this.containsElement(this.tertiaryNav, e.target) && !this.containsElement(this.tertiaryNav.children[0], e.target) && this.tertiaryIsOpen)
            {
                console.log('tertiary clicked on and open!')
                this.toggleTertiaryNav(this.activeIndex);
            }

            else if (!this.containsElement(this.primaryNav.children[0], e.target) && this.primaryIsOpen)
            {
                console.log('primary clicked on and open!')
                if (this.secondaryIsOpen)
                {
                    if(this.tertiaryIsOpen)
                    {
                        this.toggleSecondaryNav(this.activeIndex);
                        this.toggleTertiaryNav(this.activeIndex);
                    }
                    else
                    {
                        this.toggleSecondaryNav(this.activeIndex);
                    }
                }
                else
                {
                    this.togglePrimaryNav();
                }
            }
            // else if (!this.containsElement(this.secondaryNav.children[0], e.target) && this.secondaryIsOpen)
            // {
            //     console.log('HERE: ', e.target)
            //     // if(this.tertiaryIsOpen)
            //     // {
            //     //     this.toggleTertiaryNav(this.activeIndex);
            //     // }
            //     // else
            //     // {
            //     //     this.toggleSecondaryNav(this.activeIndex);
            //     // }
            // }
            // else if (this.containsElement(this.secondaryNav, e.target) && !this.containsElement(this.secondaryNav.children[0], e.target) && this.secondaryIsOpen)
            // {
            //     console.log('secondary clicked on and open!')
            //     this.toggleSecondaryyNav(this.activeIndex);
            // }
            // // else if (this.containsElement(this.tertiaryNav, e.target) && !this.containsElement(this.tertiaryNav.children[0], e.target) && this.tertiaryIsOpen)
            // {
            //     console.log('tertiary clicked on and open!')
            //     this.toggleTertiaryNav(this.activeIndex);
            // }
            else
            {
                console.log('do nothing!')
            }
        }


        // else if (this.secondaryNav.children[0].contains(e.target))
        // {
        //     this.toggleSecondaryNav(e);
        // }
        // else if (this.tertiaryNav.children[0].contains(e.target))
        // {
        //     this.toggleTertiaryNav(e);
        // }
    }.bind(this));

    // add listener for slide out button - trigger primary nav toggle function
    this.slideOutBtn.addEventListener('click', function(e)
    {
        this.togglePrimaryNav(e);
    }.bind(this));

    // add listener for clicking on primary nav elements - trigger secondary nav toggle function
    for (var i = 0; i < this.primaryList.length; i++) {
        this.primaryList[i].addEventListener('click', this.toggleSecondaryNav.bind(this, i))
    }

    // add listener for clicking on secondary nav elements - trigger tertiary nav toggle function
    for (var i = 0; i < this.secondaryList.length; i++) {
        this.secondaryList[i].addEventListener('click', this.toggleTertiaryNav.bind(this, i))
    }
    // if all navs are open and user clicks on open secondary nav, close tertiary nav

    // if all navs are open and user clicks on open primary nav, close tertiary and secondary nav

    // if secondary and primary navs are open and user clicks on open primary nav, close secondary nav

    // if primary nav is open and user clicks anywhere outside of that and the slideout button, close primary nav

};


// slideOutNav.prototype.initPrimaryListeners = function(primary, index, e)
// {
//     primary.addEventListener(
//         'click',
//         this.toggleSecondaryNav.bind(this, primary, index)
//     );
// };


slideOutNav.prototype.togglePrimaryNav = function(e)
{
    console.log('toggle primary nav')
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


slideOutNav.prototype.toggleSecondaryNav = function(index, e)
{
    this.activeIndex = index;

    console.log(index, e)
    // if primary nav is open
    if (this.primaryIsOpen || e === undefined) {
        // if secondary nav has class, remove class
        if (this.secondaryList[index].classList.contains(this.OPEN_CLASS))
        {
            this.secondaryIsOpen = false;
            // this.removeClass(this.slideOutBtn, this.OPEN_CLASS);
            this.removeClass(this.secondaryList[index], this.OPEN_CLASS);
        }
        else
        {
            // else, add class
            this.secondaryIsOpen = true;
            this.addClass(this.slideOutBtn, this.OPEN_CLASS);
            this.addClass(this.secondaryList[index], this.OPEN_CLASS);
        }

    }

};


slideOutNav.prototype.toggleTertiaryNav = function(index, e)
{
    this.activeIndex = index;
    console.log(index, e)
    console.log(this.tertiaryList[index].classList.contains(this.OPEN_CLASS), this.tertiaryList[index], this.tertiaryList.classList)
    // if primary nav is open && secondary nav is open
    if (this.primaryIsOpen || e === undefined)
    {
        // if secondary nav has class, remove class
        if (this.tertiaryList[index].classList.contains(this.OPEN_CLASS))
        {
            console.log('remove class')
            this.tertiaryIsOpen = false;
            // this.removeClass(this.slideOutBtn, this.OPEN_CLASS);
            this.removeClass(this.tertiaryList[index], this.OPEN_CLASS);
        }
        else
        {
        // else, add class
            console.log('add class')
            this.tertiaryIsOpen = true;
            this.addClass(this.slideOutBtn, this.OPEN_CLASS);
            this.addClass(this.tertiaryList[index], this.OPEN_CLASS);
        }
    }
};


slideOutNav.prototype.closeAll = function()
{
    this.removeClass(this.slideOutBtn, this.OPEN_CLASS);
    this.removeClass(this.primaryNav, this.OPEN_CLASS);
    this.removeClass(this.secondaryNav, this.OPEN_CLASS);
    this.removeClass(this.tertiaryNav, this.OPEN_CLASS)
}


slideOutNav.prototype.containsElement = function(parent, child) {
    return parent.contains(child);
}


slideOutNav.prototype.addClass = function(el, className)
{
    // console.log('add class to : ', el)
    el.classList.add(className);

};


slideOutNav.prototype.removeClass = function(el, className)
{
    // console.log('remove class from : ', el)
    el.classList.remove(className);
};
