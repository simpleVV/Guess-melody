import React from 'react';
import PropTypes from 'prop-types';

const GenreQuestionScreen = ({screenIndex, question, onAnswer}) => {
  const {
    answers,
    genre
  } = question;
  const inputArray = [];
  const getInputsValues = () => {
    const userAnswers = [];

    inputArray.forEach((answer) => {
      if (answer.checked) {
        userAnswers.push(answer.value);
      }
    });
    return userAnswers;
  };

  return <section className="game game--genre">
    <header className="game__header">
      <a className="game__back" href="#">
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370"
          style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
      </svg>

      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">05</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">00</span>
      </div>

      <div className="game__mistakes">
        <div className="wrong"></div>
        <div className="wrong"></div>
        <div className="wrong"></div>
      </div>
    </header>

    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit = {(evt) => {
        evt.preventDefault();
        onAnswer(getInputsValues());
      }}>
        {answers.map((answer, i) => {
          return <div key = {`${screenIndex}-answer + ${i}`} className="track">
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio></audio>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} ref={(elem) => (inputArray.push(elem))}/>
              <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
            </div>
          </div>;
        })}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>;
};

GenreQuestionScreen.propTypes = {
  screenIndex: PropTypes.number,
  onAnswer: PropTypes.func,
  question: PropTypes.shape(
      {
        type: PropTypes.oneOf([`genre`]),
        genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]),
        answers: PropTypes.arrayOf(PropTypes.shape(
            {
              src: PropTypes.string,
              genre: PropTypes.oneOf([`rock`, `pop`, `jazz`])
            }
        ))
      }
  )
};

export default GenreQuestionScreen;
