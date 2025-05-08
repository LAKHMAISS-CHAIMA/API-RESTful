const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const registerValidator = require("../validators/userValidator");  
const loginValidator = require("../validators/loginValidator");    
const authJWT = require("../middlewares/authJWT");
const authSession = require("../middlewares/authSession");

router.post("/register", registerValidator, auth.register);
router.post("/login", loginValidator, auth.login);         
router.get("/logout", auth.logout);
router.get("/me", authSession, auth.getMe);
router.get("/me-jwt", authJWT, auth.getMe);

module.exports = router;