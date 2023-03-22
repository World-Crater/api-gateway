const express = require("express");
const proxy = require("express-http-proxy");
const router = express.Router();

router.use("/", (req, res) => {
  console.log("messfar web get request");
  res.set("Content-Type", "text/html");
  res.send(
    Buffer.from(`
    <html>
 
    <head>
      <title>系統維修中，敬請見諒へ(´д｀へ)</title>
    </head>
     
    <body>
      <font size="5">系統維修中，敬請見諒へ(´д｀へ)</font>
    </body>
     
  </html>
`)
  );
});

module.exports = router;
