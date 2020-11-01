<style scoped>
.animate {
  width: 100%;
}
#draw-board {
  width: 240px;
  height: 450px;
  margin: auto;
  z-index: 100;
}
.winner {
  padding-bottom: 40px;
}
</style>

<template lang="pug">
.winner.col-4.col-md-4.d-flex.flex-column.justify-content-center.text-center
  h1.align-self-center
    span.text-110.text-yellow-l3
      |{{currentAvatar0}}
.d-flex.flex-column.col-4.col-md-4
  .animate
    #draw-board(ref="board")
.winner.col-4.col-md-4.d-flex.flex-column.justify-content-center.text-center
  h1.align-self-center
    span.text-110.text-yellow-l3
      |{{currentAvatar1}}
.col-12.col-md-12.d-flex.flex-column.justify-content-center.text-center
  .col
    br
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
        width: 240,
        height: 450,
        currentTargets: [],
        reels: []
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

      this.reels = [
        new Reel(this.avatarWidth,
                 this.width,
                 this.height,
                 this._onReelTargetUpdated,
                 0),
        new Reel(this.avatarWidth,
                 this.width,
                 this.height,
                 this._onReelTargetUpdated,
                 1)]
      this.currentTargets = [0, 0]
      this.app.stage.addChild(this.reels[0].container, this.reels[1].container)
    },
    methods: {
      loadContainer() {
        this.reels[0].load(this.candidates, this.app)
        this.reels[1].load(this.candidates, this.app)
      },
      _onReelTargetUpdated(target, reelIndex) {
        this.currentTargets[reelIndex] = target
      },
      startPlay() {
        let targets = []
        let i = 0
        while (i < this.reels.length) {
          let target = this.reels[i].nextTarget(targets)
          if (targets.indexOf(target % this.candidates.length) >= 0) {
            continue
          }
          this.reels[i].play(target)

          targets.push(target % this.candidates.length)
          i++
        }
        console.log(targets)
      },
    },
    watch: {
      candidates(newCandidates, _) {
        this.reels[0].clear()
        this.reels[1].clear()
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
      currentAvatar0() {
        if (this.candidates.length <= 0) {
          return ""
        }

        return this.candidates[this.currentTargets[0]][0]
      },
      currentAvatar1() {
        if (this.candidates.length <= 0) {
          return ""
        }

        return this.candidates[this.currentTargets[1]][0]
      },
    }
  }
</script>
