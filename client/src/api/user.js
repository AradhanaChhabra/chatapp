const axios = require("axios");
const url = "http://localhost:5000";

const loginUser = async (email, password) => {
  return await axios.post(`${url}/loginUser`, { email, password });
};

const signupUser = async (name, email, password) => {
  return await axios.post(`${url}/signupUser`, { name, email, password });
};

export { loginUser, signupUser };
