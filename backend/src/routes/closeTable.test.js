import { closeTable } from './closeTable.js';

import * as GameManager from '../gameManager.js';
jest.mock('../gameManager.js');

describe('closeTable', () => {
  test('closes a table when one is present', () => {
    GameManager.gameManager.closeTable = jest.fn();
    
    const req = {
      body: {
        gameId: '123',
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };

    closeTable(req, res);

    expect(GameManager.gameManager.closeTable).toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  test('returns an error when a table is missing', () => {
    const error = new Error('Error message')
    GameManager.gameManager.closeTable = jest.fn(() => { throw error });
    
    const req = {
      body: {
        gameId: '123',
      },
    };

    const errorHandler = jest.fn((message) => message)
    const res = {
      status: () => ({
        send: errorHandler
      }),
    };

    closeTable(req, res);

    expect(errorHandler).toHaveBeenCalledWith(error.message);
  })
});
