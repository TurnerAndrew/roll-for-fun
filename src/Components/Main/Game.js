import React, {useEffect, useState} from 'react'
import Header from '../UI/Header'
import UserHeader from '../UI/UserHeader'
import axios from 'axios'
import {connect} from 'react-redux'
import parse from 'html-react-parser'
// const parse = require('html-react-parser')

const Game = (props) => {
    const {isLoggedIn} = props
    const [game, setGame] = useState({})
    
    const {REACT_APP_CLIENT_ID} = process.env
    useEffect(() => {
        if (isLoggedIn === false) {
          props.history.push("/signin");
        }
      });
    
    useEffect (() => {
        axios.get(`https://api.boardgameatlas.com/api/search?ids=${props.match.params.game_id}&client_id=${REACT_APP_CLIENT_ID}`).then((res) => setGame(res.data.games[0]))
    }, [REACT_APP_CLIENT_ID, props.match.params.game_id])   

    const addToCollection = async (game) => {
        console.log(game)
        axios.post("/collection/add", game).then(alert('Game Added'))
      };

    return (
        <div>
            {isLoggedIn ? <UserHeader/> : <Header/>}
            <div className='main-content'>
                <section id='game-info'>
                    <h1>{game.name}</h1>
                    <h3>{game.min_players} - {game.max_players} Players</h3>
                    <h3>{game.max_playtime} Minutes</h3>
                    <h3>Ages {game.min_age}+</h3>
                    {parse(`<p>${game.description}</p>`)}
                    <button onClick={() => addToCollection(game)}>Add to Collection</button>
                </section>
                
                <section id='game-image'>                    
                    <img src={game.image_url} alt='game-cover'/>
                </section>
            </div>
            
        </div>
    )
}

const mapStateToProps = function (state) {
    return state;
  };


export default connect(mapStateToProps)(Game);