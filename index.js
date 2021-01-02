const express = require("express");
const cors = require("cors");
const fs = require("fs");
const vhost = require("vhost");
const rateLimit = require("express-rate-limit");
const https = require("https");
const app = express();

const options = {
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

app.use(cors());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
  })
);

app.use(
  vhost("messfar.worldcrater.com", require("./router/messfar.worldcrater.com"))
);
app.use(vhost("api.worldcrater.com", require("./router/api.worldcrater.com")));

https.createServer(options, app).listen(3003, function () {
  console.log("Listening on port 3003");
});
