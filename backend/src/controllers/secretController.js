const secretModel = require("../models/secretModel");

const searchAll = async (req, res) => {
    const result = await secretModel.checkAll();
    res.status(201).json(result);
}

const registUser = async (req, res) => {
    await secretModel.resgistUser(req.body);
    res.status(202).json({message: "User registered"});
}

const verifyUser = async (req, res) => {
    await secretModel.verifyUser(req.body);
    res.status(201).json({message: "User authorized"});
}

const editPassword = async (req, res) => {
    await secretModel.editPassword(req.body);
    res.status(203).json({message: "Password updated"});
}

const editSecret = async (req, res) => {
    await secretModel.editSecret(req.body);
    res.status(203).json({message: "Secret updated"});
}

const deleteUser = async (req, res) => {
    await secretModel.deleteUser(req.body);
    res.status(200).json({message: "User deleted"});
}

module.exports = {
    searchAll,
    registUser,
    verifyUser,
    editPassword,
    editSecret,
    deleteUser
}