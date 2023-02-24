const { getAuth: adminAuth } = require("firebase-admin/auth");
const { signInWithCustomToken, getAuth } = require("firebase/auth");

async function revokeToken(req, res) {
  try {
    const auth = getAuth();
    const { idToken } = req.body;

    signInWithCustomToken(auth, idToken)
      .then(async (userCredential) => {
        // Signed in ==> success
        const user = userCredential.user;
        const uid = user.uid;

        // Revoke all refresh tokens for a specified user for whatever reason.
        // Retrieve the timestamp of the revocation, in seconds since the epoch.
        adminAuth()
          .revokeRefreshTokens(uid)
          .then(() => {
            return adminAuth().getUser(uid);
          })
          .then((userRecord) => {
            return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
          })
          .then((timestamp) => {
            res.status(200).json({
              status: "success",
              uid: uid,
              time: `Tokens revoked at: ${timestamp}`,
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        res.status(401).json({
          error: { code: "unauthenticated" },
          errorCode,
          errorMessage,
        });
      });
  } catch (err) {
    res
      .status(401)
      .json({ error: { code: "unauthenticated" }, status: "fail" });
  }
}

module.exports = revokeToken;
