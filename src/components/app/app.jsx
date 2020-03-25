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
  gameTime: WelcomeScreen.propTypes.time,
  errorCount: WelcomeScreen.propTypes.errorCount,
  questions: PropTypes.arrayOf(PropTypes.shape(
      ArtistQuestionScreen.question,
      GenreQuestionScreen.question)
  )
};

export default App;
