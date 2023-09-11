
import express from 'express';
import bodyParser from 'body-parser';
import mapboxgl from 'mapbox-gl';
import compression from 'compression';
import routeCache from "../routeCache.js";
const app = express();
app.use(compression());
app.use(mapboxgl());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",routeCache(300), function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});