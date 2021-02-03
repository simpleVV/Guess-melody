import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game-action-creator.js';
import {getGameTime} from '../../reducer/game/selectors.js';
import {convertTime} from '../../utils/utils.js';

class Timer extends PureComponent {
  constructor(props) {
    super(props);

    this._tick = this._tick.bind(this);
  }

  componentDidMount() {
    this._startTimer();
  }

  componentWillUnmount() {
    this._stopTimer();
  }

  render() {
    const {gameTime} = this.props;
    const [minutes, seconds] = convertTime(gameTime);

    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">{`${minutes.toString().padStart(2, `0`)}`}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{`${seconds.toString().padStart(2, `0`)}`}</span>
      </div>
    );
  }

  _startTimer() {
    this.timer = setInterval(this._tick, this.props.milSecInSec);
  }

  _stopTimer() {
    clearInterval(this.timer);
  }

  _tick() {
    const {
      gameTime,
      onTimeUpdate,
      onTimerStop
    } = this.props;

    if (!gameTime) {
      onTimerStop();
    }

    onTimeUpdate(gameTime);
  }

}

Timer.defaultProps = {
  milSecInSec: 1000
};

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  milSecInSec: PropTypes.number,
  onTimerStop: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  gameTime: getGameTime(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTimeUpdate: (gameTime) => dispatch(GameActionCreator.decrementTime(gameTime)),
  onTimerStop: () => dispatch(GameActionCreator.stopTimer())
});

export {Timer};
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
