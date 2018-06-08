import Preload, { Order } from "image-preload";

export const preload = posts => {
  return new Promise((resolve, reject) => {
    const images = posts.reduce((total, { thumbnail, image }) => [...total, thumbnail, image], []);
    const opts = { timeout: 100, order: Order.InOrder, onComplete: resolve };
    Preload(images, opts).catch(reject);
  });
};
