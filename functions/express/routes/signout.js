const { getAuth, signOut } = require("firebase/auth");

async function signout(req, res) {
  const auth = getAuth();

  const user = auth.currentUser;
  if (user !== null) {
    signOut(auth)
      .then(() => {
        res.status(201).json({ status: "success" });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } else {
    res.status(400).json({ error: "user-not-found", status: "fail" });
  }
}

module.exports = signout;
