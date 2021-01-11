import React, {useEffect, useState} from 'react'
import Header from '../UI/Header'
import axios from 'axios'
const parse = require('html-react-parser')

const Game = (props) => {
    const [game, setGame] = useState({})
    
    const {REACT_APP_CLIENT_ID} = process.env
    
    useEffect (() => {
        axios.get(`https://api.boardgameatlas.com/api/search?ids=${props.match.params.game_id}&client_id=${REACT_APP_CLIENT_ID}`).then((res) => setGame(res.data.games[0]))
    }, [REACT_APP_CLIENT_ID, props.match.params.game_id])    

    return (
        <div>
            <Header/>
            <div className='main-content'>
                <section id='game-info'>
                    <h1>{game.name}</h1>
                    <h3>{game.min_players} - {game.max_players} Players</h3>
                    <h3>{game.max_playtime} Minutes</h3>
                    <h3>Ages {game.min_age}+</h3>
                    {parse(`<p>${game.description}</p>`)}
                    <button>Add to Collection</button>
                </section>
                
                <section id='game-image'>                    
                    <img src={game.image_url} alt='game-cover'/>
                </section>
            </div>
            
        </div>
    )
}

export default Game