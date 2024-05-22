import React, { useContext, useEffect, useState } from "react";
import Style from "./Analytics.module.css";
import { getAllquizes, getQuizbyid } from "../../api/quiz";
import { quizContext } from "../../Quizcontext";

const Analytics = ({ setisQuizmodalopen }) => {
  const [allquzizedata, setAllquizedata] = useState([]);

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
  return (
    <>
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
                <span>{data.quizeName}</span>
                <span>{data.dateCreated}</span>
                <span>{data.impressionCount}</span>
                <div className={Style.quizFunc}>
                  <span onClick={() => updateHandeler(data._id)}>up</span>
                  <span onClick={() => deleteHandeler(data._id)}>del</span>
                  <span>sh</span>
                </div>
                <span>Question Wise Analysis</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
