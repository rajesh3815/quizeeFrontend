import React, { useContext, useEffect, useState } from "react";
import Style from "./Analytics.module.css";
import { getAllquizes, getQuizbyid } from "../../api/quiz";
import { quizContext } from "../../Quizcontext";
import edImg from "../../assets/edit.svg";
import delImg from "../../assets/delete.svg";
import shImg from "../../assets/share.svg";
import QnAnalysis from "../questionAnalysis/QnAnalysis";
const Analytics = ({ setisQuizmodalopen }) => {
  const [allquzizedata, setAllquizedata] = useState([]);
  const [isQnAnalysis, setIsQnAnalysis] = useState(false);
  const [qnId, setQnId] = useState();
  const {
    setisOpen,
    setupdateData,
    setIsedit,
    updateData,
    setUpdateTimer,
    setdeleteId,
    setdeleteModal,
  } = useContext(quizContext);
  useEffect(() => {
    setupQuizedata();
  }, []);

  const setupQuizedata = async () => {
    const quizeData = await getAllquizes();
    //formating the dates
    const formattedQuizeData = quizeData.map((data) => ({
      ...data,
      dateCreated: formatDate(data.dateCreated),
    }));
    setAllquizedata(formattedQuizeData);
    console.log(allquzizedata);
  };

  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const option = { day: "2-digit", month: "long", year: "numeric" };
    return newDate.toLocaleDateString("en-US", option);
  };
  const updateHandeler = async (id) => {
    setisQuizmodalopen(true);
    setisOpen(false);
    setIsedit(true);
    const dataSlide = await getQuizbyid(id);
    console.log(dataSlide, "from");
    setupdateData(dataSlide);
    setUpdateTimer(dataSlide.timer);
  };
  const deleteHandeler = async (id) => {
    setdeleteId(id);
    setdeleteModal(true);
  };
  const shareHandeler = async (id) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}/quiz/${id}`;
    try {
      await navigator.clipboard.writeText(baseUrl);
      alert("copied");
    } catch (error) {
      console.log(error);
    }
  };
  const analysisClick = (data) => {
    setQnId(data._id);
    setIsQnAnalysis(true);
  };

  return (
    <>
      {isQnAnalysis !== true ? (
        <div className={Style.container}>
          <h1 className={Style.heading}>Quiz Analysis</h1>
          <div className={Style.detailContainer}>
            <div className={Style.detailNav}>
              <span>Sl.No</span> <span>Quiz Name</span> <span>Created on</span>{" "}
              <span>impression</span>{" "}
            </div>
            {allquzizedata?.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    background:
                      index % 2 === 0 ? "white" : "rgba(179, 196, 255, 1)",
                  }}
                  className={Style.quizeDetail}
                >
                  <span>{index + 1}</span>
                  <span style={{ width: "1.5rem" }}>{data.quizeName}</span>
                  <span>{data.dateCreated}</span>
                  <span>{data.impressionCount}</span>
                  <div className={Style.quizFunc}>
                    <span onClick={() => updateHandeler(data._id)}>
                      <img src={edImg} />
                    </span>
                    <span onClick={() => deleteHandeler(data._id)}>
                      <img src={delImg} />
                    </span>
                    <span onClick={() => shareHandeler(data._id)}>
                      <img src={shImg} />
                    </span>
                  </div>
                  <span
                    onClick={() => analysisClick(data)}
                    className={Style.qnAnalysis}
                  >
                    <u>Question Wise Analysis</u>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <QnAnalysis qnId={qnId} />
      )}
    </>
  );
};

export default Analytics;
