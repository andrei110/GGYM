'use strict';
//----------------------------- DECLARATIONS
// Navigation
const burger = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');
const navItem = document.querySelectorAll('.nav__item');
const navLink = document.querySelectorAll('.nav__link');
const bgPopup = document.querySelector('.bg-popup');
const popup = document.querySelector('.popup');
const header = document.querySelector('.header');
const navHeight = document.querySelector('.nav').getBoundingClientRect().height;

const btnClosePopup = document.querySelector('.popup__btn-close');
const btnSubscriptions = document.querySelectorAll('.btn__subscriptions');

// Sections
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const section4 = document.querySelector('#section--4');

// Counters
const counter = document.querySelector('.counter');
const counters = document.querySelectorAll('.counter__number');
const counterSpeed = 200;

// Gallery
const gallery = document.querySelector('.gallery');
const galleryItem = document.querySelectorAll('.gallery__img');

// Slider
const slider = document.querySelector('.slider__container');
const slides = document.querySelectorAll('.slider__item');
const btnSldieRight = document.querySelector('.slider__btn--right');
const btnSldieLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.slider__dots');

// Footer
const btnFooter = document.querySelector('.footer__hero-btn');

// Media Querries
const query350 = window.matchMedia('(min-width: 350px)');
const query500 = window.matchMedia('(min-width: 500px)');
const query750 = window.matchMedia('(min-width: 750px)');



//----------------------------- FUNCTIONS
// Navigation slide
const navSlide = () => {
    navItem.forEach((item, i) => {
        if(item.style.animation){
            item.style.animation = '';
        }else{
            item.style.animation = `navLinksFade 0.5s ease forwards ${i / 7 + 0.5}s`;
        }
    })
}


// Popup
const openPopup = (e) => {
    e.preventDefault();
    popup.classList.remove('hidden');
    bgPopup.classList.remove('hidden');
    navList.classList.remove('nav__active');
    burger.classList.remove('toggle');
    popupActive = true;
}

const closePopup = () => {
    bgPopup.classList.add('hidden');
    popup.classList.add('hidden');
    navList.classList.remove('nav__active');
    burger.classList.remove('toggle');
    document.querySelector('.gallery-big').classList.add('hidden');
    popupActive = false;
    burgerActive = false;
    bigPhoto = false;
}


// Navigation Links
const navLinksEffect = (e, opacity) => {
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('.nav__list').querySelectorAll('.nav__link');
        siblings.forEach(el => {
            if(el !== link){
                el.style.opacity = opacity;
            }
        })
    }
}


// Counter
const counterNumbers = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = Number(counter.getAttribute('data-target'));
            let count = Number(counter.innerText);
            const increment = target / counterSpeed;

            if(target === 700){
                if(count < target){
                    counter.innerText = Math.ceil(count +increment);
                    setTimeout(updateCount, 1);
                }else{
                    count = target;
                }
            }else if(target === 8 || target === 10){
                if(count < target){
                    counter.innerText = Math.ceil(count +increment);
                    setTimeout(updateCount, 100);
                }else{
                    count = target;
                }
            }
        }
        updateCount();
    })
}


// Slider
const goToSlide = (toSlide) => {
    slides.forEach((slide, i) => {
        slide.style.transform = `translate(${(i-toSlide)*120}%, -50%)`;
        if(query500.matches){
            slide.style.transform = `translate(${(i-toSlide)*125}%, -50%) skewX(-15deg)`;
        }
    })
}

const nextSlide = () => {
    if(currSlide === slides.length - 1){
        currSlide = 0;
    }else {
        currSlide++;
    }
    goToSlide(currSlide);
    activateDots(currSlide);
}

const prevSlide = () => {
    if(currSlide === 0){
        currSlide = slides.length-1;
    }else {
        currSlide--;
    }
    goToSlide(currSlide);
    activateDots(currSlide);
}


const createDots = () => {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML('beforeend', 
            `<button class="slider__dots__dot" data-slide="${i}"></button>`
        )
    })
}


const activateDots = (slide) => {
    document.querySelectorAll('.slider__dots__dot').forEach(dot =>
        dot.classList.remove('slider__dots__dot--active'));

    document.querySelector(`.slider__dots__dot[data-slide="${slide}"]`).classList.add('slider__dots__dot--active');
}


//----------------------------- EVENT LISTENERS
// Burger
let burgerActive = false;
let burgerActiveNum = 0;
burger.addEventListener('click', () => {
    navList.classList.toggle('nav__active');
    burger.classList.toggle('toggle');
    if(popupActive || bigPhoto){
        bgPopup.classList.remove('hidden');
        navSlide();
    }else{
        bgPopup.classList.toggle('hidden');
        navSlide();
    }
    burgerActiveNum += 1;
    burgerActive = true;
    if(burgerActiveNum === 2){
        burgerActiveNum -=2;
        burgerActive = false;
    }
})


// Popup background
bgPopup.addEventListener('click', () => {
    bgPopup.classList.add('hidden');
    popup.classList.add('hidden');
    navList.classList.remove('nav__active');
    burger.classList.remove('toggle');
    popupActive = false;
    bigPhoto = false;
    document.querySelector('.gallery-big').classList.add('hidden');
    if(burgerActive){
        navSlide();
        burgerActiveNum -= 1;
    }
})


