<template>
  <a class="picto-chan-extension" :href="thread">
    photo_library
  </a>
</template>

<script>
import { SERVER_URL } from "../constants/";

const component = {
  name: "extension-icon",

  computed: {
    thread() {
      return `${SERVER_URL}${window.location.pathname}`;
    }
  }
};

export default component;
</script>

<style>
body a.picto-chan-extension,
body a.picto-chan-extension:hover,
body a.picto-chan-extension:active,
body a.picto-chan-extension:visited,
body a.picto-chan-extension:focus {
  font-family: "Material Icons" !important;
  color: rgba(255, 255, 255, 0.87) !important;
  font-size: 24px !important;
  text-decoration: none !important;
  width: 40px !important;
  height: 40px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: fixed !important;
  top: 10px !important;
  right: 10px !important;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12) !important;
  background-color: #3f51b5 !important;
  border-radius: 50% !important;
  overflow: hidden !important;
  outline: none !important;
}
</style>