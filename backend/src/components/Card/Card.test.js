import { Card } from './Card.js';
import { suits, ranks } from '../../constants.js';

describe('Card', () => {
  test('returns a card suit and rank', () => {
    const card = new Card(suits[0], ranks[0]);

    expect(card.suit).toBe(suits[0]);
    expect(card.rank).toBe(ranks[0]);
  });
});
