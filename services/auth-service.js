const request = require("request");

async function verifyAuthToken(token) {
  let options = {
    method: "POST",
    url: `${process.env.AUTH_SERVICE}/verifyAuthToken`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  };
  return await new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) reject(new Error(error));
      resolve(JSON.parse(response.body));
    });
  });
}

module.exports = {
  verifyAuthToken,
};
