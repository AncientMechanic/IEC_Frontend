import axios from "axios";

export default () => {
  const baseUrl = "http://localhost:5000/";

  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json; charset=utf-8",
  };

  const _auth = (auth) => {
    return axios({
      url: `${baseUrl}auth/token`,
      method: "POST",
      headers: headers,
      data: auth,
    });
  };

  const _register = (user) => {
    return axios({
      url: `${baseUrl}user`,
      method: "POST",
      headers: headers,
      data: user,
    });
  };

  return {
    auth: _auth,
    register: _register,
  };
};
