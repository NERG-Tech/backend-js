const { getAuth } = require("firebase-admin/auth");

async function revokeToken(req, res) {
  const uid = req.params.uid;
  try {
    // Revoke all refresh tokens for a specified user for whatever reason.
    // Retrieve the timestamp of the revocation, in seconds since the epoch.
    getAuth()
      .revokeRefreshTokens(uid)
      .then(() => {
        return getAuth().getUser(uid);
      })
      .then((userRecord) => {
        return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
      })
      .then((timestamp) => {
        console.log(`Tokens revoked at: ${timestamp}`);

        res.status(200).json({
          status: "success",
          uid: uid,
          time: `Tokens revoked at: ${timestamp}`,
        });
      });
  } catch (err) {
    res
      .status(401)
      .json({ error: { code: "unauthenticated" }, status: "fail" });
  }
}

module.exports = revokeToken;
