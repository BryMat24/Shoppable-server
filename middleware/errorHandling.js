module.exports = (err, req, res, next) => {
    let message = "Internal server error";
    let code = 500;
    console.log(err);

    if (err.name === "SequelizeValidationError") {
        message = err.errors[0].message;
        code = 400;
    }

    else if (err.name === "InvalidEmail" || err.name === "InvalidPassword") {
        message = "Invalid email/password";
        code = 401;
    }

    else if (err.name === "SequelizeUniqueConstraintError") {
        message = err.errors[0].message;
        code = 400;
    }

    else if (err.name === "MissingEmail") {
        message = "Email cannot be empty";
        code = 400;
    }

    else if (err.name === "MissingPassword") {
        message = "Password cannot be empty"
        code = 400;
    }

    else if (err.name === "NotFound") {
        message = "Data not found";
        code = 404;
    }

    res.status(code).json({ message });
}