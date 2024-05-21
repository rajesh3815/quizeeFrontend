import axios from "axios";
const staticUrl = "http://localhost:3000";

export const registerUser = async ({ name, password, email }) => {
  try {
    const res = await axios.post(`${staticUrl}/api/v1/user/register`, {
      name,
      password,
      email,
    });
    console.log(res);
    return res.data.status;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ password, email }) => {
  try {
    const response = await axios.post(`${staticUrl}/api/v1/user/login`, {
      email,
      password,
    });
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    return response.data.status;
  } catch (error) {
    console.log(error);
  }
};
