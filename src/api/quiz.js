import axios from "axios";
const staticUrl = "http://localhost:3000";

export const createQuize = async ({ quizeName, quizeType }, timer, slides) => {
  //   console.log(quizeName, quizeType, timer, slides);
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${staticUrl}/api/v1/quize/createQuiz`, {
      quizeName,
      quizeType,
      slides,
      timer,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllquizes = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/quize/getAllquize`);
    console.log(res.data.quizes);
    return res.data.quizes;
  } catch (error) {
    console.log(error);
  }
};

export const getQuizbyid = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/quize/getQuizebyid/${id}`);
    console.log(res.data.quizSlide);
    return res.data.quizSlide;
  } catch (error) {
    console.log(error);
  }
};

export const editQuiz = async (id, slides, timer) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.patch(
      `${staticUrl}/api/v1/quize/updateQuize/${id}`,
      { slides, timer }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuize = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(
      `${staticUrl}/api/v1/quize/deleteQuize/${id}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
