(function () {
  "use strict";
  var link = document.querySelector(".main-header__toggle");
  var menu = document.querySelector(".main-nav");
  var shortmenu = document.querySelector(".main-header__short-menu-wrapper");

  link.addEventListener("click", function (event) {
    event.preventDefault();
    menu.classList.toggle("main-nav--closed");
    link.classList.toggle("main-header__toggle--closed");
    shortmenu.classList.toggle("main-header__short-menu-wrapper--closed");
  });
}());
