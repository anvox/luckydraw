<template lang="pug">
random-circles(:circles=40)
.nested
  |Counter: {{ counter }}
draw-settings
</template>

<script>
  import $ from "jquery"
  import Basic from "../ace/js/src/general"
  import RandomCircles from "./random_circles.vue"
  import DrawSettings from "./settings.vue"

  export default {
    components: {
      'random-circles': RandomCircles,
      'draw-settings': DrawSettings,
    },
    data() {
      return {
        counter: 0
      }
    },
    mounted() {
      Basic._HandleBasics()
    }
  }
</script>
