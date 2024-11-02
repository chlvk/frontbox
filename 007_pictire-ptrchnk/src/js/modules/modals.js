const modals = () => {
    let isAnyBtnPressed = false

    function bindModal(triggerSelector, modalSelector, closeSelector, destroyTrigger = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll()

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }

                isAnyBtnPressed = true

                if (destroyTrigger) {
                    item.remove()
                }

                windows.forEach(item => {
                    item.style.display = 'none'
                    item.classList.add('animated', 'fadeIn') // Animate.css library
                })

                modal.style.display = "block"
                document.body.style.overflow = "hidden"
                document.body.style.marginRight = `${scroll}px`
            })
        })

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none'
            })

            modal.style.display = "none"
            document.body.style.overflow = ""
            document.body.style.marginRight = `0px`
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none'
                })

                modal.style.display = "none"
                document.body.style.overflow = ""
                document.body.style.marginRight = `0px`
            }
        })
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            let isModalOpen = false

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    isModalOpen = true
                }
            })

            if (!isModalOpen) {
                const scroll = calcScroll()

                document.querySelector(selector).style.display = 'block'
                document.body.style.overflow = "hidden"
                document.body.style.marginRight = `${scroll}px`
            }
        }, time)
    }

    function calcScroll() {
        let div = document.createElement('div')

        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden'

        document.body.appendChild(div)
        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()

        return scrollWidth
    }

    function openByScrollEnd(selector) {
        window.addEventListener('scroll', () => {
            const windowPosition = window.scrollY + document.documentElement.clientHeight
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) //для старых браузеров
            if (!isAnyBtnPressed && (windowPosition >= scrollHeight)) {
                document.querySelector(selector).click()
            }
        })
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)

    showModalByTime('.popup-consultation', 50000)
    openByScrollEnd('.fixed-gift')
}

export default modals