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

const component = {
  name: "app-post",

  components: {
    [MediaComponent.name]: MediaComponent,
    [NavigationComponent.name]: NavigationComponent
  },

  watch: {
    $route({ params: { board, thread } }) {
      this.requestPosts({ board, thread });
    }
  },

  mounted() {
    this.$bus.$on("key:arrow_left", this.previousPost);
    this.$bus.$on("key:arrow_right", this.nextPost);

    if (this.posts.length < 1) {
      const { board, thread } = this.$route.params;
      this.requestPosts({ board, thread });
    }
  }
};

export default PostsConnect(component);
</script>
