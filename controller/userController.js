const { User } = require('../models');
const transporter = require('../helpers/transporter')
const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/jwt')

class Controller {
    static async registerUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password });

            const mailOptions = {
                from: process.env.EMAIL,
                to: `${email}`,
                subject: 'Sending Email using Node.js',
                html: `
                  <h2>Registration Successful!</h2>
                  <p>Welcome to our platform. Thank you for registering. Enjoy!</p>
                  <img src="../shopping.svg" alt="photo" style="width: 100px; height: 100px;">
                `,
            };

            res.status(200).json({ id: user.id, email: user.email });
            transporter.sendMail(mailOptions);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = Controller;