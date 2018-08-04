<template>
  <span>
    <!-- silence is bliss -->
  </span>
</template>

<script>
import Debounce from "lodash/debounce";
import Throttle from "lodash/throttle";
import Keybinds from "keybinds";

const stopEvent = event => {
  event.preventDefault();
  event.stopPropagation();
};

const component = {
  name: "app-controls",

  mounted() {
    this.handleMouseActive = Throttle(this.handleMouseActive, 1500);
    this.handleMouseInactive = Debounce(this.handleMouseInactive, 1500);
    document.addEventListener("mousedown", this.handleMouseActive);
    document.addEventListener("mousedown", this.handleMouseInactive);
    document.addEventListener("mousemove", this.handleMouseActive);
    document.addEventListener("mousemove", this.handleMouseInactive);
    this.setupKeyListeners();
  },

  beforeDestroy() {
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

    setupKeyListeners() {
      Keybinds([], 13, e => {
        stopEvent(e);
        this.$bus.$emit("key:enter");
      });

      Keybinds([], 9, e => {
        stopEvent(e);
        this.$bus.$emit("key:tab");
      });

      Keybinds([], 27, e => {
        stopEvent(e);
        this.$bus.$emit("key:esc");
      });

      Keybinds([], 38, e => {
        stopEvent(e);
        this.$bus.$emit("key:arrow_up");
      });

      Keybinds([], 40, e => {
        this.$bus.$emit("key:arrow_down");
      });

      Keybinds([], 32, e => {
        stopEvent(e);
        this.$bus.$emit("key:space");
      });

      Keybinds([], 37, e => {
        this.$bus.$emit("key:arrow_left");
      });

      Keybinds([], 39, e => {
        this.$bus.$emit("key:arrow_right");
      });

      Keybinds([], 81, e => {
        this.$bus.$emit("key:q");
      });

      Keybinds([20], 70, e => {
        stopEvent(e);
        this.$bus.$emit("key:arrow_right");
      });

      Keybinds([20], 66, e => {
        stopEvent(e);
        this.$bus.$emit("key:arrow_left");
      });
    }
  }
};

export default component;
</script>
