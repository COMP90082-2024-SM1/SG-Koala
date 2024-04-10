import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import sg_logo from "../image/sg-logo.png";
import koala_logo from "../image/koala-logo.jpg";
import {TypographyH2, TypographyParagraph} from "../components/Typography/Typography";

const Login = (props) => {
  const [Account, setAccount] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onButtonClick = () => {
    if (message === "Welcome to Koala Booking System") {
      setMessage("Invalide account or password")
    } else {
      setMessage("Welcome to Koala Booking System")
    }    
  };

  useEffect(() => {
    onButtonClick();  
  }, [])

  return (
    <div className="loginBackground">
      <img
        src={koala_logo}
        alt="koala_logo"
        id="koala_logo"
        className="koalaLogo"
      />
      <div className="mainContainer">
        <div className="loginLogo">
          <img src={sg_logo} alt="sg_logo" id="sg_logo" />
        </div>
        <div className="textContainer">
          <TypographyH2 style={{ color: "white" }}>
            Database Account
          </TypographyH2> </div>
        <br />
        <div>
          <input
            value={Account}
            onChange={(ev) => setAccount(ev.target.value)}
            className="inputBox"
          />
        </div>
        <br />
        <div className="textContainer">
          <TypographyH2 style={{ color: "white" }}>
            Database Passsword
          </TypographyH2> </div>
        <br />
        <div>
          <input
            value={Password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
        </div>
        <br />
        <div className="textButtonContainer">
          <div className="textContainer">
            <TypographyParagraph style={{color: "white"}}>
              {message}
            </TypographyParagraph>
            
          </div>
          <div>
            <input
              className="inputButton"
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
