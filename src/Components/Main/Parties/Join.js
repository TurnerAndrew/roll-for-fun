import React, { useState } from "react";
import Header from "../../UI/Header";
import UserHeader from "../../UI/UserHeader";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";

const Join = (props) => {
  const { isLoggedIn } = props;
  if (isLoggedIn === false) {
    props.history.push("/signin");
  }

  const { user_id } = props;
  const [inviteKey, setInvite] = useState("");

  const joinParty = () => {
    axios.post("/parties/join", { user_id, inviteKey });
  };

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="party-main">
        <div className="party-container">
          <div className="party-action">
            <h1>JOIN A PARTY</h1>
            <form>
              <input
                type="text"
                placeholder="INVITE KEY"
                onChange={(e) => setInvite(e.target.value)}
              ></input>
              <button type="submit" onClick={joinParty}>
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
