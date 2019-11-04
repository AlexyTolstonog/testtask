'use strict';
(function () {
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

  const getStyle = (index) => {
    button.style.color = window.elemStyles[index - 1].buttonColor;
    button.style.border = window.elemStyles[index - 1].buttonBorder;
    videoContainer.style.background = window.elemStyles[index - 1].videoContainerBackground;
    video.src = window.elemStyles[index - 1].videoSrc;
    container.style.background = window.elemStyles[index - 1].containerBackground;
  };
  const getaActive = () => {
    slides[slideIndex - 1].style.display = "flex";
    slides[slideIndex - 1].classList.add('swipe-right');
    dots[slideIndex - 1].className += " active";
  };
  const showSlides = (n) => {
    let i;
    if (n > slides.length) {
      slideIndex = 0
    }
    if (n < 0) {
      slideIndex = slides.length - 1
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    getaActive();
    getStyle(slideIndex);
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
    getaActive();
    getStyle(slideIndex);
    const debounseAutoSlider = window.debounce(autoSlider);
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
    getStyle(index);
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
})();
