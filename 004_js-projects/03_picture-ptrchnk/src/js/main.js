import modals from './modules/modals'
import sliders from './modules/sliders'
import forms from './modules/forms'
import mask from './modules/mask'
import checkTextInputs from './modules/checkTextInputs'
import showMoreStyles from './modules/showMoreStyles'
import showMoreStylesViaJson from './modules/showMoreStylesViaJson'
import calc from './modules/calc'
import filter from './modules/filter'

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    modals()
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn')
    sliders('.main-slider-item', 'vertical')
    forms()
    mask('[name="phone"]')
    checkTextInputs('[name="message"]')
    checkTextInputs('[name="name"]')
    showMoreStyles('.button-styles', '.styles-2')
    showMoreStylesViaJson('.button-styles-2', '#styles .row')
    calc('#size', '#material', '#options', '.promocode', '.calc-price')
    filter()
})