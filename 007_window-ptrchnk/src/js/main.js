import './slider'
import modals from './modules/modals'
import tabs from './modules/tabs'
import forms from './modules/forms'
import changeModalState from './modules/changeModalState'
import timer from './modules/timer'
import popupImage from './modules/popupImage'

window.addEventListener('DOMContentLoaded', () => {
  const modalState = {}
  changeModalState(modalState)
  modals()
  tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')
  tabs('.decoration_slider', '.decoration_item > div', '.decoration_content > div > div', 'after_click')
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
  forms(modalState)
  timer('#timer', '2024/12/31')
  popupImage()
})
