<template>
  <div class="MediaComponent" v-if="!flicker && selectedPost" :style="{ backgroundImage: `url(${selectedPost.thumbnail})` }" :class="{ [aspect_ratio]: true }">

    <!-- photo -->
    <img v-if=" photo[ selectedPost.ext ] " class="item" :class="{ [aspect_ratio]: true }" :src="selectedPost.image" />

    <!-- video -->
    <video @ended="handleVideoEnd" @click="toggleVideo" v-if=" video[ selectedPost.ext ] " class="item" :class="{ [aspect_ratio]: true }" autoplay controls>
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
  flicker: false,
  timeout: setTimeout(() => {}, 1)
};

const component = {
  name: "app-media",

  data: () => ({ ...initialState }),

  watch: {
    selectedPost() {
      this.flicker = true;

      this.$nextTick(() => {
        this.flicker = false;
        this.$nextTick(this.checkAutoPlay);
      });
    },

    autoplay(val) {
      this.$nextTick(this.checkAutoPlay);
    }
  },

  mounted() {
    this.$bus.$on("key:space", this.toggleVideo);
  },

  methods: {
    handleVideoEnd({ target }) {
      if (this.autoplay) {
        this.nextPost();
      } else {
        target.play();
      }
    },

    checkAutoPlay() {
      clearTimeout(this.timeout);
      let timeout = setTimeout(() => {}, 1);

      if (this.autoplay && !this.$el.querySelector("video")) {
        timeout = setTimeout(this.nextPost, this.autoplayTime);
      }

      this.timeout = timeout;
    },

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

<style scoped >
div.MediaComponent {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-position: center center;
  background-repeat: no-repeat;
}

div.MediaComponent.contain {
  background-size: contain;
}

div.MediaComponent.cover {
  background-size: cover;
}

div.MediaComponent .item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

div.MediaComponent .item.contain {
  object-fit: contain;
}

div.MediaComponent .item.cover {
  object-fit: cover;
}
</style>