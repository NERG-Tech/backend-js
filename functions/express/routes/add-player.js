const formula = require("./formulas/formula");
const firestore = require("firebase-admin").firestore();
const { getAuth } = require("firebase-admin/auth");
const DB = require("./db/dbNames");

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

        const onePlayer = firestore.collection(DB.PLAYERS).doc("one-player");
        const playerId = onePlayer.id;
        await onePlayer.set({ ...list });

        // get the user's player list
        const snapshot = await firestore.collection(DB.USERS).doc(uid).get();
        if (!snapshot.exists) {
          res
            .status(404)
            .json({ error: { code: "user-not-found" }, status: "fail" });
          return;
        }
        const user = snapshot.data();
        const usersPlayerList = user.playerList;

        // update this player to the user
        await firestore
          .collection(DB.USERS)
          .doc(uid)
          .set({ playerList: [...usersPlayerList, playerId] }, { merge: true });

        // return
        res.status(200).json({
          list: list,
          status: "success",
          playerId: playerId,
          usersPlayerList: usersPlayerList,
        });
      })
      .catch((error) => {
        res
          .status(401)
          .json({ error: "token-invalid", status: "fail", errorMsg: error });
      });
  } catch (error) {}
}

module.exports = addPlayer;
