const tabs = (headerSelector, tabSelector, contentSelector, activeClass = 'active', display = 'block') => {
  const header = document.querySelector(headerSelector)
  const tabs = [...document.querySelectorAll(tabSelector)]
  const contents = [...document.querySelectorAll(contentSelector)]

  const hideTabsContent = () => {
    contents.forEach((item) => {
      item.style.display = 'none'
    })
    tabs.forEach((item) => {
      item.classList.remove(activeClass)
    })
  }

  const showTabContent = (i = 0) => {
    contents[i].style.display = display
    tabs[i].classList.add(activeClass)
  }

  header.addEventListener('click', ({ target }) => {
    const tab = target.closest(tabSelector)
    if (!tab) return
    const index = tabs.findIndex((item) => item === tab)
    hideTabsContent()
    showTabContent(index)
  })

  hideTabsContent()
  showTabContent()
}

export default tabs
