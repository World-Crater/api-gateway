require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { verifyToken } = require("./middleware/auth");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(cors());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
  })
);

app.use(verifyToken);

app.use(require("./router/api.worldcrater.com"));

app.get("/", (req, res) => {
  res.send(`ᕕ( ᐛ )ᕗ`);
});

app.listen(8443, () => {
  console.log("app listening on 8443");
});
