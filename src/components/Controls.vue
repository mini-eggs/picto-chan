<template>
  <span>
    <!-- silence is bliss -->
  </span>
</template>

<script>
const stopEvent = event => {
  event.preventDefault();
  event.stopPropagation();
};

const component = {
  name: "app-controls",

  mounted() {
    document.onkeydown = this.handleKeyDown;
  },

  methods: {
    handleKeyDown(e) {
      e = e || window.event;
      const key = e.which || e.keyCode;

      switch (key) {
        case 13: {
          stopEvent(e);
          this.$bus.$emit("key:enter");
          break;
        }
        case 9: {
          stopEvent(e);
          this.$bus.$emit("key:tab");
          break;
        }
        case 27: {
          stopEvent(e);
          this.$bus.$emit("key:esc");
          break;
        }
        case 38: {
          stopEvent(e);
          this.$bus.$emit("key:arrow_up");
          break;
        }
        case 40: {
          this.$bus.$emit("key:arrow_down");
          break;
        }
        case 32: {
          stopEvent(e);
          this.$bus.$emit("key:space");
          break;
        }
        case 37: {
          // stopEvent(e);
          this.$bus.$emit("key:arrow_left");
          break;
        }
        case 39: {
          // stopEvent(e);
          this.$bus.$emit("key:arrow_right");
          break;
        }
        default: {
          break;
        }
      }
    }
  }
};

export default component;
</script>
