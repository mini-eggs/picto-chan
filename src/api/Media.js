import FS from "fs";
import HTTP from "http";
import Request from "request";
import ProxyMiddleware from "http-proxy-middleware";

const route = "/api/get/media/:thread/:media";

const handle = (req, res) => {
  const { thread, media } = req.params;
  const url = `http://i.4cdn.org/${thread}/${media}`;
  Request(url).pipe(res);
};

export default { route, handle };
