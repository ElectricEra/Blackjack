import { game } from '../index.js';

// Since almost all of the game commands follow the same logic of exection (make an action, return game status),
//  this utility function can be used to cover these use-cases.
export const executeGameCommand = (command) => (req, res) => {
  try {
    game?.[command]();
    res.send(game.getGameStatus());
  } catch (err) {
    res.status(400).send(err.message);
  }
};
