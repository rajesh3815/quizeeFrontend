import React, { useEffect, useState } from "react";
import Style from "./Analytics.module.css";
import { getAllquizes } from "../../api/quiz";

const Analytics = () => {
  const [allquzizedata, setAllquizedata] = useState([]);

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

  return (
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
                <span>del</span>
                <span>up</span>
                <span>sh</span>
              </div>
              <span>Question Wise Analysis</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analytics;
