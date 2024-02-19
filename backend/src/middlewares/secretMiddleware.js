const validateEmail = (req, res, next) => {
    const [body] = req;
    if(body.email === undefined || body.email === "") {
        res.status(400).json({message: "Field email can't be null or empty"});
    } else {
        console.log("Email validated", res);
    }
    next();
}

const validatePassword = (req, res, next) => {
    const [body] = req;
    if(body.password === undefined || body.password === "") {
        res.status(400).json({message: "Field password can't be null or empty"});
    } else {
        console.log("Password validated", res);
    }
    next();
}