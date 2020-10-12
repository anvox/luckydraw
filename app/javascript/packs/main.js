import { createApp } from 'vue'

document.addEventListener('DOMContentLoaded', () => {
  console.log("=================== 1")
  const Counter = {
    data() {
      return {
        counter: 0
      }
    },
    mounted() {
      setInterval(() => {
        this.counter++
      }, 1000)
    }
  }

  createApp(Counter).mount('#counter')
})
