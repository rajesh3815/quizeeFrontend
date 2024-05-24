import React, { useContext, useEffect, useState } from "react";
import Style from "./successmodal.module.css";
import { quizContext } from "../../Quizcontext";
const Successmodal = () => {
  const { setSuccessModal, setisOpen, documentId } = useContext(quizContext);
  const [inputVlaue, setInputValue] = useState();
  const shareClick = () => {};
  const cancelHandeler = () => {
    setSuccessModal(false);
    setisOpen(true);
  };
  useEffect(() => {
    if (documentId) handleCopyBaseUrl();
  }, []);
  const handleCopyBaseUrl = () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}/quiz/${documentId}`;
    setInputValue(baseUrl);
  };

  return (
    <div className={Style.mainContainer}>
      <div className={Style.container}>
        <h1 className={Style.header}>Congrats your Quiz is Published!</h1>

        <div className={Style.shareBtn}>
          <input type="text" value={inputVlaue} />
          <button onClick={shareClick}>share</button>
        </div>

        <span className={Style.spanCross} onClick={cancelHandeler}>
          x
        </span>
      </div>
    </div>
  );
};

export default Successmodal;
