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

  const PLAYER_INDEX = 0;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        {renderPlayer(song, PLAYER_INDEX)}
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => {
          return <div key = {`${screenIndex}-answer + ${i}`} className="artist">
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
  screenIndex: PropTypes.number,
  onAnswer: PropTypes.func,
  renderPlayer: PropTypes.func.isRequired,
  question: PropTypes.shape(
      {
        type: PropTypes.oneOf([`artist`]),
        song: PropTypes.shape(
            {
              artist: PropTypes.oneOf([`Jim Beam`, `John Snow`, `Jack Daniels`]),
              src: PropTypes.string,
            }
        ),
        answers: PropTypes.arrayOf(
            PropTypes.shape(
                {
                  picture: PropTypes.string,
                  artist: PropTypes.oneOf([`Jim Beam`, `John Snow`, `Jack Daniels`])
                }
            ))
      }
  )
};

export default ArtistQuestionScreen;
