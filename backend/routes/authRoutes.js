const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../validators/userValidator");
const authJWT = require("../middlewares/authJWT");
const authSession = require("../middlewares/authSession");

router.post("/register", validate, authController.register);
router.post("/login", validate, authController.login);
router.get("/logout", authController.logout);
router.get("/me", authSession, authController.getMe);
router.get("/me-jwt", authJWT, authController.getMe);

module.exports = router;


