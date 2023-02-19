const { getAuth: getClientAuth } = require("firebase/auth");

function validatePlayer(req, res, next) {
  const { token } = req.body;

  getClientAuth()
    .verifyIdToken(token)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(401).json({ error: { code: "unauthenticated" } });
      return;
    });
}

module.exports = validatePlayer;
