import React, { useState, useEffect } from "react";
import Header from "../../UI/Header";
import UserHeader from "../../UI/UserHeader";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";

const Join = (props) => {
  const { isLoggedIn } = props;
  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/signin");
    }
  });

  const { user_id } = props.user;
  const [inviteKey, setInvite] = useState("");

  const joinParty = async () => {
    await axios.post("/parties/join", { user_id, inviteKey }).then(props.history.push('/parties'));
  };

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="party-main">
        <div className="party-container">
          <div className="party-action">
            <h1>JOIN A PARTY</h1>
            <form onSubmit={joinParty}>
              <input
                type="text"
                placeholder="INVITE KEY"
                onChange={(e) => setInvite(e.target.value)}
              ></input>
              <button type="submit">
                JOIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state,
  };
}

export default connect(mapStateToProps, { getUserData })(Join);
