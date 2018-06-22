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

@keyframes SlideDown {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes SlideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100px);
  }
}

.button-transition-container {
  animation-name: SlideUp;
  animation-fill-mode: forwards;
}

.button-transition-container.is-active {
  animation-name: SlideDown;
}

.button-transition-container:nth-of-type(1) {
  animation-duration: 100ms;
}

.button-transition-container:nth-of-type(2) {
  animation-duration: 200ms;
}

.button-transition-container:nth-of-type(3) {
  animation-duration: 300ms;
}

.button-transition-container:nth-of-type(4) {
  animation-duration: 400ms;
}

.button-transition-container:nth-of-type(5) {
  animation-duration: 500ms;
}

.button-transition-container:nth-of-type(6) {
  animation-duration: 600ms;
}

.button-transition-container:nth-of-type(7) {
  animation-duration: 700ms;
}

.button-transition-container.is-active:nth-of-type(1) {
  animation-duration: 700ms;
}

.button-transition-container.is-active:nth-of-type(2) {
  animation-duration: 600ms;
}

.button-transition-container.is-active:nth-of-type(3) {
  animation-duration: 500ms;
}

.button-transition-container.is-active:nth-of-type(4) {
  animation-duration: 400ms;
}

.button-transition-container.is-active:nth-of-type(5) {
  animation-duration: 300ms;
}

.button-transition-container.is-active:nth-of-type(6) {
  animation-duration: 200ms;
}

.button-transition-container.is-active:nth-of-type(7) {
  animation-duration: 100ms;
}
</style>
