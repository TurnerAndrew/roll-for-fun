import React, { useState } from "react";
import Header from "../../UI/Header";
import UserHeader from "../../UI/UserHeader";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";

const Create = (props) => {
  const { isLoggedIn } = props.user;

  if (isLoggedIn === false) {
    props.history.push("/signin");
  }

  const { user_id } = props;
  const [party_name, setPartyName] = useState("");

  const createParty = () => {
    axios.post("/parties/create", { user_id, party_name });
  };

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="party-main">
        <div className="party-container">
          <div className="party-action">
            <h1>CREATE A PARTY</h1>
            <form>
              <input
                type="text"
                placeholder="PARTY NAME"
                onChange={(e) => setPartyName(e.target.value)}
              ></input>
              <button type="submit" onClick={createParty}>Create</button>
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

export default connect(mapStateToProps, { getUserData })(Create);
