<template>
  <h1 class="ErrorComponent">Not Found</h1>
</template>

<script>
const component = {
  name: "app-error"
};

export default component;
</script>

<style scoped>
h1.ErrorComponent {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  margin: 0;
  padding: 0;
  transform: translate(-50%, -50%);
  color: white;
  text-transform: uppercase;
}
</style>