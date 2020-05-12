import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    const {question} = this.props;
    const {answers} = question;

    this.state = {
      activePlayer: -1,
      userAnswers: new Array(answers.length).fill(false)
    };
  }

  render() {

    const {
      screenIndex,
      question,
      onAnswer
    } = this.props;

    const {
      answers,
      genre
    } = question;

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
        <form className="game__tracks"
          onSubmit = {(evt) => {
            evt.preventDefault();
            onAnswer(this.state.userAnswers);
          }}>
          {answers.map((answer, i) => {
            return <div key = {`${screenIndex}-answer + ${i}`} className="track">
              <AudioPlayer
                src ={answer.src}
                isPlaying={i === this.state.activePlayer}
                onPlayButtonClick={() => this.setState({
                  activePlayer: this.state.activePlayer === i ? -1 : i
                })}
              />
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer"
                  checked = {this.state.userAnswers[i]}
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  onChange={() => {
                    const userAnswers = [...this.state.userAnswers];
                    userAnswers[i] = !userAnswers[i];
                    this.setState({userAnswers});
                  }}/>
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>;
          })}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>;
  }
}

GenreQuestionScreen.propTypes = {
  screenIndex: PropTypes.number,
  onAnswer: PropTypes.func,
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

export default GenreQuestionScreen;
