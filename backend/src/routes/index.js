import express from 'express';
import { Game } from '../components/Game/Game.js';
import { executeGameCommand } from './utils/executeGameCommand.js';

const router = express.Router();

export const game = new Game();

// Improvement considerations:
// - Create middleware to handle errors instead of sending them from each handler
// - Add logger

// Default route returns a game status
router.get('/', (req, res) => {
  res.send(game.getGameStatus());
});

router.put('/deal', executeGameCommand('deal'));
router.put('/hit', executeGameCommand('playerHit'));
router.put('/stand', executeGameCommand('playerStand'));
router.put('/dealersPlay', executeGameCommand('dealersPlay'));
router.put('/resetGame', executeGameCommand('restartGame'));

export { router };
