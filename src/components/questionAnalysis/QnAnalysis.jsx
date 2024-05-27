import React, { useEffect, useState } from "react";
import { getQuizDetailbyid } from "../../api/quiz";
import Style from "./QnAnalysis.module.css";
const QnAnalysis = ({ qnId }) => {
  const [questionData, setQuestionData] = useState({});
  useEffect(() => {
    setQnData();
  }, []);
  const setQnData = async () => {
    const res = await getQuizDetailbyid(qnId);
    setQuestionData(res?.quiz);
  };
  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const option = { day: "2-digit", month: "long", year: "numeric" };
    return newDate.toLocaleDateString("en-US", option);
  };
  return (
    <div className={Style.container}>
      {questionData?.quizeType === "Q&A" ? (
        <div className={Style.QAcontainer}>
          <div className={Style.hero}>
            {" "}
            <p>{questionData?.quizeName} Question Analysis</p>{" "}
            <div className={Style.dateDiv}>
              {" "}
              <span>
                Created on : {formatDate(questionData?.dateCreated)}
              </span>{" "}
              <span>Impressions : {questionData?.impressionCount}</span>
            </div>
          </div>

          {questionData?.slides?.map((slide, index) => {
            return (
              <div className={Style.qnchip}>
                <p>
                  <span>Q.{index + 1} </span>
                  {slide?.question} ?
                </p>
                <div className={Style.analysis}>
                  <div className={Style.Qncard}>
                    {questionData?.analytics[index]?.attempts}{" "}
                    <span>people Attempted the question</span>
                  </div>
                  <div className={Style.Qncard}>
                    {questionData?.analytics[index]?.correctAnswer}{" "}
                    <span>people Answered Correctly</span>
                  </div>
                  <div className={Style.Qncard}>
                    {questionData?.analytics[index]?.attempts -
                      questionData?.analytics[index]?.correctAnswer}
                    <span>people Answered Incorrectly</span>
                  </div>
                </div>
                <hr style={{ color: "rgba(215, 215, 215, 1)", border:"1.5px solid" }} />
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default QnAnalysis;
