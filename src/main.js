import Vue from "vue";
import VueRouter from "vue-router";
import { VueRedux } from "vue2-redux";
import App from "./App";
import Routes from "./routes";
import Store from "./store";
import CustomPlugin from "./plugin";

Vue.use(VueRedux(Store));
Vue.use(VueRouter);
Vue.use(CustomPlugin);

const router = new VueRouter({ mode: "history", routes: Routes });

export default { router, ...App };
