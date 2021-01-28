import React from 'react';
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import SignIn from '../../components/sign-in/sign-in.jsx';
import GameScreen from '../../components/game-screen/game-screen.jsx';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen.jsx';
import GameOverScreen from '../../components/game-over-screen/game-over-screen.jsx';
import WinScreen from '../../components/win-screen/win-screen.jsx';
import {FailMessage} from '../../utils/const.js';
import withActivePlayer from '../with-active-player/with-active-player.js';
import withUserAnswer from '../with-user-answer/with-user-answer.js';
import withPrivateRoute from '../with-private-route/with-private-route.js';
import {ActionCreator as GameActionCreator} from '../../reducer/game/game-action-creator.js';
import {
  getStep,
  getErrorCount,
  getIsTimerStop,
  getMinutes,
  getMistakes
} from '../../reducer/game/selectors.js';

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const WinScreenWrapped = withPrivateRoute(WinScreen);


const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      const {
        onReset,
      } = this.props;

      return (
        <Router>
          <Switch>
            <Route
              path = "/"
              exact
              render = {() =>
                <Component
                  {...this.props}
                  renderScreen = {this._getScreen} />
              } />
            <Route
              path = "/win"
              exact
              render = {() =>
                <WinScreenWrapped
                  onReplayButtonClick = {onReset} />
              } />
            <Route
              path="/lose"
              exact
              render = {() =>
                <GameOverScreen
                  message = {FailMessage.ATTEMPTS_ENDED} />
              } />
          </Switch>
          <Route
            path = "/sign-in"
            exact
            render = {() => <SignIn/>} />
        </Router>
      );
    }

    _getScreen(question) {
      const {
        errorCount,
        onWelcomButtonClick,
        minutes,
        step,
        mistakes,
        isTimerStop,
        onUserAnswer,
        onReset
      } = this.props;

      if (!question) {
        return <WelcomeScreen
          time = {minutes}
          errorCount = {errorCount}
          onWelcomButtonClick = {onWelcomButtonClick} />;
      }

      if (isTimerStop) {
        return <GameOverScreen
          onReplayButtonClick = {onReset}
          message = {FailMessage.TIME_UP} />;
      }

      if (mistakes >= errorCount) {
        return <Redirect to = "/lose" />;
      }

      if (step >= 2) {
        return <Redirect to = "/win" />;
      }

      switch (question.type) {
        case `genre`:
          return (
            <GameScreen
              type = {question.type}>
              <GenreQuestionScreenWrapped
                screenIndex = {step}
                question = {question}
                onAnswer = {onUserAnswer} />
            </GameScreen>
          );
        case `artist`:
          return (
            <GameScreen
              type = {question.type}>
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

  WithScreenSwitch.propTypes = {
    errorCount: PropTypes.number.isRequired,
    onWelcomButtonClick: PropTypes.func.isRequired,
    minutes: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    isTimerStop: PropTypes.bool.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: getStep(state),
  isTimerStop: getIsTimerStop(state),
  minutes: getMinutes(state),
  errorCount: getErrorCount(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomButtonClick: () => dispatch(GameActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(GameActionCreator.incrementStep());
    dispatch(GameActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  },
  onReset: () => dispatch(GameActionCreator.reset()),
});

export {withScreenSwitch};

export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);
