import { useState, useEffect } from 'react';

import { Hand } from './components/Hand/Hand';
import { Actions } from './components/Actions/Actions';

import './App.css';

function App() {
  const [gameState, setGameState] = useState({});

  const sendRequestToGameManager = (type) => async () => {
    // Hardcoded url for simplicity's sake
    const response = await fetch(`http://localhost:3000/${type}`, {
      method: "PUT",
      mode: "cors",
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
      const dealJson = await deal.json();
      setGameState(dealJson);
    };

    fetchData();
  }, []);

  return (
    <>
      <Hand name="Dealer" cards={gameState?.dealerHand?.cards} points={gameState?.dealerHand?.points} nameOfTheHand={gameState?.dealerHand?.nameOfTheHand}/>
      <Actions
        gameState={gameState}
        resetGame={sendRequestToGameManager('resetGame')}
        deal={sendRequestToGameManager('deal')}
        hit={sendRequestToGameManager('hit')}
        stand={sendRequestToGameManager('stand')}
        dealersPlay={sendRequestToGameManager('dealersPlay')}
      />
      <Hand name="Player" cards={gameState?.playerHand?.cards} points={gameState?.playerHand?.points} nameOfTheHand={gameState?.playerHand?.nameOfTheHand}/>
    </>
  )
}

export default App
