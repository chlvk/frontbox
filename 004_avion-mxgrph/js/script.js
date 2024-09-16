document.addEventListener('DOMContentLoaded', () => {
  /* Top Notice */
  const notice = document.querySelector('.notice')

  if (notice) {
    const noticeClose = notice.querySelector('.notice__close')
    noticeClose.addEventListener('click', ({ target }) => {
      target.parentElement.classList.add('notice_hidden')
    })
  }

  /* Stepper */
  const stepper = document.querySelector('.stepper')

  if (stepper) {
    const stepperInput = stepper.querySelector('.stepper__input')
    const stepperButtons = Array.from(stepper.querySelectorAll('.stepper__btn'))
    const stepperBtnMinus = stepper.querySelector('.stepper__btn_minus')
    const stepperBtnPlus = stepper.querySelector('.stepper__btn_plus')

    let count = Number(stepperInput.value)
    const stepperMin = Number(stepperInput.getAttribute('min'))
    const stepperMax = Number(stepperInput.getAttribute('max'))

    const disableButtons = (value) => {
      stepperButtons.forEach((btn) => {
        btn.classList.remove('stepper__btn_disabled')
      })
      if (value === stepperMin) {
        stepperBtnMinus.classList.add('stepper__btn_disabled')
      }
      if (value === stepperMax) {
        stepperBtnPlus.classList.add('stepper__btn_disabled')
      }
    }

    stepperBtnPlus.addEventListener('click', () => {
      stepperInput.value = ++count
      disableButtons(count)
    })

    stepperBtnMinus.addEventListener('click', () => {
      stepperInput.value = --count
      disableButtons(count)
    })

    stepperInput.addEventListener('change', ({ target }) => {
      const inputValue = Number(target.value)
      if (inputValue < stepperMin) {
        target.value = count = stepperMin
      } else if (target.value > stepperMax) {
        target.value = count = stepperMax
      } else {
        count = inputValue
      }
      disableButtons(count)
    })

    disableButtons(count)
  }
})
