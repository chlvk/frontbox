const outputEl = document.querySelector('.output')
const btn = document.querySelector('.calculate')
const input = document.querySelector('.sum')

const calculateTip = () => {
  const sum = Number(input.value)
  const tip = sum * 0.15
  outputEl.innerHTML = `<strong>Sum:$${sum} - Tip:$${tip.toFixed(2)}</strong>`
  input.value = ''
}

btn.addEventListener('click', calculateTip)
