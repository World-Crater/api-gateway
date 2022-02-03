const express = require("express");
const proxy = require("express-http-proxy");
const { checkScopes, scopes } = require("../middleware/auth");
const router = express.Router();

router.use("/messfar-line-service", proxy(process.env.MESSFAR_LINE_SERVICE));

router.post(
  "/liff-service/accounts/:accountID/favorites",
  checkScopes([scopes.messfarUser]),
  (req, res, next) => {
    req.url = `/liff-service/accounts/${res.locals.accountID}/favorites`;
    next();
  },
  proxy(process.env.LIFF_SERVICE)
);
router.delete(
  "/liff-service/accounts/:accountID/favorites/:favorite",
  checkScopes([scopes.messfarUser]),
  (req, res, next) => {
    req.url = `/liff-service/accounts/${res.locals.accountID}/favorites/${req.params.favorite}`;
    next();
  },
  proxy(process.env.LIFF_SERVICE)
);
router.get(
  "/liff-service/accounts/:accountID/favorites",
  checkScopes([scopes.messfarUser]),
  (req, res, next) => {
    req.url = `/liff-service/accounts/${res.locals.accountID}/favorites`;
    next();
  },
  proxy(process.env.LIFF_SERVICE)
);

router.use("/auth-service", proxy(process.env.AUTH_SERVICE));

router.use("/ad-service", proxy(process.env.AD_SERVICE));

router.use("/messfar-admin", proxy(process.env.MESSFAR_ADMIN));

router.post(
  "/file-service/image/imgur",
  checkScopes([scopes.messfarAdmin]),
  proxy(process.env.FILE_SERVICE)
);
router.post(
  "/file-service/image/s3",
  checkScopes([scopes.messfarAdmin]),
  proxy(process.env.FILE_SERVICE)
);

router.get(
  "/face-service/faces/face/:faceID",
  checkScopes([]),
  proxy(process.env.FACE_SERVICE)
);

module.exports = router;
