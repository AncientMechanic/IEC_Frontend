import axios from "axios";

export default (token) => {
  const baseUrl = "https://localhost:7226/";

  let headers = {
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json; charset=utf-8",
  };

  if (!(token === null || typeof token == "undefined")) {
    headers["Authorization"] = `Bearer ${token}`;
  }

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

  const _getAllUsers = () => {
    return axios({
      url: `${baseUrl}user`,
      method: "GET",
      headers: headers,
    });
  };

  const _getAllParticipants = () => {
    return axios({
      url: `${baseUrl}participant`,
      method: "GET",
      headers: headers,
    });
  };

  const _getAllEmployers = () => {
    return axios({
      url: `${baseUrl}employer`,
      method: "GET",
      headers: headers,
    });
  };

  const _getCurrentUser = (userId) => {
    return axios({
      url: `${baseUrl}user/${userId}`,
      method: "GET",
      headers: headers,
      data: userId,
    });
  };

  const _deleteParticipant = (participantId) => {
    return axios({
      url: `${baseUrl}participant/${participantId}`,
      method: "DELETE",
      headers: headers,
      data: participantId,
    });
  };

  const _deleteEmployer = (employerId) => {
    return axios({
      url: `${baseUrl}employer/${employerId}`,
      method: "DELETE",
      headers: headers,
      data: employerId,
    });
  };

  return {
    auth: _auth,
    register: _register,
    getAllUsers: _getAllUsers,
    getAllParticipants: _getAllParticipants,
    getAllEmployers: _getAllEmployers,
    getCurrentUser: _getCurrentUser,
    deleteParticipant: _deleteParticipant,
    deleteEmployer: _deleteEmployer,
  };
};
