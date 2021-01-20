import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {logout} from '../../redux/userReducer'


const UserHeader = (props) => {
  const { profile_pic, username} = props;
  
  const logout = (e) => {
    e.preventDefault();
    axios.post("/auth/logout").then(() => {
      props.logout();
      props.history.push("/");
    });
  };

  return (
    <header className="landing-nav">
      <div id="title-container">
        <Link to="/home">
        <img src='../../public/dice-game.svg' alt='die logo'/>
          <h1>ROLL FOR FUN</h1>
        </Link>
      </div>

      <div className="user-container">
        <nav className="user-nav">
          <Link to="/collection" className="nav-button">
            <p>COLLECTION</p>
          </Link>
          <Link to="/parties" className="nav-button">
            <p>PARTIES</p>
          </Link>
          <div className='nav-button' onClick={logout}><p>LOG OUT</p></div>
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
}

const mapStateToProps = function (state) {
  return state;
};

export default withRouter (connect(mapStateToProps, {logout})(UserHeader));
