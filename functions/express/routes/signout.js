const { getAuth, signOut } = require("firebase/auth");

async function signout(req, res) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      // An error happened.
      res.status(400).json({ error: error });
    });
}

module.exports = signout;
