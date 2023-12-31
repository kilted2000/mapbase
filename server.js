
const express = require('express');
const bodyParser = require('body-parser');


const compression = require('compression');

const app = express();
app.use(compression());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});