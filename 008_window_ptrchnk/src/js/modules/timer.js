const timer = (selector, deadline) => {
  const addZero = (num) => ('0' + num).slice(-2)
  const getRemainingTime = (endtime) => {
    const t = Date.parse(endtime) - Date.now()
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
      days,
      hours,
      minutes,
      seconds,
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
  setClock(selector, deadline)
}

export default timer
