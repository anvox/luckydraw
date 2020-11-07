<template lang="pug">
.d-none.d-lg-block(style="z-index: -2;")
  .pos-abs.bgc-white.radius-round(v-for="index in circles", :key="index", :style="circleStyles[index]")
</template>

<script>
  function randomPosition() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function generateCircle(shiftX, shiftY) {
    let sizeInPixel = Math.floor(Math.random() * 32) + 4
    let opacityNumber = Math.floor(Math.random() * 31) + 10
    let leftInPixel = randomPosition() * (shiftX * 2) / 100
    let topInPixel = randomPosition() * (shiftY * 2) / 100

    return {
      width: `${sizeInPixel}px`,
      height: `${sizeInPixel}px`,
      opacity: `0.${opacityNumber}`,
      left: `${leftInPixel}px`,
      top: `${topInPixel}px`
    }
  }

  export default {
    data() {
      return {
        circleStyles: [],
        accelerators: [],
        shiftX: screen.availWidth / 2,
        shiftY: 225,
        timer: null
      }
    },
    props: {
      circles: {
        default: 40
      },
      waiting: {
        default: false
      }
    },
    mounted() {
      for (var i = 0; i < this.circles; i++) {
        let circle = generateCircle(this.shiftX, this.shiftY)

        this.circleStyles.push(circle)
        let t = (Math.random() * 10) - 5
        if (t >= 0) {
          t += 3
        } else {
          t -= 3
        }
        this.accelerators.push(t)
      }

      if (this.waiting) {
        // this.play()
      }
    },
    methods: {
      play() {
        this.timer = setInterval(() => {
          for (var i = this.circleStyles.length - 1; i >= 0; i--) {
            let left = parseFloat(this.circleStyles[i].left.replace("px", ""))
            if (left <= -30 || left >= screen.availWidth) {
              let t = (Math.random() * 10) - 5
              if (t >= 0) {
                t += 3
              } else {
                t -= 3
              }
              this.accelerators[i] = t
            }
            this.circleStyles[i].left = `${left + this.accelerators[i]}px`
          }
        }, 100)
      },
      stop() {
        clearInterval(this.timer)
      }
    },
    watch: {
      waiting(newValue, _currentValue) {
        // if (newValue) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      }
    }
  }
</script>
