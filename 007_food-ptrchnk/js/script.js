document.addEventListener('DOMContentLoaded', () => {
  /* Tabs */
  const tabsParent = document.querySelector('.tabheader__items')
  const tabs = Array.from(tabsParent.querySelectorAll('.tabheader__item'))
  const tabsContent = Array.from(document.querySelectorAll('.tabcontent'))

  const hideAllTabs = () => {
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active')
    })
    tabsContent.forEach(item => {
      item.classList.remove('show', 'fade')
      item.classList.add('hide')
    })
  }

  const showTabsContent = (index = 0) => {
    tabs[index].classList.add('tabheader__item_active')
    tabsContent[index].classList.remove('hide')
    tabsContent[index].classList.add('show', 'fade')
  }

  tabsParent.addEventListener('click', ({ target }) => {
    if (!target || !target.classList.contains('tabheader__item')) return
    tabs.forEach((item, i) => {
      if (item === target) {
        hideAllTabs()
        showTabsContent(i)
      }
    })
  })

  hideAllTabs()
  showTabsContent()

  /* Timer */
  const deadline = new Date('2024-10-30')

  const addZero = num => ('0' + num).slice(-2)

  const getRemainingTime = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date())
    let days, hours, minutes, seconds

    if (t <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24))
      hours = Math.floor((t / (1000 * 60 * 60)) % 24)
      minutes = Math.floor((t / (1000 * 60)) % 60)
      seconds = Math.floor((t / 1000) % 60)
    }
    return {
      total: t,
      days, hours, minutes, seconds
    }
  }

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector)
    const days = timer.querySelector('#days')
    const hours = timer.querySelector('#hours')
    const minutes = timer.querySelector('#minutes')
    const seconds = timer.querySelector('#seconds')
    const timeInterval = setInterval(updateClock, 1000)

    function updateClock() {
      const time = getRemainingTime(endtime)

      days.innerHTML = addZero(time.days)
      hours.innerHTML = addZero(time.hours)
      minutes.innerHTML = addZero(time.minutes)
      seconds.innerHTML = addZero(time.seconds)

      if (time.total <= 0) {
        clearInterval(timeInterval)
      }
    }

    updateClock()
  }

  setClock('.timer', deadline)

  /* Modal */
  const modal = document.querySelector('.modal')
  const modaltriggers = [...document.querySelectorAll('[data-modal]')]

  const openModal = () => {
    modal.classList.remove('hide')
    modal.classList.add('show')
    document.body.style.overflow = 'hidden'
    clearInterval(modaltimeout)
  }

  const closeModal = () => {
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
  }

  const openModalOnScroll = () => {
    const scrollPosition = window.scrollY + document.documentElement.clientHeight
    const documentHeight = document.documentElement.scrollHeight
    if (scrollPosition >= documentHeight - 1) {
      openModal()
      document.removeEventListener('scroll', openModalOnScroll)
    }
  }

  modaltriggers.forEach((item) => {
    item.addEventListener('click', openModal)
  })
  const modaltimeout = setTimeout(openModal, 6000000)
  document.addEventListener('scroll', openModalOnScroll)

  modal.addEventListener('click', ({ target }) => {
    if (!(target === modal || target.hasAttribute('data-close'))) return
    closeModal()
  })
  document.addEventListener('keydown', (e) => {
    const code = e.code
    if (!(code === 'Escape' && modal.classList.contains('show'))) return
    closeModal()
  })

  /* Menu */
  const menuData = [
    {
      img: 'img/tabs/vegy.jpg',
      alt: 'vegy',
      title: 'Меню "Фитнес"',
      descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      price: '229'
    },
    {
      img: 'img/tabs/elite.jpg',
      alt: 'elite',
      title: 'Меню "Премиум"',
      descr: 'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      price: '550'
    },
    {
      img: 'img/tabs/post.jpg',
      alt: 'post',
      title: 'Меню "Постное"',
      descr: 'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      price: '430'
    }
  ]

  class MenuCard {
    constructor(data, parentSelector, ...classes) {
      this.img = data.img
      this.alt = data.alt
      this.title = data.title
      this.descr = data.descr
      this.price = data.price
      this.classes = classes
      this.transfer = 27
      this.parent = document.querySelector(parentSelector)
      this.changeToUAH()
      this.render()
    }

    changeToUAH() {
      this.price = this.price * this.transfer
    }

    render() {
      const menuEl = document.createElement('div')
      if (this.classes.length === 0) {
        this.elementClass = 'menu__item'
        menuEl.classList.add(this.elementClass)
      } else {
        this.classes.forEach(item => menuEl.classList.add(item))
      }
      menuEl.innerHTML = `
      <img src="${this.img}" alt="${this.alt}">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`
      this.parent.append(menuEl)
    }
  }

  menuData.forEach((item) => {
    new MenuCard(item, '.menu__field .container', 'menu__item')
  })

  /* Forms */
  const forms = Array.from(document.querySelectorAll('form'))

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Thanks! We\'ll contact you soon',
    failure: 'Something doesn\'t work'
  }

  /* xhr */
  /* const postData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const statusMessage = document.createElement('img')
      statusMessage.src = message.loading
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessage)

      const request = new XMLHttpRequest()
      request.open('POST', 'server.php')
      request.setRequestHeader('Content-type', 'application/json')
      const formData = new FormData(form)

      const obj = {}
      formData.forEach((value, key) => {
        obj[key] = value
      })
      const dataJson = JSON.stringify(obj)

      request.send(dataJson)

      request.addEventListener('load', () => {
        statusMessage.remove()
        if (request.status === 200) {
          console.log(request.response)
          showMessageModal(message.success)
          form.reset()
        } else {
          showMessageModal(message.failure)
        }
      })
    })
  } */
  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      let statusMessage = document.createElement('img')
      statusMessage.src = message.loading
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
      form.insertAdjacentElement('afterend', statusMessage)

      const formData = new FormData(form)

      const object = {}
      formData.forEach((value, key) => {
        object[key] = value
      })

      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => {
        console.log(data)
        showMessageModal(message.success)
        statusMessage.remove()
      }).catch(() => {
        showMessageModal(message.failure)
      }).finally(() => {
        form.reset()
      })
    })
  }

  forms.forEach(item => postData(item))

  const showMessageModal = (message) => {
    const prevModalDialog = document.querySelector('.modal__dialog')
    prevModalDialog.classList.add('hide')
    openModal()

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
    </div>
    `
    document.querySelector('.modal').append(thanksModal)

    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.remove('hide')
      prevModalDialog.classList.add('show')
      closeModal()
    }, 3000)
  }

})