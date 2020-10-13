<template lang="pug">
.d-none.d-lg-block
  .pos-abs.bgc-white.radius-round(v-for="index in circles", :key="index", :style="random_circle()")
</template>

<script>
  export default {
    props: {
      circles: {
        default: 40
      }
    },
    methods: {
      random_size() {
        return Math.floor(Math.random() * 28) + 4;
      },
      random_opacity() {
        return Math.floor(Math.random() * 31) + 10;
      },
      random_position() {
        return Math.floor(Math.random() * 100) + 1;
      },
      random_circle() {
        var size = this.random_size();

        return {
          width: `${size}px`,
          height: `${size}px`,
          opacity: `0.${this.random_opacity()}`,
          left: `${this.random_position()}%`,
          top: `${this.random_position()}%`,
        }
      },
    }
  }
</script>
