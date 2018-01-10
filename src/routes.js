import PostsScene from "./scenes/Posts";
import NotFoundScene from "./scenes/Error";
import AboutScene from "./scenes/About";

export default [
  { path: "/", component: AboutScene },
  { path: "/about", component: AboutScene },
  { path: "/:board/thread/:thread", component: PostsScene },
  { path: "/:board/thread/:thread/:threadSlug", component: PostsScene },
  { path: "*", component: NotFoundScene }
];
