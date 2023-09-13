const NodeCache = require("node-cache");
const cache = new NodeCache();

const NodeCache = duration => (req, res, next) => {
    if (req.method !== "GET") {
        console.error("Cannot cache non-GET methods!");
        return next();
    }
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
  
    if (cachedResponse) {
        console.error(`Cache hit for ${key}`);
        res.send(cachedResponse);
      } else {
        console.log(`Cache miss for ${key}`);
        res.originalSend = res.send;
        res.send = body => {
          res.originalSend(body);
          cache.set(key, body, duration);
        };
        next();
    }
};
