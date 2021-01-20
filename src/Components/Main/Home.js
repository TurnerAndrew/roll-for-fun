import React, { useEffect, useState } from "react";
import Header from "../UI/Header";
import UserHeader from "../UI/UserHeader";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { isLoggedIn } = props;
  const [topGames, setTopGames] = useState([]);
  const [topLibrary, setTopLibrary] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const { REACT_APP_CLIENT_ID } = process.env;

  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/signin");
    }
  });

  useEffect(() => {
    axios.get("/collection/topgames").then((res) => setTopGames(res.data));
    axios.get("/library/topgames").then((res) => setTopLibrary(res.data));
    axios
      .get(
        `https://api.boardgameatlas.com/api/search?limit=10&order_by=popularity&client_id=${REACT_APP_CLIENT_ID}`
      )
      .then((res) => setPopularGames(res.data.games));
  }, [REACT_APP_CLIENT_ID]);

  const topGamesMapped = topGames.map((game) => {
    return (
      <div key={game.id} className="game-preview">
        <img src={game.thumbnail} alt="thumbnail" />
        <p>{game.title}</p>
        <Link to={`/game/${game.bga_id}`}>
          <button>View Details</button>
        </Link>
      </div>
    );
  });

  const topLibraryMapped = topLibrary.map((game) => {
    return (
      <div key={game.id} className="game-preview">
        <img src={game.thumbnail} alt="thumbnail" />
        <p>{game.title}</p>
        <Link to={`/game/${game.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    );
  });

  const popularGamesMapped = popularGames.map((game) => {
    return (
      <div key={game.id} className="game-preview">
        <img src={game.images.small} alt="thumbnail" />
        <p>{game.name}</p>
        <Link game_id={game.id} to={`/game/${game.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    );
  });

  return (
    <main>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div id="home">
        <nav className="sidebar">
          <h3>Your Parties</h3>
          <Link to="/parties">
            <h4>View</h4>
          </Link>
          <Link to="/parties/create">
            <h4>Create</h4>
          </Link>
          <Link to="/parties/join">
            <h4>Join</h4>
          </Link>

          <h3>Your Collection</h3>
          <Link to="/collection">
            <h4>View</h4>
          </Link>
          <Link to="/addgame">
            <h4>Add</h4>
          </Link>
        </nav>
        <div>
          <section className="top-games">
            <h1>YOUR TOP RATED GAMES</h1>
            <div>{topGamesMapped.length > 0 ? <div className='home-games-container'>{topGamesMapped}</div> : <p>You haven't added any games to your collection yet.  Add games <Link to='/addgame'>here</Link></p>}</div>
          </section>
          <section className="top-games">
            <h1>TOP GAMES FROM YOUR PARTIES</h1>
            <div>{topLibraryMapped.length > 0 ? <div className='home-games-container'>{topLibraryMapped}</div> : <p>You are not a member of any parties yet. Create or join a party.</p>}</div>
          </section>
          <section className="top-games">
            <h1>BEING PLAYED BY OTHERS</h1>
            <div className="home-games-container">{popularGamesMapped}</div>
          </section>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps)(Home);
