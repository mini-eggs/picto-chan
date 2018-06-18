<template>
  <span>
    <!-- silence is bliss -->
  </span>
</template>

<script>
import Debounce from "lodash/debounce";
import Throttle from "lodash/throttle";

const stopEvent = event => {
  event.preventDefault();
  event.stopPropagation();
};

const component = {
  name: "app-controls",

  mounted() {
    this.handleMouseActive = Throttle(this.handleMouseActive, 1500);
    this.handleMouseInactive = Debounce(this.handleMouseInactive, 1500);

    document.addEventListener("keydown", this.handleKeyDown);

    document.addEventListener("mousedown", this.handleMouseActive);
    document.addEventListener("mousedown", this.handleMouseInactive);

    document.addEventListener("mousemove", this.handleMouseActive);
    document.addEventListener("mousemove", this.handleMouseInactive);
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyDown);

    document.removeEventListener("mousedown", this.handleMouseActive);
    document.removeEventListener("mousedown", this.handleMouseInactive);

    document.removeEventListener("mousemove", this.handleMouseActive);
    document.removeEventListener("mousemove", this.handleMouseInactive);
  },

  methods: {
    handleMouseActive() {
      this.$bus.$emit("mouse:active");
    },

    handleMouseInactive() {
      this.$bus.$emit("mouse:inactive");
    },

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
        case 81: {
          this.$bus.$emit("key:q");
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
