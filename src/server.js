import Path from "path";
import FS from "fs";
import Vue from "vue";
import Express from "express";
import Compression from "compression";
import { createRenderer } from "vue-server-renderer";
import PostAPI from "./api/Posts";
import MediaAPI from "./api/Media";
import App from "./main";
import Store from "./store";
import { POSTS_RECEIVED } from "./constants/Posts";

const server = new Express();
const { renderToStream } = createRenderer();
const location = Path.join(__dirname, "../private/index.html");
const html = FS.readFileSync(location, "utf-8");

const defaultHandle = (req, res) => {
  const stateString = JSON.stringify(Store.getState());
  const template = html.split("__REDUX__").join(stateString);

  const vm = new Vue({ ...App });
  vm.$router.push(req.url);

  const stream = renderToStream(vm);
  const chunks = template.split("__HTML__");

  res.write(chunks[0]);

  stream.on("data", chunk => {
    res.write(chunk);
  });

  stream.on("end", () => {
    res.write(chunks[1]);
    res.end();
  });

  stream.on("error", () => {
    res.sendStatus(500);
  });
};

const wrap = handle => async (req, res) => {
  try {
    const unsubscribe = Store.subscribe(() => {
      unsubscribe();
      handle(req, res);
    });
    const { posts } = await PostAPI.getData(req.params);
    const payload = { ...req.params, posts };
    Store.dispatch({ type: POSTS_RECEIVED, payload });
  } catch (err) {
    res.sendStatus(500);
  }
};

server.use(Compression());
server.use("/static", Express.static(Path.join(__dirname, "../static")));

server.get("/:board/thread/:thread", wrap(defaultHandle));
server.get("/:board/thread/:thread/:threadSlug", wrap(defaultHandle));
server.get(PostAPI.route, PostAPI.handle);
server.get(MediaAPI.route, MediaAPI.handle);
server.get("*", defaultHandle);

server.listen(process.env.PORT, () =>
  console.log(`\n\nServer has started on port ${process.env.PORT}.\n\n`)
);
