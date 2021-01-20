import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  
  return (

    <header className="landing-nav">
      <div id="title-container">
        <Link to="/home">
          <img src='../../public/dice-game.svg' alt='die logo'/>
          <h1>ROLL FOR FUN</h1>
        </Link>
      </div>

      <div className="button-container">
        <Link className="action-button" to="/signin">
          <p>Sign In</p>
        </Link>
        <Link className="action-button" to="/register">
          <p>Sign Up</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
