const db = require("../models");
const RegisterUser = db.registerUser;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { name, email } = req.body;
    RegisterUser.findOne({
        where: {
            name: name
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        RegisterUser.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
}

module.exports = {
    checkDuplicateUsernameOrEmail,
}