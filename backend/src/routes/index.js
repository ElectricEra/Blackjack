import express from 'express';
import { startGame } from './startGame.js';
import { closeTable } from './closeTable.js';
import { executeGameCommand } from './utils/executeGameCommand.js';

const router = express.Router();

// Improvement considerations:
// - Create middleware to handle errors instead of sending them from each handler
// - Add logger

// Default route returns a game status
// Table endpoints
router.get('/', startGame);
router.get('/closeTable', closeTable);
// Game endpoints
router.put('/deal', executeGameCommand('deal'));
router.put('/hit', executeGameCommand('playerHit'));
router.put('/stand', executeGameCommand('playerStand'));
router.put('/dealersPlay', executeGameCommand('dealersPlay'));
router.put('/resetGame', executeGameCommand('restartGame'));

export { router };
