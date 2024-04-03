const ProductBrand = require("../../models/ProductBrand")
const ProductImages = require("../../models/ProductImages")
const Category = require("../../models/Category")
const _ = require('lodash')
const path = require("path");
const fs = require("fs");
const { districts } = require("../common");
exports.validateLead = (req, res, next) => {
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};


exports.validateSignUp = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};


exports.validateSocialLogin = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required.").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    req.check("userID","userID is required.").notEmpty()
    req.check("socialPhoto", "Invalid photo url.")
    .notEmpty()
    .matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    req.check("loginDomain", "Invalid login domian")
        .notEmpty()
        .isIn(['google', 'facebook'])
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};



const validatedispatcher  = req => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    req.check("address", "Address is required").notEmpty()
    req.check("phone", "Phone is required").notEmpty()
}


exports.validateDispatcher = (req,res, next) => {
    validatedispatcher(req)
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
}

exports.validateUpdateDispatcher = (req, res, next) => {
    validatedispatcher(req)
    // check for password
    req.newPassword && req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
}


exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};


exports.validateBusinessInfo = (req, res, next) => {
    req.check("ownerName", "Owner name is required").notEmpty()
    req.check("address", "Address is required").notEmpty()
    req.check("city", "City is required").notEmpty()
    req.check("citizenshipNumber", "Citizenship number is required").notEmpty()
    req.check("businessRegisterNumber", "Business register number is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        //make req.files to array of objs
        // let files = []
        // if (req.files) for (const file in req.files) {
        //     files.push(req.files[file][0]);
        // }
        // files.forEach(file => {
        //     fs.unlinkSync(file.path);//and remove file from public/uploads
        // })
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}


exports.validateAdminBankInfo = (req, res, next) => {
    req.check("accountHolder", "Account holder name is required").notEmpty()
    req.check("bankName", "Bank name is required").notEmpty()
    req.check("branchName", "Branch name is required").notEmpty()
    req.check("accountNumber", "Account number is required").notEmpty()
    req.check("routingNumber", "Bank number is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // req.file && fs.unlinkSync(req.file.path);//remove file from public/uploads
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
