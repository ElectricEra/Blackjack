import { executeGameCommand } from './executeGameCommand.js';

import * as index from '../index.js';
jest.mock('../index.js');

describe('executeGameCommand', () => {
  test('returns game state when command is executed', () => {
    const mockFn = jest.fn();
    index.game.deal.mockImplementation(mockFn);

    const handler = executeGameCommand('deal');

    const res = {
      send: jest.fn().mockImplementation(jest.fn()),
      status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
      })),
    };

    handler({}, res);

    expect(mockFn).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();
  });

  test('returns error when command cannot be executed', () => {
    const error = new Error('Error');
    index.game.deal.mockImplementation(() => { throw error });

    const handler = executeGameCommand('deal');

    const res = {
      send: jest.fn().mockImplementation(jest.fn()),
      status: jest.fn().mockImplementation(() => ({
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
