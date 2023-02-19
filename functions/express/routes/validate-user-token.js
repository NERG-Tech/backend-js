// const { getAuth: getClientAuth } = require("firebase/auth");

// function validatePlayer(req, res, next) {
//   const { token } = req.body;

//   getClientAuth()
//     .verifyIdToken(token)
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       res.status(401).json({ error: { code: "unauthenticated" } });
//       return;
//     });
// }

// module.exports = validatePlayer;

const { getAuth } = require("firebase-admin/auth");

async function firebaseAuth(req, res) {
  const regex = /Bearer (.+)/i;
  try {
    const idToken = req.headers["authorization"].match(regex)?.[1];
    req.token = await getAuth().verifyIdToken(idToken);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(401).json({ error: { code: "unauthenticated" } });
  }
}

module.exports = firebaseAuth;
