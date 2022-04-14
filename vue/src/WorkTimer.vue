<script>
import { useMainStore } from './store'
export default {
  setup() {
    const store = useMainStore()
    return { store }
  },
  data() {
    return {
      timerRunning: false
    }
  },
  computed: {
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
        this.store.workSeconds++
        this.store.restSeconds = this.store.earnedRestSeconds;
      }, 1000)
    },
    pauseTimer() {
      this.timerRunning = false
      clearInterval(this.timer)
    },
    stop() {
      this.pauseTimer()
      this.$emit('stop')
    }
  }
}
</script>

<template>
  <div class="timer">
    <div class="h1">Worked</div>
    <div class="time">{{ store.workTime }}</div>
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
