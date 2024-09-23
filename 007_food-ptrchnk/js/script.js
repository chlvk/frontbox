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
  const closeModalBtn = document.querySelector('[data-close]')
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

  closeModalBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', ({ target }) => {
    if (!(target === modal)) return
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

})