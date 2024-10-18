const checkDigitInputs = (selector) => {
  const inputs = Array.from(document.querySelectorAll(selector))

  inputs.forEach((item) => {
    item.addEventListener('input', (e) => {
      item.value = item.value.replace(/\D/, '')
    })
  })
}

export default checkDigitInputs
