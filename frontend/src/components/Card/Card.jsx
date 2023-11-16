import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ card }) => {
  const { suit, rank, isHidden } = card;

  return (
    <div className='playable-card'>
      {!isHidden && (<>
        <div>{suit}</div>
        <div>{rank}</div>
        </>)
      }
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
