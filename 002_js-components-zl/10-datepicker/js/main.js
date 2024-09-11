const date = new Date(2019, 1, 13)
const form = document.querySelector('form')

const datetimeToDate = (datetime) => {
  const [year, month] = datetime.split('-')
    .map(num => parseInt(num))

  return new Date(year, month - 1)
}

const toTwoDigitString = (number) => {
  return number.toString().padStart(2, '0')
}

const createDateGridHTML = (date) => {
  const dategrid = document.createElement('div')
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDayOfMonth = new Date(date.setDate(1)).getDay()
  const lastDayInMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayInMonth.getDate()
  const datetimeMonth = toTwoDigitString(month + 1)

  for (let day = 1; day <= daysInMonth; day++) {
    const button = document.createElement('button')
    if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfMonth + 1)

    const datetimeDay = toTwoDigitString(day)
    button.innerHTML = `
      <time datetime="${year}-${datetimeMonth}-${datetimeDay}">${day}</time>
    `

    dategrid.appendChild(button)
  }

  return dategrid.innerHTML
}

const createYearMonthIndicatorTimeElement = (date) => {
  const monthsInAYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const year = date.getFullYear()
  const targetMonth = date.getMonth()
  const monthName = monthsInAYear[targetMonth]
  const datetimeMonth = toTwoDigitString(targetMonth + 1)

  return `
      <time datetime="${year}-${datetimeMonth}">${monthName} ${year}</time>
    `
}

const createDatepicker = date => {
  const datepicker = document.createElement('div')
  datepicker.classList.add('datepicker')

  const previousNextMonthButtons = `
    <div class="datepicker__buttons">
      <button class="datepicker__previous">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" /></svg>
        </svg>
      </button>

      <button class="datepicker__next">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </button>
    </div>
  `

  const calendar = `
    <div class="datepicker__calendar">
      <div class="datepicker__year-month">
        ${createYearMonthIndicatorTimeElement(date)}
      </div>
      <div class="datepicker__day-of-week">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div class="datepicker__date-grid">
        ${createDateGridHTML(date)}
      </div>
    </div>
  `

  datepicker.innerHTML = `
    ${previousNextMonthButtons}
    ${calendar}
  `

  const previousNextButtons = datepicker.querySelector('.datepicker__buttons')

  const getDateFromYearMonthIndicator = () => {
    const time = datepicker.querySelector('.datepicker__year-month').firstElementChild
    const datetime = time.getAttribute('datetime')
    return datetimeToDate(datetime)
  }

  previousNextButtons.addEventListener('click', ev => {
    if (!ev.target.matches('button')) return
    const currentDate = getDateFromYearMonthIndicator()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const targetDate = ev.target.matches('.datepicker__previous')
      ? new Date(year, month - 1)
      : new Date(year, month + 1)

    const dategrid = datepicker.querySelector('.datepicker__date-grid')
    const yearMonthIndicator = datepicker.querySelector('.datepicker__year-month')
    yearMonthIndicator.innerHTML = createYearMonthIndicatorTimeElement(targetDate)
    dategrid.innerHTML = createDateGridHTML(targetDate)
  })

  return datepicker
}

form.appendChild(createDatepicker(date))
