import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

const UserHeader = (props) => {

    const {profile_pic, first_name} = props
  
  return (

    <header className="landing-nav">
      <div id="title-container">
        <Link to="/home">
          <h1>ROLL FOR FUN</h1>
        </Link>
      </div>

      <div>
        <nav>
            <button class='nav-dropdown'>COLLECTION</button>
            <div class='dropdown-links'>
                <a href='/collection'>VIEW</a>
                <a href='/collection/add'>ADD</a>
                <a href='/collection/delete'>DELETE</a>
            </div>
            <button class='nav-dropdown'>PARTIES</button>
            <div class='dropdown-links'>
                <a href='/parties'>MY PARTIES</a>
                <a href='/parties/create'>CREATE</a>
                <a href='/parties/join'>JOIN</a>'
            </div>
            <div className='user-info'>
                <img src={profile_pic} alt='avatar'/>
                <p>{first_name}</p>
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
