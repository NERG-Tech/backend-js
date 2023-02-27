// firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseConfig = require("./firebase.config");
const { initializeApp } = require("firebase/app");

// express
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// google service key
const serviceAccount = require("./service-account-key.json");

// middleware

const validateEmailAndPassword = require("./express/middleware/validate-email-and-password");
const validatePlayer = require("./express/middleware/validate-add-player");
const validateWaistHip = require("./express/middleware/validate-waist-hip");
const validateVo2 = require("./express/middleware/validate-vo2");
const validateMet = require("./express/middleware/validate-met");
const validateKeyMeasurements = require("./express/middleware/validate-key-measurements");
const validateGeneticHealth = require("./express/middleware/validate-genetic-health");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

// routes
const register = require("./express/routes/register");
const login = require("./express/routes/login");
const getUser = require("./express/routes/get-user");
const addPlayer = require("./express/routes/add-player");
const addWaistHip = require("./express/routes/add-waist-hip");
const addVo2 = require("./express/routes/add-vo2");
const addMet = require("./express/routes/add-met");
const addKeyMeasurements = require("./express/routes/add-key-measurements");
const addGeneticHealth = require("./express/routes/add-genetic-health");
const removeToken = require("./express/routes/revoke-token");
const getPlayer = require("./express/routes/get-player");
const updatePlayer = require("./express/routes/update-player");

const app = express();
app.use(cors());
app.use(morgan("dev"));

// listen

//
app.get("/users/:id", getUser);
app.get("/player", getPlayer);
// put
app.put("/players", updatePlayer);
// post
app.post("/player", validatePlayer, addPlayer);
app.post("/player/wh", validateWaistHip, addWaistHip);
app.post("/player/vo2", validateVo2, addVo2);
app.post("/player/met", validateMet, addMet);
app.post("/player/key", validateKeyMeasurements, addKeyMeasurements);
app.post("/player/genetic", validateGeneticHealth, addGeneticHealth);

// without auth check
app.post("/login", validateEmailAndPassword, login);
app.post("/register", validateEmailAndPassword, register);
app.post("/user/revoke", removeToken); // this is signout

exports.api = functions.https.onRequest(app);
