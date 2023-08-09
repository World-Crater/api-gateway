const { verifyAuthToken } = require("../services/auth-service");

const scopes = {
  messfarAdmin: "messfarAdmin",
  messfarUser: "messfarUser",
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(str, match, replacement) {
  return str.replace(new RegExp(escapeRegExp(match), "g"), () => replacement);
}

function matchPathWithMethod(requireScopesObject, reqPath) {
  for (const [key, _] of Object.entries(requireScopesObject)) {
    const path = replaceAll(key.split(":")[1], "*", ".+"); //yorktodo看可不可以優化排除/
    if (new RegExp(`^${path}$`).test(reqPath)) {
      return key;
    }
  }
}

function checkScopes(requireScopesObject) {
  return (req, res, next) => {
    const pathWithMethod = matchPathWithMethod(requireScopesObject, req.path);
    const requireScopes = requireScopesObject[[pathWithMethod]];
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
