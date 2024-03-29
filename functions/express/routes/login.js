const {
  getAuth: getClientAuth,
  signInWithEmailAndPassword,
  // signInWithCustomToken,
} = require("firebase/auth");

const { getAuth: getAdminAuth } = require("firebase-admin/auth");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const credential = await signInWithEmailAndPassword(
      getClientAuth(),
      email,
      password
    );
    const token = await getAdminAuth().createCustomToken(credential.user.uid);

    // await signInWithCustomToken(auth, token);

    res.status(200).json({
      customToken: token,
      status: "success",
      uid: credential,
    });
  } catch (error) {
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      res.status(403);
    } else {
      res.status(500);
    }
    res.json({
      error: { code: error.code.replace("auth/", "") },
      status: "fail",
    });
  }
}

module.exports = login;
