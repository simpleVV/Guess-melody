import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/action-creator.js';

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
    const [minutes, seconds] = this._convertTime();

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
    const {gameTime} = this.props;
    this.props.onTimeUpdate(gameTime);
  }

  _convertTime() {
    const {gameTime} = this.props;
    const secInMin = 60;
    const mins = Math.floor(gameTime / this.props.milSecInSec / secInMin);
    const secRemainOfMin = Math.floor((gameTime / this.props.milSecInSec) % secInMin);

    return [mins, secRemainOfMin];
  }
}

Timer.defaultProps = {
  milSecInSec: 1000
};

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  milSecInSec: PropTypes.number
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  gameTime: state.gameTime,
});

const mapDispatchToProps = (dispatch) => ({
  onTimeUpdate: (gameTime) => dispatch(ActionCreator.decrementTime(gameTime)),
});

export {Timer};
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
