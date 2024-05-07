import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import navSgLogo from "../images/sg-logo.png";
import koala_logo from "../images/koala-logo.jpg";
import {
  TypographyH2,
  TypographyParagraph,
} from "../components/Typography/Typography";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState("Welcome to Koala Booking System");
  const [isLogin, setIsLogin] = useState(true);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  const csrfToken = getCookie('csrftoken');

  const onButtonClick = () => {
    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',

      },
      body: JSON.stringify({ username,password })
      })
      .then(response => {
        if (!response.ok) {
          setIsLogin(false); 
          if(response.status === 401) {
            setMessage("Invalid Username or Password");
          } else if(response.status === 400) {
            setMessage("Missing Username or Password");
          }
          else {
            setMessage("Login failed with status: " + response.status);
          }
          throw new Error('Failed to login');
        }
        return response.json();
      })
      .then(data => {
        console.log(JSON.stringify(data))
        setMessage("Login Successful"); 
        setIsLogin(true); 
        navigate("/dashboard");
      })
      .catch(error => {
        console.error('Login error:', error);
      });
      
  }

  const onButtonClicsk = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/template/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  }

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
