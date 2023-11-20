import { gameManager } from '../gameManager.js';

export const startGame = (req, res) => {
  try {
    const { id, game } = gameManager.createNewTable();
    const gameStatus = game.getGameStatus();
  
    res.send({ id, gameStatus });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
