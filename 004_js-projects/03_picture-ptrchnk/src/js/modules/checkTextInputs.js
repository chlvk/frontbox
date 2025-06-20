const checkTextInputs = (selector) => {
    const txtInputEls = Array.from(document.querySelectorAll(selector))

    txtInputEls.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault()
            }
        })
    })
}

export default checkTextInputs