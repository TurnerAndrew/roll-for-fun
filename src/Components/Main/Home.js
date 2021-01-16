import React, { useEffect, useState } from "react";
import Header from "../UI/Header";
import UserHeader from "../UI/UserHeader";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { isLoggedIn, user_id } = props;
  const [topGames, setTopGames] = useState([]);
  const [topLibrary, setTopLibrary] = useState([]);
  const [popularGames, setPopularGames] = useState([])

  if (isLoggedIn == false) {
    props.history.push("/signin");
  }

  useEffect(() => {
    axios.get("/collection/topgames").then((res) => setTopGames(res.data));
    axios.get("/library/topgames").then((res) => setTopLibrary(res.data));
    axios.get('https://api.boardgameatlas.com/api/search?limit=10&order_by=popularity&client_id=X34BsI3If9').then((res) => setPopularGames(res.data.games))
  }, [user_id]);

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
        <div key={game.id} className='game-preview'>
                <img src={game.images.small} alt='thumbnail'/>
                <p>{game.name}</p>
                <Link game_id={game.id} to={`/game/${game.id}`}>
                <button>View Details</button>
                </Link>
                
        </div>
        )
  });

  return (
    <main>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div id="home">
        <section id="top-games">
          <h1>YOUR TOP RATED GAMES</h1>
          <div className="home-games-container">{topGamesMapped}</div>
        </section>
        <section id="top-games-parties">
          <h1>TOP GAMES FROM YOUR PARTIES</h1>
          <div className="home-games-container">{topLibraryMapped}</div>
        </section>
        <section id="top-others">
          <h1>BEING PLAYED BY OTHERS</h1>
          <div classname='home-games-container'>{popularGamesMapped}</div>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps)(Home);
