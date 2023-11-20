import { startGame } from './startGame.js';
import { Game } from '../components/Game/Game.js';

import * as GameManager from '../gameManager.js';
jest.mock('../gameManager.js');

describe('startGame', () => {
  test('starts a new game', () => {
    const newGame = new Game();
    GameManager.gameManager.createNewTable = jest.fn(() => ({ id: '12345', game: newGame }));

    const res = {
      send: jest.fn(),
    };

    startGame({}, res);

    expect(GameManager.gameManager.createNewTable).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ id: '12345', gameStatus: newGame.getGameStatus() });
  });

  test('returns an error when a cannot start a new game', () => {
    const error = new Error('Error message')
    GameManager.gameManager.createNewTable = jest.fn(() => { throw error });

    const errorHandler = jest.fn((message) => message)
    const res = {
      status: () => ({
        send: errorHandler
      }),
    };

    startGame({}, res);

    expect(errorHandler).toHaveBeenCalledWith(error.message);
  })
});
