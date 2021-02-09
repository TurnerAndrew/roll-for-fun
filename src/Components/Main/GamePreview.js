import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const GamePreview = (props) => {
  const { game, party_id } = props;
  const { game_id } = game;
  const [rank, setRank] = useState("");

  const rating = [game_id, party_id, rank]

  const addRating = (details) => {
    axios.post("/library/rank", details);
  };

  //useEffect to get the current rating of a game and set it to a variable current
  //change default option to {current}


  return (
    <div key={game.id} className="rating-preview">
      <img src={game.thumbnail} alt="thumbnail" />
      <p>{game.title}</p>
      <Link to={`/game/${game.bga_id}`}>
        <button>View Details</button>
      </Link>
      <label>Rank: </label>
      <select
        name="rating"
        id="rating"
        onChange={(e) => setRank(e.target.value)}
      >
        <option>-</option>
        <option value='1'>1</option>
        <option value='2'>2</option>;
        <option value='3'>3</option>;
        <option value='4'>4</option>;
        <option value='5'>5</option>;
      </select>
      <button onClick={() => addRating(rating)}>SUBMIT RATING</button>
    </div>
  );
};

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps)(GamePreview);
