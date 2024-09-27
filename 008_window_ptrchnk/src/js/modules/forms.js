const forms = () => {
  const formEls = Array.from(document.querySelectorAll('form'))
  const inputEls = Array.from(document.querySelectorAll('input'))
  const phoneInputEls = Array.from(
    document.querySelectorAll('input[name=user_phone]')
  )

  const messages = {
    loading: 'Loading...',
    success: "Thanks! We'll contact you soon",
    failure: 'Something is wrong :(((',
  }

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = messages.loading
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    })
    return await res.text()
  }

  const clearInputs = () => {
    inputEls.forEach((item) => {
      item.value = ''
    })
  }

  phoneInputEls.forEach((item) => {
    item.addEventListener('input', (e) => {
      item.value = item.value.replace(/\D/, '')
    })
  })

  formEls.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault()
      const statusMessageEl = document.createElement('div')
      statusMessageEl.classList.add('status')
      item.append(statusMessageEl)

      const formData = new FormData(item)
      postData('assets/server.php', formData)
        .then((res) => {
          console.log(res)
          statusMessageEl.textContent = messages.success
        })
        .catch(() => {
          statusMessageEl.textContent = messages.failure
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessageEl.remove()
          }, 3000)
        })
    })
  })
}

export default forms
