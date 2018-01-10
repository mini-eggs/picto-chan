export default Vue => {
  const eventBus = new Vue();

  Vue.mixin({
    computed: {
      $bus() {
        return eventBus;
      }
    }
  });
};
