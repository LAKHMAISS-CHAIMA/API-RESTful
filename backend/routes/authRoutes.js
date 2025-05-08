const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const validate = require("../validators/userValidator");
const authJWT = require("../middlewares/authJWT");
const authSession = require("../middlewares/authSession");

router.post("/register", validate, auth.register);
router.post("/login", validate, auth.login);
router.get("/logout", auth.logout);
router.get("/me", authSession, auth.getMe);
router.get("/me-jwt", authJWT, auth.getMe);

module.exports = router;
