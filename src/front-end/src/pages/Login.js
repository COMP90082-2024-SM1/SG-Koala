import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import navSgLogo from "../images/sg-logo.png";
import koala_logo from "../images/koala-logo.png";
import {
  TypographyH2,
  TypographyParagraph,
} from "../components/Typography/Typography";
import { LoginDetail } from "../api/LoginAPI";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("Welcome to Koala Booking System");
  const [isLogin, setIsLogin] = useState(true);

  const onButtonClick = async () => {
    try {
      const response = await LoginDetail(username, password);
      localStorage.setItem("authTokens", JSON.stringify(response));

      setMessage("Login Successful");
      setIsLogin(true);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
      setIsLogin(false);
    }
  };

  const textStyle = {
    color: isLogin ? "white" : "red",
  };

  return (
    <div className="loginBackground">
      <img
        src={koala_logo}
        alt="koala_logo"
        id="koala_logo"
        className="loginKoalaLogo"
      />
      <div className="loginContainer">
        <div className="loginLogo">
          <img src={navSgLogo} alt="navSgLogo" id="navSgLogo" />
        </div>
        <div className="loginTextContainer">
          <TypographyH2 style={{ color: "white" }}>
            Database Account
          </TypographyH2>{" "}
        </div>
        <br />
        <div>
          <input
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            className="loginInputBox"
          />
        </div>
        <br />
        <div className="loginTextContainer">
          <TypographyH2 style={{ color: "white" }}>
            Database Password
          </TypographyH2>{" "}
        </div>
        <br />
        <div>
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="loginInputBox"
          />
        </div>
        <br />
        <div className="loginTextButtonContainer">
          <div className="loginTextContainer">
            <TypographyParagraph style={textStyle}>
              {message}
            </TypographyParagraph>
          </div>
          <div>
            <input
              className="loginInputButton"
              type="button"
              onClick={onButtonClick}
              value={"Log in"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
