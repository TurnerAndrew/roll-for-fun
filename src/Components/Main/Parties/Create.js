import React, { useState, useEffect } from "react";
import Header from "../../UI/Header";
import UserHeader from "../../UI/UserHeader";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";

const Create = (props) => {
  const { isLoggedIn } = props.user;
  
  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/signin");
    }
  });

  const { user_id } = props;
  const [party_name, setPartyName] = useState("");

  const createParty = () => {
    axios.post("/parties/create", { user_id, party_name}).then(props.history.push('/parties'));
  };

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="party-main">
        <div className="party-container">
          <div className="party-action">
            <h1>CREATE A PARTY</h1>
            <form onSubmit={createParty}>
              <input
                type="text"
                placeholder="PARTY NAME"
                onChange={(e) => setPartyName(e.target.value)}
              ></input>
              <button type="submit">Create</button>
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
