import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {isPlaying} = this.state;

    const {
      screenIndex,
      question,
      onAnswer
    } = this.props;

    const {
      song,
      answers
    } = question;

    return <section className="game game--artist">
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
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <AudioPlayer
            src={song.src}
            isPlaying={isPlaying}
            onPlayButtonClick={() => this.setState({isPlaying: !isPlaying})}
          />
        </div>

        <form className="game__artist">
          {answers.map((answer, i) => {
            return <div key = {`${screenIndex}-answer + ${i}`} className="artist">
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`} onChange = {(evt) => onAnswer(evt.target.value)}/>
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist}/>
                {answer.artist}
              </label>
            </div>;
          })}
        </form>
      </section>
    </section>;
  }
}

ArtistQuestionScreen.propTypes = {
  screenIndex: PropTypes.number,
  onAnswer: PropTypes.func,
  question: PropTypes.shape(
      {
        type: PropTypes.oneOf([`artist`]),
        song: PropTypes.shape(
            {
              artist: PropTypes.oneOf([`Jim Beam`, `John Snow`, `Jack Daniels`]),
              src: PropTypes.string,
            }
        ),
        answers: PropTypes.arrayOf(PropTypes.shape(
            {
              picture: PropTypes.string,
              artist: PropTypes.oneOf([`Jim Beam`, `John Snow`, `Jack Daniels`])
            }
        ))
      }
  )
};

export default ArtistQuestionScreen;
