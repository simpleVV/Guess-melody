import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);


    this._audioRef = React.createRef();
    this.state = {
      progress: null,
      isLoading: true,
      isPlaying: props.isPlaying
    };

    this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    if (audio) {
      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false
      });

      audio.onplay = () => {
        this.setState({
          isPlaying: true
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false
      });

      audio.ontimeupdate = () => this.setState({
        progress: audio.currentTime
      });
    }
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      if (audio && audio.pause) {
        audio.pause();
      }
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    const {
      isLoading,
      isPlaying
    } = this.state;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._playButtonClickHandler}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </React.Fragment>
    );
  }

  _playButtonClickHandler() {
    this.props.onPlayButtonClick();
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};

export default AudioPlayer;
