document.addEventListener('DOMContentLoaded', () => {
  const notice = document.querySelector('.notice')

  if (notice) {
    const noticeClose = notice.querySelector('.notice__close')
    noticeClose.addEventListener('click', ({ target }) => {
      target.parentElement.classList.add('notice_hidden')
    })
  }
})
