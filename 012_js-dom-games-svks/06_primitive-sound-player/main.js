const zooEl = document.querySelector('.zoo')
const zooArr = ['lion', 'cougar', 'bark']

const createAnimal = (name) => {
  const divEl = document.createElement('div')
  divEl.classList.add('animal', name)
  divEl.textContent = name
  return divEl
}

const playSound = (divEl, item) => {
  divEl.classList.add('active')
  const sound = new Audio(`sound/${item}.mp3`)
  sound.play()
  setTimeout(() => {
    divEl.classList.remove('active')
  }, 200)
}

const init = () => {
  zooArr.forEach((item) => {
    const divEl = createAnimal(item)
    divEl.addEventListener('click', () => {
      playSound(divEl, item)
    })
    zooEl.appendChild(divEl)
  })

}

document.addEventListener('DOMContentLoaded', init)