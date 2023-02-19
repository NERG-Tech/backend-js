// firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseConfig = require("./firebase.config");
const { initializeApp } = require("firebase/app");

//
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// google service key
const serviceAccount = require("./service-account-key.json");

// middleware
const validateEmailAndPassword = require("./express/middleware/validate-email-and-password");
const firebaseAuth = require("./express/middleware/firebase-auth");
const validatePlayer = require("./express/middleware/validate-add-player");
const validateWaistHip = require("./express/middleware/validate-waist-hip");
const validateVo2 = require("./express/middleware/validate-vo2");
const validateMet = require("./express/middleware/validate-met");
const validateKeyMeasurements = require("./express/middleware/validate-key-measurements");

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
const getVo2 = require("./express/routes/get-vo2");
const getMet = require("./express/routes/get-met");
const getKeyMeasurements = require("./express/routes/add-key-measurements");

const app = express();
app.use(cors());
app.use(morgan("dev"));
// app.use(firebaseAuth);

// listen
app.get("/users/:id", firebaseAuth, getUser);
app.post("/login", validateEmailAndPassword, login);
app.post("/register", validateEmailAndPassword, register);
app.post("/player", validatePlayer, addPlayer);
app.post("/player/wh", validateWaistHip, addWaistHip);
app.post("/player/vo2", validateVo2, getVo2);
app.post("/player/met", validateMet, getMet);
app.post("/player/key", validateKeyMeasurements, getKeyMeasurements);

exports.api = functions.https.onRequest(app);
