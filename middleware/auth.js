const token = require('../helper/token')

function verifyToken (exludePaths = []) {
  const isInExludePaths = path => exludePaths
    .map(item => new RegExp(item, 'g'))
    .some(item => item.test(path))

  return async (req, res, next) => {
    try {
      if (isInExludePaths(req.originalUrl)) {
        next()
        return
      }
      const decode = await token.verify(req.headers.authorization)
      res.locals = {
        ...req.local,
        decode
      }
      next()
    } catch (err) {
      res.status(403).json({
        error: 'Invalid token'
      })
    }
  }
}

module.exports = {
  verifyToken
}