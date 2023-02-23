const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { getAuth } = require("firebase-admin/auth");

async function getMetValue(req, res) {
  try {
    const { idToken, minutes, seconds } = req.body;

    getAuth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;

        // get the sex from db
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
        const sex = playerData.sex;

        const time = parseInt(minutes) + parseInt(seconds) * 0.0165;

        const met = formula.getMET(sex, time);

        const list = { met: { value: met, unit: "METs" } };

        const result = await firestore
          .collection("players")
          .doc("one-player")
          .set(list, { merge: true });

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
  } catch (error) {
    res
      .status(401)
      .json({ error: "unkwon-error", status: "fail", errorMsg: error });
  }
}

module.exports = getMetValue;
