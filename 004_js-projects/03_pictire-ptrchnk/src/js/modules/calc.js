const calc = (sizeSelector, materialSelector, optionsSelector, promocodeSelector, resultSelector) => {
  const sizeEl = document.querySelector(sizeSelector)
  const materialEl = document.querySelector(materialSelector)
  const optionsEl = document.querySelector(optionsSelector)
  const promocodeEl = document.querySelector(promocodeSelector)
  const resultEl = document.querySelector(resultSelector)
  let sum = 0

  const calcSum = () => {
    const size = Number(sizeEl.value)
    const material = Number(materialEl.value)
    const options = Number(optionsEl.value)
    sum = Math.round(size * material + options)
    if (sizeEl.value === '' || materialEl.value === '') {
      resultEl.textContent = 'Пожалуйста, выберите материал и размер картины🤲'
    } else if (promocodeEl.value === 'SKIDKA') {
      resultEl.textContent = Math.round(sum * 0.7)
    } else {
      resultEl.textContent = sum
    }
  }

  sizeEl.addEventListener('change', calcSum)
  materialEl.addEventListener('change', calcSum)
  optionsEl.addEventListener('change', calcSum)
  promocodeEl.addEventListener('input', calcSum)
}

export default calc