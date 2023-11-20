import { Game } from '../Game/Game.js';
import { generateRandomString } from '../../utils.js';

export class GameManager {
  #games;

  constructor() {
    this.#games = [];
  }

  /**
   * Creates a new game and returns its id
   * 
   * @returns { { id: string, game: Game } } - The id of the new game and the game itself
   */
  createNewTable() {
    const newGame = {
      id: generateRandomString(5),
      game: new Game()
    };

    this.#games.push(newGame);

    return newGame;
  }
  
  /**
  * Gets a game
  * 
  * @param {string} gameId - The id of the game to get
  * @returns 
  */
  getGame(gameId) {
    const game = this.#games.find(game => game.id === gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    return game.game;
  }

  /**
   * Closes a game
   * 
   * @param {string} gameId - The id of the game to close
   */
  closeTable(gameId) {
    const gameIndex = this.#games.findIndex(game => game.id === gameId);
    if (gameIndex === -1) {
      throw new Error('Game not found');
    }

    this.#games.splice(gameIndex, 1);
  }
};