// Navigation Links
navLink.forEach(link => {
    link.addEventListener('click', () => {
        if(burgerActive){
            navList.classList.toggle('nav__active');
            burger.classList.toggle('toggle');
            bgPopup.classList.toggle('hidden');
            navSlide();
            burgerActive = false;
            burgerActiveNum -= 1;
            document.querySelector('.gallery-big').classList.add('hidden');
        }
    })
})


// Smooth Scroll Links
document.querySelector('.nav').addEventListener('click', function (e) {
    e.preventDefault();
    if(e.target.classList.contains('nav__link') || e.target.classList.contains('nav__logo')){
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
})

document.querySelector('.footer').addEventListener('click', function (e) {
    e.preventDefault();
    if(e.target.classList.contains('footer__link') || e.target.classList.contains('nav__logo')){
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
})


// Button Subscriptions
let popupActive = false;
btnSubscriptions.forEach(btn => btn.addEventListener('click', openPopup));


// Button Close Popup
btnClosePopup.addEventListener('click', closePopup);


// ESCAPE Key Close Popup
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && popupActive === true  && burgerActive === false || e.key === 'Escape' && bigPhoto === true && burgerActive === false){
        closePopup();
    }
})


// Navigation Links Effect
navList.addEventListener('mouseover', e => {
    navLinksEffect(e, 0.5);
})
navList.addEventListener('mouseout', e => {
    navLinksEffect(e, 1);
})


// Sticky Navigation
const stickyNav = function (entries) {
    const [entry] = entries;
    if(!entry.isIntersecting){
        document.querySelector('.nav').classList.add('nav__sticky');
    }else{
        document.querySelector('.nav').classList.remove('nav__sticky');
    }
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-60px`
})
headerObserver.observe(header);


// Revealing Counters
counter.classList.add('counter--hidden');
const revealCounter = function(entries, observer){
    const [entry] = entries;
    if(entry.isIntersecting){
       counter.classList.remove('counter--hidden');
       counterNumbers();
       observer.unobserve(entry.target);
    }
}
const counterObserver = new IntersectionObserver(revealCounter, {
    root: null,
    threshold: 0.5
})
counterObserver.observe(counter);


// Reveal Left Gallery
const leftGallery = document.querySelectorAll('.team__item--left');
const revealLeftGallery = function (entries, observer) {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('team__item--left-hidden');
    observer.unobserve(entry.target);
}
const teamLeftObserver = new IntersectionObserver(revealLeftGallery, {
    root: null,
    threshold: 0.2
})

leftGallery.forEach(function (item) {
    teamLeftObserver.observe(item);
    item.classList.add('team__item--left-hidden');
})


// Reveal Right Gallery
const rightGallery = document.querySelectorAll('.team__item--right');
const revealRightGallery = function (entries, observer) {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('team__item--right-hidden');
    observer.unobserve(entry.target);
}
const teamRightObserver = new IntersectionObserver(revealRightGallery, {
    root: null,
    threshold: 0.2
})

rightGallery.forEach(function (item) {
    teamRightObserver.observe(item);
    item.classList.add('team__item--right-hidden');
})


// Lazy Loading Images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '400px'
})

imgTarget.forEach(img => imgObserver.observe(img));


// Big Images Gallery
let bigPhoto = false;
document.querySelector('.gallery-big').classList.add('hidden');
galleryItem.forEach((item,i) => {
    item.addEventListener('click', () => {
        document.querySelector('.gallery-big__img').src = item.src;
        document.querySelector('.gallery-big').classList.remove('hidden');
        bgPopup.classList.remove('hidden');
        bigPhoto = true;
        if(query500.matches){
            if(i+1===2 || i+1===3 || i+1===6 || i+1===9 || i+1===11 || i+1===13){
                document.querySelector('.gallery-big__img').style.width = '50vh';
            }else{
                document.querySelector('.gallery-big__img').style.width = '70vh';
            }
        }
        if(query750.matches){
            if(i+1===2 || i+1===3 || i+1===6 || i+1===9 || i+1===11 || i+1===13){
                document.querySelector('.gallery-big__img').style.width = '50vh';
            }else{
                document.querySelector('.gallery-big__img').style.width = '100vh';
            }
        }
    })
})


// Img gallery resolution on scroll
const imgResolution = function(entries, observer){
    const [entry] = entries;
    if(entry.isIntersecting){
        galleryItem.forEach(item => {
            item.src = item.dataset.src;
        })
        observer.unobserve(entry.target);
    }
}

const galleryObserver = new IntersectionObserver(imgResolution, {
    root:null,
    threshold: 0
})

galleryObserver.observe(gallery);


// Slider
slider.style.overflow = 'hidden';
let currSlide = 0;
goToSlide(0);

btnSldieRight.addEventListener('click', () => nextSlide());
btnSldieLeft.addEventListener('click', () => prevSlide());

createDots();
dotContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('slider__dots__dot')){
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        activateDots(slide);
    }
})
activateDots(0);


// Footer btn
btnFooter.addEventListener('click', () => {
    const s1coords = section1.getBoundingClientRect();

    window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: 'smooth'
    })

    // section1.scrollIntoView({behavior: 'smooth'});
})
