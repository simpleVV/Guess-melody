import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/action-creator.js';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import FailTime from '../fail-time/fail-time.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player.js';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.js';

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

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
        onWelcomButtonClick,
        minutes
      } = this.props;

      return <WelcomeScreen
        time = {minutes}
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
      step
    } = this.props;

    switch (question.type) {
      case `genre`:
        return (
          <GameScreen
            type = {question.type}
          >
            <GenreQuestionScreenWrapped
              screenIndex = {step}
              question = {question}
              onAnswer = {onUserAnswer}/>
          </GameScreen>
        );
      case `artist`:
        return (
          <GameScreen
            type = {question.type}
          >
            <ArtistQuestionScreenWrapped
              screenIndex = {step}
              question = {question}
              onAnswer = {onUserAnswer}/>
          </GameScreen>
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
  minutes: PropTypes.number.isRequired,
  onWelcomButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
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
  minutes: state.minutes,
  errorCount: state.errorCount
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomButtonClick: () => dispatch(ActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  },
  onReset: () => dispatch(ActionCreator.reset())
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
