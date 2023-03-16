'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

document.querySelector('header');
const allSections = document.querySelectorAll('section');

const allButtons = document.getElementsByTagName('button');

/* const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `we use cookies for improved functionality
 and anaytics.
     <button class="btn btn--close-cookie">Got 
     it!</button>`;
//header.prepend(message);

// delete element/////////////
////////////////////////////////
////////////////
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function() {
        message.remove();
    });
header.append(message);

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';


message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';*/
//header.append(message.cloneNode(true));

//document.documentElement.style.setProperty('--color-primary', '
//orangered');

btnScrollTo.addEventListener('click', function(e) {
    // const s1coords = section1.getBoundingClientRect();

    //scrolling
    /*   window.scrollTo({

                                                                                                                                                                                                                                                                                                      left: s1coords.left + window.pageXOffset,
                                                                                                                                                                                                                                                                                                    top: s1coords.top + window.pageXOffset,
                                                                                                                                                                                                                                                                                                       behavior: 'smooth',
                                                                                                                                                                                                                                                                                                     }); */
    section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

const alertH1 = function(e) {
    alert('addEventListener: Great you are reading the heading :D');
};

//rgb(255, 255, 255);
/* const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
    `rgb (${randomInt(0, 255)},${randomInt(0, 255)}, 
    ${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    // stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function(e) {
    // this.style.backgroundColor = randomColor();
}); 




timeout/////////

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mou
seenter', alertH1), 3000);
*/

/* document.querySelectorAll('.nav__link').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
        });
    });
}); */

/// 1. add eventlisteneer to a parent element
///2. determine what element originated the evnt

document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    // matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);

    // guard clause
    if (!clicked) return;

    //ACTIVE TAB
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    //active content area
    console.log(clicked.dataset.tab);
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

/// MENU FADE ANIMATION
const handleHover = function(e) {
    //   console.log(this.e.currentTarget);
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

/* nav.addEventListener('mouseover', function(e) {
    handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function(e) {
    handleHover(e, 1);
}); */

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/// SCROLLING EVENT
/* 
window.addEventListener('scroll', function() {
    console.log(window.scrollY);

    if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}); */
// sticky navigation
const initialCoords = section1.getBoundingClientRect();

// sticky navigation : intersection observer API
/* 
const obsCallback = function(entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    });
};

const obsOptions = {
    root: null,
    threshold: 0.1,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); */

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//// reveal sections

const revealSection = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

///lazy loading images /////
////////////////////////////

const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    // replace src with data-src
    entry.target.src = entry.target.dataset.src;
    //entry.target.classList.remove('lazy-img');

    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

///slider
const slides = document.querySelectorAll('.slide');

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

/* const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.2) translateX(-1000px)';
slider.style.overflow = 'visible'; */
// 0%, 100%, 200%, 300%

const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;
const maxSlide = slides.length;

//// next slides

const goToSlide = function(slide) {
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
};
goToSlide(0);

const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
};
const prevSlide = function() {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
});

///// CREATING DOTS

const dotsContainer = document.querySelector('.dots');
const createDots = function() {
    slides.forEach(function(_, i) {
        dotsContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}">
        </button>`
        );
    });
};
createDots();

dotsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activeDot(slide);
    }
});
console.log(798);

const activeDot = function(slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};
activeDot(0);