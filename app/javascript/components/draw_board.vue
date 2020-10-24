<style scoped>
.animate {
  width: 100%;
}
#draw-board {
  width: 810px;
  height: 200px;
  margin: auto;
  z-index: 100;
}
.winner {
  padding-bottom: 40px;
}
</style>

<template lang="pug">
.animate
  #draw-board(ref="board")
.winner.col-12.col-md-12.d-flex.flex-column.justify-content-center.text-center
  h1.align-self-center
    span.text-110.text-yellow-l3
      |{{currentAvatar}}
.col-12.col-md-12.d-flex.flex-column.justify-content-center.text-center
  .col
    button.col-6.btn.btn-outline-white.brc-white-tp3(type="button", @click="startPlay") Draw
</template>

<script type="text/javascript">
  import * as PIXI from "pixi.js"

  import Reel from "./reels/reel.js"

  export default {
    data() {
      return {
        app: null,
        reel: null,
        avatarWidth: 90,
        width: 810,
        height: 200,
        currentTarget: 0
      }
    },
    props: {
      candidates: {},
    },
    mounted() {
      this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        transparent: true,
        antialias: true,
        resolution: 1,
      })
      this.$refs.board.appendChild(this.app.view)

      this.reel = new Reel(this.avatarWidth,
                           this.width,
                           this.height,
                           this._onReelTargetUpdated)
      this.app.stage.addChild(this.reel.container)
    },
    methods: {
      loadContainer() {
        this.reel.load(this.candidates, this.app)
      },
      _onReelTargetUpdated(target) {
        this.currentTarget = target
      },
      startPlay() {
        const target = this.reel.target + Math.floor(Math.random() * this.candidates.length * 1.3) + this.candidates.length

        this.reel.play(target)
      },
    },
    watch: {
      candidates(newCandidates, _) {
        this.reel.clear()
        if (newCandidates.length <= 0) {
          return
        }

        for (var i = 0; i < newCandidates.length; i++) {
          this.app.loader.add(`candidate-${i}`, this.candidates[i][1])
        }

        this.app.loader.load(this.loadContainer)
      }
    },
    computed: {
      currentAvatar() {
        if (this.candidates.length <= 0) {
          return ""
        }

        return this.candidates[this.currentTarget][0]
      }
    }
  }
</script>
