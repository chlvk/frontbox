const messageEl = document.querySelector('.message')
const btnEl = document.querySelector('.btn')
const inputEl = document.querySelector('.question')
const answers = ['maybe!', 'you dare!', 'no way!', 'absolutely!']

btnEl.addEventListener('click', () => {
  if (inputEl.value === '') return
  const question = inputEl.value
  const answer = answers[Math.floor(Math.random() * answers.length)]
  messageEl.innerHTML = `<b>question:</b> ${question} - <b>answer:</b> ${answer}`
  inputEl.value = ''
})