const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    });

  app.post("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    });



app.listen(3000, function() {
});