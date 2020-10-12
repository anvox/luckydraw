import { createApp } from 'vue'
import Counter from "../components/counter.vue"

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(Counter)
  app.mount('#page-intro-dark')
})
