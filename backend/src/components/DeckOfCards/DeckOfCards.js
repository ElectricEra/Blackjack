import { Card } from '../Card/Card.js';
import { suits, ranks } from '../../constants.js';

/** Class representing a deck of playable cards. */
export class DeckOfCards {
  #cards;

  /**
   * Create a sorted deck of cards
   */
  constructor() {
    this.#cards = suits.map(suit => {
      return ranks.map(rank => {
        return new Card(suit, rank);
      });
    }).flat();
  }

  /** 
   * Get the amount of cards in a deck.
   *
   * @returns {number}
   */
  countCards = () => {
    return this.#cards.length;
  }

  /** 
   * Shullfle the deck. Modifies internal card sequence.
   *
   * @returns {void}
   */
  shuffle = () => {
    for (let i = 0; i < this.#cards.length; i++) {
      // Choosing a random position for a card within deck.
      const newCardPosition = Math.floor(Math.random() * this.#cards.length);

      // Swaping card at current index position and new position.
      const currentCard = this.#cards[i];
      this.#cards[i] = this.#cards[newCardPosition];
      this.#cards[newCardPosition] = currentCard;
    }
  }

  /**
   * Deals a card from a deck.
   * 
   * @returns {Card} - card that was dealt
   * 
   * @throws {Error} - if there are no cards left in a deck
   */
  dealCard = () => {
    if (this.#cards.length === 0) {
      throw new Error('No cards left');
    }
    
    const cardToDeal = this.#cards.pop();

    return cardToDeal;
  }
};
