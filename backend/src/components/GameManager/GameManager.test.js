import { jest } from '@jest/globals';
import { Game } from '../Game/Game.js';
import { GameManager } from './GameManager.js';

import * as utils from '../../utils.js';
jest.mock('../../utils.js');

describe('GameManager', () => {
  describe('createNewTable', () => {
    test('creates a new game table', () => {
      utils.generateRandomString = jest.fn(() => '12345');
  
      const gameManager = new GameManager();
      const tableDetails = gameManager.createNewTable();
  
      expect(tableDetails.id).toBe('12345');
      expect(tableDetails.game).toBeInstanceOf(Game);
    });
  });

  describe('getGame', () => {
    test('gets a game table', () => {
      utils.generateRandomString = jest.fn(() => '12345');

      const gameManager = new GameManager();
      const tableDetails = gameManager.createNewTable();
      const newTableDetails = gameManager.getGame('12345');

      expect(tableDetails.game).toBe(newTableDetails);
    });

    test('returns an error when getting game table fails', () => {
      utils.generateRandomString = jest.fn(() => '12345');

      const gameManager = new GameManager();
      gameManager.createNewTable();
      
      try {
        gameManager.getGame('00000');
      } catch (err) {
        expect(err.message).toBe('Game not found');
      }
    });
  });

  describe('closeTable', () => {
    test('closes a game table', () => {
      utils.generateRandomString = jest.fn(() => '12345');
  
      const gameManager = new GameManager();
      const tableDetails = gameManager.createNewTable();
      gameManager.closeTable(tableDetails.id);

      try {
        gameManager.getGame(tableDetails.id);
      } catch (err) {
        expect(err.message).toBe('Game not found');
      }
    });

    test('returns an error when there is no table to remove', () => {
      utils.generateRandomString = jest.fn(() => '12345');
  
      const gameManager = new GameManager();
      gameManager.createNewTable();
      
      try {
        gameManager.closeTable('00000');
      } catch (err) {
        expect(err.message).toBe('Game not found');
      }
    });
  });
});
