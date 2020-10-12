<template lang="pug">
#random-shapes-2
random-circles(:circles=40)
.nested
  |Counter: {{ counter }}
</template>

<script>
  import RandomCircles from "./random_circles.vue"

  export default {
    components: {
      'random-circles': RandomCircles
    },
    data() {
      return {
        counter: 0
      }
    }
  }
</script>
