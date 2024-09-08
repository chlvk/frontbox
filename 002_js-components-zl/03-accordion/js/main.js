'use strict'
const accordionsContainer = document.querySelector('.accordion-container')

accordionsContainer.addEventListener('click', ({ target }) => {
  const accordionHeader = target.closest('.accordion__header')
  const accordionContent = accordionHeader.nextElementSibling
  const accordionInner = accordionContent.children[0]
  if (accordionHeader) {
    const accordion = accordionHeader.parentElement
    let height

    if (accordion.classList.contains('is-open')) {
      height = 0
    } else {
      height = accordionInner.getBoundingClientRect().height
    }

    accordion.classList.toggle('is-open')
    accordionContent.style.height = height + 'px'
  }
})
