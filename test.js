let ratios = ["1:10", "1:9", "1:8", "1:7", "1:6", "1:5", "1:4", "1:3", "1:2", "1:1", "2:1", "3:1", "4:1", "5:1", "6:1", "7:1", "8:1", "9:1", "10:1"]

const workToRest = (ratio, workTime) => {
  let [work, rest] = ratio.split(":")
  ratio = rest / work
  let restTime = workTime * ratio
  return restTime
}

const hoursMinutesToSeconds = (hours, minutes, seconds) => {
  return hours * 3600 + minutes * 60 + seconds
}

const secondsToHoursMinutesAndSeconds = (seconds) => {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - (hours * 3600)) / 60)
  seconds = seconds - (hours * 3600) - (minutes * 60)
  return { hours, minutes, seconds }
}

const formatTime = (hours, minutes, seconds) => {
  return `${hours}:${minutes}:${seconds}`
}

let rest = workToRest(ratios[3], hoursMinutesToSeconds(0, 15, 24))
let { hours, minutes, seconds } = secondsToHoursMinutesAndSeconds(rest)
console.log(formatTime(hours, minutes, seconds))