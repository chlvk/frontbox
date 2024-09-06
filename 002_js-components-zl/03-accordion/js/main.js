'use strict'
const accordionsContainer = document.querySelector('.accordion-container')

accordionsContainer.addEventListener('click', ({ target }) => {
  const accordionHeader = target.closest('.accordion__header')
  if (accordionHeader) {
    accordionHeader.parentElement.classList.toggle('is-open')
  }
})
