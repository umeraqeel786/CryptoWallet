const db = require("../models");
const networks = require("../config/networks");
var bcrypt = require("bcryptjs");
const {Web3} = require('web3');
const RegisterUser = db.registerUser;
const Addresses = db.userAddresses;

const createUser = async (req, res, next) => {
  try {
    const web3 = new Web3(networks.PUBLIC_SEPOLIA_TESTNET);
    const address = web3.eth.accounts.create();
  
    const { name, email, password } = req.body;
    const data = await RegisterUser.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 8)
    });
    const data1 = await Addresses.create({
      registerUserId: data.dataValues.id,
      address: address.address,
      privateKey: address.privateKey,
      balance: 0
    });
    if (data && data1) {
      return res.status(201).send(data);
    }

  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.params.id;
    console.log(id);
    RegisterUser.update({ name: name.toLowerCase(), email: email.toLowerCase() }, {
      where: {
        id: id
      },
      order: [
        ['id', 'DESC'],
      ],
    }).then(users => {
      return res.status(201).send(users);
      //res.send("User Updated", users);
    })
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getRegisterUser = async (req, res) => {
  try {
    RegisterUser.findAll().then(users => {
      res.send(users);
    })
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getRegisterUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    RegisterUser.findAll({
      where: {
        id: id
      },
      order: [
        ['id', 'DESC'],
      ],
    }).then(users => {
      res.send(users);
    })
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getRegisterUserByAddress = async (req, res) => {
  try {
    const address = req.params.address;
    console.log(address);
    RegisterUser.findAll({
      where: {
        address: [address]
      },
      order: [
        ['id', 'DESC'],
      ],
    }).then(users => {
      console.log(users);
      res.send(users);
    })
    console.log("1")
  } catch (error) {
    console.log("2")
    return res.status(error.status || 500).json({ message: error.message });
  }
};


module.exports = {
  createUser,
  getRegisterUser,
  getRegisterUserById,
  getRegisterUserByAddress,
  updateUser
}