import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer.js';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';

class App extends PureComponent {
  render() {
    const {
      questions,
      step
    } = this.props;

    return this._getScreen(questions[step]);
  }

  _getScreen(question) {
    if (!question) {
      const {
        gameTime,
        errorCount,
        onWelcomButtonClick
      } = this.props;

      return <WelcomeScreen
        time = {gameTime}
        errorCount = {errorCount}
        onWelcomButtonClick = {onWelcomButtonClick}
      />;
    }

    const {
      onUserAnswer,
      mistakes,
      errorCount,
      step
    } = this.props;

    switch (question.type) {
      case `genre`:
        return <GenreQuestionScreen
          screenIndex = {step}
          question = {question}
          onAnswer = {(userAnswer) => onUserAnswer(
              userAnswer,
              question,
              mistakes,
              errorCount
          )}
        />;
      case `artist`:
        return <ArtistQuestionScreen
          screenIndex = {step}
          question = {question}
          onAnswer = {(userAnswer) => onUserAnswer(
              userAnswer,
              question,
              mistakes,
              errorCount
          )}
        />;
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
  questions: PropTypes.arrayOf(
      PropTypes.shape(
          ArtistQuestionScreen.question,
          GenreQuestionScreen.question)
  )
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomButtonClick: () => dispatch(ActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
