import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getMistakes,
  getErrorCount
} from '../../reducer/game/selectors.js';

const Mistakes = (props) => {
  const {
    mistakes,
    errorCount
  } = props;

  const correctAnswers = new Array(errorCount - mistakes).fill(`correct`);
  const wrongAnswers = new Array(mistakes).fill(`wrong`);

  return (
    <div className="game__mistakes">
      {correctAnswers.map((answer, i) => {
        return (
          <div key = {`${answer}- ${i}`} className={answer}></div>
        );
      })}
      {wrongAnswers.map((answer, i) => {
        return (
          <div key = {`${answer}- ${i}`} className={answer}></div>
        );
      })}
    </div>
  );
};


Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: getMistakes(state),
  errorCount: getErrorCount(state)
});

export {Mistakes};
export default connect(mapStateToProps)(Mistakes);
