<style scoped>
#draw-board {
  width: 800px;
  height: 600px;
  margin: auto;
  z-index: 100;
}
</style>

<template lang="pug">
#draw-board(ref="board")
</template>

<script type="text/javascript">
  import * as PIXI from "pixi.js"
  import BunnyImage from "./assets/bunny.png"

  export default {
    data() {
      return {
        app: null
      }
    },
    mounted() {
      this.app = new PIXI.Application({
        width: 400,
        height: 300,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
      })
      this.$refs.board.appendChild(this.app.view)
      const container = new PIXI.Container()
      this.app.stage.addChild(container)
      const texture = PIXI.Texture.from(BunnyImage)
      for (let i = 0; i < 25; i++) {
        const bunny = new PIXI.Sprite(texture)
        bunny.anchor.set(0.5)
        bunny.x = (i % 5) * 20
        bunny.y = Math.floor(i / 5) * 20
        container.addChild(bunny)
      }
      // Move container to the center
      container.x = this.app.screen.width / 2
      container.y = this.app.screen.height / 2
      // Center bunny sprite in local container coordinates
      container.pivot.x = container.width / 2
      container.pivot.y = container.height / 2
      // Listen for animate update
      this.app.ticker.add((delta) => {
          // rotate the container!
          // use delta to create frame-independent transform
          container.rotation -= 0.01 * delta;
      })
    }
  }
</script>
