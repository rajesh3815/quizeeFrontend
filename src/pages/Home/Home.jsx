import React, { useState, } from "react";
import Styles from "./Home.module.css";
import { loginUser, registerUser } from "../../auth/auth";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const nav=useNavigate()
  const [issignup, setIssignup] = useState(true);
  const [inputType, setInputType] = useState("password");
  const [cnfpassword, setCnfpassword] = useState("password");
  const [signupForm, setSignupform] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginForm, setLoginform] = useState({
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });
  const formHandelerSignup = (e) => {
    const { name, value } = e.target;
    setSignupform((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const formHandelerLogin = (e) => {
    const { name, value } = e.target;
    setLoginform((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const clickHandeler = async (e) => {
    let flg = true;
    e.preventDefault();
    if (issignup) {
      const l = e.target.length;
      for (let i = 0; i < l; i++) {
        flg = false;
        const { name } = e.target[i];
        if (e.target[i].value.trim() === "") {
          console.log(inputType);
          if (name === "password") {
            setInputType("text");
          }
          if (name === "confirmPassword") {
            setCnfpassword("text");
          }
          setSignupError((prev) => {
            return { ...prev, [name]: `${name} field is require` };
          });
        }
      }
      //check for weak password
      const regExp = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;
      if (!regExp.test(signupForm.password)) {
        setInputType("text");
        setSignupError((prev) => {
          return { ...prev, password: "weak password" };
        });
        return;
      }
      //check for password matching
      if (signupForm.password !== signupForm.confirmPassword) {
        setCnfpassword("text");
        setSignupError((prev) => {
          return { ...prev, confirmPassword: "password not matching" };
        });
        return;
      }
        let res = await registerUser(signupForm);
    
    } else {
      const l = e.target.length;
      for (let i = 0; i < l; i++) {
        const { name } = e.target[i];
        if (e.target[i].value.trim() === "") {
          if (name === "password") {
            setInputType("text");
          }

          setLoginError((prev) => {
            return { ...prev, [name]: `${name} field is require` };
          });
        }
      }
      let res = await loginUser(loginForm);
      if(res===500){
        console.log("user dnd");
        return
      }
      if(res===400){
        console.log("wrong password");
        return;
      }
      if(res===0){
        console.log("allfields are require");
        return;
      }
      if(res===200){
        nav('/dashboard')
      }
      console.log(res);
    }
  };
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.container}>
        <h1 className={Styles.quizeHeading}>QUIZZIE</h1>
        <div className={Styles.logandsign}>
          <div
            onClick={() => setIssignup(true)}
            className={`${Styles.signchip} ${
              issignup ? Styles.activechip : ""
            }`}
          >
            signup
          </div>
          <div
            onClick={() => setIssignup(false)}
            className={`${Styles.loginchip} ${
              !issignup ? Styles.activechip : ""
            }`}
          >
            login
          </div>
        </div>
        <div>
          {issignup ? (
            <form onSubmit={clickHandeler} className={Styles.forms}>
              <div className={Styles.inputContainer}>
                <label htmlFor="name">Name</label>
                <input
                  style={{
                    color: `${signupError.name ? "red" : ""}`,
                    border: `${signupError.name ? "2px solid red" : ""}`,
                  }}
                  name="name"
                  type="text"
                  value={signupError.name ? signupError.name : signupForm.name}
                  onChange={formHandelerSignup}
                  onFocus={(e) => {
                    return setSignupError((prev) => {
                      return {};
                    });
                  }}
                />
              </div>
              <div className={Styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                  style={{
                    color: `${signupError.email ? "red" : ""}`,
                    border: `${signupError.email ? "2px solid red" : ""}`,
                  }}
                  name="email"
                  type="text"
                  value={
                    signupError.email ? signupError.email : signupForm.email
                  }
                  onChange={formHandelerSignup}
                  onFocus={(e) => {
                    return setSignupError((prev) => {
                      return {};
                    });
                  }}
                />
              </div>
              <div className={Styles.inputContainer}>
                <label htmlFor="password">Password</label>
                <input
                  style={{
                    color: `${signupError.password ? "red" : ""}`,
                    border: `${signupError.password ? "2px solid red" : ""}`,
                  }}
                  name="password"
                  type={inputType}
                  value={
                    signupError.password
                      ? signupError.password
                      : signupForm.password
                  }
                  onChange={formHandelerSignup}
                  onFocus={(e) => {
                    setInputType("password");
                    return setSignupError((prev) => {
                      return {};
                    });
                  }}
                />
              </div>
              <div className={Styles.inputContainer}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  style={{
                    color: `${signupError.confirmPassword ? "red" : ""}`,
                    border: `${
                      signupError.confirmPassword ? "2px solid red" : ""
                    }`,
                  }}
                  name="confirmPassword"
                  type={cnfpassword}
                  value={
                    signupError.confirmPassword
                      ? signupError.confirmPassword
                      : signupForm.confirmPassword
                  }
                  onChange={formHandelerSignup}
                  onFocus={(e) => {
                    setCnfpassword("password");
                    return setSignupError((prev) => {
                      return {};
                    });
                  }}
                />
              </div>
              <button className={Styles.submitBtn}>Sign-up</button>
            </form>
          ) : (
            <form onSubmit={clickHandeler} className={Styles.forms}>
              <div className={Styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                  style={{
                    color: `${loginError.email ? "red" : ""}`,
                    border: `${loginError.email ? "2px solid red" : ""}`,
                  }}
                  type="email"
                  name="email"
                  value={loginError.email ? loginError.email : loginForm.email}
                  onChange={formHandelerLogin}
                  onFocus={(e) => {
                    return setLoginError((prev) => {
                      return {};
                    });
                  }}
                />
              </div>
              <div className={Styles.inputContainer}>
                <label htmlFor="password">Password</label>
                <input
                  style={{
                    color: `${loginError.password ? "red" : ""}`,
                    border: `${loginError.password ? "2px solid red" : ""}`,
                  }}
                  name="password"
                  type={inputType}
                  value={
                    loginError.password
                      ? loginError.password
                      : loginForm.password
                  }
                  onChange={formHandelerLogin}
                  onFocus={(e) => {
                    setInputType("password");
                    return setLoginError((prev) => {
                      return {};
                    });
                  }}
                />
              </div>
              <button className={Styles.submitBtn}>Log-in</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
