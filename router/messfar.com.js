const express = require("express");
const proxy = require("express-http-proxy");
const router = express.Router();

router.use("/", proxy(process.env.MESSFAR_FRONTEND));

module.exports = router;
