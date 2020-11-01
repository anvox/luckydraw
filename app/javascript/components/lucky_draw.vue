<template lang="pug">
random-circles(:circles=40, :waiting="isWaiting")
.row.container.container-plus.mx-auto.mb-5
  draw-board(:candidates="candidates")
draw-settings(v-model="candidates")
</template>

<script>
  import $ from "jquery"
  import Basic from "../ace/js/src/general"
  import RandomCircles from "./random_circles.vue"
  import DrawSettings from "./settings.vue"
  import DrawBoard from "./draw_board.vue"

  export default {
    components: {
      'random-circles': RandomCircles,
      'draw-settings': DrawSettings,
      'draw-board': DrawBoard,
    },
    data() {
      return {
        candidates: []
      }
    },
    mounted() {
      Basic._HandleBasics()
    },
    computed: {
      isWaiting() {
        return this.candidates.length <= 0
      }
    }
  }
</script>
