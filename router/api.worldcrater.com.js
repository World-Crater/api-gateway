const express = require("express");
const proxy = require("express-http-proxy");
const authMeddleware = require("../middleware/auth");
const router = express.Router();

router.use("/messfar-line-service", proxy("http://messfar-line-service:3002"));

router.use("/liff-service", proxy("http://liff-service:8080"));

router.use("/auth-service", proxy("http://auth-service:3005"));

router.use("/ad-service", proxy("http://ad-service:3006"));

router.use("/messfar-admin", proxy("http://messfar-admin:80"));

router.use(
  "/file-service",
  authMeddleware.verifyToken(),
  proxy("http://file-service:3001")
);

router.use(
  "/face-service",
  authMeddleware.verifyToken(["^/face-service/faces/.+$"]),
  proxy("http://face-service:3000")
);

module.exports = router;
