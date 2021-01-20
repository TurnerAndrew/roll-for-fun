import React, { useEffect, useState } from "react";
import Header from "../../UI/Header";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/userReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import UserHeader from "../../UI/UserHeader";

const Parties = (props) => {
  const { isLoggedIn } = props.user;
  const { user_id } = props.user
  const [parties, setParties] = useState([]);

  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/signin");
    }
  });

  useEffect(() => {
    axios.get("/parties").then((res) => setParties(res.data));
  });

  const disband = (party) => {
    axios.delete(`/parties/disband/${party}`).then(props.history.push('/home'))
  }

  const leaveParty = (party) => {
    axios.delete(`/parties/leave/${party}`).then(props.history.push('/home'))
  }
  
  
  const partiesMapped = parties.map((party) => {
    return (
      <div key={party.party_id} className='party-view'>
        <Link to={`/party/${party.party_id}`}>
          <h3>{party.party_name}</h3>
        </Link>
        {party.leader === user_id ? <button className='roll' onClick={() => disband(party.party_id)}>Disband Party</button> : <button className='roll' onClick={() => leaveParty(party.party_id)}>Leave Party</button>}
      </div>
    );
  });

  const members = parties.map((party) => {
    return (
      <div key={party.party_id}>
        <div >
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
        <div className='party-list'>{partiesMapped}</div>
        <Link to="/parties/create">
          <h3>Create</h3>
        </Link>
        <Link to="/parties/join">
          <h3>Join</h3>
        </Link>
      </nav>
      <div className='members'>{members}</div>
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
