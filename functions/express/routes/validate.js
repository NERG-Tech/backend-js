const { getAuth } = require("firebase-admin/auth");

async function validateToken(req, res) {
  //   const { userIdToken } = req.body;
  const userIdToken = req.params.token;

  getAuth()
    .verifyIdToken(userIdToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      res.status(200).json({ status: "success", uid: uid });
    })
    .catch((error) => {
      res.status(401).json({
        error: { code: "unauthenticated" },
        status: "fail",
        errorMsg: error,
        user: getAuth().currentUser,
      });
    });
}

module.exports = validateToken;
