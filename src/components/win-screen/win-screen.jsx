import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game-action-creator.js';
import {
  getGameTime,
  getMistakes
} from '../../reducer/game/selectors.js';
import {convertTime} from '../../utils/utils.js';
import {UNIT} from '../../utils/const.js';

const WinScreen = (props) => {
  const {
    onReset,
    gameTime,
    mistakes
  } = props;

  const [minutes, seconds] = convertTime(gameTime);

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        {
          `За ${minutes} минут(${minutes === UNIT ? `у` : `ы`})
        ${seconds} секунд${seconds === UNIT ? `(у)` : ``}
         вы совершили ${mistakes} ошибки(${mistakes === UNIT ? `у` : `ok`})`
        }
      </p>
      <Link
        to="/"
        className="replay"
        type="button"
        onClick = {onReset}>
          Сыграть ещё раз
      </Link>
    </section>
  );
};

WinScreen.propTypes = {
  onReset: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: getMistakes(state),
  gameTime: getGameTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  onReset: () => dispatch(GameActionCreator.reset())
});

export {WinScreen};
export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);
