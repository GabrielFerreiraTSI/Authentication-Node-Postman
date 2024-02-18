const db = require("./connection");
const bcrypt = require("bcrypt");

const checkAll = async () => {
    try {
        const result = await db.query("SELECT * FROM users");
        const users = result.rows;
        return users;
    } catch(err) {
        console.log(err);
    }
}

const resgistUser = async (req) => {
    const saltHounds = 10;
    const {email, password} = req;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            console.log("The user already exists");
        } else {
            bcrypt.hash(password, saltHounds, async (err, hash) => {
                if(err) {
                    console.log(err);
                } else {
                    await db.query("INSERT INTO users(email, password) VALUES($1, $2)", [email, hash]);
                }
            });
        }
    } catch(err) {
        console.log(err);
    }
}

const verifyUser = async (req) => {
    const {email, password} = req;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if(err) {
                    console.log("Error comparing passwords", err);
                } else {
                    if(result) {
                        console.log("User authorized", result);
                    }
                }
            });
        }
    } catch(err) {
        console.log(err);
    }
}

const editPassword = async (req) => {
    const saltHounds = 10;
    const {email, password} = req;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password;
            if(hashedPassword === password) {
                console.log("Password can't be same");
            } else {
                bcrypt.hash(password, saltHounds, async (err, hash) => {
                    if(err) {
                        console.log("Error hashing password", err);
                    } else {
                        await db.query("UPDATE users SET password = $1 WHERE email = $2", [hash, email]);
                    }
                });
            }
        } else {
            console.log("User doesn't exist");
        }
    } catch(err) {
        console.log(err);
    }
}

const editSecret = async (req) => {
    const {email, secret} = req;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            await db.query("UPDATE users SET secret = $1 WHERE email = $2", [secret, email]);
        } else {
            console.log("User doesn't exist");
        }
    } catch(err) {
        console.log(err);
    }
}

const deleteUser = async (req) => {
    const {email} = req
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email,]);
        if(result.rows.length > 0) {
            await db.query("DELETE FROM users WHERE email = $1", [email]);
        } else {
            console.log("User doesn't exist");
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    checkAll,
    resgistUser,
    verifyUser,
    editPassword,
    editSecret,
    deleteUser
}