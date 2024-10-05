const resultEl = document.querySelector('.result')
const player1El = document.querySelector('.player1')
const player2El = document.querySelector('.player2')
const btn = document.querySelector('.btn')
const template = document.querySelector('#dice')
const dice = [[5], [1, 9], [1, 5, 9], [1, 3, 7, 9], [1, 3, 5, 7, 9], [1, 3, 4, 6, 7, 9]]
let score

const renderDice = (number) => {
  const arr = dice[number - 1]
  const diceEl = template.content.cloneNode(true)
  const dots = Array.from(diceEl.querySelectorAll('.dot'))
  dots.forEach((dot, i) => {
    if (!arr.includes(i + 1)) return
    dot.classList.remove('dot_hidden')
  })
  return diceEl
}

const showPlayersResult = (score) => {
  // player1El.innerHTML = `&#${9855 + score[0]}`
  // player2El.innerHTML = `&#${9855 + score[1]}`
  player1El.replaceChildren(renderDice(score[0]))
  player2El.replaceChildren(renderDice(score[1]))
}

const updateResultMessage = (result) => {
  resultEl.innerHTML = result
}

const getWinner = (score) => {
  switch (true) {
    case score[0] === score[1]:
      return 'It\'s a draw'
    case score[0] > score[1]:
      return 'Player 1 wins'
    case score[0] < score[1]:
      return 'Player 2 wins'
  }
}

const rollDice = (num) => {
  return Math.floor(Math.random() * num) + 1
}

const playGame = () => {
  score = [rollDice(6), rollDice(6)]
  const result = getWinner(score)
  showPlayersResult(score)
  updateResultMessage(result)
}

btn.addEventListener('click', playGame)

