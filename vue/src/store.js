import { defineStore } from 'pinia';

const formatTime = (hours, minutes, seconds) => {
  return [hours, minutes, seconds]
    .map(v => v < 10 ? '0' + v : v)
    .join(':')
}
const secondsToHoursMinutesAndSeconds = (seconds) => {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - (hours * 3600)) / 60)
  seconds = seconds - (hours * 3600) - (minutes * 60)
  seconds = Math.round(seconds)
  return { hours, minutes, seconds }
}
const formatSeconds = (secondsIn) => {
  const { hours, minutes, seconds } = secondsToHoursMinutesAndSeconds(secondsIn)
  return formatTime(hours, minutes, seconds)
}
const workToRest = (ratio, workTime) => {
  let [work, rest] = ratio.split(":")
  ratio = rest / work
  let restTime = workTime * ratio
  return restTime
}
const hoursMinutesSecondsToSeconds = (hours, minutes, seconds) => {
  return hours * 3600 + minutes * 60 + seconds
}
// const ratios = ["1:10", "1:9", "1:8", "1:7", "1:6", "1:5", "1:4", "1:3", "1:2", "1:1", "2:1", "3:1", "4:1", "5:1", "6:1", "7:1", "8:1", "9:1", "10:1"]

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    workSeconds: 0,
    restSeconds: 0,
    ratioIndex: 4,
    ratios: ["1:5", "1:4", "1:3", "1:2", "1:1", "2:1", "3:1", "4:1", "5:1"]
  }),
  getters: {
    workTime() {
      return formatSeconds(this.workSeconds)
    },
    restTime() {
      return formatSeconds(this.restSeconds)
    },
    earnedRestTime() {
      return formatSeconds(workToRest(this.currentRatio, this.workSeconds))
    },
    earnedRestSeconds() {
      return workToRest(this.currentRatio, this.workSeconds)
    },
    currentRatio() {
      return this.ratios[this.ratioIndex]
    }
  },
  // actions: {
  //   startWork() {
  //     this.state.workSeconds++
  //   }
  // }
})