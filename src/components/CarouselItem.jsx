import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFavorite, deleteFavorite } from '../actions';

import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

function CarouselItem(props) {
  const { id, cover, title, contentRating, duration, year } = props;
  const handleSetFavorite = () => {
    props.setFavorite({
      id,
      cover,
      title,
      contentRating,
      year,
      duration
    });
  };

  const handleDeleteFavorite = (itemId) => {
    props.deleteFavorite(itemId);
  };
  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt='' />
      <div className='carousel-item__details'>
        <div>
          <img
            className='carousel-item__details--img'
            src={playIcon}
            alt='Play Icon'
          />
          <img
            className='carousel-item__details--img'
            src={plusIcon}
            alt='Plus Icon'
            onClick={handleSetFavorite}
          />

          <img
            className='carousel-item__details--img'
            src={removeIcon}
            alt='Plus Icon'
            onClick={() => handleDeleteFavorite(id)}
          />
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  year: PropTypes.number
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite
};

export default connect(null, mapDispatchToProps)(CarouselItem);
