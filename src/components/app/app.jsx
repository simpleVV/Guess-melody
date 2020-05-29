import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/action-creator.js';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import FailTime from '../fail-time/fail-time.jsx';
import Header from '../header/header.jsx';

class App extends PureComponent {
  render() {
    const {
      questions,
      step,
      gameTime,
    } = this.props;

    return (
      this._getScreen(questions[step], gameTime)
    );
  }

  _getScreen(question, gameTime) {
    if (!question) {
      const {
        errorCount,
        onWelcomButtonClick
      } = this.props;

      return <WelcomeScreen
        time = {gameTime}
        errorCount = {errorCount}
        onWelcomButtonClick = {onWelcomButtonClick}
      />;
    }

    if (gameTime <= 0) {
      const {onReset} = this.props;

      return <FailTime
        onReplayButtonClick = {onReset}
      />;
    }

    const {
      onUserAnswer,
      onTimeUpdate,
      mistakes,
      errorCount,
      step
    } = this.props;

    switch (question.type) {
      case `genre`:
        return (
          <section className={`game game--${question.type}`}>
            <Header
              mistakes = {mistakes}
              errorCount = {errorCount}
              gameTime = {gameTime}
              onTimeUpdate = {onTimeUpdate}
            />
            <GenreQuestionScreen
              screenIndex = {step}
              question = {question}
              onAnswer = {(userAnswer) => onUserAnswer(
                  userAnswer,
                  question,
                  mistakes,
                  errorCount
              )}/>
          </section>
        );
      case `artist`:
        return (
          <section className={`game game--${question.type}`}>
            <Header
              mistakes = {mistakes}
              errorCount = {errorCount}
              gameTime = {gameTime}
              onTimeUpdate = {onTimeUpdate}
            />
            <ArtistQuestionScreen
              screenIndex = {step}
              question = {question}
              onAnswer = {(userAnswer) => onUserAnswer(
                  userAnswer,
                  question,
                  mistakes,
                  errorCount
              )}/>
          </section>
        );
    }
    return null;
  }
}

App.propTypes = {
  step: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  onWelcomButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape(
          ArtistQuestionScreen.question,
          GenreQuestionScreen.question)
  )
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  gameTime: state.gameTime,
  errorCount: state.errorCount
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomButtonClick: () => dispatch(ActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  },
  onTimeUpdate: (gameTime) => dispatch(ActionCreator.decrementTime(gameTime)),
  onReset: () => dispatch(ActionCreator.reset())
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
