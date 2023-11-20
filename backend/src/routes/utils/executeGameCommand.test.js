import { executeGameCommand } from './executeGameCommand.js';
import { Game } from '../../components/Game/Game.js';

import * as GameManager from '../../gameManager.js';
jest.mock('../../gameManager.js');

describe('executeGameCommand', () => {
  test('returns game state when command is executed', () => {
    const newGame = new Game();
    newGame.deal = jest.fn();
    GameManager.gameManager.getGame = jest.fn(() => newGame);

    const handler = executeGameCommand('deal');

    const req = {
      body: {
        gameId: '123',
      }
    }

    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    };

    handler(req, res);

    expect(GameManager.gameManager.getGame).toHaveBeenCalledWith('123');
    expect(newGame.deal).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();
  });

  test('returns error when command cannot be executed', () => {
    const error = new Error('Error');
    GameManager.gameManager.getGame = jest.fn(() => { throw error });

    const handler = executeGameCommand('deal');

    const res = {
      send: jest.fn(),
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    };

    try {
      handler({}, res);
    } catch (err) {
      expect(mockFn).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(err).toEqual(error);
    }
  });
});
