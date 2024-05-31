import React, { useContext, useEffect, useState } from "react";
import Style from "./Dashboard.module.css";
import Quizmodal from "../../components/quizpopup/Quizmodal";
import Analytics from "../../components/analytics/Analytics";
import { quizContext } from "../../Quizcontext";
import Deletemodal from "../../components/deletemodal/Deletemodal";
import Successmodal from "../../components/successmodal/Successmodal";
import { getDataQuize, getTrendings } from "../../api/quiz";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (!user) {
      nav("/");
    }
  }, []);
  const nav = useNavigate();
  const [toggle, setToggle] = useState();
  const [isQuizmodalopen, setisQuizmodalopen] = useState(false);
  const [navState, setnavState] = useState("Dashboard");
  const [dashBordData, setDashboardData] = useState({});
  const [trendingData, setTrendingData] = useState([]); //setting up the trendings
  const { deleteModal, successModal, setSuccessModal } =
    useContext(quizContext);
  const quizClickhandeler = () => {
    setisQuizmodalopen(true);
  };
  const dashboarHandeler = () => {
    setnavState("Dashboard");
  };
  const analyticsHandeler = () => {
    setnavState("Analytics");
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  //setting up the dashboard data
  const getDashboardData = async () => {
    const res = await getDataQuize();
    setDashboardData(res);
    trendingDatasetter();
  };
  const trendingDatasetter = async () => {
    const res = await getTrendings();

    setTrendingData(res?.trendQuiz);
  };
  const logoutHandeler = () => {
    localStorage.removeItem("userId");
    nav("/");
  };
  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const option = { day: "2-digit", month: "long", year: "numeric" };
    return newDate.toLocaleDateString("en-US", option);
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
          <div className={Style.logOutdiv}>
            <hr />
            <span onClick={logoutHandeler}>Logout</span>
          </div>
        </div>
        <div className={Style.contenet}>
          {navState === "Dashboard" ? (
            <div className={Style.dashboardContainer}>
              <div className={Style.dataContainer}>
                <div
                  className={Style.dataDiv}
                  style={{ color: "rgba(255, 93, 1, 1)" }}
                >
                  <span className={Style.dataNumber}>
                    {dashBordData?.toalQuizeno ? dashBordData?.toalQuizeno : 0}
                  </span>{" "}
                  Quiz Created
                </div>
                <div
                  className={Style.dataDiv}
                  style={{ color: "rgba(96, 184, 75, 1)" }}
                >
                  <span className={Style.dataNumber}>
                    {dashBordData?.totalQustions
                      ? dashBordData?.totalQustions
                      : 0}
                  </span>{" "}
                  questions created
                </div>
                <div
                  className={Style.dataDiv}
                  style={{ color: "rgba(80, 118, 255, 1)" }}
                >
                  <span className={Style.dataNumber}>
                    {dashBordData?.totalImpression
                      ? dashBordData?.totalImpression
                      : 0}
                  </span>{" "}
                  total impressions
                </div>
              </div>
              <div className={Style.trendingQuize}>
                <h1>Trending Quizs</h1>
                <div className={Style.trendingContainer}>
                  {trendingData?.map((trend, idx) => {
                    return (
                      <div className={Style.chipCard} key={idx}>
                        <div className={Style.chipHero}>
                          {" "}
                          <span
                            style={{ fontWeight: "700", fontSize: "1.7rem" }}
                          >
                            {trend.quizeName}
                          </span>
                          <span
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: "600",
                              color: "rgba(255, 93, 1, 1)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {trend.impressionCount}
                            <IoEyeOutline style={{ marginLeft: "10px" }} />
                          </span>
                        </div>

                        <span className={Style.crreated}>
                          created on:{formatDate(trend.dateCreated)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <Analytics setisQuizmodalopen={setisQuizmodalopen} />
          )}
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
        {/* adding delete modal */}
        {deleteModal ? <Deletemodal /> : ""}
        {/* adding success modal if quize created */}
        {successModal ? <Successmodal /> : ""}
      </div>
    </>
  );
};

export default Dashboard;
