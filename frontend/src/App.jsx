import { useState, useEffect } from 'react';

import { Hand } from './components/Hand/Hand';
import { Actions } from './components/Actions/Actions';

import './App.css';

function App() {
  const [gameState, setGameState] = useState({});
  const [gameId, setGameId] = useState('');

  const sendRequestToGameManager = (type, gameId) => async () => {
    // Hardcoded url for simplicity's sake
    const response = await fetch(`http://localhost:3000/${type}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId })
    });
    const parsedResponse = await response.json();
    setGameState(parsedResponse);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Hardcoded url for simplicity's sake
      const deal = await fetch('http://localhost:3000', {
        mode: "cors",
      });

      if (deal.status === 200) {
        const dealJson = await deal.json();
        setGameState(dealJson.gameStatus);
        setGameId(dealJson.id);
      }
    };

    if (!gameId) {
      fetchData();
    }
  }, [gameId]);

  return (
    <>
      <Hand name="Dealer" cards={gameState?.dealerHand?.cards} points={gameState?.dealerHand?.points} nameOfTheHand={gameState?.dealerHand?.nameOfTheHand}/>
      <Actions
        gameId={gameId}
        gameState={gameState}
        resetGame={sendRequestToGameManager('resetGame', gameId)}
        deal={sendRequestToGameManager('deal', gameId)}
        hit={sendRequestToGameManager('hit', gameId)}
        stand={sendRequestToGameManager('stand', gameId)}
        dealersPlay={sendRequestToGameManager('dealersPlay', gameId)}
      />
      <Hand name="Player" cards={gameState?.playerHand?.cards} points={gameState?.playerHand?.points} nameOfTheHand={gameState?.playerHand?.nameOfTheHand}/>
    </>
  )
}

export default App
