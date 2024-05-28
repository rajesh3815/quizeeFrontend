import React from "react";
import Style from "./Form.module.css";
import delImg from "../../assets/delete.svg";
const Form = ({ slide, setSlides, curindex, quizeType }) => {
  const addOptionHandle = () => {
    console.log(slide);
    setSlides((prev) => {
      const updatedSlides = [...prev];
      let updatedOptions = [...updatedSlides[curindex].options];
      if (updatedOptions.length < 4) {
        updatedOptions.push("");
      } else {
        return updatedSlides;
      }
      updatedSlides[curindex] = {
        ...updatedSlides[curindex],
        options: updatedOptions,
      };
      return updatedSlides;
    });
  };

  const changeHandeler = (e) => {
    setSlides((prev) => {
      const updatedSlides = [...prev];

      updatedSlides[curindex] = {
        ...updatedSlides[curindex],
        type: e.target.value,
        options: ["", ""],
        answer: "",
      };
      return updatedSlides;
    });
  };
  const deleteHandler = (idx) => {
    setSlides((prev) => {
      const updatedSlides = [...prev];
      let updatedOptions = [...updatedSlides[curindex].options];
      if (idx === slide?.answer) {
        updatedSlides[curindex].answer = "";
      }
      if (updatedOptions.length > 2) {
        updatedOptions.splice(idx, 1);
      } else {
        return updatedSlides;
      }
      updatedSlides[curindex] = {
        ...updatedSlides[curindex],
        options: updatedOptions,
      };
      return updatedSlides;
    });
  };

  const inputChangehandle = (idx, e, inputType) => {
    if (slide.type === "text&image") {
      setSlides((prev) => {
        const updatedSlides = [...prev];
        let updatedOptions = [...updatedSlides[curindex].options];
        const currentOption = updatedOptions[idx] || {};
        if (inputType === "imgtext") {
          updatedOptions[idx] = { ...currentOption, text: e.target.value };
        } else {
          updatedOptions[idx] = { ...currentOption, imgUrl: e.target.value };
        }
        updatedSlides[curindex] = {
          ...updatedSlides[curindex],
          options: updatedOptions,
        };
        return updatedSlides;
      });
    } else {
      setSlides((prev) => {
        const updatedSlides = [...prev];
        let updatedOptions = [...updatedSlides[curindex].options];
        updatedOptions[idx] = e.target.value;
        updatedSlides[curindex] = {
          ...updatedSlides[curindex],
          options: updatedOptions,
        };
        return updatedSlides;
      });
    }
  };
  // setting the answer
  const answerChangehandle = (idx) => {
    setSlides((prev) => {
      const updatedSlides = [...prev];
      updatedSlides[curindex] = {
        ...updatedSlides[curindex],
        answer: idx,
      };
      return updatedSlides;
    });
  };
  // handle for question change
  const questionHandeler = (e) => {
    const { name, value } = e.target;
    setSlides((prev) => {
      const updatedSlides = [...prev];
      updatedSlides[curindex] = {
        ...updatedSlides[curindex],
        question: value,
      };
      return updatedSlides;
    });
  };

  return (
    <div className={Style.container}>
      <input
        className={Style.inputsQn}
        type="text"
        name="question"
        id=""
        value={slide.question}
        onChange={questionHandeler}
        placeholder={quizeType === "Q&A" ? "Q&A Question" : "Poll Question"}
      />

      <div className={Style.radioContainer}>
        <p>Option Type</p>
        <div>
          <input
            type="radio"
            id="html"
            name="optionsType"
            value="text"
            checked={slide.type === "text"}
            onChange={changeHandeler}
          />
            <label htmlFor="html">Text</label>
        </div>
        <div>
          <input
            type="radio"
            id="html"
            name="optionsType"
            value="imageurl"
            checked={slide.type === "imageurl"}
            onChange={changeHandeler}
          />
            <label htmlFor="html">Image URL</label>
        </div>
        <div>
          <input
            type="radio"
            id="html"
            name="optionsType"
            value="text&image"
            checked={slide.type === "text&image"}
            onChange={changeHandeler}
          />
          <label htmlFor="Text & Image URL">Text & Image URL</label>
        </div>
      </div>

      <div className={Style.inputs}>
        {quizeType === "Q&A" ? (
          <>
            {slide?.options?.map((option, index) => {
              
              return (
                <div className={Style.optDiv} key={index}>
                  <input
                    type="radio"
                    id="option"
                    name="options"
                    value={slide?.answer}
                    defaultChecked={slide.answer === index }
                    onChange={() => answerChangehandle(index)}
                  />
                   {" "}
                  <label style={{ display: "flex" }} htmlFor="option">
                    {slide.type === "text&image" ? (
                      <>
                        <input
                          className={`${Style.inputOpt} ${
                            slide?.answer === index && Style.customHolder
                          }`}
                          style={{
                            color: slide?.answer === index ? "white" : "",
                            marginRight: "8px",
                            background:
                              slide?.answer === index
                                ? "rgba(96, 184, 75, 1)"
                                : "",
                          }}
                          type="text"
                          value={slide.options[index].text}
                          onChange={(e) =>
                            inputChangehandle(index, e, "imgtext")
                          }
                          placeholder="Text"
                        />
                        <input
                          style={{
                            color: slide?.answer === index ? "white" : "",
                            background:
                              slide?.answer === index
                                ? "rgba(96, 184, 75, 1)"
                                : "",
                          }}
                          className={`${Style.inputOpt} ${
                            slide?.answer === index && Style.customHolder
                          }`}
                          type="text"
                          value={slide.options[index].imgUrl}
                          onChange={(e) =>
                            inputChangehandle(index, e, "imgurl")
                          }
                          placeholder="ImageURL"
                        />
                      </>
                    ) : (
                      <input
                        style={{
                          color: slide?.answer === index ? "white" : "",
                          background:
                            slide?.answer === index
                              ? "rgba(96, 184, 75, 1)"
                              : "",
                        }}
                        className={`${Style.inputOpt} ${
                          slide?.answer === index && Style.customHolder
                        }`}
                        type="text"
                        value={slide.options[index]}
                        onChange={(e) => inputChangehandle(index, e, "text")}
                        placeholder={
                          slide.type === "text"
                            ? "Text"
                            : slide.type === "imageurl"
                            ? "ImageURL"
                            : ""
                        }
                      />
                    )}
                  </label>
                  {slide?.options.length > 2 && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteHandler(index)}
                    >
                      {" "}
                      <img src={delImg} alt="" />{" "}
                    </span>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <>
            {slide?.options?.map((option, index) => {
              return (
                <div className={Style.optDiv} key={index}>
                  {slide.type === "text&image" ? (
                    <>
                      <input
                        className={Style.inputOpt}
                        style={{
                          marginRight: "8px",
                        }}
                        type="text"
                        value={slide.options[index].text}
                        onChange={(e) => inputChangehandle(index, e, "imgtext")}
                        placeholder="Text"
                      />
                      <input
                        className={Style.inputOpt}
                        type="text"
                        value={slide.options[index].imgUrl}
                        onChange={(e) => inputChangehandle(index, e, "imgurl")}
                        placeholder="Image URL"
                      />
                    </>
                  ) : (
                    <input
                      className={Style.inputOpt}
                      type="text"
                      value={slide.options[index]}
                      onChange={(e) => inputChangehandle(index, e, "text")}
                      placeholder={
                        slide.type === "text"
                          ? "Text"
                          : slide.type === "imageurl"
                          ? "ImageURL"
                          : ""
                      }
                    />
                  )}
                  {slide?.options.length > 2 && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteHandler(index)}
                    >
                      <img src={delImg} alt="" />
                    </span>
                  )}
                </div>
              );
            })}
          </>
        )}
        {slide?.options.length < 4 ? (
          <span style={{ cursor: "pointer" }} onClick={addOptionHandle}>
            Add Option
          </span>
        ) : (
          ""
        )}
      </div>

      <div></div>
    </div>
  );
};

export default Form;
