// Serves pages that contain directory listings for a given path.
// https://www.npmjs.com/package/serve-index
const express = require("express");
const serveIndex = require("serve-index");
const app = express();

app.use("/ftp", express.static("public/ftp"));
app.use("/ftp", serveIndex("public/ftp", {icons: true}));

app.listen(3000, () => console.log("Server run on port 3000."));