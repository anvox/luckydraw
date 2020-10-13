import { createApp } from 'vue'
import LuckyDraw from "../components/lucky_draw.vue"

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(LuckyDraw)
  app.mount('#page-intro-dark')
})
