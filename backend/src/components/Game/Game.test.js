import { jest } from '@jest/globals';
import { Game } from './Game.js';
import { Card } from '../Card/Card.js';

import { gameStates } from './Game.js';

import * as Deck from '../DeckOfCards/DeckOfCards.js';
jest.mock('../DeckOfCards/DeckOfCards.js');

describe('Game', () => {
  test('creates a player, dealer and deck', () => {
    Deck.DeckOfCards.mockImplementation(() => {
      return {
        shuffle: () => {},
        countCards: () => 52,
        dealCard: () => new Card('hearts', 'jack'),
      };
    });
    const game = new Game();

    game.deal();

    expect(Deck.DeckOfCards).toHaveBeenCalledTimes(1);
    expect(game.player).not.toBe(null);
    expect(game.dealer).not.toBe(null);
    expect(game.deck).not.toBe(null);
  });

  test('advances to next state', () => {
    const game = new Game();

    const currentState = game.getGameStatus();
    game.advanceToNextStep();
    const nextState = game.getGameStatus();
    game.advanceToNextStep();
    game.advanceToNextStep();
    game.advanceToNextStep();
    const loopedState = game.getGameStatus();

    expect(currentState.gameState).toBe(gameStates[0]);
    expect(nextState.gameState).toBe(gameStates[1]);
    expect(loopedState.gameState).toBe(gameStates[0]);
  });

  test('restarts game', () => {
    const game = new Game();
    game.deal();
    const oldGameState = game.getGameStatus();
    game.restartGame();
    const newGameState = game.getGameStatus();

    expect(oldGameState.gameState).toBe(gameStates[1]);
    expect(oldGameState.playerHand.cards.length).toBe(2);
    expect(newGameState.gameState).toBe(gameStates[0]);
    expect(newGameState.playerHand.cards.length).toBe(0);
  });

  describe('deal', () => {
    test('deals a hand for player and dealer when in correct game state', () => {
      const card1 = new Card('hearts', '8');
      const card2 = new Card('hearts', '6');

      const mockFn = jest.fn()
        .mockReturnValueOnce(card1)
        .mockReturnValue(card2)
      Deck.DeckOfCards.mockImplementation(() => {
        return {
          shuffle: () => {},
          countCards: () => 52,
          dealCard: mockFn,
        };
      });
  
      const game = new Game();
  
      game.deal();
      game.playerHit();
      game.playerStand();
      game.dealersPlay();

      const status = game.getGameStatus();

      expect(status.result).toBe('Player wins');
    });
  
    test('returns an error when tries to deal a hand in wrong game state', () => {
      expect.assertions(1);
      const game = new Game();
      game.advanceToNextStep();

      try {
        game.deal();
      } catch (err) {
        expect(err.message).toEqual('Game state is incorrect');
      }
    });
  });


  describe('player', () => {
    test('allows player to hit in correct game state', () => {
      const game = new Game();
      game.advanceToNextStep();
      game.playerHit();

      const gameState = game.getGameStatus();

      expect(gameState.playerHand.cards.length).toBe(1);
    });

    test('allows player to stand in correct game state', () => {
      const game = new Game();
      game.advanceToNextStep();
      game.playerHit();
      game.playerStand();
      const gameState = game.getGameStatus();

      expect(gameState.gameState).toBe(gameStates[2]);
    });

    test('returns game state when player busts', () => {
      Deck.DeckOfCards.mockImplementation(() => {
        return {
          shuffle: () => {},
          countCards: () => 52,
          dealCard: () => new Card('hearts', 'jack'),
        };
      });
      const game = new Game();
      game.deal();
      game.playerHit();

      const gameState = game.getGameStatus();

      expect(gameState.gameState).toBe(gameStates[3]);
      expect(gameState.result).toBe('Dealer wins')
    });

    test('returns an error when player tries to hit in a wrong game state', () => {
      const game = new Game();
      game.advanceToNextStep();
      game.advanceToNextStep();

      try {
        game.playerHit();
      } catch (err) {
        expect(err.message).toEqual('Game state is incorrect');
      }
    });

    test('returns an error when player tries to stand in a wrong game state', () => {
      const game = new Game();
      game.advanceToNextStep();
      game.advanceToNextStep();

      try {
        game.playerStand();
      } catch (err) {
        expect(err.message).toEqual('Game state is incorrect');
      }
    });
  });

  describe('dealer', () => {
    test('allows dealer to play in correct game state and stand when more than 17 points are collected', () => {
      const card = new Card('hearts', 'jack');
      Deck.DeckOfCards.mockImplementation(() => {
        return {
          shuffle: () => {},
          countCards: () => 52,
          dealCard: () => card,
        };
      });

      const game = new Game();
      game.advanceToNextStep();
      game.advanceToNextStep();
      game.dealersPlay();
      const gameState = game.getGameStatus();

      expect(gameState.dealerHand.cards.length).toBe(2);
      expect(gameState.dealerHand.cards).toEqual([card, card]);
      expect(gameState.gameState).toBe(gameStates[3]);
      expect(gameState.result).toBe('Dealer wins');
    });

    test('allows dealer to play in correct game state and bust when more than 21 points are collected', () => {
      const card = new Card('hearts', '8');
      Deck.DeckOfCards.mockImplementation(() => {
        return {
          shuffle: () => {},
          countCards: () => 52,
          dealCard: () => card,
        };
      });

      const game = new Game();
      game.advanceToNextStep();
      game.advanceToNextStep();
      game.dealersPlay();
      const gameState = game.getGameStatus();

      expect(gameState.dealerHand.cards.length).toBe(3);
      expect(gameState.dealerHand.cards).toEqual([card, card, card]);
      expect(gameState.gameState).toBe(gameStates[3]);
      expect(gameState.result).toBe('Player wins');
    });

    test('returns an error when dealer tries to hit in a wrong game state', () => {
      const game = new Game();
      game.advanceToNextStep();

      try {
        game.dealersPlay();
      } catch (err) {
        expect(err.message).toEqual('Game state is incorrect');
      }
    });
  });
});
