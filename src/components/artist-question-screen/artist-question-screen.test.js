import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';

describe(`The component is rendered correctly`, () => {
  it(`ArtistQuestionScreen correctly render with transferred mock-question`, () => {
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

    const artistQuestionScreen = renderer
    .create(<ArtistQuestionScreen
      question = {question}
      onAnswer = {jest.fn()}
    />)
    .toJSON();

    expect(artistQuestionScreen).toMatchSnapshot();
  });
});
