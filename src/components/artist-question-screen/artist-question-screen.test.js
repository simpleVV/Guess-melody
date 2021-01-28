import React from 'react';
import renderer from 'react-test-renderer';

import ArtistQuestionScreen from './artist-question-screen.jsx';

const question = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/6/64
        /Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
  },
  answers: [
    {
      picture: `http://placehold.it/134x134`,
      artist: `John Snow`
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Jack Daniels`
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Jim Beam`
    },
  ]
};

describe(`The component is rendered correctly.`, () => {
  it(`ArtistQuestionScreen is renders correctly.`, () => {
    const artistQuestionScreen = renderer
    .create(
        <ArtistQuestionScreen
          question = {question}
          onAnswer = {jest.fn()}
          renderPlayer = {jest.fn()}
          screenIndex = {1} />
    )
    .toJSON();

    expect(artistQuestionScreen).toMatchSnapshot();
  });
});
