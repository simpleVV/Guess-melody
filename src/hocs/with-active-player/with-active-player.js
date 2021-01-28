import React from 'react';
import {PureComponent} from 'react';

import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withAudio from '../with-audio/with-audio.js';

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1
      };

      this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
    }

    render() {
      const {activePlayer} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer = {(audio, i) => {
            return (
              <AudioPlayerWrapped
                key = {i}
                src={audio.src}
                isPlaying={i === activePlayer}
                onPlayButtonClick={() => this._playButtonClickHandler(i)} />
            );
          }} />
      );
    }

    _playButtonClickHandler(currentPlayer) {
      this.setState((prevState) => ({
        activePlayer: prevState.activePlayer === currentPlayer ? -1 : currentPlayer
      }));
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
