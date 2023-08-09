const express = require("express");
const proxy = require("express-http-proxy");
const { checkScopes, scopes } = require("../middleware/auth");
const router = express.Router();

router.use(
  "/messfar-line-service",
  (req, res, next) => {
    console.log("messfar line service get request");
    next();
  },
  proxy(process.env.MESSFAR_LINE_SERVICE)
);

// yorktodo: workaround: 替換路徑的accountID成token的accountID
router.post("/liff-service/accounts/:accountID/favorites", (req, res, next) => {
  req.url = `/liff-service/accounts/${res.locals.accountID}/favorites`;
  next();
});
router.delete(
  "/liff-service/accounts/:accountID/favorites/:favorite",
  (req, res, next) => {
    req.url = `/liff-service/accounts/${res.locals.accountID}/favorites/${req.params.favorite}`;
    next();
  }
);
router.get("/liff-service/accounts/:accountID/favorites", (req, res, next) => {
  req.url = `/liff-service/accounts/${res.locals.accountID}/favorites`;
  next();
});

router.use(
  "/liff-service",
  checkScopes({
    "POST:/accounts/*/favorites": [scopes.messfarUser],
    "DELETE:/accounts/*/favorites/*": [scopes.messfarUser],
    "GET:/accounts/*/favorites": [scopes.messfarUser],
    "GET:/health": [],
  }),
  proxy(process.env.LIFF_SERVICE)
);

router.use(
  "/auth-service",
  (req, res, next) => {
    next();
  },
  proxy(process.env.AUTH_SERVICE)
);

router.use("/ad-service", proxy(process.env.AD_SERVICE));

router.use("/messfar-admin", proxy(process.env.MESSFAR_ADMIN));

router.use(
  "/file-service",
  checkScopes({
    "POST:/image/imgur": [scopes.messfarAdmin],
    "POST:/image/s3": [scopes.messfarAdmin],
  }),
  proxy(process.env.FILE_SERVICE)
);

router.use(
  "/face-service",
  checkScopes({
    "GET:/faces/face/*": [],
  }),
  proxy(process.env.FACE_SERVICE)
);

module.exports = router;
