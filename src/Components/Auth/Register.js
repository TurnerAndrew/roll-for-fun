import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    
    axios.post("/auth/register", {username, email, firstName, lastName, password});
  };

  return (
    <div id="registration-page">
      <section id="registration-container">
        <h1>CREATE ACCOUNT</h1>
        <form id="register">
          <input
            type="text"
            placeholder="USERNAME"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="email"
            placeholder="EMAIL"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="FIRST NAME"
            className="form-input"
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="LAST NAME"
            className="form-input"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <input
            type="password"
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
