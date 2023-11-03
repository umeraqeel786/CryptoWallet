import axios from "axios";

const API_URL = "http://localhost:3001/admin/";

class AddressDetails {
  getRegisterUserById(id, accessToken) {
    console.log("ID", id);
    return axios.get(API_URL + "getRegisterUserById/" + id, {});
  }

  getUserAccount(id) {
    console.log("ID", id);
    return axios.get(API_URL + "getUserAccount/" + id, {});
  }

  updateBalanceByAddress(address, balance) {
    if (address && balance) {
      return axios.post(API_URL + "updateBalance/" + address, {
        balance,
      });
    }
  }

  getUserBalanceByAddress(address) {
    console.log("ID", address);
    return axios.get(API_URL + "getUserBalanceByAddress/" + address, {});
  }

  getUserBalanceByAddresses(endpoints) {
    return axios.all(
      endpoints.map((add) =>
        axios.get(API_URL + "getUserBalanceByAddress/" + add.address, {})
      )
    );
  }

  getRegisterUserByAddress(address, accessToken) {
    console.log("ID", address);
    console.log("ID", accessToken);
    return axios.get(API_URL + "getRegisterUserByAddress/" + address, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  }

  getAllUserAccounts() {
    return axios.get(API_URL + "getAllUserAccounts", {});
  }

  getAllUserTx() {
    return axios.get(API_URL + "getAllUserTx", {});
  }

  getUserTxById(id) {
    return axios.get(API_URL + "getUserTxById/" + id, {});
  }

  getUserTxByAddress(address) {
    return axios.get(API_URL + "getUserTxByAddress/" + address, {});
  }

  getUserTxByToAddress(address) {
    return axios.get(API_URL + "getUserTxByToAddress/" + address, {});
  }
  getUserAccountByAddress(address) {
    return axios.get(API_URL + "getUserAccountByAddress/" + address, {});
  }
  
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AddressDetails();
