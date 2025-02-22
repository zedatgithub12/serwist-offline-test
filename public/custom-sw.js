self.addEventListener("message", async (event) => {
  if (event.data.action === "cache-on-demand") {
    const cache = await caches.open("static-image-assets");
    const isCached = await cache.match("images/cache-me-outside.jpg");
    if (!isCached) {
      const res = await fetch("images/cache-me-outside.jpg");
      await cache.put("images/cache-me-outside.jpg", res);
    }
  }
  event.ports[0].postMessage(true);
});
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map((entry) => {
        const request = serwist.handleRequest({
          request: new Request(entry),
          event,
        });
        return request;
      })
    )
  );
});
