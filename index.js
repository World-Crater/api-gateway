require("dotenv").config();
const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const fs = require("fs");
const vhost = require("vhost");
const tls = require("tls");
const { verifyToken, checkScopes, scopes } = require("./middleware/auth");
const rateLimit = require("express-rate-limit");
const https = require("https");
const app = express();

const options = {
  SNICallback: function (domain, cb) {
    if (domain.match(/^.+\.worldcrater\.com$/)) {
      cb(
        null,
        tls.createSecureContext({
          key: [fs.readFileSync("./*.worldcrater.com/privkey.pem")],
          cert: [fs.readFileSync("./*.worldcrater.com/cert.pem")],
        })
      );
    } else if (domain === "messfar.com") {
      cb(
        null,
        tls.createSecureContext({
          key: [fs.readFileSync("./messfar.com/privkey.pem")],
          cert: [fs.readFileSync("./messfar.com/cert.pem")],
        })
      );
    } else {
      cb();
    }
  },
};

app.use(cors());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
  })
);

app.use(verifyToken);
//yorktodo
// app.use(vhost("messfar.com", require("./router/messfar.com")));
// app.use(vhost("api.worldcrater.com", require("./router/api.worldcrater.com")));

// app.use(require("./router/messfar.com"));
app.use(require("./router/api.worldcrater.com"));

//yorktodo
// app.get("/liff-service/accounts/:accountID/favorites", (req, res, next) => {
//   req.url = `/liff-service/accounts/${res.locals.accountID}/favorites`;
//   console.log("yorkjijais", req.url);
//   next();
// });
// console.log("yorkjijasdfjamsd,f", process.env.LIFF_SERVICE);
//yorktodo
// app.use(
//   "/liff-service",
//   checkScopes({
//     "POST:/accounts/*/favorites": [],
//     "DELETE:/accounts/*/favorites/*": [],
//     "GET:/accounts/*/favorites": [],
//   }),
//   proxy(process.env.LIFF_SERVICE)
// );

app.listen(3003, () => {
  console.log(`Example app listening on 3003`);
});

// https.createServer(options, app).listen(3003, function () {
//   console.log("Listening on port 3003");
// });
