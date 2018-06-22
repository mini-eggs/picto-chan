<template>
  <section class="NavigationComponent" @click.stop="toggle">

    <div v-if="selectedPost" @click.stop class="btn-container">

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <md-button :disabled="!displayBack" class="md-icon-button md-primary md-raised md-fab md-mini" @click="previousPost">
            <md-icon>arrow_back</md-icon>
          </md-button>
        </div>

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <md-button :disabled="!displayNext" class="md-icon-button md-primary md-raised md-fab md-mini" @click="nextPost">
            <md-icon>arrow_forward</md-icon>
          </md-button>
        </div>

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <a ref="downloadBtn" :href=" selectedPost.image " :download=" selectedPost.name ">
            <md-button class="md-icon-button md-primary md-raised md-fab md-mini">
              <md-icon>file_download</md-icon>
            </md-button>
          </a>
        </div>

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <md-button class="md-icon-button md-primary md-raised md-fab md-mini" @click="toggleAspectRatio">
            <md-icon>aspect_ratio</md-icon>
          </md-button>
        </div>

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <md-button class="md-icon-button md-primary md-raised md-fab md-mini" @click="toggleAutoPlay">
            <md-icon>replay_5</md-icon>
          </md-button>
        </div>

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <router-link to="/about">
            <md-button class="md-icon-button md-primary md-raised md-fab md-mini">
              <md-icon>settings</md-icon>
            </md-button>
          </router-link>
        </div>

        <div :class="{ 'is-active': mouseIsActive }" class="button-transition-container">
          <md-button class="md-icon-button md-primary md-raised md-fab md-mini" @click="toggle">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

    </div>

    <nav v-if="show">
      <ul @click.stop>
        <li tabindex="-1" v-for="(item, index) in posts" :key="index" @click="handleClick(index)">
          <md-button>{{ index + 1 }}</md-button>
        </li>
      </ul>
    </nav>

  </section>
</template>


<script>
import PostsConnect from "../containers/Posts";

const component = {
  name: "app-navigation",

  data: () => ({ show: false, tabIndex: -1, mouseIsActive: false }),

  mounted() {
    this.$bus.$on("key:arrow_down", this.handleArrowDownPress);
    this.$bus.$on("key:arrow_up", this.handleArrowUpPress);
    this.$bus.$on("key:esc", this.handleEscPress);
    this.$bus.$on("key:q", this.toggleAspectRatio);
    this.$bus.$on("mouse:active", this.handleMouseActive);
    this.$bus.$on("mouse:inactive", this.handleMouseInactive);
  },

  watch: {
    show(value) {
      if (!value) {
        // If the navigation is closing.
        this.tabIndex = -1;
        this.$bus.$off("key:tab", this.handleTab);
        this.$bus.$off("key:enter", this.handleEnter);
      }
    }
  },

  methods: {
    handleMouseActive() {
      this.mouseIsActive = true;
    },

    handleMouseInactive() {
      this.mouseIsActive = false;
    },

    handleEscPress() {
      this.show = false;
    },

    handleArrowUpPress() {
      this.show = true;
      this.$nextTick(this.initiateTabPress);
    },

    initiateTabPress() {
      this.handleTab();
      this.$bus.$on("key:tab", this.handleTab);
      this.$bus.$on("key:enter", this.handleEnter);
    },

    handleTab() {
      const nextTabIndex = this.tabIndex + 1;
      this.tabIndex = nextTabIndex < this.posts.length ? nextTabIndex : 0;

      this.$nextTick(() => {
        const listElements = this.$el.querySelectorAll("nav ul li");
        const nextElement = listElements[this.tabIndex];
        nextElement.focus();
      });
    },

    handleEnter() {
      const listElements = this.$el.querySelectorAll("nav ul li");
      const nextElement = listElements[this.tabIndex];
      nextElement.click();
    },

    handleArrowDownPress() {
      this.$refs.downloadBtn.click();
    },

    toggle() {
      this.show = !this.show;
    },

    handleClick(index) {
      this.toggle();
      this.selectPostByIndex(index);
    }
  }
};

export default PostsConnect(component);
</script>

<style scoped >
section.NavigationComponent .btn-container {
  position: absolute;
  top: 10px;
  right: 5px;
  overflow: visible;
}
section.NavigationComponent .button-transition-container {
  display: inline-block;
}
section.NavigationComponent nav {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
section.NavigationComponent nav ul,
section.NavigationComponent nav li {
  list-style: none;
  padding: 0;
  margin: 0;
}
section.NavigationComponent nav ul {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  max-height: 80vh;
  width: 300px;
  height: 300px;
  background-color: white;
  overflow-y: scroll;
  padding: 5px;
  border-radius: 4px;
}
section.NavigationComponent nav ul li {
  display: inline-block;
  width: calc(100% / 5 - 10px);
  margin: 5px;
}
section.NavigationComponent nav ul li button {
  font-weight: 600;
  margin: 0;
  width: 100%;
  padding: 0;
  min-width: 0;
}
section.NavigationComponent nav ul li:focus button {
  background-color: rgba(153, 153, 153, 0.2);
  text-decoration: none;
}
section.NavigationComponent > * {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
section.NavigationComponent > * ::-webkit-scrollbar {
  width: 0 !important;
}
</style>
