const express = require("express");
const secretController = require("./controllers/secretController");
const secretMiddleware = require("./middlewares/secretMiddleware");

const router = express.Router();

router.get("/", secretController.searchAll);
router.post(
    "/register", 
    secretMiddleware.validateEmail, 
    secretMiddleware.validatePassword, 
    secretController.registUser
);
router.post(
    "/login", 
    secretMiddleware.validateEmail, 
    secretMiddleware.validatePassword, 
    secretController.verifyUser
);
router.put("/editPassword", secretMiddleware.validatePassword, secretController.editPassword);
router.put("/editSecret", secretController.editSecret);
router.delete("/user", secretController.deleteUser);

module.exports = router;