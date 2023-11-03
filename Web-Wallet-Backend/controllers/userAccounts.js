const networks = require("../config/networks");
const db = require("../models");
const RegisterUser = db.registerUser;
const Addresses = db.userAddresses;
const UserTransaction = db.userTransaction;
const ethers = require("ethers");
const {Web3} = require('web3');

const addAddress = async (req, res) => {

  const web3 = new Web3(networks.PUBLIC_SEPOLIA_TESTNET);
  const id = req.params.id;
  const address = web3.eth.accounts.create();
  console.log(address);
  try {
    const data = await Addresses.create({
      address: address.address,
      privateKey: address.privateKey,
      balance: 0,
      registerUserId: id,
    });

    return res.status(201).send(data);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserAccount = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    Addresses.findAll({
      where: {
        registerUserId: id,
      },
    }).then((users) => {
      res.send(users);
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserAccountByAddress = async (req, res) => {
  try {
    const address = req.params.address;
    console.log(address);
    Addresses.findAll({
      where: {
        address: address,
      },
    }).then((users) => {
      res.send(users);
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const updateBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const address = req.params.address;
    console.log(balance, address);
    Addresses.update(
      { balance: balance },
      {
        where: {
          address: address,
        },
      }
    ).then((users) => {
      return res.status(201).send(users);
      //res.send("User Updated", users);
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const addBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const address = req.params.address;
    console.log(balance, address);
    const data = await Addresses.findAll({
      where: {
        address: address,
      },
    });
    console.log(data[0].dataValues.balance);

    const currentBalance = data[0].dataValues.balance;
    const newBalance = currentBalance + balance;
    const updatedBalance = await Addresses.update(
      { balance: newBalance },
      {
        where: {
          address: address,
        },
      }
    );

    return res.status(201).send(updatedBalance);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserBalanceByAddress = async (req, res) => {
  try {
    const address = req.params.address;
    const provider = ethers.getDefaultProvider(networks.PUBLIC_SEPOLIA_TESTNET);

    const data = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(data);
    console.log(balanceInEth);
    return res.status(201).send(balanceInEth);
   
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllUserAccounts = async (req, res) => {
  try {
    const userAcc = await Addresses.findAll();
    return res.status(201).send(userAcc);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllUserTx = async (req, res) => {
  try {
    const userAcc = await UserTransaction.findAll();
    return res.status(201).send(userAcc);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserTxById = async (req, res) => {
  try {
    const id = req.params.id;
    const userAcc = await UserTransaction.findAll({
      where: {
        registerUserId: id,
      },
    });
    return res.status(201).send(userAcc);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserTxByAddress = async (req, res) => {
  try {
    const address = req.params.address;
    const userAcc = await UserTransaction.findAll({
      where: {
        from: address,
      },
    });
    return res.status(201).send(userAcc);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserTxByToAddress = async (req, res) => {
  try {
    const address = req.params.address;
    const userAcc = await UserTransaction.findAll({
      where: {
        to: address,
      },
    });
    return res.status(201).send(userAcc);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  updateBalance,
  addAddress,
  getUserAccount,
  getAllUserAccounts,
  getUserBalanceByAddress,
  addBalance,
  getAllUserTx,
  getUserTxById,
  getUserTxByAddress,
  getUserTxByToAddress,
  getUserAccountByAddress
};
