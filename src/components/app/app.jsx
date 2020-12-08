import React from 'react';
import {PureComponent} from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {GameActionCreator} from '../../reducer/game/game-action-creator.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import {getAuthorizationUser} from '../../reducer/user/selectors.js';
import {
  getStep,
  getErrorCount,
  getGameTime,
  getMinutes
} from '../../reducer/game/selectors.js';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import AuthorizationScreen from '../authorization-screen/authorization-screen.jsx';
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
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {this._getScreen(questions[step], gameTime)}
          </Route>
          <Route path='/auth' exact>
            <AuthorizationScreen/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _getScreen(question, gameTime) {
    const {isAuthorizationRequired} = this.props;

    if (isAuthorizationRequired) {
      return <AuthorizationScreen/>;
    }

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
        onReset ={onReset}
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
  errorCount: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  onWelcomButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape(
          ArtistQuestionScreen.question,
          GenreQuestionScreen.question)
  ).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: getStep(state),
  gameTime: getGameTime(state),
  minutes: getMinutes(state),
  errorCount: getErrorCount(state),
  questions: getQuestions(state),
  isAuthorizationRequired: getAuthorizationUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomButtonClick: () => dispatch(GameActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(GameActionCreator.incrementStep());
    dispatch(GameActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  },
  onReset: () => dispatch(GameActionCreator.reset()),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
