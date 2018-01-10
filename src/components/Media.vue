<template>
  <div v-if="!flicker && selectedPost" :style="{ backgroundImage: `url(${selectedPost.thumbnail})` }" >

    <!-- photo -->
    <img v-if=" photo[ selectedPost.ext ] " class="item" :src="selectedPost.image" />

    <!-- video -->
    <video @click="toggleVideo" v-if=" video[ selectedPost.ext ] " class="item" autoplay loop controls>
      <source :src="selectedPost.image" type="video/webm">
    </video>

  </div>
</template>

<script>
import PostConnect from "../containers/Posts";

const initialState = {
  photo: {
    ".jpg": true,
    ".jpeg": true,
    ".png": true,
    ".gif": true
  },
  video: {
    ".webm": true
  },
  flicker: false
};

const component = {
  name: "app-media",

  data: () => ({ ...initialState }),

  watch: {
    selectedPost() {
      this.flicker = true;
      this.$nextTick(() => (this.flicker = false));
    }
  },

  mounted() {
    this.$bus.$on("key:space", this.toggleVideo);
  },

  methods: {
    toggleVideo() {
      const video = this.$el.querySelector("video");

      if (!video) {
        return;
      }

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
};

export default PostConnect(component);
</script>

<style scoped lang="scss">
div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>