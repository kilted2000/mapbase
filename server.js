const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { minify } = require("terser");
const fs = require("fs").promises;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





async function minifyJavaScript() {
  try {
    // Read the original JavaScript file
    const originalCode = await fs.readFile("index.js", "utf8");

    // Minify the JavaScript code
    const result = await minify(originalCode, {
      sourceMap: {
        // Enable source map generation
        filename: "minified.js",
        url: "minified.js.map",
      },
    });

    // Write the minified code to a new file
    await fs.writeFile("minified.js", result.code, "utf8");

    // Write the source map to a new file
    await fs.writeFile("minified.js.map", result.map, "utf8");

    console.log("JavaScript minified and saved as minified.js");
    console.log("Source map saved as minified.js.map");
  } catch (error) {
    console.error("Error while minifying:", error);
  }
}

// Call the minification function
minifyJavaScript();


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    });

  app.post("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    });



    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });