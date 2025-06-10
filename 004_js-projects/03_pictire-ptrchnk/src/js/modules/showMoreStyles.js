const showMoreStyles = (trigger, styles) => {
  const cardEls = [...document.querySelectorAll(styles)]
  const btnEl = document.querySelector(trigger)

  cardEls.forEach((item) => {
    item.classList.add('animated', 'fadeInUp')
  })

  btnEl.addEventListener('click', () => {
    cardEls.forEach((item) => {
      item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs')
      item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')
    })
    btnEl.remove()
  })
}

export default showMoreStyles