import checkDigitInputs from './checkDigitInputs'

const changeModalState = (state) => {
  const windowForms = Array.from(document.querySelectorAll('.balcon_icons_img'))
  const windowWidth = [document.querySelector('#width')]
  const windowHeight = [document.querySelector('#height')]
  const windowType = [document.querySelector('#view_type')]
  const windowProfile = Array.from(document.querySelectorAll('.checkbox'))

  checkDigitInputs('#width')
  checkDigitInputs('#height')

  const bindActionToElem = (elem, event, prop) => {
    elem.forEach((item, i) => {
      item.addEventListener(event, (ev) => {
        switch (item.nodeName) {
          case 'SPAN':
            state[prop] = i
            break
          case 'SELECT':
            state[prop] = item.value
            break
          case 'INPUT':
            if (item.getAttribute('type') === 'checkbox') {
              elem.forEach((input) => (input.checked = false))
              item.checked = true
              state[prop] = item.nextElementSibling.id
            } else {
              state[prop] = item.value
            }
            break
        }
        console.log(state)
      })
    })
  }

  bindActionToElem(windowForms, 'click', 'form')
  bindActionToElem(windowWidth, 'input', 'width')
  bindActionToElem(windowHeight, 'input', 'height')
  bindActionToElem(windowType, 'change', 'type')
  bindActionToElem(windowProfile, 'change', 'profile')
}

export default changeModalState
