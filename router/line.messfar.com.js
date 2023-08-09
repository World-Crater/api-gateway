const express = require("express");
const proxy = require("express-http-proxy");
const router = express.Router();

router.use(
  "/messfar-frontend",
  (req, res, next) => {
    console.log("messfar line service get request");
    next();
  },
  proxy(process.env.MESSFAR_FRONTEND)
);

module.exports = router;
