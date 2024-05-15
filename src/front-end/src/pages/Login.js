import React, { useState } from "react";
import "../styles/Login.css";
import navSgLogo from "../images/sg-logo.png";
import koala_logo from "../images/koala-logo.png";
import {
  TypographyH2,
  TypographyParagraph,
} from "../components/Typography/Typography";

const Login = (props) => {
  const [Account, setAccount] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const onButtonClick = () => {
    if (message === "Welcome to Koala Booking System") {
      setMessage("Invalid Account or Password");
      setIsLogin(false);
    } else {
      setMessage("Welcome to Koala Booking System");
      setIsLogin(true);
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
            value={Account}
            onChange={(ev) => setAccount(ev.target.value)}
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
            value={Password}
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
