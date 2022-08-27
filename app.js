const countdownHours = document.querySelector("#countdown-hours span")
const countdownMinutes = document.querySelector("#countdown-minutes span")
const countdownSeconds = document.querySelector("#countdown-seconds span")

const countdownForm = document.querySelector("form")

let interval

countdownForm.addEventListener("submit", (e) => {
  const formData = new FormData(countdownForm)
  const hoursText = formData.get("hours")
  const minutesText = formData.get("minutes")
  const secondsText = formData.get("seconds")
  const countdown = {
    hours: Number(hoursText),
    minutes: Number(minutesText),
    seconds: Number(secondsText)
  }
  countdownHours.textContent = countdown.hours
  countdownMinutes.textContent = countdown.minutes
  countdownSeconds.textContent = countdown.seconds
  countdownForm.reset()
  startCountdown(countdown.hours, countdown.minutes, countdown.seconds)
  e.preventDefault()
})

const startCountdown = (hours, minutes, seconds) => {
  interval = setInterval(() => {
    seconds -= 1
    countdownSeconds.textContent = seconds
    if (seconds <= 0) {
      seconds = 0
      countdownSeconds.textContent = seconds
    }
    if (seconds == 0 && minutes > 0) {
      minutes -= 1
      seconds = 59
      countdownMinutes.textContent = minutes
      countdownSeconds.textContent = seconds
    }
    if (hours > 0 && minutes == 0 && seconds == 0) {
      hours -= 1
      minutes = 59
      seconds = 59
      countdownHours.textContent = hours
      countdownMinutes.textContent = minutes
      countdownSeconds.textContent = seconds
    }
    if (hours == 0 && minutes == 0 && seconds == 0) {
      clearInterval(interval)
      countdownHours.textContent = 0
      countdownMinutes.textContent = 0
      countdownSeconds.textContent = 0
    }
    resetCountdown()
  }, 1000)
}

const resetCountdown = () => clearInterval(interval)
