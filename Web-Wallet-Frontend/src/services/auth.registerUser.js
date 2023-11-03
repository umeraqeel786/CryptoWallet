import axios from "axios";

const API_URL = "http://localhost:3001/admin/";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "login", {
      email,
      password
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password,balance) {
    return axios.post(API_URL + "registerUser", {
      name,
      email,
      password,
      balance
    });
  }

  addAccount(id) {
    return axios.post(API_URL + "addAddress/" + id);
  }

  getRegisterUserById(id, accessToken) {
    console.log("ID", id);
    console.log("ID", accessToken);
    return axios.get(API_URL + "getRegisterUserById/"+ id, {
      headers: {
        'Authorization': `${accessToken}`
      }
    })
  };

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();