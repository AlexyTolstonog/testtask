"use strict"
let slideIndex = 1;
let initialPoint;
let finalPoint;
const container = document.querySelector(`.main__container`);
const video = document.querySelector(`.video`);
const videoContainer = document.querySelector(`.video__container`);
const dots = document.querySelectorAll(`.slider-dots_item`);
const slides = document.querySelectorAll(".item");
const mainContainer = document.querySelector('.main__container');
const slider = document.querySelector(`.slider`);
const button = document.querySelector(`.button--description`);
const DEBOUNCE_INTERVAL = 3000;

const debounce = function (cb) {
  let lastTimeout = null;
  return function () {
    let parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
const getSwitch = (index) => {
  switch (index) {
    case 1:
      button.style.color = "#FCBD2F";
      button.style.border = "2px solid #FCBD2F";
      videoContainer.style.background = 'url("../../img/screenshot_Defence.jpg")';
      video.src = "img/Defense.mp4";
      container.style.background = `#FCBD2F url("../../img/background_Defence.png")`;
      break;
    case 2:
      button.style.color = "#56C02A";
      button.style.border = "2px solid #56C02A";
      videoContainer.style.background = 'url("../../img/screenshot_Matcha.jpg")';
      video.src = "img/Matcha.mp4";
      container.style.background = `#56C02A url("../../img/background_Matcha.png")`;
      break;
    case 3:
      button.style.color = "#F16276";
      button.style.border = "2px solid #F16276";
      videoContainer.style.background = `url("../../img/screenshot_Glow.jpg")`;
      video.src = "img/Glow.mp4";
      container.style.background = `#F16276 url("../../img/background_Glow.png")`;
      break;
    case 4:
      button.style.color = "#DE7A25";
      button.style.border = "2px solid #DE7A25";
      videoContainer.style.background = `url("../../img/screenshot_Energise.jpg")`;
      video.src = "img/Energise.mp4";
      container.style.background = `#DE7A25 url("../../img/background_Energise.png")`;
      break;
  }
};
const showSlides = (n) => {
  let i;
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex - 1].classList.add(`swipe-right`);
  dots[slideIndex - 1].className += " active";
  getSwitch(slideIndex);
}

const autoSlider = () => {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");

  }
  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex - 1].classList.add(`swipe-right`);
  dots[slideIndex - 1].className += " active";
  getSwitch(slideIndex);
  const debounseAutoSlider = debounce(autoSlider);
  debounseAutoSlider();
  mainContainer.removeEventListener(`mouseleave`, autoSlider);
}

mainContainer.addEventListener(`mouseleave`, autoSlider);

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
  getSwitch(index);
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
















