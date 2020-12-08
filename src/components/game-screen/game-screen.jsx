import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {GameActionCreator} from '../../reducer/game/game-action-creator.js';
import {
  getGameTime,
  getMistakes,
  getErrorCount
} from '../../reducer/game/selectors.js';

import Mistakes from '../mistakes/mistakes.jsx';
import Timer from '../timer/timer.jsx';

const GameScreen = (props) => {
  const {
    children,
    type,
    gameTime,
    onTimeUpdate,
    errorCount,
    mistakes,
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
  type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  gameTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  gameTime: getGameTime(state),
  mistakes: getMistakes(state),
  errorCount: getErrorCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onTimeUpdate: (gameTime) => dispatch(GameActionCreator.decrementTime(gameTime))
});

export {GameScreen};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
