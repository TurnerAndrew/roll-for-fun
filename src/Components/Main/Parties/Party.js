import React, { useState, useEffect } from "react";
import Header from "../../UI/Header";
import UserHeader from "../../UI/UserHeader";
import axios from "axios";
// import { Link } from 'react-router-dogit cm'
import { connect } from "react-redux";
import GamePreview from "../GamePreview";
import RollModal from "./RollModal";

const Party = (props) => {
  const { party_id } = props.match.params;
  const [party, setParty] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [library, setLibrary] = useState([]);
  const [inviteKey, setInviteKey] = useState([]);
  const [gamesRated, setGamesRated] = useState([]);
  const [showRoll, setShowRoll] = useState(false);
  const [winner, setWinner] = useState({});
  

  const { isLoggedIn } = props;

  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/signin");
    }
  });

  useEffect(() => {
    axios.get(`/party/${party_id}`).then((res) => {
      setParty(res.data.party);
      setPartyName(res.data.party[0].party_name);
      setLibrary(res.data.library);
      setInviteKey(res.data.inviteKey);
    });
    axios.get(`/library/gameratings/${party_id}`).then((res) => {
      setGamesRated(res.data);
    });
  }, [party_id, setParty]);

  const members = party.map((party) => {
    return <h4 className="members">{party.username}</h4>;
  });

  const invite = inviteKey.map((party) => (
    <h3>Invite Key: {party.invite_key}</h3>
  ));

  const libraryMapped = library.map((game) => {
    return <GamePreview game={game} library={library} party_id={party_id} />;
  });

  const top10 = gamesRated.map((game, index) => {
    return (
      <h5 className='top-10'>
        {index + 1}:{game.title}
      </h5>
    );
  });

  const gameDetails = gamesRated.map((game) => {
    return {game}
  });
 

  const rollForFun = () => {
    setShowRoll((prev) => !prev);
    const random = Math.floor(Math.random() * gameDetails.length);
    setWinner(gameDetails[random]);
    console.log(showRoll)
  };

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="party-view-main">
        <nav className="sidebar">
          <h1>{partyName}</h1>
          {invite}
          <div className="members">{members}</div>
          {inviteKey.length > 0 ? (
            <button onClick={rollForFun} className='roll'> ROLL! </button>
            ) : null}
          <h2>Top 10 Games</h2>
            <RollModal showRoll={showRoll} setShowRoll={setShowRoll} winner={winner}/>
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
