import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockTrackSrc = `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`;
const playButtonClickHandler = jest.fn();

describe(`The component interactivity`, () => {
  it(`Calls callback when user Click by play button`, () => {
    const audioPlayer = shallow(<AudioPlayer
      isPlaying = {false}
      isLoading = {true}
      src = {mockTrackSrc}
      onPlayButtonClick = {playButtonClickHandler}
    />);

    const playButton = audioPlayer.find(`.track__button`);

    playButton.simulate(`click`);
    expect(playButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
