import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';

const question = {
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `rock`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `pop`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `jazz`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `rock`
    }
  ]
};
const mockAnswers = new Array(question.answers.length).fill(false);

describe(`The component is rendered correctly.`, () => {
  it(`GenreQuestionScreen correctly renders with transferred mock-question.`, () => {
    const genreQuestionScreen = renderer
    .create(
        <GenreQuestionScreen
          question = {question}
          onAnswer = {jest.fn()}
          renderPlayer = {jest.fn()}
          onChange = {jest.fn()}
          userAnswers = {mockAnswers}
          screenIndex = {0} />
    )
    .toJSON();

    expect(genreQuestionScreen).toMatchSnapshot();
  });
});
