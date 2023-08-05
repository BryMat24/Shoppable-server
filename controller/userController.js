const { User } = require('../models');
const transporter = require('../helpers/transporter')
const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/jwt')
const crypto = require('crypto');

class Controller {
    static async registerUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.create({
                email,
                password,
                emailToken: crypto.randomBytes(64).toString('hex'),
                isVerified: false
            }); // create the user with default value verified === false

            const mailOptions = {
                from: process.env.EMAIL,
                to: `${email}`,
                subject: 'Sending Email using Node.js',
                html: `
                  <h2>Thanks for registering to our site!</h2>
                  <p>Please verify your email to continue...</p>
                  <a href='http://localhost:3000/verify-email?emailToken=${user.emailToken}'>Verify your email</a>
                `,
            };

            transporter.sendMail(mailOptions);
            res.status(201).json({ id: user.id, email: user.email }); // send the email
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async verifyEmail(req, res, next) {
        try {
            const { emailToken } = req.query;
            console.log(emailToken);
            const user = await User.findOne({ where: { emailToken } });
            if (!user) throw { name: "InvalidEmail" }
            await user.update({ isVerified: true });
            res.status(200).json({ message: "Email verified successfully." });
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "MissingEmail" };
            if (!password) throw { name: "MissingPassword" };

            const user = await User.findOne({ where: { email } });
            if (!user || !user.isVerified) throw { name: "InvalidEmail" };
            if (!bcrypt.compareSync(password, user.password)) throw { name: "InvalidPassword" };

            const access_token = signToken(user);
            res.status(200).json({ access_token, user: { email: user.email } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;