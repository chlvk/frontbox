"use strict";

function showModal() {
  const modalEl = document.querySelector(".modal");
  const overlayEl = document.querySelector(".overlay");
  const btnCloseModalEl = document.querySelector(".btn--close-modal");
  const btnsOpenModalEls = document.querySelectorAll(".btn--show-modal");

  const openModal = function (e) {
    e.preventDefault();
    modalEl.classList.remove("hidden");
    overlayEl.classList.remove("hidden");
  };

  const closeModal = function () {
    modalEl.classList.add("hidden");
    overlayEl.classList.add("hidden");
  };

  btnsOpenModalEls.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  btnCloseModalEl.addEventListener("click", closeModal);
  overlayEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function showCookiesMessage() {
  const headerEl = document.querySelector(".header");
  const cookiesMessageEl = document.createElement("div");
  cookiesMessageEl.classList.add("cookie-message");
  cookiesMessageEl.innerHTML = `
    We use cookies, by the way
    <button class="btn btn--close-cookie">Got It!</button>
  `;
  cookiesMessageEl.onclick = function () {
    this.remove();
  };
  headerEl.before(cookiesMessageEl);
}

function scrollToSection() {
  const btnTriggerEl = document.querySelector(".btn--scroll-to");
  const sectionOneEl = document.querySelector("#section--1");

  btnTriggerEl.addEventListener("click", () => {
    /* Old way */
    /*const sectionOneCoords = sectionOneEl.getBoundingClientRect();
     window.scrollTo({
      left: sectionOneCoords.left + window.scrollX,
      top: sectionOneCoords.top + window.scrollY,
      behavior: "smooth",
    }); */

    /* Modern way */
    sectionOneEl.scrollIntoView({ behavior: "smooth" });
  });
}

function setPageNavigation() {
  const linksListEl = document.querySelector(".nav__links");

  linksListEl.addEventListener("click", (e) => {
    if (!e.target.matches(".nav__link")) return;
    e.preventDefault();
    const sectionId = e.target.getAttribute("href");
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
  });
}

function setTabsComponent() {
  const tabsEls = Array.from(document.querySelectorAll(".operations__tab"));
  const tabsContainerEl = document.querySelector(".operations__tab-container");
  const tabsContentEls = Array.from(
    document.querySelectorAll(".operations__content")
  );

  tabsContainerEl.addEventListener("click", (e) => {
    const tabEl = e.target.closest(".operations__tab");
    if (!tabEl) return;
    tabsEls.forEach((item) => item.classList.remove("operations__tab--active"));
    tabEl.classList.add("operations__tab--active");
    tabsContentEls.forEach((item) =>
      item.classList.remove("operations__content--active")
    );
    document
      .querySelector(`.operations__content--${tabEl.dataset.tab}`)
      .classList.add("operations__content--active");
  });
}

showModal();
showCookiesMessage();
scrollToSection();
setPageNavigation();
setTabsComponent();
