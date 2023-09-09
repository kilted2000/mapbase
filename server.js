const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    });

  app.post("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    });



    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });