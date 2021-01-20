import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    
    await axios.post("/auth/register", {username, email, first_name, last_name, password}).then(props.history.push('/home'));
  };

  return (
    <div id="registration-page">
      <section id="registration-container">
        <h1>CREATE ACCOUNT</h1>
        <form name='register' data-netlify="true" npid="register">
          <input
            type="text"
            name='username'
            placeholder="USERNAME"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="email"
            name='email'
            placeholder="EMAIL"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            name='first-name'
            placeholder="FIRST NAME"
            className="form-input"
            onChange={(e) => setFirst_Name(e.target.value)}
          ></input>
          <input
            type="text"
            name='last-name'
            placeholder="LAST NAME"
            className="form-input"
            onChange={(e) => setLast_Name(e.target.value)}
          ></input>
          <input
            type="password"
            name='password'
            placeholder="PASSWORD"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type="button" id="register-button" onClick={register}>
            REGISTER
          </button>
        </form>
        <div id="signin-redirect">
          <p>
            Already registered? Sign in <Link to="/signin">HERE</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
