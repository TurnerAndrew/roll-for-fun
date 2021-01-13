import React, {useState} from 'react'
import Header from '../UI/Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AddGame = () => {
    const {REACT_APP_CLIENT_ID} = process.env
    //hooks
    const [title, setTitle] = useState('')
    const [games, setGames] = useState([])
    
    // const [name, setName] = useState('')
    // const [id, setId] = useState('')
    // const [thumb_url, setThumbUrl] = useState('')
    // const [min_playtime, setMinPlaytime] = useState('')
    // const [min_players, setMinPlayers]  = useState('')
    // const [max_players, setMaxPlayers] = useState('')
    // const [max_playtime, setMaxPlaytime] = useState('')
    // const [url, setUrl] = useState('')


    const search = () => {
        axios.get(`https://api.boardgameatlas.com/api/search?name=${title}&client_id=${REACT_APP_CLIENT_ID}`).then((res) => setGames(res.data.games))
        .catch((err) => console.log(err))
    }

    const addToCollection = (game) => {
        axios.post('/collection/add', game)
    }

    const gamesMapped = games.map((game) => {
        
        
        return (
        <div key={game.id} className='game-preview'>
                <img src={game.images.small} alt='thumbnail'/>
                <p>{game.name}</p>
                <button onClick={addToCollection(game)}>Add to Collection</button>
                <Link game_id={game.id} to={`/game/${game.id}`}>
                <button>View Details</button>
                </Link>
                
        </div>
        )
                
    })

    return (
        <div>
            <Header/>
        <div id='add-game-main'>
            <section id='game-search-container'>'
                <form id='game-search'>
                    <input
                        type='text'
                        placeholder='SEARCH TITLES'
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <button
                        type='button'
                        onClick={search}                     
                    >SEARCH</button>
                </form>
            </section>
            <div id='games-results'>
               {gamesMapped}
            </div>
        </div>
        </div>
    )
}

export default AddGame