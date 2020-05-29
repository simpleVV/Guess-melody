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

    return (
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
    );
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
