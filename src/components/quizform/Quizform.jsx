import React, { useState } from "react";
import Style from "./Quizform.module.css";
import Form from "../form/Form";
import { createQuize } from "../../api/quiz";
const Quizform = ({ isOpen, setisOpen, quizeDetail, setisQuizmodalopen }) => {
  const [slides, setSlides] = useState([
    { question: "", type: "text", options: ["", ""], answer: "" },
  ]);
  const [timer, setTimer] = useState();
  const [timerIndex, setTimerIndex] = useState(0);
  const [curindex, setCurindex] = useState(0);
  const [err, setErr] = useState();
  const timerHandeler = (idx, time) => {
    setTimerIndex(idx);
    if (time !== "") {
      setTimer(() => time);
    } else {
      setTimer("");
    }
    console.log(timer);
  };
  const addSlidehandeler = () => {
    if (slides.length <= 4) {
      setSlides((prev) => [
        ...prev,
        {
          question: "",
          type: prev[slides.length - 1].type,
          options: ["", ""],
          answer: "",
        },
      ]);
      setCurindex(slides.length);
      console.log(curindex);
    } else {
      console.log(curindex);
      console.log(slides);
      return;
    }
  };
  const deletHandeler = (idx) => {
    if (slides.length > 1) {
      setSlides((prev) => {
        const updatedSlide = [...prev];
        updatedSlide.splice(idx, 1);
        return updatedSlide;
      });
      setCurindex(0);
    } else {
      return;
    }
  };

  const cancelModalhandler = () => {
    setisQuizmodalopen(false);
  };
  const createQuizehandle = () => {
    if (timer === "") {
      setErr("timer Field is required");
      return;
    }
    for(let i=0;i<slides.length;i++){
      if(slides[i].question===""){
        setErr("All quize fields are required")
        return
      }
    }
    setErr("")

    createQuize(quizeDetail, timer, slides);
  };
  // lll

  return (
    <div className={Style.container}>
      <div className={Style.chipsDiv}>
        {slides?.map((_, index) => (
          <React.Fragment key={index + 6}>
            <div
              onClick={() => setCurindex(index)}
              key={index}
              className={Style.chip}
            >
              {index}
            </div>
            {index >= 1 ? (
              <span
                onClick={() => deletHandeler(index)}
                className={Style.crossButton}
              >
                x
              </span>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
        <div
          onClick={addSlidehandeler}
          style={{ fontSize: "43px", cursor: "pointer" }}
        >
          +
        </div>
      </div>
      {/* mapping the forms */}
      {slides.map((slide, index) => (
        <React.Fragment key={index}>
          {curindex === index && (
            <Form
              slide={slide}
              setSlides={setSlides}
              curindex={curindex}
              quizeType={quizeDetail.quizeType}
            />
          )}
        </React.Fragment>
      ))}

      {/* timer div */}
      <div className={Style.timerDiv}>
        <p>Timer</p>
        <span
          style={{
            backgroundColor: timerIndex === 0 ? "red" : "",
            color: timerIndex === 0 ? "white" : "rgba(159, 159, 159, 1)",
          }}
          onClick={() => timerHandeler(0, "")}
        >
          off
        </span>
        <span
          style={{
            backgroundColor: timerIndex === 1 ? "red" : "",
            color: timerIndex === 1 ? "white" : "rgba(159, 159, 159, 1)",
          }}
          onClick={() => timerHandeler(1, "5sec")}
        >
          5sec
        </span>
        <span
          style={{
            backgroundColor: timerIndex === 2 ? "red" : "",
            color: timerIndex === 2 ? "white" : "rgba(159, 159, 159, 1)",
          }}
          onClick={() => timerHandeler(2, "10sec")}
        >
          10sec
        </span>
      </div>

      {/* creating cancel and submit button  */}

      <div className={Style.footerButton}>
        <button
          onClick={cancelModalhandler}
          style={{ backgroundColor: "white", color: "black" }}
        >
          cancel
        </button>
        <button
          onClick={createQuizehandle}
          style={{ backgroundColor: "green", color: "white" }}
        >
          create Qize
        </button>
      </div>
      {err ? <span style={{ color: "red" }}>{err}</span> : ""}
    </div>
  );
};

export default Quizform;
