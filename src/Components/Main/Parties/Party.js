import React, { useState, useEffect } from "react";
import Header from "../../UI/Header";
import UserHeader from "../../UI/UserHeader";
import axios from "axios";
// import { Link } from 'react-router-dogit cm'
import { connect } from "react-redux";
import GamePreview from "../GamePreview";

const Party = (props) => {
  const { party_id } = props.match.params;
  const [party, setParty] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [library, setLibrary] = useState([]);
  const [inviteKey, setInviteKey] = useState([]);
  const [gamesRated, setGamesRated]= useState([])

  const { isLoggedIn } = props;

  if (isLoggedIn === false) {
    props.history.push("/signin");
  }

  useEffect(() => {
    axios.get(`/party/${party_id}`).then((res) => {
      setParty(res.data.party);
      setPartyName(res.data.party[0].party_name);
      setLibrary(res.data.library);
      setInviteKey(res.data.inviteKey);
    });
    axios.get(`/library/gameratings/${party_id}`).then(res => {
      setGamesRated(res.data)
    })
  }, [party_id, setParty]);

  const members = party.map((party) => {
    return <h4 className='members'>{party.username}</h4>;
  });

  const invite = inviteKey.map((party) => (
    <h3>Invite Key: {party.invite_key}</h3>
  ));

  const libraryMapped = library.map((game) => {
    return <GamePreview game={game} library={library} party_id={party_id} />;
  });

  const top10 = gamesRated.map((game, index) => {
    return <h5>{index + 1}:{game.title}</h5>
  })

  const rollForFun = () => {
    const random = Math.floor(Math.random() * top10.length)
    console.log(top10[random])
    return top10[random]
  }

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="party-view-main">
        <nav className="sidebar">
          <h1>{partyName}</h1>
          {invite}
          <div className='members'>{members}</div>
          <h2>Top 10 Games</h2>
          {inviteKey.length > 0 ? <button onClick={rollForFun}> ROLL! </button> : null}
          {top10}
        </nav>
        <div className="collection-container">{libraryMapped}</div>
      </div>
    </div>
  );
};

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps)(Party);
