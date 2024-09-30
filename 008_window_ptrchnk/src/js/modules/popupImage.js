import calcScroll from './calcScroll'

const popupImage = () => {
  const imgContainer = document.querySelector('.works')
  const popup = document.createElement('div')
  const bigImg = document.createElement('img')
  const scrollWidth = calcScroll()

  popup.classList.add('popup')
  popup.style.display = 'none'
  popup.style.justifyContent = 'center'
  popup.style.alignItems = 'center'
  bigImg.style.maxHeight = '80vh'
  popup.append(bigImg)
  imgContainer.append(popup)

  imgContainer.addEventListener('click', (e) => {
    e.preventDefault()
    if (!e.target.closest('.preview')) return
    popup.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    document.body.style.marginRight = `${scrollWidth}px`
    bigImg.src = e.target.parentElement.href
  })

  popup.addEventListener('click', ({ target }) => {
    if (target !== popup) return
    popup.style.display = 'none'
    document.body.style.overflow = ''
    document.body.style.marginRight = `0px`
  })
}

export default popupImage
