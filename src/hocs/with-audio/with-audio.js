import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();
      this.state = {
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

        audio.oncanplay = () => this.setState({
          isLoading: false
        });

        audio.onplay = () => this.setState({
          isPlaying: true
        });

        audio.onpause = () => this.setState({
          isPlaying: false
        });
      }
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      return (this.props.isPlaying) ? audio.play() : audio.pause();
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplay = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.src = null;
    }

    render() {
      const {
        isLoading,
        isPlaying
      } = this.state;

      return (
        <Component
          {...this.props}
          isLoading = {isLoading}
          isPlaying = {isPlaying}
          onPlayButtonClick = {this._playButtonClickHandler}>
          <audio
            ref={this._audioRef} />
        </Component>
      );
    }

    _playButtonClickHandler() {
      this.props.onPlayButtonClick();
      this.setState({
        isPlaying: !this.state.isPlaying
      });
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired
  };

  return WithAudio;
};

export default withAudio;
