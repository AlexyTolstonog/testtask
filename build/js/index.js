'use strict';
(function () {

  let slideIndex = 1;
  let initialPoint;
  let finalPoint;
  const dots = document.querySelectorAll(`.slider-dots_item`);
  const slides = document.querySelectorAll(".slider_item");
  const slider = document.querySelector(`.slider`);
  const time = 3000;

  const getaActive = () => {
    slides[slideIndex - 1].style.display = "flex";
    slides[slideIndex - 1].classList.add('swipe-right');
    dots[slideIndex - 1].className += " activeSlider";
  };
  const showSlides = (n) => {
    let i;
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n === 0) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeSlider", "");
    }
    getaActive();
  }

  const autoSlider = () => {
    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeSlider", "");

    }
    getaActive();
    window.autoSliderInterval = setTimeout(autoSlider, time);
    window.removeEventListener(`DOMContentLoaded`, autoSlider);

  }
  const autoSliderCensel = () => clearTimeout(window.autoSliderInterval);

  window.addEventListener(`DOMContentLoaded`, autoSlider);

  function nextSlide() {
    showSlides(slideIndex += 1);
  }
  function prevSlide() {
    showSlides(slideIndex -= 1);
  }
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  const onDotsCkick = (evt) => {
    let index = parseInt(evt.currentTarget.id, 10);
    currentSlide(index);
  }

  showSlides(slideIndex);

  dots.forEach((elem) => {
    elem.addEventListener(`click`, onDotsCkick);
    elem.addEventListener(`touchstart`, onDotsCkick);
  });

  const onTouchStart = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    initialPoint = evt.changedTouches[0];
  }

  const onTouchEnd = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    finalPoint = evt.changedTouches[0];
    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX) {
          nextSlide();
        }
        else {
          prevSlide();
        }
      }
    }
  }

  slider.addEventListener('touchstart', onTouchStart, false);
  slider.addEventListener('touchend', onTouchEnd);

  document.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.className === 'navigation__item-link') {
      const atrr = evt.target.getAttribute('href');
      if (atrr !== '#') {
        document.getElementById(atrr).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
      else {
        evt.preventDefault();
      }
    }
    else {
      evt.preventDefault();
    }
  })

  let modal = document.querySelector('.modal');
  modal.style.display = 'none';
  let modalButtonSend = document.querySelector('.form_send-button');
  modalButtonSend.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.style.display = 'flex';
    modal.addEventListener('click', function (evt) {
      let target = evt.target;
      if (target.className === 'modal_button-close modal_button-close--rownd' || target.className === 'button modal_button-close modal_button-close--long') {
        modal.style.display = 'none';
      }
    })
  })
})();
