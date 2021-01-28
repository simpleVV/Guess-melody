import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const GameOverScreen = (props) => {
  const {
    onReplayButtonClick,
    message
  } = props;

  const {
    title,
    discription
  } = message;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="result__title">{title}</h2>
      <p className="result__total result__total--fail">
        {discription}
      </p>
      <Link
        to="/"
        className="replay"
        type="button"
        onClick = {onReplayButtonClick}>
        Попробовать ещё раз
      </Link>
    </section>
  );
};

GameOverScreen.propTypes = {
  onReplayButtonClick: PropTypes.func.isRequired,
  message: PropTypes.shape(
      {
        title: PropTypes.string,
        discription: PropTypes.string
      }
  )
};

export default GameOverScreen;
