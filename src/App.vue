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

.NavigationFadeTransition-enter-active,
.NavigationFadeTransition-leave-active {
  opacity: 1;
  transform: translateY(0);
}
.NavigationFadeTransition-enter,
.NavigationFadeTransition-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

/* forwards */

.NavigationFadeTransition-enter-active:nth-of-type(1),
.NavigationFadeTransition-leave-active:nth-of-type(1) {
  transition: all 700ms;
}

.NavigationFadeTransition-enter-active:nth-of-type(2),
.NavigationFadeTransition-leave-active:nth-of-type(2) {
  transition: all 600ms;
}

.NavigationFadeTransition-enter-active:nth-of-type(3),
.NavigationFadeTransition-leave-active:nth-of-type(3) {
  transition: all 500ms;
}

.NavigationFadeTransition-enter-active:nth-of-type(4),
.NavigationFadeTransition-leave-active:nth-of-type(4) {
  transition: all 400ms;
}

.NavigationFadeTransition-enter-active:nth-of-type(5),
.NavigationFadeTransition-leave-active:nth-of-type(5) {
  transition: all 300ms;
}

.NavigationFadeTransition-enter-active:nth-of-type(6),
.NavigationFadeTransition-leave-active:nth-of-type(6) {
  transition: all 200ms;
}

.NavigationFadeTransition-enter-active:nth-of-type(7),
.NavigationFadeTransition-leave-active:nth-of-type(7) {
  transition: all 100ms;
}

/* backwards */

.NavigationFadeTransition-enter:nth-of-type(1),
.NavigationFadeTransition-leave-to:nth-of-type(1) {
  transition: all 150ms;
}

.NavigationFadeTransition-enter:nth-of-type(2),
.NavigationFadeTransition-leave-to:nth-of-type(2) {
  transition: all 300ms;
}

.NavigationFadeTransition-enter:nth-of-type(3),
.NavigationFadeTransition-leave-to:nth-of-type(3) {
  transition: all 450ms;
}

.NavigationFadeTransition-enter:nth-of-type(4),
.NavigationFadeTransition-leave-to:nth-of-type(4) {
  transition: all 600ms;
}

.NavigationFadeTransition-enter:nth-of-type(5),
.NavigationFadeTransition-leave-to:nth-of-type(5) {
  transition: all 750ms;
}

.NavigationFadeTransition-enter:nth-of-type(6),
.NavigationFadeTransition-leave-to:nth-of-type(6) {
  transition: all 900ms;
}

.NavigationFadeTransition-enter:nth-of-type(6),
.NavigationFadeTransition-leave-to:nth-of-type(6) {
  transition: all 1050ms;
}
</style>
