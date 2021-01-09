import React, {useState} from 'react'
import Header from '../UI/Header'
import axios from 'axios'

const AddGame = () => {
    const {REACT_APP_CLIENT_ID} = process.env
    //hooks
    const [title, setTitle] = useState('')
    const [games, setGames] = useState([])
    const [game, setGame] = useState('')

    const search = () => {
        axios.get(`https://api.boardgameatlas.com/api/search?name=${title}&client_id=${REACT_APP_CLIENT_ID}`).then((res) => setGames(res.data.games))
        .catch((err) => console.log(err))
    }

    

    const gamesMapped = games.map((game) => {
        return (
        <div key={game.id} className='game-preview' bga_id={game.id}>
            <img src={game.images.small} alt='thumbnail'/>
            <p>{game.name}</p>
            
        </div>
        )
                
    })

    console.log(gamesMapped)

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