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

  const _getAllLists = () => {
    return axios({
      url: `${baseUrl}list`,
      method: "GET",
      headers: headers,
    });
  };

  const _getAllTasks = () => {
    return axios({
      url: `${baseUrl}task`,
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

  const _deleteList = (listId) => {
    return axios({
      url: `${baseUrl}list/${listId}`,
      method: "DELETE",
      headers: headers,
      data: listId,
    });
  };

  const _deleteTask = (taskId) => {
    return axios({
      url: `${baseUrl}task/${taskId}`,
      method: "DELETE",
      headers: headers,
      data: taskId,
    });
  };

  return {
    auth: _auth,
    register: _register,
    getAllUsers: _getAllUsers,
    getAllLists: _getAllLists,
    getAllTasks: _getAllTasks,
    getCurrentUser: _getCurrentUser,
    deleteList: _deleteList,
    deleteTask: _deleteTask,
  };
};
