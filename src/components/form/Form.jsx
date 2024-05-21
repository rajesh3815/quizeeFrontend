import React from "react";
import Style from "./Form.module.css";
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
      };
      return updatedSlides;
    });
  };
  const deleteHandler = (idx) => {
    setSlides((prev) => {
      const updatedSlides = [...prev];
      let updatedOptions = [...updatedSlides[curindex].options];
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
          updatedOptions[idx] = { ...currentOption, imgurl: e.target.value };
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
        type="text"
        name="question"
        id=""
        value={slide.question}
        onChange={questionHandeler}
      />

      <div className={Style.radioContainer}>
        <p>Option Type</p>
        <div>
          <input
            type="radio"
            id="html"
            name="optionsType"
            value="text"
            defaultChecked={slide.type === "text" || !slide.type}
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
            defaultChecked={slide.type === "imageurl" || !slide.type}
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
            defaultChecked={slide.type === "text&image" || !slide.type}
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
                <div key={index}>
                  <input
                    type="radio"
                    id="option"
                    name="options"
                    value={option}
                    onChange={() => answerChangehandle(index)}
                  />
                   {" "}
                  <label htmlFor="option">
                    {slide.type === "text&image" ? (
                      <>
                        <input
                          type="text"
                          value={slide.options[index].text}
                          onChange={(e) =>
                            inputChangehandle(index, e, "imgtext")
                          }
                        />
                        <input
                          type="text"
                          value={slide.options[index].imgUrl}
                          onChange={(e) =>
                            inputChangehandle(index, e, "imgurl")
                          }
                        />
                      </>
                    ) : (
                      <input
                        type="text"
                        value={slide.options[index]}
                        onChange={(e) => inputChangehandle(index, e, "text")}
                      />
                    )}
                  </label>
                  {slide?.options.length > 2 && (
                    <button onClick={() => deleteHandler(index)}>del</button>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <>
            {slide?.options?.map((option, index) => {
              return (
                <div key={index}>
                  {slide.type === "text&image" ? (
                    <>
                      <input
                        type="text"
                        value={slide.options[index].text}
                        onChange={(e) => inputChangehandle(index, e, "imgtext")}
                      />
                      <input
                        type="text"
                        value={slide.options[index].imgUrl}
                        onChange={(e) => inputChangehandle(index, e, "imgurl")}
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      value={slide.options[index]}
                      onChange={(e) => inputChangehandle(index, e, "text")}
                    />
                  )}
                  {slide?.options.length > 2 && (
                    <button onClick={() => deleteHandler(index)}>del</button>
                  )}
                </div>
              );
            })}
          </>
        )}
        <span onClick={addOptionHandle}>Add Option</span>
      </div>

      <div></div>
    </div>
  );
};

export default Form;
