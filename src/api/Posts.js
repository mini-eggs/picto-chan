import Fetch from "node-fetch";

const route = "/api/get/posts/:board/:thread";

const getData = async ({ board, thread }) => {
  const url = `https://a.4cdn.org/${board}/thread/${thread}.json`;
  const fetchReq = await Fetch(url);
  return await fetchReq.json();
};

const handle = async (req, res) => {
  try {
    res.json(await getData(req.params));
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { route, getData, handle };
