import { DeckOfCards } from './DeckOfCards.js';
import { suits, ranks } from '../../constants.js';

describe('Deck of cards', () => {
  test('returns a total length of a new deck', () => {
    const deckOfCards = new DeckOfCards();

    const lengthOfTheDeck = deckOfCards.countCards();

    expect(lengthOfTheDeck).toBe(suits.length * ranks.length);
  });

  test('returns a dealt last card of unshuffled deck', () => {
    const deckOfCards = new DeckOfCards();

    const card = deckOfCards.dealCard();
    const lengthOfTheDeck = deckOfCards.countCards();

    expect(card.suit).toBe(suits[suits.length - 1]);
    expect(card.rank).toBe(ranks[ranks.length - 1]);
    expect(lengthOfTheDeck).toBe(suits.length * ranks.length - 1);
  });

  test('returns a string with a message if there are no more cards to deal', () => {
    const deckOfCards = new DeckOfCards();

    const deckLength = deckOfCards.countCards();

    // Dealing all cards from the deck
    for (let i = 0; i < deckLength; i++) {
      deckOfCards.dealCard();
    };
    // Dealing 1 more
    try {
      deckOfCards.dealCard();
    } catch (err) {
      expect(err.message).toBe('No cards left');
    }

  });

  // This test is not pure, it may fail in extrelemy rare cases. It checks if deck is shuffled by comparing
  //  shuffled and unshuffled deck card-by-card.
  //
  // The chance of 2 decks being same is ~ 8.0658 * Math.pow(10, 67), which is practicly impossible, so it is sufficient
  //   to check if deck shuffling function works correctly
  test('shuffles the deck', () => {
    const deckOfCardsUnshuffled = new DeckOfCards();
    const deckOfCardsShuffled = new DeckOfCards();

    const deckLength = deckOfCardsShuffled.countCards();
    deckOfCardsShuffled.shuffle();
    
    let areDecksSimilar = true;
    for (let i = 0; i < deckLength; i++) {
      if (deckOfCardsShuffled.dealCard() !== deckOfCardsUnshuffled.dealCard()) {
        areDecksSimilar = false;
        break;
      }
    }

    expect(areDecksSimilar).toBe(false);
  });
});
