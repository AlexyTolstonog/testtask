'use strict';

(function () {
  var LOAD_URL = 'http://polarfox-soft.com/test-task.php';
  var UPLOAD_URL = 'http://polarfox-soft.com/test-task.php';
  var STATUS_GOOD = 200;
  var TIMEOUT = 5000;

  window.sendRequest = function (onSuccess, createEror) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_GOOD) {
        onSuccess(xhr.response);
      } else {
        createEror('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      createEror('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      createEror('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  //  функция загрузки данных с сервера
  var load = function (onSuccess, createEror) {

    var xhr = window.sendRequest(onSuccess, createEror);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };
  //  функция загрузки данных на сервер сформы
  var upload = function (data, onSuccess, createEror) {
    var xhr = window.sendRequest(onSuccess, createEror);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
    console.log(data);
  };

  /*  ЗАГРУЗКА ДАННЫХ*/
  //  сценарий ошибки загрузки данных
  var createEror = function (message) {
    console.log(message);
  };

  /* ВЫГРУЗКА ДАННЫХ */
  window.createSuccessUpload = function () {
    console.log(`данные отправлены успешно`);
  };

  window.backend = {
    load: load,
    upload: upload,
    createEror: createEror
  };
})();
