const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { getAuth } = require("firebase-admin/auth");

async function getVo2(req, res) {
  // weight is in pound & height is in feet
  const { pulse, idToken } = req.body;

  getAuth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid;

      // get the age from db
      const snapshot = await firestore
        .collection("players")
        .doc("one-player")
        .get();
      if (!snapshot.exists) {
        res
          .status(404)
          .json({ error: { code: "user-not-found" }, status: "fail" });
        return;
      }
      const playerData = snapshot.data();
      const age = playerData.age;

      // get vo2 and set the data into the player db
      const playersDB = firestore.collection("players");
      const onePlayer = playersDB.doc("one-player");

      const vo2 = formula.getVo2(parseInt(pulse), parseInt(age));
      const list = {
        vo2: { pulse: pulse, vo2: vo2, unit: "ml/kg/min" },
      };

      // start to update it into db
      const result = await onePlayer.set(list, { merge: true });

      res.status(200).json({
        result: result,
        list: list,
        player: playerData,
        status: "success",
      });
    })
    .catch((error) => {
      res
        .status(401)
        .json({ error: "token-invalid", status: "fail", errorMsg: error });
    });
}

module.exports = getVo2;
