import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

const mockQuestions = {
  questions: [
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
  ]
};

const settings = {
  time: 7,
  errorCount: 4
};

describe(`The component is rendered correctly`, () => {
  it(`App correctly renders welcome screem`, () => {
    const {questions} = mockQuestions;
    const {
      time,
      errorCount
    } = settings;

    const appComponent = renderer
      .create(<App
        step = {-1}
        mistakes = {0}
        gameTime = {time}
        minutes = {5}
        errorCount = {errorCount}
        questions = {questions}
        onUserAnswer = {jest.fn()}
        onWelcomButtonClick = {jest.fn()}
        onTimeUpdate = {jest.fn()}
        onReset = {jest.fn()}
      />).toJSON();

    expect(appComponent).toMatchSnapshot();
  });

  it(`App correctly renders genre question screen`, () => {
    const {questions} = mockQuestions;
    const {
      time,
      errorCount
    } = settings;

    const appComponent = renderer
      .create(<App
        step = {0}
        mistakes = {0}
        gameTime = {time}
        minutes = {5}
        errorCount = {errorCount}
        questions = {questions}
        onUserAnswer = {jest.fn()}
        onWelcomButtonClick = {jest.fn()}
        onTimeUpdate = {jest.fn()}
        onReset = {jest.fn()}
      />).toJSON();

    expect(appComponent).toMatchSnapshot();
  });

  it(`App correctly renders artist question screen`, () => {
    const {questions} = mockQuestions;
    const {
      time,
      errorCount,
    } = settings;

    const appComponent = renderer
      .create(<App
        step = {1}
        mistakes = {0}
        gameTime = {time}
        minutes = {5}
        errorCount = {errorCount}
        questions = {questions}
        onUserAnswer = {jest.fn()}
        onWelcomButtonClick = {jest.fn()}
        onTimeUpdate = {jest.fn()}
        onReset = {jest.fn()}
      />).toJSON();

    expect(appComponent).toMatchSnapshot();
  });
  it(`App correctly renders end-time screen`, () => {
    const {questions} = mockQuestions;
    const {
      errorCount,
    } = settings;

    const appComponent = renderer
      .create(<App
        step = {1}
        mistakes = {0}
        gameTime = {0}
        minutes = {5}
        errorCount = {errorCount}
        questions = {questions}
        onUserAnswer = {jest.fn()}
        onWelcomButtonClick = {jest.fn()}
        onTimeUpdate = {jest.fn()}
        onReset = {jest.fn()}
      />).toJSON();

    expect(appComponent).toMatchSnapshot();
  });
});
