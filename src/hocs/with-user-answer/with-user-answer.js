import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.initialState = new Array(props.question.answers.length).fill(false);

      this.state = {
        answers: this.initialState
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
      const {answers} = this.state;
      const {
        question,
        onAnswer
      } = this.props;

      onAnswer(answers, question);

      this.setState({
        answers: this.initialState
      });
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
          genre: PropTypes.string.isRequired,
          answers: PropTypes.arrayOf(
              PropTypes.shape(
                  {
                    src: PropTypes.string,
                    genre: PropTypes.string.isRequired
                  }
              ))
        }
    )
  };

  return WithUserAnswer;
};

export default withUserAnswer;
