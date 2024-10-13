'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLogo = document.querySelector('.nav__logo');
const headerLogo = document.querySelector('.header__img');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.nav__link');
const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const scrolltoTopBtn = document.querySelector('#scrollToTopBtn');
const allSections = document.querySelectorAll('.section');

//Opening and closing Modal Windows

const closeModalWindow = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openModalWindow = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnsOpenModal.forEach(t => {
  t.addEventListener('click', openModalWindow);
});
btnCloseModal.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModalWindow();
  }
});

//Nav Bar Smooth Scrolling

nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Learn More Button Scrolling

learnMoreBtn.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Nav Menu Button Rotate

const rotate = function (e) {
  const navLink = e.target.closest('.nav__link:not(.btn--show-modal)');
  if (navLink) {
    navLink.style.transform = 'rotate(5deg)';
  }
};
const normal = function (e) {
  const navLink = e.target.closest('.nav__link:not(.btn--show-modal)');
  if (navLink) {
    navLink.style.transform = 'rotate(0deg)';
  }
};
nav.addEventListener('mouseover', rotate);
nav.addEventListener('mouseout', normal);

//Sticky Nav Bar

const headerEl = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();

const navFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const observeHeader = new IntersectionObserver(navFunc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});

observeHeader.observe(headerEl);

//Reveal sections while scrolling

const secFunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const observeSec = new IntersectionObserver(secFunc, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(el => {
  observeSec.observe(el);
  el.classList.add('section--hidden');
});

//Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');

const imgObsFunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imgObserver = new IntersectionObserver(imgObsFunc, {
  root: null,
  threshold: 0,
});
images.forEach(img => {
  imgObserver.observe(img);
});

//Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  //Remove Active Class
  tabs.forEach(el => {
    el.classList.remove('operations__tab--active');
  });
  //Add Active Class
  clicked.classList.add('operations__tab--active');

  //Operations Content
  //Remove Active Content
  tabsContent.forEach(con => {
    con.classList.remove('operations__content--active');
  });
  const activeContent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  activeContent.classList.add('operations__content--active');
});

//Slider Component
let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
const maxSlide = slides.length;

//Set transform property on each element
slides.forEach((sl, i) => {
  sl.style.transform = `translateX(${i * 100}%)`;
});

//Go To Slide
const goToSlide = function (slide) {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
//Next Slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
//Prevuous Slide
const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

//Adding functons to Button
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', previousSlide);

//ScrollToTop Button

const observeFunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    scrolltoTopBtn.classList.add('sticky');
    scrolltoTopBtn.style.display = 'block';
  } else {
    scrolltoTopBtn.classList.remove('sticky');
    scrolltoTopBtn.style.display = 'none';
  }
};

const observerArrow = new IntersectionObserver(observeFunc, {
  root: null,
  threshold: 0,
});

observerArrow.observe(section1);

//Adding Functionality to the Arrow

scrolltoTopBtn.addEventListener('click', function () {
  headerEl.scrollIntoView({ behavior: 'smooth' });
});
