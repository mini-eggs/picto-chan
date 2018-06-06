<template>
  <section>
    <app-media />
    <app-navigation />
  </section>
</template>

<script>
import MediaComponent from "../components/Media";
import NavigationComponent from "../components/Navigation";
import PostsConnect from "../containers/Posts";
import { preload } from "../client/preload";

const component = {
  name: "app-post",

  components: {
    [MediaComponent.name]: MediaComponent,
    [NavigationComponent.name]: NavigationComponent
  },

  watch: {
    $route({ params: { board, thread } }) {
      this.preloadReset();
      this.requestPosts({ board, thread });
    },
    shouldPreload(val) {
      this.$nextTick(this.checkShouldPreload);
    }
  },

  mounted() {
    this.$bus.$on("key:arrow_left", this.previousPost);
    this.$bus.$on("key:arrow_right", this.nextPost);

    if (this.posts.length < 1) {
      const { board, thread } = this.$route.params;
      this.requestPosts({ board, thread });
    }

    this.checkShouldPreload();
  },

  methods: {
    async checkShouldPreload() {
      if (this.shouldPreload) {
        try {
          this.preloadInit();
          await preload(this.posts);
          this.preloadComplete();
        } catch (e) {
          console.log("Something went wrong with the preload -- check it below:");
          console.error(e);
        }
      }
    }
  }
};

export default PostsConnect(component);
</script>
