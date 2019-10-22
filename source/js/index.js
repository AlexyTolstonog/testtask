'use strict';
(function () {
const NOTICE_TITLE_MIN_LENGTH = 10;
const NOTICE_TITLE_MAX_LENGTH = 30;
const nameField=document.querySelector(`#name`);
const sonameField = document.querySelector(`#soname`);
const emailField =document.querySelector(`#email`);
const telephoneField = document.querySelector(`#telephone`);

const clearField = (prop) => {
prop.value = ``;
}

const mailValidate = (prop) => {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var inputText = prop.value;
  if(reg.test(inputText) == false) {
     prop.placeholder='Введите корректный e-mail';
     clearField (prop);
     return false;
  }
  return true;
};
const onlyLettersValidate = (prop) => {
  var reg =/^[a-zа-яё]+$/i;
  var inputText = prop.value;
  if(reg.test(inputText) == false) {
     prop.placeholder='Введите корректное значени';
     clearField (prop);
     return false;
  }
  else{
    return true;
  }
};

const onlyNumbersValidate = (prop) => {
  var reg =/[0-9]/;
  var inputText = prop.value;
  if(reg.test(inputText) == false) {
     prop.placeholder='Введите корректный номер';
     clearField (prop);
     return false;
  }
  return true;
};
const closeFeedbackButton =document.querySelector(`#delete`);
const logo = document.querySelector(`.header__logo`);
const feddbackButton = document.querySelectorAll(`.form__send-button--open`);
const buttonClose = document.querySelector(`.btn-close-fedback`);
const feedback = document.querySelector(`.modal-feedback`);
const onCloseFeedback = (evt) => {
  evt.preventDefault();
  clearField (nameField);
  clearField (sonameField);
  clearField (emailField);
  clearField (telephoneField);
  feedback.classList.remove(`show-modal-feedback`);
}
closeFeedbackButton.addEventListener(`click`, onCloseFeedback);
buttonClose.addEventListener(`click`,onCloseFeedback);


feddbackButton.forEach((element) => {
 element.addEventListener(`click`, () => {
   window.backend.load(window.createData, window.backend.createEror);
  feedback.classList.add(`show-modal-feedback`);
});


});
nameField.setAttribute('minlength', NOTICE_TITLE_MIN_LENGTH);
nameField.setAttribute('maxlength', NOTICE_TITLE_MAX_LENGTH);
nameField.setAttribute('required', true);

sonameField.setAttribute('minlength', NOTICE_TITLE_MIN_LENGTH);
sonameField.setAttribute('maxlength', NOTICE_TITLE_MAX_LENGTH);
sonameField.setAttribute('required', true);

emailField.setAttribute('required', true);


  //  функция заполнения массива данными из сервера
  window.createData = function (apartmentServerSideData) {
    //  создали пустой массив для данных с сервера
    window.apartmentsList = apartmentServerSideData;
    console.log(window.apartmentsList);
  };




const sendButton = document.querySelector(`#send`);
const onClickSendButton = (evt) => {
if(mailValidate(emailField) && onlyLettersValidate(nameField) && onlyLettersValidate(sonameField) && onlyNumbersValidate(telephoneField))
{
var formBlock = document.querySelector('.form__contact-wrapper');
//  событие нажатия на кнопку отправки формы
formBlock.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.backend.upload(new FormData(formBlock), window.createSuccessUpload, window.backend.createEror);
});
} else {
  evt.preventDefault();

}
};
sendButton.addEventListener(`click`, onClickSendButton);


})();
