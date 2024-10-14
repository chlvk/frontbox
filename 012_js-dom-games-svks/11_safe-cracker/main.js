const btnEl = document.querySelector('.btn')
const gameEl = document.querySelector('.game')
const messageEl = document.querySelector('.message')
let isGameOn = false
let score = 0

const getRandomNumber = (max) => Math.floor(Math.random() * max)

const endGame = () => {
  gameEl.innerHTML = ''
  messageEl.innerHTML = 'Click start to crack the safe'
  btnEl.disabled = false
  btnEl.textContent = 'Start'
  isGameOn = false
  score = 0
}

const checkMatch = () => {
  const inputEls = Array.from(document.querySelectorAll('.game__number'))
  let winCondition = 0
  for (const el of inputEls) {
    if (Number(el.value) === el.correctValue) {
      el.style.backgroundColor = 'green'
      winCondition++
    } else {
      Number(el.value) > el.correctValue ? el.style.backgroundColor = 'red' : el.style.backgroundColor = 'pink'
    }
  }
  if (winCondition === inputEls.length) {
    messageEl.innerHTML = `<b>Congrats!!! You cracked the code in ${++score} guesses</b>`
    btnEl.disabled = true
    setTimeout(endGame, 3000)
    return
  }
  messageEl.innerHTML = `Number of guesses: ${++score}`
}

const createSafe = (size) => {
  for (let index = 0; index < size; index++) {
    const inputEl = document.createElement('input')
    inputEl.setAttribute('type', 'number')
    inputEl.classList.add('game__number')
    inputEl.max = 9
    inputEl.min = 0
    inputEl.size = 1
    inputEl.correctValue = getRandomNumber(5)
    inputEl.value = 0
    inputEl.order = index
    inputEl.style.width = '50px'
    inputEl.style.fontSize = '30px'
    gameEl.appendChild(inputEl)
  }
}

const startGame = () => {
  createSafe(4)
}

btnEl.addEventListener('click', () => {
  if (isGameOn) {
    checkMatch()
  } else {
    isGameOn = true
    btnEl.innerHTML = 'Check result'
    startGame()
  }
})