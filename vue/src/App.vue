<script>
import WorkTimer from './WorkTimer.vue'
import RestTimer from './RestTimer.vue'
import Card from './Card.vue'
import { useMainStore } from './store'
export default {
  setup() {
    const store = useMainStore()
    return { store }
  },
  data() {
    return {
      mode: 'work'
    }
  },
  components: {
    WorkTimer, Card, RestTimer
  },
  methods: {
    // updateRatio() {
    //   console.log(this.store.ratioIndex)
    // },
    workStopped() {
      this.mode = 'rest'
    },
    restStopped() {
      this.store.workSeconds = 0
      this.store.restSeconds = 0
      this.mode = 'work'
    }
  },
  computed: {
    ratioString() {
      let ratio = this.store.currentRatio.split(':')
      let ratio1plural = ratio[0] > 1 ? "s" : ""
      let ratio2plural = ratio[1] > 1 ? "s" : ""
      // 1 minute of work = 10 minutes of rest
      return `${ratio[0]} minute${ratio1plural} of work = ${ratio[1]} minute${ratio2plural} of rest`
    },
  },
  mounted() {
    if (Notification.permission !== "granted") { Notification.requestPermission(); }
  }
}
</script>

<template>
  <div class="container">
    <span class="h1">Work Rest Timer</span>
    <div class="slidecontainer" :class="{ 'disabled': mode !== 'work' }">
      <div>Work Rest Ratio</div>
      <!-- <input type="range" min="0" max="18" class="slider" v-model="store.ratioIndex" @input="updateRatio"> -->
      <input type="range" min="0" :max="store.ratios.length - 1" class="slider" v-model="store.ratioIndex">
      <div>{{ ratioString }}</div>
    </div>
    <div class="bottom">
      <WorkTimer @stop="workStopped" :class="{ 'disabled': mode !== 'work' }"></WorkTimer>
      <span class="material-icons-round arrow" :class="{ 'disabled': mode !== 'work' }">keyboard_double_arrow_right</span>
      <Card title="Rest Earned" :seconds="10"></Card>
      <span class="material-icons-round arrow" :class="{ 'disabled': mode !== 'rest' }">keyboard_double_arrow_right</span>
      <RestTimer :class="{ 'disabled': mode !== 'rest' }" @stop="restStopped"></RestTimer>
    </div>
  </div>
</template>

<style>
.disabled {
  pointer-events: none;
  opacity: 0.5;
  user-select: none;
  transition: opacity 0.3s ease;
}
html, body, #app {
  padding: 0;
  margin: 0;
  background: black;
  font-family: 'Roboto', sans-serif;
  color: white;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}
.bottom {
  display: flex;
  gap: 16px;
  align-items: center;
}
.material-icons-round {
  font-size: 64px;
  user-select: none;
  cursor: pointer;
}
.material-icons-round:hover {
  opacity: 0.7;
}
.h1 {
  font-size: 32px;
  font-weight: bold;
}
.slidecontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  /* margin-top: 24px;
  margin-bottom: 60px; */
  margin: 48px 0;
}
input[type=range] {
  appearance: none;
  width: 400px;
  border-radius: 7px;
  height: 5px;
}
input[type=range]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}
.arrow {
  font-size: 64px;
  pointer-events: none;
}
</style>
