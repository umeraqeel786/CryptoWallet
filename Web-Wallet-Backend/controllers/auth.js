const db = require("../models");
const RegisterUser = db.registerUser;
const config = require("../config/auth");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const postLogin = async (req, res) => {
    try {
        RegisterUser.findOne({
            where: {
                email: req.body.email.toLowerCase(),
            },
        }).then((user) => {
            console.log(user);
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }
            const token = jwt.sign({ id: user.id }, config.secret, {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });
            return res.status(200).send({
                id: user.id,
                username: user.name,
                email: user.email,
                accessToken: token,
                message: "Successful Login"
            });
        });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    postLogin,
};
