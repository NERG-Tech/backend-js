const { signInWithCustomToken, getAuth } = require("firebase/auth");

async function auth(req, res, next) {
  const auth = getAuth();
  try {
    const { idToken } = req.body;

    signInWithCustomToken(auth, idToken)
      .then((userCredential) => {
        // Signed in ==> success
        const user = userCredential.user;

        req.userCredential = userCredential;
        req.user = user;

        next();
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
    res.status(401).json({ error: { code: "unauthenticated" }, err });
  }
}

module.exports = auth;
