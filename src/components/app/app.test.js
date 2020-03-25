import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe(`The component is rendered correctly`, () => {
  it(`App correctly render with transferrd mock data`, () => {
    const mockQuestions = [
      {
        type: `genre`,
        genre: `rock`,
        answers: [
          {
            src: `https://upload.wikimedia.org/wikipedia/commons/6/64
                /Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
            genre: `rock`
          },
          {
            src: `https://upload.wikimedia.org/wikipedia/commons/6/64
                /Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
            genre: `pop`
          },
          {
            src: `https://upload.wikimedia.org/wikipedia/commons/6/64
                /Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
            genre: `jazz`
          },
          {
            src: `https://upload.wikimedia.org/wikipedia/commons/6/64
                /Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
            genre: `rock`
          }
        ]
      },
      {
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
      }
    ];

    const settings = {
      time: 7,
      errorCount: 4
    };

    const appComponent = renderer
      .create(<App
        gameTime = {settings.time}
        errorCount = {settings.errorCount}
        questions = {mockQuestions}
      />)
      .toJSON();

    expect(appComponent).toMatchSnapshot();
  });
});
