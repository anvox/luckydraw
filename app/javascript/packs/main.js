import { createApp } from 'vue'
import Counter from "../components/counter.vue"

document.addEventListener('DOMContentLoaded', () => {
  createApp(Counter).mount('#counter-container')
})
