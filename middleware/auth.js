const { verifyAuthToken } = require("../services/auth-service");

const scopes = {
  messfarAdmin: "messfarAdmin",
  messfarUser: "messfarUser",
};

function checkScopes(requireScopes) {
  return (req, res, next) => {
    if (
      !!requireScopes &&
      (requireScopes.length === 0 ||
        requireScopes.some((item) => res.locals.scopes.includes(item)))
    ) {
      next();
      return;
    } else {
      res.status(403).json({
        error: "forbidden",
      });
    }
  };
}

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      next();
      return;
    }
    const decode = await verifyAuthToken(req.headers.authorization);
    res.locals = {
      ...req.local,
      ...decode,
    };
    next();
  } catch (err) {
    res.status(403).json({
      error: "forbidden",
    });
  }
}

module.exports = {
  verifyToken,
  scopes,
  checkScopes,
};
