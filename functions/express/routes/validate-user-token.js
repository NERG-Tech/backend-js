const { getAuth } = require("firebase-admin/auth");

async function firebaseAuth(req, res) {
  const regex = /Bearer (.+)/i;
  try {
    const idToken = req.headers["authorization"].match(regex)?.[1];
    req.token = await getAuth().verifyIdToken(idToken);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res
      .status(401)
      .json({ error: { code: "unauthenticated" }, status: "fail" });
  }
}

module.exports = firebaseAuth;
