import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player.jsx';

const mockTrackSrc = `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`;
const mockElement = <audio/>;

describe(`The component is rendered correctly.`, () => {
  it(`Audio player correctly render with transferred mock track.`, () => {
    const audioPlayer = renderer.
    create(
        <AudioPlayer
          isPlaying={true}
          isLoading={true}
          src = {mockTrackSrc}
          onPlayButtonClick = {jest.fn()}>
          {mockElement}
        </AudioPlayer>
    )
    .toJSON();

    expect(audioPlayer).toMatchSnapshot();
  });
});
