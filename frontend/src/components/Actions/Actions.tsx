import React from 'react';

import './Actions.css';

export const Actions = ({ gameState, resetGame, hit, stand, dealersPlay, deal }) => {
  return (
    <div className="actions">
      <div className="title">Actions</div>
      <div>Game state: {gameState.gameState}</div>
      <div>Result: {
        gameState.result ?
          <div className={gameState.result === 'Player wins' ? 'text-green' : 'text-red'}>{gameState.result}</div> :
          <div>Game in progress</div>
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
