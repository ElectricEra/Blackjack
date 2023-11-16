import { Dealer } from './DealerHand.js';
import { Card } from '../Card/Card.js';
import { suits, ranks } from '../../constants.js';

describe('Dealer', () => {
  test('returns a hand with a hidden second card and points total', () => {
    const dealer = new Dealer();
    const card1 = new Card(suits[0], ranks[0]);
    const card2 = new Card(suits[0], ranks[1]);
    dealer.addCard(card1);
    dealer.addCard(card2);

    const hand = dealer.getHand();

    expect(hand.points).toEqual(undefined);
    expect(hand.nameOfTheHand).toEqual(undefined);
    expect(hand.cards.length).toBe(2);
    expect(hand.cards[0]).toBe(card1);
    expect(hand.cards[1]).toEqual({ isHidden: true });
  });

  test('returns a hand with opened second card and points total when status is changed', () => {
    const dealer = new Dealer();
    const card1 = new Card(suits[0], ranks[0]);
    const card2 = new Card(suits[0], ranks[1]);
    dealer.addCard(card1);
    dealer.addCard(card2);
    dealer.openHiddenCard();

    const hand = dealer.getHand();

    expect(hand.points).toBe(21);
    expect(hand.nameOfTheHand).toBe('Soft 21');
    expect(hand.cards.length).toBe(2);
    expect(hand.cards[0]).toBe(card1);
    expect(hand.cards[1]).toBe(card2);
  });

  test('returns a hand with opened second card and points total when status is changed', () => {
    const dealer = new Dealer();
    const card1 = new Card(suits[0], ranks[0]);
    const card2 = new Card(suits[0], ranks[1]);
    dealer.addCard(card1);
    dealer.addCard(card2);
    dealer.openHiddenCard();
    
    const oldHand = dealer.getHand();

    dealer.resetDealerHand();
    dealer.addCard(card1);
    dealer.addCard(card2);

    const newHand = dealer.getHand();

    expect(oldHand.cards[1]).toBe(card2);
    expect(newHand.cards[1]).toEqual({ isHidden: true });
  });
});
