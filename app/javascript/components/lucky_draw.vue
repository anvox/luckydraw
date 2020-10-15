<template lang="pug">
random-circles(:circles=40)
.row.container.container-plus.mx-auto.mt-3.mb-5
  .list(v-if="candidates.length > 0")
    .item(v-for="candidate in candidates")
      |item {{candidate}}
  draw-board
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
    }
  }
</script>
