<script>
import Timer from './Timer.vue'
import Card from './Card.vue'
const ratios = ["1:10", "1:9", "1:8", "1:7", "1:6", "1:5", "1:4", "1:3", "1:2", "1:1", "2:1", "3:1", "4:1", "5:1", "6:1", "7:1", "8:1", "9:1", "10:1"]
const workToRest = (ratio, workTime) => {
  let [work, rest] = ratio.split(":")
  ratio = rest / work
  let restTime = workTime * ratio
  return restTime
}
const hoursMinutesToSeconds = (hours, minutes, seconds) => {
  return hours * 3600 + minutes * 60 + seconds
}
export default {
  data() {
    return {
      ratioIndex: 9,
    }
  },
  components: {
    Timer, Card
  },
  methods: {
    updateRatio() {
      console.log(this.ratioIndex)
    },
    workStopped(remainingSeconds) {
      console.log(remainingSeconds)
    }
  },
  computed: {
    ratioString() {
      let ratio = ratios[this.ratioIndex].split(":")
      let ratio1plural = ratio[0] > 1 ? "s" : ""
      let ratio2plural = ratio[1] > 1 ? "s" : ""
      // 1 minute of work = 10 minutes of rest
      return `${ratio[0]} minute${ratio1plural} of work = ${ratio[1]} minute${ratio2plural} of rest`
    },
  }
}
</script>

<template>
  <div class="container">
    <span class="h1">Work Rest Timer</span>
    <div class="slidecontainer">
      <div>Work Rest Ratio</div>
      <input type="range" min="0" max="18" class="slider" v-model="ratioIndex">
      <div>{{ ratioString }}</div>
    </div>
    <div class="bottom">
      <Timer title="Worked" :seconds="0" @stop="workStopped"></Timer>
      <span class="material-icons-round arrow">keyboard_double_arrow_right</span>
      <Card title="Rest Earned" :seconds="10"></Card>
      <span class="material-icons-round arrow">keyboard_double_arrow_right</span>
      <Timer title="Rest" :seconds="10"></Timer>
    </div>
  </div>
</template>

<style>
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
