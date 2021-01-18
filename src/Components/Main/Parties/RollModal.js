import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const RollModal = (props) => {
    const {showRoll, setShowRoll, winner} = props
    console.log(winner)
    return (
        <div>{showRoll ? 
            <div>
                {winner}
                {/* {winner.title}
                <img src={winner.thumbnail} alt='thumbnail'/>
                {winner.min_players} - {winner.max_players} players
                {winner.max_playtime} minutes
                <Link to={`https://www.youtube.com/results?search_query=how+to+play+${winner.title}`}>How to Play: Youtube</Link> */}
            </div> 
                : null}
        </div>
        
    )
}

export default RollModal