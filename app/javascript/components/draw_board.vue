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
  import gsap from 'gsap'
  import PixiPlugin from 'gsap/PixiPlugin'
  import MotionPathPlugin from 'gsap/MotionPathPlugin'
  import FrameImage from "./assets/frame.png"

  export default {
    data() {
      return {
        app: null,
        width: 810,
        height: 200,
        containers: [],
        grandContainer: null,
        position: {
          x: 0,
          prev: 0,
        },
        blur: null,
        avatarWidth: 90,
        targetName: ""
      }
    },
    props: {
      candidates: {},
      blurEffect: {
        default: false
      }
    },
    mounted() {
      PixiPlugin.registerPIXI(PIXI)
      gsap.registerPlugin(PixiPlugin, MotionPathPlugin)

      this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        transparent: true,
        antialias: true,
        resolution: 1,
      })
      this.$refs.board.appendChild(this.app.view)

      this.grandContainer = new PIXI.Container({sortableChildren: true})
      if (this.blurEffect) {
        this.blur = new PIXI.filters.BlurFilter()
        this.blur.blurX = 0
        this.blur.blurY = 0
        this.grandContainer.filters = [this.blur]
      }
      this.app.stage.addChild(this.grandContainer)

      const frameContainer = this.drawFrame()
      this.app.stage.addChild(frameContainer)
    },
    methods: {
      createAvatar(url, index) {
        const container = new PIXI.Container()

        // Avatar
        const texture = PIXI.Texture.from(url)
        const bunny = new PIXI.Sprite(texture)
        bunny.anchor.set(0)
        bunny.x = -40
        bunny.y = -40
        bunny.width = this.avatarWidth - 10
        bunny.height = this.avatarWidth - 10

        // Crop to circle
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(40 , 40 , 40);
        graphics.endFill();

        bunny.mask = graphics;
        bunny.addChild(graphics)

        container.addChild(bunny)

        // Draw the white border
        const border = new PIXI.Graphics();
        border.beginFill(0xFFFFFF, 0);
        border.lineStyle(4, 0xFFFFFF);
        border.drawCircle(0, 0, 40);
        border.endFill();
        container.addChild(border)

        // Shape whole avatar container
        container.x = 40
        container.y = 100

        container.scale.x = 1
        container.scale.y = 1

        return container
      },
      clearStage() {
        this.grandContainer.removeChildren()
      },
      roll() {
        this.app.ticker.add((delta) => {
          const screenWidth = this.width + (this.avatarWidth / 2)
          const frameWidth = this.avatarWidth * this.grandContainer.children.length

          if (this.blurEffect) {
            this.blur.blurX = (this.position.x - this.position.prev) * 0.1
            this.position.prev = this.position.x
          }

          for (var i = 0; i < this.grandContainer.children.length; i++) {
            const newX = this.avatarWidth * i + this.position.x
            if (newX > screenWidth) {
              this.grandContainer.children[i].x = newX % frameWidth - (this.avatarWidth / 2)
            } else {
              this.grandContainer.children[i].x = newX - (this.avatarWidth / 2)
            }
          }
        })
      },
      tween(target) {
        const targetX = target * this.avatarWidth
        const backout = 0.5 + Math.random() * 1.6
        gsap.to(this.position, {x: targetX, duration: 4, ease: `back.out(${backout})`})
      },
      loadContainer() {
        var containers = []
        for (var i = 0; i < this.candidates.length; i++) {
          var container = this.createAvatar(`candidate-${i}`)
          container.x += i * this.avatarWidth
          containers.push(container)
        }
        this.grandContainer.addChild(...containers)
        this.grandContainer.sortChildren()

        this.tween(0)
        this.roll()
      },
      startPlay() {
        const target = (this.position.x / this.avatarWidth) + Math.floor(Math.random() * this.candidates.length * 1.3) + this.candidates.length

        this.tween(target)
      },
      drawFrame() {
        const container = new PIXI.Container()
        const texture = PIXI.Texture.from(FrameImage)
        const frame = new PIXI.Sprite(texture)

        // TODO: Remove hardcode
        container.x = 347
        container.y = 43

        frame.width = 115
        frame.height = 115

        container.addChild(frame)

        return container
      }
    },
    watch: {
      candidates(newCandidates, _) {
        this.clearStage()
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

        var target = Math.ceil(this.position.x / this.avatarWidth)
        target = target % this.candidates.length
        target = 5 - target
        if (target < 0) {
          target += this.candidates.length
        }

        return this.candidates[target][0]
      }
    }
  }
</script>
