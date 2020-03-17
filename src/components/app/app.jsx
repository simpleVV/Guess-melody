import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';

class App extends PureComponent {
  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {
        gameTime,
        errorCount
      } = props;

      return <WelcomeScreen
        time = {gameTime}
        errorCount = {errorCount}
        onWelcomButtonClick = {onUserAnswer}
      />;
    }

    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`:
        return <GenreQuestionScreen
          screenIndex = {question}
          question = {questions[question]}
          onAnswer = {onUserAnswer}
        />;
      case `artist`:
        return <ArtistQuestionScreen
          screenIndex = {question}
          question = {questions[question]}
          onAnswer = {onUserAnswer}
        />;
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1
    };
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return App.getScreen(question, this.props, () => {
      this.setState((prevState) => {
        const nextIndex = prevState.question + 1;
        const isEnd = nextIndex >= questions.length;

        return {
          question: !isEnd ? nextIndex : -1,
        };
      });
    });
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape(
      {
        type: PropTypes.oneOf([`genre`, `artist`]),
        genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
        song: PropTypes.shape(
            {
              artist: PropTypes.oneOf([`Jim Beam`, `John Snow`, `Jack Daniels`]),
              src: PropTypes.string
            }
        ),
        answers: PropTypes.arrayOf(PropTypes.shape(
            {
              src: PropTypes.string,
              picture: PropTypes.string,
              genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
              artist: PropTypes.oneOf([`Jim Beam`, `John Snow`, `Jack Daniels`])
            }
        ))
      }
  ))
};

export default App;
