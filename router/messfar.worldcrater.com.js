const express = require("express");
const proxy = require("express-http-proxy");
const router = express.Router();

router.use("/", proxy("http://messfar-frontend:80"));

module.exports = router;
