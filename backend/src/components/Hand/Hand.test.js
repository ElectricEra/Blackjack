import { Hand } from './Hand.js';
import { Card } from '../Card/Card.js';
import { suits } from '../../constants.js';

describe('Player', () => {
  test('has no cards and has no points when created', () => {
    const player = new Hand();

    const hand = player.getHand();

    expect(hand.points).toBe(0);
    expect(hand.nameOfTheHand).toBe('0');
    expect(hand.cards).toEqual([]);
  });

  test('adds non-ace card and updates points properly', () => {
    const player = new Hand();
    const card = new Card(suits[0], '9');

    player.addCard(card);
    const hand = player.getHand();

    expect(hand.points).toBe(9);
    expect(hand.nameOfTheHand).toBe('9');
    expect(hand.cards).toEqual([card]);
  });

  test('adds ace card and updates points properly', () => {
    const player = new Hand();
    const card = new Card(suits[0], 'ace');

    player.addCard(card);
    const hand = player.getHand();

    expect(hand.points).toBe(11);
    expect(hand.nameOfTheHand).toBe('Soft 11');
    expect(hand.cards).toEqual([card]);
  });

  test('adds multiple aces cards and updates points properly', () => {
    const player = new Hand();
    const card1 = new Card(suits[0], 'ace');
    const card2 = new Card(suits[1], 'ace');
    const card3 = new Card(suits[2], 'ace');

    player.addCard(card1);
    player.addCard(card2);
    player.addCard(card3);
    const hand = player.getHand();

    expect(hand.points).toBe(13);
    expect(hand.nameOfTheHand).toBe('Soft 13');
    expect(hand.cards).toEqual([card1, card2, card3]);
  });

  test('adds one non-ace card and one ace card and updates points properly', () => {
    const player = new Hand();
    const card1 = new Card(suits[0], '9');
    const card2 = new Card(suits[1], 'ace');

    player.addCard(card1);
    player.addCard(card2);
    const hand = player.getHand();

    expect(hand.points).toBe(20);
    expect(hand.nameOfTheHand).toBe('Soft 20');
    expect(hand.cards).toEqual([card1, card2]);
  });

  test('adds multiple non-ace cards of a total less than 10 and one ace card and updates points properly', () => {
    const player = new Hand();
    const card1 = new Card(suits[0], '5');
    const card2 = new Card(suits[1], 'ace');
    const card3 = new Card(suits[2], '3');

    player.addCard(card1);
    player.addCard(card2);
    player.addCard(card3);
    const hand = player.getHand();

    expect(hand.points).toBe(19);
    expect(hand.nameOfTheHand).toBe('Soft 19');
    expect(hand.cards).toEqual([card1, card2, card3]);
  });

  test('adds multiple non-ace cards of a total more than 10 and one ace card and updates points properly', () => {
    const player = new Hand();
    const card1 = new Card(suits[0], '5');
    const card2 = new Card(suits[1], 'ace');
    const card3 = new Card(suits[2], '8');

    player.addCard(card1);
    player.addCard(card2);
    player.addCard(card3);
    const hand = player.getHand();

    expect(hand.points).toBe(14);
    expect(hand.nameOfTheHand).toBe('14');
    expect(hand.cards).toEqual([card1, card2, card3]);
  });

  test('adds multiple cards and busts hand', () => {
    const player = new Hand();
    const card1 = new Card(suits[0], '8');
    const card2 = new Card(suits[1], '8');
    const card3 = new Card(suits[2], '8');

    player.addCard(card1);
    player.addCard(card2);
    player.addCard(card3);
    const hand = player.getHand();

    expect(hand.points).toBe(24);
    expect(hand.nameOfTheHand).toBe('Bust');
    expect(hand.cards).toEqual([card1, card2, card3]);
  });

  test('adds multiple non-ace cards of a total more than 10 and multiple ace card and updates points properly', () => {
    const player = new Hand();
    const card1 = new Card(suits[0], '5');
    const card2 = new Card(suits[1], 'ace');
    const card3 = new Card(suits[2], '8');
    const card4 = new Card(suits[3], 'ace');

    player.addCard(card1);
    player.addCard(card2);
    player.addCard(card3);
    player.addCard(card4);
    const hand = player.getHand();

    expect(hand.points).toBe(15);
    expect(hand.nameOfTheHand).toBe('15');
    expect(hand.cards).toEqual([card1, card2, card3, card4]);
  });

  test('resets hand', () => {
    const player = new Hand();
    const card = new Card(suits[0], '5');
  
    player.addCard(card);
    const oldHand = player.getHand();

    player.resetHand();
    const newHand = player.getHand();

    expect(oldHand.points).toBe(5);
    expect(oldHand.nameOfTheHand).toBe('5');
    expect(oldHand.cards).toEqual([card]);
    expect(newHand.points).toBe(0);
    expect(newHand.nameOfTheHand).toBe('0');
    expect(newHand.cards).toEqual([]);
  });

  test('returns hand details', () => {
    const player = new Hand();
    const card = new Card(suits[0], '5');
  
    player.addCard(card);
    const hand = player.getHand();

    expect(hand.points).toBe(5);
    expect(hand.nameOfTheHand).toBe('5');
    expect(hand.cards).toEqual([card]);
  });
});
