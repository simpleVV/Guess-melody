import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';

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
        <span className="timer__mins">{minutes}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{(seconds < 10) ? `0${seconds}` : seconds}</span>
      </div>
    );
  }

  _startTimer() {
    const milSecInSec = 1000;
    this.timer = setInterval(this._tick, milSecInSec);
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
    const milSecInSec = 1000;
    const mins = Math.floor(gameTime / milSecInSec / secInMin);
    const secRemainOfMin = Math.floor((gameTime / milSecInSec) % secInMin);

    return [mins, secRemainOfMin];
  }
}

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired
};

export default Timer;
