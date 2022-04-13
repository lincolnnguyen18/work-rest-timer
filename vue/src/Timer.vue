<script>
const formatTime = (hours, minutes, seconds) => {
  return [hours, minutes, seconds]
    .map(v => v < 10 ? '0' + v : v)
    .join(':')
}
const secondsToHoursMinutesAndSeconds = (seconds) => {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - (hours * 3600)) / 60)
  seconds = seconds - (hours * 3600) - (minutes * 60)
  return { hours, minutes, seconds }
}
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      remainingSeconds: this.seconds,
      timerRunning: false
    }
  },
  computed: {
    formattedRemainigTime() {
      const { hours, minutes, seconds } = secondsToHoursMinutesAndSeconds(this.remainingSeconds)
      return formatTime(hours, minutes, seconds)
    },
    button() {
      return this.timerRunning ? 'pause_circle' : 'play_circle'
    }
  },
  methods: {
    toggleTimer() {
      this.timerRunning = !this.timerRunning
      if (this.timerRunning) {
        this.startTimer()
      } else {
        this.pauseTimer()
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.remainingSeconds++
        // if (this.remainingSeconds <= 0) {
        //   this.stopTimer()
        // }
      }, 1000)
    },
    pauseTimer() {
      clearInterval(this.timer)
    },
    stop() {
      console.log('stop')
      this.$emit('stop', this.remainingSeconds)
    }
  }
}
</script>

<template>
  <div class="timer">
    <div class="h1">{{ title }}</div>
    <div class="time">{{ formattedRemainigTime }}</div>
    <div class="buttons">
      <span class="material-icons-round" @click="toggleTimer">{{ button }}</span>
      <span class="material-icons-round" @click="stop">stop_circle</span>
    </div>
  </div>
</template>

<style>
.time {
  font-size: 36px;
}
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  background: white;
  color: black;
  width: 225px;
  padding: 36px 0;
  /* border: 2px solid white; */
  border-radius: 16px;
}
.buttons {
  /* background: red; */
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 22px;
}
</style>
