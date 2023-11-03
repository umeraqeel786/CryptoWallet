const db = require("../models");
const Addresses = db.userAddresses;
const UserTransaction = db.userTransaction;
const networks = require("../config/networks");
const ethers = require("ethers");
const axios = require("axios");

const sendTransaction = async (req, res) => {
  try {
    const customHttpProvider = ethers.getDefaultProvider(
      networks.PUBLIC_SEPOLIA_TESTNET
    );

    const { balance, toAddress, registerUserId } = req.body;
    const fromAddress = req.params.address;

    const txData = await UserTransaction.create({
      chainId: 0,
      from: fromAddress,
      gasLimit: 0,
      gasPrice: "",
      hash: "",
      maxFeePerGas: "",
      maxPriorityFeePerGas: "",
      nonce:  "",
      to: toAddress,
      type: "",
      value: balance || "",
      status: "Pending",
      registerUserId: registerUserId,
    });

    console.log(txData);

    const data = await Addresses.findAll({
      where: {
        address: fromAddress,
      },
    });
    const privateKey = data[0].dataValues.privateKey;

    const wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let tx = {
      to: toAddress,
      value: ethers.parseUnits(balance, "ether"),
    };

    const txObj = await wallet.sendTransaction(tx);
    
    console.log(txObj);

    const chainId = txObj.chainId;
    const gasLimit = txObj.gasLimit;
    const gasPrice = txObj.gasPrice;
    const hash = txObj.hash;
    const maxFeePerGas = txObj.maxFeePerGas;
    const maxPriorityFeePerGas = txObj.maxPriorityFeePerGas;
    const nonce = txObj.nonce;
    const to = txObj.to;
    const type = txObj.type;

    if(txObj.hash){
      UserTransaction.update(
        {
          chainId: chainId,
          gasLimit: gasLimit,
          gasPrice: gasPrice,
          hash: hash,
          maxFeePerGas: maxFeePerGas,
          maxPriorityFeePerGas: maxPriorityFeePerGas,
          nonce: nonce,
          type: type,
          status: "Confirmed",
        },
        {
          where: { registerUserId: registerUserId },
        }
      );
    }else{
     
    }

    

    return res.status(201).send(txObj);
  } catch (error) {
    console.log("s");
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getTxByUserAccounts = async (req, res) => {
  try {
    var transaction = web3.eth.getTransactionFromBlock("0x4534534534", 2);
    console.log(transaction);
    //   //https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x837B7b09d218Ae1268DF3Fbc8714D66fA2258a53&apikey=7CSIAEXC27XGEN9EBAFJZ8TW3GU4ACG3PF

    //   axios
    //     .get(
    //       "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&address=0x837B7b09d218Ae1268DF3Fbc8714D66fA2258a53&fromBlock=0&toBlock=12878196&page=1&offset=1000&apikey=7CSIAEXC27XGEN9EBAFJZ8TW3GU4ACG3PF"
    //     )
    //     .then((response) => {
    //       console.log(response.data.url);
    //       console.log(response.data.explanation);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  sendTransaction,
  getTxByUserAccounts,
};
