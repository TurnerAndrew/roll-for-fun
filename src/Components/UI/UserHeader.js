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
          <button className="nav-dropdown"><p>COLLECTION ▼</p></button>
            <div className="dropdown-links">
              <a href="/collection">VIEW</a>
              <a href="/collection/add">ADD</a>
              <a href="/collection/delete">DELETE</a>
            </div>
          <button className="nav-dropdown"><p>PARTIES ▼</p></button>
            <div className="dropdown-links">
              <a href="/parties">MY PARTIES</a>
              <a href="/parties/create">CREATE</a>
              <a href="/parties/join">JOIN</a>'
            </div>
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
