'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 3000;
  window.debounce = function (cb) {
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
})();
