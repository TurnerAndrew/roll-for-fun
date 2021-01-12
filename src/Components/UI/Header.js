import React from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

const Header = (props) => {
  return (
    <header className="landing-nav">
      <div id="title-container">
        <h1>ROLL FOR FUN</h1>
      </div>
      
       <div className="button-container">
        <Link to="/signin">
          <div className="action-button">
            <p>Sign In</p>
          </div>
        </Link>
        <Link to="/register">
          <div className="action-button">
            <p>Sign Up</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Header);

