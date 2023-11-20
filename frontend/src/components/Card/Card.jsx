import { GiSpades, GiClubs, GiHearts, GiDiamonds } from "react-icons/gi";
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ card }) => {
  const { suit, rank, isHidden } = card;

  const cardColor = suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';

  const getSuitIcon = (suit) => {
    switch (suit) {
      case 'spades':
        return (<GiSpades size={28} color={cardColor}/>)
      case 'hearts':
        return (<GiHearts size={28} color={cardColor} />)
      case 'clubs':
        return (<GiClubs size={28} color={cardColor} />)
      case 'diamonds':
        return (<GiDiamonds size={28} color={cardColor} />)
      default:
        return <span>{suit}</span>
    }
  };

  const getStyledRank = (rank) => {
    if (!rank || typeof rank !== 'string') {
      return ''
    }

    // Handle numbers
    if (/\d/.test(rank)) {
      return rank
    }

    // Handle face cards
    return rank[0].toUpperCase()
  }

  return (
    <div className='playable-card'>
      {!isHidden && (<>
        {getSuitIcon(suit)}
        <div className={`rank rank-${cardColor}`}>{getStyledRank(rank)}</div>
        </>)
      }

      {isHidden && (
        <div className="card-back">
          <div>Blackjack</div>
          <div>deck</div>
        </div>
      )}

    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    rank: PropTypes.string,
    isHidden: PropTypes.bool,
  })
}

export { Card };
