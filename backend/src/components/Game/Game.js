import { Hand } from '../Hand/Hand.js';
import { Dealer } from '../Dealer/DealerHand.js';
import { DeckOfCards } from '../DeckOfCards/DeckOfCards.js';

export const gameStates = ['Pre-deal', 'The Play', 'Dealer\'s Play', 'Result'];

export class Game {
  #deck;
  #player;
  #dealer;
  #currentGameState;

  constructor() {
    this.#deck = new DeckOfCards();
    this.#player = new Hand();
    this.#dealer = new Dealer();
    this.#currentGameState = 0;
  }
  /**
   * Returns current game status
   * @returns {Object} - current game status
   * @returns {String} gameState - current game state
   * @returns {Object} playerHand - player's hand
   * @returns {Object} dealerHand - dealer's hand
   * @returns {String} result - result of the game
  */
  getGameStatus() {
    const canWinnerBeDetermined = this.#currentGameState === 3;

    return {
      gameState: gameStates[this.#currentGameState],
      playerHand: this.#player.getHand(),
      dealerHand: this.#dealer.getHand(),
      ...(canWinnerBeDetermined ? { result: this.determineWinner() } : {})
    }
  }

  /**
   * Deals a hand to player and dealer
   * 
   * @throws {Error} - returns error if the game state is incorrect
   */
  deal() {
    if (this.#currentGameState !== 0) {
      throw new Error('Game state is incorrect');
    }

    this.#deck.shuffle();
    // Deal first card to player and dealer
    this.#player.addCard(this.#deck.dealCard());
    this.#dealer.addCard(this.#deck.dealCard());
    // Deal second card to player and dealer
    this.#player.addCard(this.#deck.dealCard());
    this.#dealer.addCard(this.#deck.dealCard());

    this.advanceToNextStep();
  }

  /**
   * Adds a card to the hand
   * 
   * @param {Hand} hand - hand to add a card to
   * 
   * @returns {Object} - hand details
   */
  #hit(hand) {
    hand.addCard(this.#deck.dealCard());

    return hand.getHand();
  }

  /**
   * Adds a card to player's hand
   * 
   * @throws {Error} - returns error if the game state is incorrect
   */
  playerHit() {
    if (this.#currentGameState !== 1) {
      throw new Error('Game state is incorrect');
    }

    const hitOutcome = this.#hit(this.#player);

    if (hitOutcome.points > 21) {
      this.advanceToStep(3);
    }
  }

  /**
   * Stops player's turn
   */
  playerStand() {
    if (this.#currentGameState !== 1) {
      throw new Error('Game state is incorrect');
    }

    this.advanceToNextStep();
  }

  /**
   * Plays dealer's turn
   * 
   * @throws {Error} - returns error if the game state is incorrect
   */
  dealersPlay() {
    if (this.#currentGameState !== 2) {
      throw new Error('Game state is incorrect');
    }

    this.#dealer.openHiddenCard();

    while (this.#dealer.getHand().points < 17) {
      this.#hit(this.#dealer);
    }

    if (this.#dealer.getHand().points > 21) {
      this.advanceToStep(3);
      return this.determineWinner();
    }

    this.advanceToNextStep();
  }

  /**
   * Advances game loop to the next step
   */
  advanceToNextStep() {
    this.#currentGameState = (this.#currentGameState + 1) % gameStates.length;
  }

  /**
   * Advances game loop to the specified step
   * 
   * @param {Number} step - step to advance to
   */
  advanceToStep(step) {
    this.#currentGameState = step;
  }

  /**
   * Determines the winner of the game
   * 
   * @returns {String} - winner of the game
   */
  determineWinner() {
    const playerPoints = this.#player.getHand().points;
    const dealerPoints = this.#dealer.getHand().points;

    if (playerPoints > 21) {
      return 'Dealer wins'
    } else if (dealerPoints > 21) {
      return 'Player wins'
    } else {
      return playerPoints > dealerPoints ? 'Player wins' : 'Dealer wins';
    }
  }

  /**
   * Restarts the game
   */
  restartGame() {
    // For a 1-player game (delaer and player), if there are less than 18 cards,
    //  there is mathemtical chance that there would be not enough cards to finish the game.
    // For this task, resetting the deck after every play, but in theory, it can be done like this:
    // 
    // if (this.#deck.countCards() <= 18 ) {
    //   this.#deck = new DeckOfCards();
    // }
    this.#deck = new DeckOfCards();
    this.#player.resetHand();
    this.#dealer.resetDealerHand();
    this.advanceToStep(0);
  }
};
