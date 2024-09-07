'use strict'
const carousel = document.querySelector('.carousel')
const contents = document.querySelector('.carousel__contents')
const slides = Array.from(document.querySelectorAll('.carousel__slide'))
const dots = Array.from(document.querySelectorAll('.carousel__dot'))
const dotsContainer = carousel.querySelector('.carousel__dots')
const prevButton = Array.from(carousel.querySelectorAll('.carousel__button'))[0]
const nextButton = Array.from(carousel.querySelectorAll('.carousel__button'))[1]

const slideWidth = slides[0].getBoundingClientRect().width
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px'
})

nextButton.addEventListener('click', () => {
  const currentSlide = contents.querySelector('.is-selected')
  const nextSlide = currentSlide.nextElementSibling

  const destination = getComputedStyle(nextSlide).left
  contents.style.left = '-' + destination

  currentSlide.classList.remove('is-selected')
  nextSlide.classList.add('is-selected')

  if (!nextSlide.nextElementSibling) {
    nextButton.setAttribute('hidden', true)
  }

  prevButton.removeAttribute('hidden')

  const currentDot = dotsContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling
  currentDot.classList.remove('is-selected')
  nextDot.classList.add('is-selected')

})

prevButton.addEventListener('click', () => {
  const currentSlide = contents.querySelector('.is-selected')
  const prevSlide = currentSlide.previousElementSibling

  const destination = getComputedStyle(prevSlide).left
  contents.style.left = '-' + destination

  currentSlide.classList.remove('is-selected')
  prevSlide.classList.add('is-selected')

  if (!prevSlide.previousElementSibling) {
    prevButton.setAttribute('hidden', true)
  }

  nextButton.removeAttribute('hidden')

  const currentDot = dotsContainer.querySelector('.is-selected')
  const prevDot = currentDot.previousElementSibling
  currentDot.classList.remove('is-selected')
  prevDot.classList.add('is-selected')
})

dotsContainer.addEventListener('click', ({ target }) => {
  const dot = target.closest('.carousel__dot')
  if (dot) {
    const clickedDotIndex = dots.findIndex((item) => item === dot)
    const slideToShow = slides[clickedDotIndex]

    const destination = getComputedStyle(slideToShow).left
    contents.style.left = '-' + destination

    slides.forEach(slide => {
      slide.classList.remove('is-selected')
    })
    slideToShow.classList.add('is-selected')

    dots.forEach(dot => {
      dot.classList.remove('is-selected')
    })
    dot.classList.add('is-selected')

    if (clickedDotIndex === 0) {
      prevButton.setAttribute('hidden', true)
      nextButton.removeAttribute('hidden')
    } else if (clickedDotIndex === dots.length - 1) {
      prevButton.removeAttribute('hidden')
      nextButton.setAttribute('hidden', true)
    } else {
      prevButton.removeAttribute('hidden')
      nextButton.removeAttribute('hidden')
    }
  }
})