const express = require('express');
const userAccounts = require('../controllers/userAccounts');
const router = express.Router();

router.post('/addAddress/:id', userAccounts.addAddress);
router.post('/updateBalance/:address', userAccounts.updateBalance);
router.post('/addBalance/:address', userAccounts.addBalance);
router.get('/getUserAccount/:id', userAccounts.getUserAccount);
router.get('/getUserBalanceByAddress/:address', userAccounts.getUserBalanceByAddress);
router.get('/getAllUserAccounts', userAccounts.getAllUserAccounts);
router.get('/getAllUserTx', userAccounts.getAllUserTx);
router.get('/getUserTxById/:id', userAccounts.getUserTxById);
router.get('/getUserTxByAddress/:address', userAccounts.getUserTxByAddress);
router.get('/getUserTxByToAddress/:address', userAccounts.getUserTxByToAddress);
router.get('/getUserAccountByAddress/:address', userAccounts.getUserAccountByAddress);


module.exports = router;

