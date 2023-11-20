import React from 'react';

import './Actions.css';

export const Actions = ({ gameId, gameState, resetGame, hit, stand, dealersPlay, deal }) => {
  return (
    <div className="actions">
      <div className="title">Actions</div>
      <div className="details">
        <div className="details-item-left">Table ID:</div>
        <div className="details-item-right">{gameId}</div>
        <div className="details-item-left">Game state:</div>
        <div className="details-item-right">{gameState.gameState}</div>
        <div className="details-item-left">Result:</div>
        {gameState.result ?
          <div className={`details-item-right ${gameState.result === 'Player wins' ? 'text-green' : 'text-red'}`}>{gameState.result}</div> :
          <div className="details-item-right">Game in progress</div>
        }

      </div>
      <div className="buttons">
        {gameState.gameState === 'Pre-deal' && <button onClick={deal}>Deal</button>}
        {gameState.gameState === 'The Play' && <button onClick={hit}>Hit</button>}
        {gameState.gameState === 'The Play' && <button onClick={stand}>Stand</button>}
        {gameState.gameState === 'Dealer\'s Play' && <button onClick={dealersPlay}>Dealers Play</button>}
        {gameState.gameState === 'Result' && <button onClick={resetGame}>New game</button>}
      </div>
    </div>
  );
};
