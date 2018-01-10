<template>
  <div>
    <router-view/>
    <app-controls/>
  </div>
</template>

<script>
import ControlsComponent from "./components/Controls";

const component = {
  name: "app-container",
  components: {
    [ControlsComponent.name]: ControlsComponent
  }
};

export default component;
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style>
html,
body {
  background-color: #343442 !important;
}

body {
  font-family: sans-serif;
  margin: 0;
}

md-button,
md-icon {
  display: none;
}

.fadeIn,
.fadeOut {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-duration: 250ms;
}

.fadeIn {
  animation-name: FadeIn;
}

.fadeOut {
  animation-name: FadeOut;
}

@keyframes FadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes FadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
