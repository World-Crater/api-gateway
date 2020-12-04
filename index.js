const express = require('express')
const proxy = require('express-http-proxy')
const cors = require('cors')
const authMeddleware = require('./middleware/auth')
const fs = require('fs');
const rateLimit = require("express-rate-limit");
const https = require('https')
const app = express()

const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.use(cors())

app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000
}));

app.use('/messfar-line-service', proxy('http://messfar-line-service:3002'))

app.use('/auth-service', proxy('http://auth-service:3005'))

app.use('/ad-service', proxy('http://ad-service:3006'))

app.use('/messfar-admin', proxy('http://messfar-admin:80'))

app.use('/messfar-frontend', proxy('http://messfar-frontend:80'))

app.use(
  '/file-service',
  authMeddleware.verifyToken(),
  proxy('http://file-service:3001')
)

app.use(
  '/face-service',
  authMeddleware.verifyToken([
    '^\/face-service\/faces\/.+$'
  ]),
  proxy('http://face-service:3000')
)

https.createServer(options, app).listen(3003, function(){
  console.log('Listening on port 3003')
});