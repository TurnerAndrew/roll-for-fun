import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const UserHeader = (props) => {
  const { profile_pic, username } = props;

  return (
    <header className="landing-nav">
      <div id="title-container">
        <Link to="/home">
          <h1>ROLL FOR FUN</h1>
        </Link>
      </div>

      <div className="user-container">
        <nav className="user-nav">
          <Link to="/collection" className="nav-dropdown">
            <p>COLLECTION</p>
          </Link>
          <Link to="/parties" className="nav-dropdown">
            <p>PARTIES</p>
          </Link>
          <div className="user-info">
            <h3>{username}</h3>
            <div id="avatar-container">
              <img src={profile_pic} alt="avatar" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps)(UserHeader);
