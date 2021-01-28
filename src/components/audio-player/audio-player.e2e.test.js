import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockTrackSrc = `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`;
const mockElement = <audio/>;
let playButtonClickHandler;
let audioPlayer;
let playButton;

beforeEach(() => {
  playButtonClickHandler = jest.fn();
  audioPlayer = shallow(
      <AudioPlayer
        isPlaying = {false}
        isLoading = {true}
        src = {mockTrackSrc}
        onPlayButtonClick = {playButtonClickHandler}>
        {mockElement}
      </AudioPlayer>
  );
  playButton = audioPlayer.find(`.track__button`);
});

describe(`Before clicking on play button.`, () => {
  it(`Callback should not be called.`, () => {
    expect(playButtonClickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking on play button.`, () => {
  it(`Callback should be called once.`, () => {
    playButton.simulate(`click`);

    expect(playButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
