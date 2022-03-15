import React from "react";

const RollModal = (props) => {
  const { showRoll, setShowRoll, winner } = props;

  return (
    <div>
      {showRoll ? (
        <div className="winning-game">
            <button id='close' onClick={()=> setShowRoll(prev => !prev)}>X</button>
            <h1>{winner.game.title}</h1>
            <img src={winner.game.thumbnail} alt="thumbnail" />
            <h4>
              {winner.game.min_players} - {winner.game.max_players} players
            </h4>
            <h4>{winner.game.max_playtime} minutes</h4>
            <a href={`https://www.youtube.com/results?search_query=how+to+play+${winner.game.title}`} target='_blank'>
              <button className='action-button'>How to Play</button>
            </a>
          </div>
        
      ) : null}
    </div>
  );
};

export default RollModal;
