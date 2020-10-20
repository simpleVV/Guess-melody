import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/action-creator.js';

const FailTime = (props) => {
  const {onReset} = props;

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">Увы и ах!</h2>
      <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
      <button
        className="replay"
        type="button"
        onClick = {onReset}>
        Попробовать ещё раз</button>
    </section>
  );
};

FailTime.propTypes = {
  onReset: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  onReset: () => dispatch(ActionCreator.reset())
});

export {FailTime};
export default connect(mapStateToProps, mapDispatchToProps)(FailTime);
