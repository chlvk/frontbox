let myBlockEl
let keysListEl
const keysList = []
let running = false

const getHexColor = () => '#' + Math.random().toString().slice(-6)

const createBlock = () => {
  const blockEl = document.createElement('div')
  blockEl.style.width = '100px'
  blockEl.style.height = '100px'
  blockEl.style.lineHeight = '100px'
  blockEl.style.textAlign = 'center'
  blockEl.style.color = 'white'
  blockEl.style.backgroundColor = 'tomato'
  blockEl.textContent = 'Move Me'
  blockEl.style.position = 'absolute'
  document.body.appendChild(blockEl)
  return blockEl
}

const createList = () => {
  const listEl = document.createElement('ul')
  document.body.appendChild(listEl)
  listEl.style.display = 'flex'
  listEl.style.listStyle = 'none'
  listEl.addEventListener('click', ({ target }) => {
    if (!target.closest('li')) return
    keysList = keysList.filter(item => item !== target)
    keysListEl.removeChild(target)
  })
  return listEl
}

const createStep = (step) => {
  const stepEl = document.createElement('li')
  stepEl.style.width = '60px'
  stepEl.style.height = '30px'
  stepEl.style.lineHeight = '30px'
  stepEl.style.textAlign = 'center'
  stepEl.style.color = 'black'
  stepEl.style.padding = '5px'
  stepEl.style.border = '1px solid black'
  stepEl.textContent = '+' + step
  keysListEl.appendChild(stepEl)
  keysList.push(stepEl)
  stepEl.addEventListener('mouseover', () => {
    stepEl.style.fontWeight = '700'
  })
  stepEl.addEventListener('mouseout', () => {
    stepEl.style.fontWeight = '400'
  })
}

const runMover = () => {
  if (keysList.length < 1) {
    running = false
    return
  }
  const curBlockPos = myBlockEl.getBoundingClientRect()
  const curStepEl = keysList.shift()
  const step = curStepEl.textContent.replace('+', '')
  keysListEl.removeChild(curStepEl)
  if (step === 'left') myBlockEl.style.left = curBlockPos.left - curBlockPos.width + 'px'
  if (step === 'right') myBlockEl.style.left = curBlockPos.left + curBlockPos.width + 'px'
  if (step === 'up') myBlockEl.style.top = curBlockPos.top - curBlockPos.height + 'px'
  if (step === 'down') myBlockEl.style.top = curBlockPos.top + curBlockPos.height + 'px'
  setTimeout(runMover, 300)
}

document.addEventListener('DOMContentLoaded', () => {
  keysListEl = createList()
  myBlockEl = createBlock()

  document.addEventListener('keydown', ev => {
    if (running) return
    ev.preventDefault()
    switch (ev.code) {
      case 'ArrowDown':
        createStep('down')
        break
      case 'ArrowUp':
        createStep('up')
        break
      case 'ArrowLeft':
        createStep('left')
        break
      case 'ArrowRight':
        createStep('right')
        break
      case 'KeyC':
        myBlockEl.style.backgroundColor = getHexColor()
        break
      case 'Space':
        running = true
        runMover()
        break
    }
  })
})