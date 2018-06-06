const getImg = img => {
  if (
    img.indexOf(".gif") === -1 &&
    img.indexOf(".jpg") === -1 &&
    img.indexOf(".jpeg") === -1 &&
    img.indexOf(".png") === -1
  ) {
    // probably a webm or other -- lets not preload these
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const el = document.createElement("img");
    el.setAttribute("src", img);
    el.addEventListener("load", () => {
      resolve();
    });
    el.addEventListener("error", err => {
      reject(err);
    });
  });
};

const sleep = t => new Promise(resolve => setTimeout(resolve, t));

async function preloadAllImages(head, ...tail) {
  if (typeof head === "undefined") {
    return true;
  }

  const { thumbnail, image } = head;

  await sleep(0.5 * 1000);
  await Promise.all([getImg(thumbnail), getImg(image)]);
  await preloadAllImages(...tail);

  return true;
}

export const preload = async posts => {
  // always skip the first -- we're already loading it.
  const [_, ...tail] = posts;
  return await preloadAllImages(...tail);
};
