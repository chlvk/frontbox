const wording = ["Do you like JavaScript as much as I do?", "Hope you are having fun this is a simple game you can make.", "Source code is included so you can create your own version of this challenge."]
const btn = document.querySelector('.start')
const testArea = document.querySelector('.testArea')
const message = document.querySelector('.message')
let startTime, endTime, randomStr

const compareStrings = (playerStr) => {
  const playerStrArr = playerStr.split(/\s+/)
  const randomStrArr = randomStr.split(/\s+/)
  const correctWords = playerStrArr.reduce((acc, cur, i) => {
    if (cur === randomStrArr[i]) {
      return ++acc
    }
    return acc
  }, 0)
  return [playerStrArr.length, correctWords]
}

const startGame = (btn) => {
  randomStr = wording[Math.floor(Math.random() * wording.length)]
  message.innerHTML = `Type me: <strong>[${randomStr}]</strong>`
  btn.classList.remove('off')
  btn.textContent = 'Get Result'
  testArea.disabled = false
  startTime = new Date().getTime()
}

const endGame = (btn) => {
  if (testArea.value.length == 0) return
  btn.classList.add('off')
  btn.textContent = 'Start Test'
  testArea.disabled = true
  endTime = new Date().getTime()
  const totalTime = (endTime - startTime) / 1000
  const playerStr = testArea.value
  testArea.value = ''
  const [wordsCount, correctWords] = compareStrings(playerStr)
  const typingSpeed = Math.round(wordsCount / totalTime * 60)
  message.innerHTML = `Your speed is ${typingSpeed} words per minute,<br /> 
  Correct words ${correctWords} out of ${wordsCount}`
}

btn.addEventListener('click', ({ target }) => {
  if (target.classList.contains('off')) {
    startGame(target)
  } else {
    endGame(target)
  }
})