import React, { useEffect, useState } from "react";
import Header from "../UI/Header";
import UserHeader from "../UI/UserHeader";
import { connect } from "react-redux";
import { getUserData } from "../../redux/userReducer";
import axios from "axios";
import { Link } from "react-router-dom";

const Collection = (props) => {
  const { isLoggedIn } = props.user;

  if (isLoggedIn === false) {
    props.history.push("/signin");
  }

  const { user_id } = props;
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    axios.get("/collection", user_id).then((res) => setCollection(res.data));
  }, [user_id]);

  const removeGame = (game) => {
    axios.delete("/collection/delete", { data: { game_id: game } });
    axios.get("/collection", user_id).then((res) => setCollection(res.data))
  };

  const collectionMapped = collection.map((game) => {
    const { game_id } = game;
    return (
      <div key={game.id} className="game-preview">
        <img src={game.thumbnail} alt="thumbnail" />
        <p>{game.title}</p>
        <Link to={`/game/${game.bga_id}`}>
          <button>View Details</button>
        </Link>
        <button
          onClick={() => {
            removeGame(game_id);
          }}
        >
          Remove Game
        </button>
      </div>
    );
  });

  return (
    <div>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className='collection-main'>
        <nav className="sidebar">
          <form>
            <input type="text" placeholder="SEARCH YOUR COLLECTION"></input>
            <button>SEARCH</button>
          <Link to="/addgame">
            <h3>ADD GAME</h3>
          </Link>
          </form>

        </nav>
        <div className="collection-container">{collectionMapped}</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state,
  };
}

export default connect(mapStateToProps, { getUserData })(Collection);
