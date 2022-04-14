<script>
import { useMainStore } from './store'
export default {
  setup() {
    const store = useMainStore()
    return { store }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="timer">
    <div class="h1">{{ title }}</div>
    <div class="time">{{ store.earnedRestTime }}</div>
  </div>
</template>

<style scoped>
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
  height: 216px;
}
.buttons {
  /* background: red; */
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 22px;
}
</style>
