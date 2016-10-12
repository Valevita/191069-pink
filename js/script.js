(function () {
  "use strict";
  // Menu
  var link = document.querySelector(".main-nav__toggle");
  var menu = document.querySelectorAll(".main-nav__item:not(:first-child)");
  var shortmenu = document.querySelector(".main-header");

   link.addEventListener("click", function (event) {
    event.preventDefault();
    for (var i = 0; i < menu.length; i ++) {
       menu[i].classList.toggle("main-nav__item--closed");
    }
    link.classList.toggle("main-nav__toggle--closed");
    shortmenu.classList.toggle("main-header--closed");
  });

  // Form button and popups
  var form_btn  = document.querySelector(".form-btn");
  var popup_failure = document.querySelector(".popup--failure");
  var popup_failure_btn = document.querySelector(".popup--failure .popup-btn");
  var popup_success = document.querySelector(".popup--success");
  var popup_success_btn = document.querySelector(".popup--success .popup-btn");

  var isFormCompleted = function() {
    return false;
  };

  var enableFormBtn = function() {
    if(!form_btn) {
      return false;
    }
    form_btn.removeAttribute("disabled");
    form_btn.addEventListener(
      "click",
      onFormBtnClick,
      {once: true})
  };

  var onFormBtnClick = function (event) {
    event.preventDefault();
    form_btn.setAttribute("disabled", "true");
    if (isFormCompleted()) {
      popup_success.classList.add("popup-display");
      popup_success_btn.addEventListener(
        "click",
        onPopupSuccessBtnClick,
        {once: true})
    } else {
      popup_failure.classList.add("popup-display");
      popup_failure_btn.addEventListener(
        "click",
        onPopupFailureBtnClick,
        {once: true})
    }
  };

  var onPopupSuccessBtnClick = function (event) {
    event.preventDefault();
    popup_success.classList.remove("popup-display");
    enableFormBtn();
  };

  var onPopupFailureBtnClick = function (event) {
    event.preventDefault();
    popup_failure.classList.remove("popup-display");
    enableFormBtn();
  };

  enableFormBtn();
}());
