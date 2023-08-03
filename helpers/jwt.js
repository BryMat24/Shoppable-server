const jwt = require('jsonwebtoken');

function signToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
}

function verifyAccessToken(access_token) {
    return jwt.verify(access_token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifyAccessToken }