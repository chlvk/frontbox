import { getResource } from "../services/requests"

const showMoreStylesViaJson = (trigger, wrapper) => {
  const btnEl = document.querySelector(trigger)
  const wrapperEl = document.querySelector(wrapper)

  const createCards = (response) => {
    response.forEach(({ src, title, link }) => {
      const cardEl = document.createElement('div')
      cardEl.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp')
      cardEl.innerHTML = `
      <div class="styles-block">
        <img src="${src}" alt>
        <h4>${title}</h4>
        <a href="${link}">Подробнее</a>
      </div>`
      wrapperEl.append(cardEl)
    })
  }

  btnEl.addEventListener('click', function () {
    getResource('assets/db.json')
      .then(res => {
        createCards(res.styles)
      })
      .catch(error => {
        console.log(error)
      })
    this.remove()
  })
}

export default showMoreStylesViaJson