import { convertRanksToPoints } from '../../utils.js';

/** Class representing a hand with cards */
export class Hand {
  #cards;
  #points;
  #isHandSoft;

  /**
   * Create an empty hand.
   */
  constructor() {
    this.#cards = [];
    this.#points = 0;
    this.#isHandSoft = false;
  }

  /**
   * Add a card to a hand and recount total points.
   * 
   * @param {Card} card - Card to add to a hand.
   * 
   * @returns {void}
   */
  addCard(card) {
    this.#cards.push(card);
    this.#countHand();
  }

  /**
   * Get hand details.
   * 
   * @returns {Object} - Object with hand details.
   * @returns {number} Object.points - Total points of a hand.
   * @returns {string} Object.nameOfTheHand - Name of the hand.
   * @returns {Array} Object.cards - Array of cards in a hand.
   */
  getHand() {
    return ({
      cards: this.#cards,
      points: this.#points,
      nameOfTheHand: this.#nameHand(this.#points, this.#isHandSoft)
    })
  }

  /**
   * Reset a hand to an initial state.
   * 
   * @returns {void}
   */
  resetHand() {
    this.#cards = [];
    this.#points = 0;
    this.#isHandSoft = false;
  }

  /**
   * Count total points and update hand status.
   * 
   * @returns {void}
   * @private
   */
  #countHand() {
    let points = 0;
    this.#isHandSoft = false;

    const notAceCards = this.#cards.filter((card) => card.rank !== 'ace');
    const aceCards = this.#cards.filter((card) => card.rank === 'ace');

    points += notAceCards.reduce((sum, card) => sum + convertRanksToPoints(card.rank), 0);

    for (let i = 0; i < aceCards.length; i++) {
      // If current points are more than 10 - ace would bust, therefore, counting it as 1
      if (points > 10) {
        points += 1;
      } else {
        // If ace is counted as 11, hand is called "soft"
        this.#isHandSoft = true;
        points += 11;
      }
    };

    this.#points = points;
  };

  /**
   * Get name of the hand.
   * 
   * @param {string} points - Total points of a hand.
   * @param {boolean} isHandSoft - Is hand soft.
   * 
   * @returns {string} - Name of the hand.
   * @private
   */
  #nameHand(points, isHandSoft) {
    if (points > 21) {
      return 'Bust';
    }

    return `${isHandSoft ? 'Soft ' : ''}${points}`
  }
};
