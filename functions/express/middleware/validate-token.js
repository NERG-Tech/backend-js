const { getAuth } = require("firebase-admin/auth");

async function validateToken(req, res, next) {
  const regex = /Bearer (.+)/i;

  try {
    const idToken = req.headers["authorization"].match(regex)?.[1];

    getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        next(uid);
      })
      .catch((error) => {
        res.status(200).json({ status: "fail", error: error });
      });
  } catch (err) {
    res
      .status(401)
      .json({ error: { code: "unauthenticated" }, status: "fail" });
  }
}

module.exports = validateToken;
