import React, { useState } from "react";
import Style from "./Dashboard.module.css";
import Quizmodal from "../../components/quizpopup/Quizmodal";
import Analytics from "../../components/analytics/Analytics";
const Dashboard = () => {
  const [toggle, setToggle] = useState();
  const [isQuizmodalopen, setisQuizmodalopen] = useState(false);
  const [navState, setnavState] = useState("Dashboard");
  const quizClickhandeler = () => {
    setisQuizmodalopen(true);
  };
  const dashboarHandeler = () => {
    setnavState("Dashboard");
  };
  const analyticsHandeler = () => {
    setnavState("Analytics");
  };
  return (
    <>
      <div className={Style.mainContainer}>
        <div className={Style.sidebar}>
          <p className={Style.heding}>QUIZZIE</p>
          <div className={Style.dashboardChip}>
            <p
              className={navState === "Dashboard" ? Style.liveChip : ""}
              style={{ cursor: "pointer" }}
              onClick={dashboarHandeler}
            >
              Dashboard
            </p>
            <p
              className={navState === "Analytics" ? Style.liveChip : ""}
              style={{ cursor: "pointer" }}
              onClick={analyticsHandeler}
            >
              Analytics
            </p>
            <p style={{ cursor: "pointer" }} onClick={quizClickhandeler}>
              CreateQuize
            </p>
          </div>
          <div>Logout</div>
        </div>
        <div className={Style.contenet}>
          {navState === "Dashboard" ? <div>Dash board</div> : <Analytics />}
        </div>
        {/* adding modals */}
        {isQuizmodalopen ? (
          <Quizmodal
            isQuizmodalopen={isQuizmodalopen}
            setisQuizmodalopen={setisQuizmodalopen}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Dashboard;
