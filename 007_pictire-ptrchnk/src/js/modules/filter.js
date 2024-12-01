const filter = () => {
  const menuEl = document.querySelector('.portfolio-menu')
  const wrapperEl = document.querySelector('.portfolio-wrapper')
  const noEl = document.querySelector('.portfolio-no')
  const itemEls = [...menuEl.querySelectorAll('li')]
  const markAllEls = [...wrapperEl.querySelectorAll('.all')]

  const changeFilter = (typeEls) => {
    markAllEls.forEach(item => {
      item.style.display = 'none'
      item.classList.remove('animated', 'fadeIn')
    })
    noEl.style.display = 'none'
    noEl.classList.remove('animated', 'fadeIn')

    if (typeEls.length) {
      typeEls.forEach((item) => {
        item.style.display = 'block'
        item.classList.add('animated', 'fadeIn')
      })
    } else {
      noEl.style.display = 'block'
      noEl.classList.add('animated', 'fadeIn')
    }
  }

  menuEl.addEventListener('click', ({ target }) => {
    if (target.tagName !== 'LI') return
    itemEls.forEach(item => item.classList.remove('active'))
    target.classList.add('active')
    const markCustomEls = [...wrapperEl.querySelectorAll(`.${target.dataset.filter}`)]
    changeFilter(markCustomEls)
  })

}

export default filter