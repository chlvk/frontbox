const slides = (slides, direction, prev, next) => {
  let slideIndex = 1
  let isPaused = false
  const itemEls = Array.from(document.querySelectorAll(slides))

  function showSlides(n) {
    if (n > itemEls.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = itemEls.length
    }

    itemEls.forEach((item) => {
      item.classList.add('animated')
      item.style.display = 'none'
    })
    itemEls[slideIndex - 1].style.display = 'block'
  }

  function changeSlides(n) {
    showSlides(slideIndex += n)
  }

  function activateAnimation() {
    if (direction === 'vertical') {
      isPaused = setInterval(() => {
        changeSlides(1)
        itemEls[slideIndex - 1].classList.add('slideInDown')
      }, 3000)
    } else {
      isPaused = setInterval(() => {
        changeSlides(1)
        itemEls[slideIndex - 1].classList.remove('slideInRight')
        itemEls[slideIndex - 1].classList.add('slideInLeft')
      }, 3000)
    }
  }

  try {
    const prevBtnEl = document.querySelector(prev)
    const nextBtnEl = document.querySelector(next)
    prevBtnEl.addEventListener('click', () => {
      changeSlides(-1)
      itemEls[slideIndex - 1].classList.remove('slideInLeft')
      itemEls[slideIndex - 1].classList.add('slideInRight')
    })
    nextBtnEl.addEventListener('click', () => {
      changeSlides(1)
      itemEls[slideIndex - 1].classList.remove('slideInRight')
      itemEls[slideIndex - 1].classList.add('slideInLeft')
    })
  } catch (error) {
    console.log(error)
  }

  itemEls[0].parentElement.addEventListener('mouseenter', () => {
    clearInterval(isPaused)
  })
  itemEls[0].parentElement.addEventListener('mouseleave', () => {
    activateAnimation()
  })

  showSlides(slideIndex)
  activateAnimation()
}

export default slides