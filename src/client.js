import Vue from "vue";
import VueMaterial from "vue-material";
import App from "./main";

Vue.use(VueMaterial);

new Vue({ el: "#app", ...App });
