const db = require("../models/connection");
const bcrypt = require("bcrypt");

const saltHounds = 10;

const searchAll = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        const users = result.rows[0];
        res.status(202).json(users);
    } catch(err) {
        console.log(err);
    }
}

const registUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            console.log("The user already exists");
            res.status(200).json({message: "User already exists."});
        } else {
            bcrypt.hash(password, saltHounds, async (err, hash) => {
                if(err) {
                    console.log(err);
                    res.status(200).json({message: "Error hashing password"});
                } else {
                    await db.query("INSERT INTO users(email, password) VALUES($1, $2)", [email, hash]);
                    res.status(201).json({message: "User registered"});
                }
            });
        }
    } catch(err) {
        console.log(err);
    }
}

const verifyUser = async (req, res) => {
    const email = req.body.email;
    const password = eq.body.email;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if(err) {
                    console.log("Error comparing passwords", err);
                    res.status(200).json({message: "Error comparing passwords"});
                } else {
                    if(result) {
                        res.status(201).json({message: "User authorized"});
                    }
                }
            });
        }
    } catch(err) {
        console.log(err);
        res.status(200).json({message: "User not found"});
    }
}

const editUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password;
            if(hashedPassword === password) {
                res.status(204).json({message: "Password can't be same"});
            } else {
                bcrypt.hash(password, saltHounds, async (err, hash) => {
                    if(err) {
                        res.status(200).json({message: "Error hashing password"});
                    } else {
                        await db.query("UPDATE users SET password = $1 WHERE email = $2", [hash, email]);
                        res.status(203).json({message: "Password updated"});
                    }
                });
            }
        } else {
            res.status(200).json({message: "User doesn't exist"});
        }
    } catch(err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    const email = req.body.email;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            await db.query("DELETE FROM users WHERE email = $1", [email]);
            res.status(205).json({message: "User deleted"});
        } else {
            res.status(200).json({message: "User doesn't exist"});
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    searchAll,
    registUser,
    verifyUser,
    editUser,
    deleteUser
}