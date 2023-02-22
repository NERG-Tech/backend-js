const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { getAuth } = require("firebase-admin/auth");

async function addPlayer(req, res) {
  try {
    const { idToken } = req.body;

    getAuth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;

        // weight is in pound & height is in feet
        const { sex, age, weight, height, name, sport, position } = req.body;
        const list = formula.calculation(
          sex,
          age,
          weight,
          height,
          name,
          sport,
          position
        );

        // start to put it into db
        const playersDB = firestore.collection("players");
        const onePlayer = playersDB.doc("one-player");

        const result = await onePlayer.set(list);

        res.status(200).json({
          result: result,
          list: list,
          status: "success",
          // idToken: idToken,
        });
      });
  } catch (error) {}
}

module.exports = addPlayer;
