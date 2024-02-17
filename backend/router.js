const express = require("express");
const secretController = require("./controllers/secretController");

const router = express.Router();

router.get("/", secretController.searchAll);
router.post("/register", secretController.registUser);
router.post("/login", secretController.verifyUser);
router.put("/editPassword", secretController.editPassword);
router.put("/editSecret", secretController.editSecret);
router.delete("/user", secretController.deleteUser);

module.exports = router;