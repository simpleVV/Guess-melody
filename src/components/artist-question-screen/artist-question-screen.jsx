import React from 'react';
import PropTypes from 'prop-types';

const ArtistQuestionScreen = (props) => {
  const {
    screenIndex,
    question,
    onAnswer,
    renderPlayer
  } = props;

  const {
    song,
    answers
  } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        {renderPlayer(song, screenIndex)}
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => {
          return <div key = {`${screenIndex}-answer.artist + ${i}`} className="artist">
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              value = {`answer-${i}`}
              id = {`answer-${i}`}
              onClick = {() => onAnswer(answer, question)}/>
            <label
              className="artist__name"
              htmlFor = {`answer-${i}`}>
              <img
                className="artist__picture"
                src = {answer.picture}
                alt = {answer.artist}/>
              {answer.artist}
            </label>
          </div>;
        })}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  question: PropTypes.shape(
      {
        type: PropTypes.oneOf([`artist`]),
        song: PropTypes.shape(
            {
              artist: PropTypes.string.isRequired,
              src: PropTypes.string,
            }
        ).isRequired,
        answers: PropTypes.arrayOf(
            PropTypes.shape(
                {
                  picture: PropTypes.string,
                  artist: PropTypes.string.isRequired
                }
            )).isRequired
      }
  )
};

export default ArtistQuestionScreen;
