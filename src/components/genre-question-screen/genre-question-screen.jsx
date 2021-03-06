import React from 'react';
import PropTypes from 'prop-types';

import GenreItem from '../genre-screen-item/genre-screen-item.jsx';

const GenreQuestionScreen = (props) => {
  const {
    screenIndex,
    question,
    onAnswer,
    onChange,
    renderPlayer,
    userAnswers
  } = props;

  const {
    answers,
    genre
  } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks"
        onSubmit = {(evt) => {
          evt.preventDefault();
          onAnswer();
        }}>
        {answers.map((answer, i) => {
          return (
            <GenreItem
              key = {`${i} - ${answer.src}`}
              renderPlayer = {renderPlayer}
              screenIndex = {screenIndex}
              answer = {answer}
              userAnswer = {userAnswers[i]}
              onChange = {onChange}
              id = {i} />
          );
        })}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: GenreItem.propTypes.renderPlayer,
  question: PropTypes.shape(
      {
        genre: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(
            PropTypes.shape(
                {
                  src: PropTypes.string,
                  genre: PropTypes.string.isRequired
                }
            ))
      }
  ).isRequired
};

export default GenreQuestionScreen;
