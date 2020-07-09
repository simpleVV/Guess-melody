import React from 'react';
import PropTypes from 'prop-types';

import Mistakes from '../mistakes/mistakes.jsx';
import Timer from '../timer/timer.jsx';

const GameScreen = (props) => {
  const {
    children,
    gameTime,
    onTimeUpdate,
    mistakes,
    errorCount,
    type
  } = props;

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <Timer
          gameTime = {gameTime}
          onTimeUpdate = {onTimeUpdate}
        />

        <Mistakes
          mistakes = {mistakes}
          errorCount = {errorCount}
        />
      </header>

      {children}
    </section>
  );
};

GameScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  type: PropTypes.oneOf([`genre`, `artist`]),
  mistakes: Mistakes.propTypes.mistakes,
  errorCount: Mistakes.propTypes.errorCount,
  onTimeUpdate: Timer.propTypes.onTimeUpdate,
  gameTime: Timer.propTypes.gameTime
};

export default GameScreen;
