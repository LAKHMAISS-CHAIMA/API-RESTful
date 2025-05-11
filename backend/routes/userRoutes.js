const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const authJWT = require("../middlewares/authJWT");
const authSession = require("../middlewares/authSession");
const authBasic = require("../middlewares/authBasic");

router.get("/jwt", authJWT, usersController.getAllUsers);
router.get("/session", authSession, usersController.getAllUsers);
router.get("/basic", authBasic, usersController.getAllUsers);

module.exports = router;
