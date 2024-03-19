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

  const _postParticipant = (participant) => {
    return axios({
      url: `${baseUrl}participant`,
      method: "POST",
      headers: headers,
      data: participant,
    });
  };

  const _postEmployer = (employer) => {
    return axios({
      url: `${baseUrl}employer`,
      method: "POST",
      headers: headers,
      data: employer,
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

  const _getCurrentParticipant = (participantId) => {
    return axios({
      url: `${baseUrl}participant/${participantId}`,
      method: "GET",
      headers: headers,
      data: participantId,
    });
  };

  const _getCurrentEmployer = (participantId) => {
    return axios({
      url: `${baseUrl}employer/${participantId}`,
      method: "GET",
      headers: headers,
      data: participantId,
    });
  };

  const _putParticipant = (participantId, participant) => {
    return axios({
      url: `${baseUrl}participant/${participantId}`,
      method: "PUT",
      headers: headers,
      data: participant,
    });
  };

  const _putEmployer = (employerId, employer) => {
    return axios({
      url: `${baseUrl}employer/${employerId}`,
      method: "PUT",
      headers: headers,
      data: employer,
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
    postParticipant: _postParticipant,
    postEmployer: _postEmployer,
    getAllUsers: _getAllUsers,
    getAllParticipants: _getAllParticipants,
    getAllEmployers: _getAllEmployers,
    getCurrentUser: _getCurrentUser,
    getCurrentParticipant: _getCurrentParticipant,
    getCurrentEmployer: _getCurrentEmployer,
    putParticipant: _putParticipant,
    putEmployer: _putEmployer,
    deleteParticipant: _deleteParticipant,
    deleteEmployer: _deleteEmployer,
  };
};
