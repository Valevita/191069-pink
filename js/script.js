(function () {
  "use strict";
  var link = document.querySelector(".main-nav__toggle");
  var menu = document.querySelectorAll(".main-nav__item:not(:first-child)");
  var shortmenu = document.querySelector(".main-header");


  link.addEventListener("click", function (event) {
    event.preventDefault();
    menu.forEach(function (item) {
      item.classList.toggle("main-nav__item--closed");
    });
    link.classList.toggle("main-nav__toggle--closed");
    shortmenu.classList.toggle("main-header--closed");

  });
}());
