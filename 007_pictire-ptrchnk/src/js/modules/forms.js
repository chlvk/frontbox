import { postData } from "../services/requests"

const forms = () => {
  const formEls = Array.from(document.querySelectorAll('form'))
  const inputEls = Array.from(document.querySelectorAll('input'))
  const uploadEls = Array.from(document.querySelectorAll('[name=upload]'))

  const messages = {
    loading: 'Loading...',
    success: "Thanks! We'll contact you soon",
    failure: 'Something is wrong :(((',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  }

  const paths = {
    designer: 'assets/server.php',
    question: 'assets/question.php',
  }

  const clearInputs = () => {
    inputEls.forEach((item) => {
      item.value = ''
    })
    uploadEls.forEach((item) => {
      item.previousElementSibling.textContent = 'Файл не выбран'
    })
  }

  uploadEls.forEach((item) => {
    item.addEventListener('input', (e) => {
      let [fileName, fileExtension] = item.files[0].name.split('.')
      fileName = fileName.length > 6 ? `${fileName.substr(0, 6)}...` : fileName
      const name = `${fileName}.${fileExtension}`
      item.previousElementSibling.textContent = name
    })
  })

  formEls.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault()
      const statusMessageEl = document.createElement('div')
      statusMessageEl.classList.add('status')
      item.parentElement.append(statusMessageEl)

      item.classList.add('animated', 'fadeOutUp')
      setTimeout(() => {
        item.style.display = 'none'
      }, 400)

      const statusImgEl = document.createElement('img')
      statusImgEl.src = messages.spinner
      statusImgEl.classList.add('animated', 'fadeInUp')
      statusMessageEl.append(statusImgEl)

      const statusTextEl = document.createElement('div')
      statusTextEl.textContent = messages.loading
      statusMessageEl.append(statusTextEl)

      const formData = new FormData(item)
      const api = item.closest('.popup-design') || item.classList.contains('calc-form') ? paths.designer : paths.question

      postData(api, formData)
        .then((res) => {
          console.log(api)
          console.log(res)
          statusImgEl.src = messages.ok
          statusTextEl.textContent = messages.success
        })
        .catch(() => {
          statusImgEl.src = messages.fail
          statusTextEl.textContent = messages.failure
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessageEl.remove()
            item.style.display = 'block'
            item.classList.remove('fadeOutUp')
            item.classList.add('fadeInUp')
          }, 3000)
        })
    })
  })
}

export default forms
