import React from 'react';
import PropTypes from 'prop-types';

const GenreItem = (props) => {
  const {
    answer,
    id,
    renderPlayer,
    userAnswer,
    onChange,
    screenIndex
  } = props;

  const playerId = id + screenIndex;

  return (
    <div className="track">
      {renderPlayer(answer, playerId)}
      <div className="game__answer">
        <input
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          checked = {userAnswer}
          value = {`answer-${id}`}
          id = {`answer-${id}`}
          onChange = {
            () => onChange(id)} />
        <label
          className="game__check"
          htmlFor = {`answer-${id}`}>
            Отметить
        </label>
      </div>
    </div>
  );
};

GenreItem.propTypes = {
  renderPlayer: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  screenIndex: PropTypes.number.isRequired,
  userAnswer: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  answer: PropTypes.shape(
      {
        src: PropTypes.string,
        genre: PropTypes.string.isRequired
      }
  ).isRequired
};

export default GenreItem;
