import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false)
      };

      this.answerHandler = this.answerHandler.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers = {answers}
          onAnswer = {this.answerHandler}
          onChange = {this.changeHandler}
        />
      );
    }

    answerHandler() {
      const {
        question,
        onAnswer
      } = this.props;

      const {answers} = this.state;

      onAnswer(answers, question);
    }

    changeHandler(index) {
      const userAnswers = [...this.state.answers];
      userAnswers[index] = !userAnswers[index];
      this.setState({
        answers: userAnswers
      });
    }
  }

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape(
        {
          type: PropTypes.oneOf([`genre`]),
          genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
          answers: PropTypes.arrayOf(
              PropTypes.shape(
                  {
                    src: PropTypes.string,
                    genre: PropTypes.oneOf([`rock`, `pop`, `jazz`])
                  }
              ))
        }
    )
  };

  return WithUserAnswer;
};

export default withUserAnswer;
