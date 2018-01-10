import Vue from "vue";
import ExtensionIcon from "./components/ExtensionIcon";

const el = document.createElement("div");
const icons = document.createElement("link");
icons.setAttribute("rel", "stylesheet");
icons.setAttribute("href", "//fonts.googleapis.com/icon?family=Material+Icons");

document.body.appendChild(el);
document.body.appendChild(icons);

new Vue({ ...ExtensionIcon }).$mount(el);
