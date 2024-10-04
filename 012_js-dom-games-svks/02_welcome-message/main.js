const outputEl = document.querySelector('.output')
const btn = document.querySelector('.action')
const input = document.querySelector('.name')

const getTimeOfDay = () => {
  const currentHour = new Date().getHours()
  switch (true) {
    case currentHour > 16:
      return ['evening', 'grey']
    case currentHour > 11:
      return ['afternoon', 'orange']
    case currentHour > 4:
      return ['morning', 'pink']
    default:
      return ['night', 'darkgrey']
  }
}

const renderWelcomeMessage = (e) => {
  if (!input.value) return
  const name = input.value
  const [timeOfDay, bgColor] = getTimeOfDay()
  outputEl.innerHTML = `<strong style="background-color:${bgColor}">Good ${timeOfDay}, ${name}</strong>`
  input.value = ''
}

btn.addEventListener('click', renderWelcomeMessage)
