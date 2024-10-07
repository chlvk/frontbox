const searchBtn = document.querySelector('.search__btn')
const burgerBtn = document.querySelector('.header__menu-btn')
const searchInput = document.querySelector('.search__input')
const menu = document.querySelector('.header__inner-right')

searchBtn.addEventListener('click', ev => {
  ev.preventDefault()
  searchInput.classList.toggle('search__input_hidden')
  searchInput.focus()
})

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('header__menu-btn_active')
  menu.classList.toggle('header__inner-right_active')
})

