import React, { useEffect, useState } from "react";
import Header from "../../UI/Header";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import UserHeader from "../../UI/UserHeader";

const Parties = (props) => {
  const { isLoggedIn } = props;

  if (isLoggedIn === false) {
    props.history.push("/signin");
  }
  const { user_id } = props;

  const [parties, setParties] = useState([]);

  useEffect(() => {
    axios.get("/parties", user_id).then((res) => setParties(res.data));
  }, [user_id]);

  const partiesMapped = parties.map((party) => {
    return (
      <div key={party.party_id}>
        <Link to={`/party/${party.party_id}`}>
          <h3>{party.party_name}</h3>
        </Link>
      </div>
    );
  });

  const members = parties.map((party) => {
    return (
      <div key={party.party_id}>
        <div>
          <h2>{party.party_name}</h2>
          {party.members.map((member) => {
            return <h4>{member.username}</h4>;
          })}
        </div>
      </div>
    );
  });

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <nav>
        <h1>YOUR PARTIES</h1>
        {partiesMapped}
        <Link to="/parties/create">
          <h3>Create</h3>
        </Link>
        <Link to="/parties/join">
          <h3>Join</h3>
        </Link>
      </nav>
      <div>{members}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state,
  };
}

export default connect(mapStateToProps, { getUserData })(Parties);
