import React, { useState, useEffect } from "react";
import Header from "../UI/Header";
import UserHeader from "../UI/UserHeader";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AddGame = (props) => {
  const { isLoggedIn } = props;

  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/signin");
    }
  });

  const { REACT_APP_CLIENT_ID } = process.env;
  //hooks
  const [title, setTitle] = useState("");
  const [games, setGames] = useState([]);

  const search = (e) => {
    e.preventDefault()
    axios
      .get(
        `https://api.boardgameatlas.com/api/search?name=${title}&client_id=${REACT_APP_CLIENT_ID}`
      )
      .then((res) => setGames(res.data.games))
      .catch((err) => console.log(err));
  };

  const addToCollection = async (game) => {
    console.log(game)
    axios.post("/collection/add", game).then(alert('Game Added'))
  };

  const gamesMapped = games.map((game) => {
    return (
      <div key={game.id} className="game-preview">
        <img src={game.images.small} alt="thumbnail" />
        <p>{game.name}</p>
        <button onClick={() => addToCollection(game)}>Add to Collection</button>
        <Link game_id={game.id} to={`/game/${game.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    );
  });

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div id="add-game-main">
        <nav className="sidebar">
          <form onSubmit={search}>
            <input
              type="text"
              placeholder="SEARCH TITLES"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <button type="submit">
              SEARCH
            </button>
          </form>
          </nav>
        <div className='collection-container'>{gamesMapped}</div>
      </div>
      </div>
  );
};

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps)(AddGame);
