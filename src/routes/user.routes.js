const express = require("express");
const router = express.Router();
const { registerUser, updateUser, loginUser } = require("../controllers/user.controller");

router.post("/register", registerUser);
router.put("/", updateUser);
router.post("/login", loginUser);

module.exports = router;
