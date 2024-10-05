const gameMap = {
  'rock': {
    'rock': 'draw',
    'scissors': 'win',
    'paper': 'loss'
  },
  'scissors': {
    'scissors': 'draw',
    'paper': 'win',
    'rock': 'loss'
  },
  'paper': {
    'paper': 'draw',
    'rock': 'win',
    'scissors': 'loss'
  }
}
const computerVariants = Object.keys(gameMap)
let score = [0, 0]
const scoreEl = document.querySelector('#score')
const messageEl = document.querySelector('#message')
const buttons = Array.from(document.querySelectorAll('button'))

const getComputerChoice = () => {
  return computerVariants[Math.floor(Math.random() * computerVariants.length)]
}

const getGameResult = (playerChoice, computerChoice) => {
  return gameMap[playerChoice][computerChoice]
}

const updateScore = (result) => {
  switch (result) {
    case 'win':
      score[0]++
      break
    case 'loss':
      score[1]++
      break
    default:
      return
  }
  scoreEl.innerHTML = `Score: Player(${score[0]}) - Computer(${score[1]})`
}

const updateMessage = (playerChoice, computerChoice, result) => {
  messageEl.innerHTML = `
  <small>Player choice(${playerChoice.toUpperCase()})</small> - 
  <small>Computer choice(${computerChoice.toUpperCase()})</small>
  Result: ${result.toUpperCase()}`
}

const playGame = ({ target }) => {
  const playerChoice = target.textContent
  const computerChoice = getComputerChoice()
  const result = getGameResult(playerChoice, computerChoice)
  console.log(playerChoice)
  updateScore(result)
  updateMessage(playerChoice, computerChoice, result)
}

buttons.forEach((button) => {
  button.addEventListener('click', playGame)
})



