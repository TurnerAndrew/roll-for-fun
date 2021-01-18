import React, { useEffect, useState } from "react";
import Header from "../../UI/Header";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import UserHeader from "../../UI/UserHeader";

const Parties = (props) => {
  const { isLoggedIn } = props.user;

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
      <div key={party.party_id} className='party-list'>
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
          <Link to={`/party/${party.party_id}`}><h1>{party.party_name}</h1></Link>
          {party.members.map((member) => {
            return <h4 className='members'>{member.username}</h4>;
          })}
        </div>
      </div>
    );
  });

  return (
    <main>
    {isLoggedIn ? <UserHeader /> : <Header />}
    <div className='parties-main'>
      <nav className='sidebar'>
        <h1>YOUR PARTIES</h1>
        {partiesMapped}
        <Link to="/parties/create">
          <h3>Create</h3>
        </Link>
        <Link to="/parties/join">
          <h3>Join</h3>
        </Link>
      </nav>
      <div className='party-list'>{members}</div>
    </div>
    </main>
  );
};

function mapStateToProps(state) {
  return {
    user: state,
  };
}

export default connect(mapStateToProps, { getUserData })(Parties);
