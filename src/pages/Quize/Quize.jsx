import React, { useEffect, useState } from "react";
import Style from "./Quize.module.css";
import { useParams } from "react-router-dom";
import { getQuizDetailbyid } from "../../api/quiz";
import winner from "../../assets/winner.png";
const Quize = () => {
  const [quizDetail, setQuizDetail] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectOption, setSelectoption] = useState();
  const [isQuizcompleted, setIsQuizcompleted] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getDetailsquize();
  }, []);

  const getDetailsquize = async () => {
    const res = await getQuizDetailbyid(id);
    setQuizDetail(res.quiz);
    console.log(res);
    console.log(quizDetail.slides);
  };
  const nextHandeler = () => {
    console.log(currentSlide);
    if (currentSlide < quizDetail?.slides?.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      console.log(currentSlide);
    }
  };
  const optionClick = (index) => {
    setSelectoption(index);
  };
  const submitHandeler = () => {
    setIsQuizcompleted(true);
  };
  const questionDiv = () => {};
  return (
    <div className={Style.mainContainer}>
      {isQuizcompleted ? (
        <div className={Style.successContainer}>
          <h1>Congrats Quiz is completed</h1>
          <img className={Style.winImg} src={winner} alt="" />
          <p>
            Your score is <span style={{ color: "green" }}>03/04</span>
          </p>
        </div>
      ) : (
        <div className={Style.container}>
          <div
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            className={Style.slides}
          >
            {quizDetail?.slides?.map((quizslide, idx) => {
              return (
                <div key={idx} className={Style.questionDiv}>
                  <span className={Style.slidNo}>
                    0{idx + 1}/0{quizDetail?.slides?.length}
                  </span>

                  <div className={Style.quizes}>
                    <p>{quizslide?.question}</p>
                    <div className={Style.optionDiv}>
                      {quizslide?.type === "imageurl" && (
                        <>
                          {quizslide?.options?.map((option, idx) => {
                            return (
                              <div
                                style={{
                                  border:
                                    selectOption === idx
                                      ? "3px solid blue"
                                      : "",
                                  boxSizing: "border-box",
                                }}
                                onClick={() => optionClick(idx)}
                                key={idx}
                                className={Style.imgOption}
                              >
                                <img src={option} alt="" />
                              </div>
                            );
                          })}
                        </>
                      )}
                      {quizslide?.type === "text" && (
                        <>
                          {quizslide?.options?.map((option, idx) => {
                            return (
                              <div
                                style={{
                                  border:
                                    selectOption === idx
                                      ? "3px solid blue"
                                      : "",
                                  boxSizing: "border-box",
                                }}
                                onClick={() => optionClick(idx)}
                                className={Style.textOption}
                                key={idx}
                              >
                                {option}
                              </div>
                            );
                          })}
                        </>
                      )}
                      {quizslide?.type === "text&image" && (
                        <>
                          {quizslide?.options?.map((option, idx) => {
                            return (
                              <div
                                style={{
                                  border:
                                    selectOption === idx
                                      ? "3px solid blue"
                                      : "",
                                  boxSizing: "border-box",
                                }}
                                onClick={() => optionClick(idx)}
                                key={idx}
                                className={Style.texImage}
                              >
                                <p>{option?.text}</p>
                                <img src={option?.imgUrl} alt="" />
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {currentSlide !== quizDetail?.slides?.length - 1 ? (
            <button className={Style.nextBtn} onClick={nextHandeler}>
              Next
            </button>
          ) : (
            <button className={Style.nextBtn} onClick={submitHandeler}>
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quize;
