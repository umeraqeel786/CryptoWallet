const express = require('express');
const  authJwt  = require("../middleware/authJwt");
const verifySignUp = require('../middleware/verifySignUp');
const registerUser = require('../controllers/registerUser');
const router = express.Router();

router.post('/registerUser', [verifySignUp.checkDuplicateUsernameOrEmail], registerUser.createUser);
router.put('/updateUser/:id', registerUser.updateUser);
router.get('/getRegisterUser', [authJwt.verifyToken], registerUser.getRegisterUser);
router.get('/getRegisterUserById/:id',registerUser.getRegisterUserById);
router.get('/getRegisterUserByAddress/:address',registerUser.getRegisterUserByAddress);

module.exports = router;

