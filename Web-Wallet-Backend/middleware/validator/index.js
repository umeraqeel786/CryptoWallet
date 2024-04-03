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