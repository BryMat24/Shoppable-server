const { User } = require('../models');
const { verifyAccessToken } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const payload = verifyAccessToken(access_token);

        const user = await User.findByPk(payload.id);
        if (!user) throw { name: "InvalidToken" };

        req.user = {
            id: user.id,
            email: user.email,
        }

        next();
    } catch (err) {
        next(err);
    }
}