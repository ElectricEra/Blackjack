import React from 'react';

import { Card } from '../Card/Card';

import './Hand.css';

export const Hand = ({ name, cards, points, nameOfTheHand }) => {
  return (
    <div className="hand">
      <div className="hand-details">
        <div><b>{name}</b></div>
        <div>Points: {points}</div>
        <div>Name of the hand: {nameOfTheHand}</div>
      </div>
      <div className="hand-cards">
        {cards?.map((card, index) => {
          return <Card key={index} card={card} />
        })}
      </div>
    </div>
  )
};
