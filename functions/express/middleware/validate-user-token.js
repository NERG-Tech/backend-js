const { getAuth: getClientAuth } = require("firebase/auth");

function validatePlayer(req, res, next) {
  getClientAuth()
    .verifyIdToken(req.idToken)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(401).json({ error: { code: "unauthenticated" } });
      return;
    });
}

module.exports = validatePlayer;
