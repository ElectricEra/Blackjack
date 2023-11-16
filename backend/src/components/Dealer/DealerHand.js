import { Hand } from "../Hand/Hand.js";

export class Dealer extends Hand {
  #handStatus;

  constructor() {
    super();
    this.#handStatus = 'hidden';
  }

  /**
   * Get dealer's hand. Overwtires method from Hand class.
   * 
   * @returns {Object} - Returns the dealer's hand
   */
  getHand() {
    const hand = super.getHand();

    if (this.#handStatus === 'hidden' && hand?.cards.length === 2) {
      return ({
        cards: [
          hand?.cards[0],
          { isHidden: true }
        ]
      });
    }

    return hand;
  }

  /**
   * Changes status of delaer's hand to open.
   */
  openHiddenCard() {
    this.#handStatus = 'open';
  }

  /**
   * Resets dealer's hand to an initial state.
   */
  resetDealerHand() {
    this.resetHand();

    this.#handStatus = 'hidden';
  }
};
