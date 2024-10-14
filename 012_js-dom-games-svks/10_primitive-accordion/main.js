const container = document.querySelector('.container')
const panelEls = Array.from(document.querySelectorAll('.panel'))
container.addEventListener('click', ({ target }) => {
  if (!target.matches('.panel__header')) return
  target.parentElement.classList.toggle('panel_active')
  panelEls.forEach(el => {
    if (el === target.parentElement) return
    el.classList.remove('panel_active')
  })
})
