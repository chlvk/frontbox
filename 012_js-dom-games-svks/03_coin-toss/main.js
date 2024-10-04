const buttons = Array.from(document.querySelectorAll('button'))
const scoreEl = document.querySelector('#score')
const resultEl = document.querySelector('.result')
const messageEl = document.querySelector('.message')
const score = [0, 0]
const variants = ['Heads', 'Tails']

const getComputerGuess = (variants) => {
  return variants[Math.floor(Math.random() * variants.length)]
}

const updateRoundWinner = (winner) => {
  resultEl.classList.remove('animation')
  resultEl.classList.add('animation')
  resultEl.innerHTML = `Round winner: ${winner}`
  setTimeout(function () {
    resultEl.classList.remove('animation')
  }, 500)
}

const updateMessage = (result) => {
  messageEl.classList.remove('animation')
  messageEl.classList.add('animation')
  messageEl.innerHTML = `Computer choose: ${result}`
  setTimeout(function () {
    messageEl.classList.remove('animation')
  }, 500)
}

const updateScore = () => {
  scoreEl.innerHTML = `Player: ${score[0]} - Computer: ${score[1]}`
}

const calcResult = ({ target }) => {
  const playerGuess = target.textContent
  const computerGuess = getComputerGuess(variants)
  updateMessage(computerGuess)
  playerGuess === computerGuess ? score[0] += 1 : score[1] += 1
  playerGuess === computerGuess ? updateRoundWinner('Player') : updateRoundWinner('Computer')
  updateScore()
}

buttons.forEach((button) => {
  button.addEventListener('click', calcResult)
})

updateScore()
