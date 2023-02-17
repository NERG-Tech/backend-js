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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

// routes
const register = require("./express/routes/register");
const login = require("./express/routes/login");
const getUser = require("./express/routes/get-user");
const addPlayer = require("./express/routes/add-player");

const app = express();
app.use(cors());
app.use(morgan("dev"));

// listen
app.post("/login", validateEmailAndPassword, login);
app.post("/register", validateEmailAndPassword, register);
app.get("/users/:id", firebaseAuth, getUser);
app.post("/player", validatePlayer, addPlayer);

exports.api = functions.https.onRequest(app);
