import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {GenreQuestionScreen} from './genre-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockQuestion = {
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
      genre: `pop`
    }
  ]
};
const mockAnswers = [false, false, false, false];
const renderPlayer = jest.fn();
const changeHandler = jest.fn();
let answerSubmitHandler;
let genreQuestionScreen;
let form;

beforeEach(() => {
  answerSubmitHandler = jest.fn();
  genreQuestionScreen = mount(
      <GenreQuestionScreen
        screenIndex = {0}
        question = {mockQuestion}
        onAnswer = {answerSubmitHandler}
        renderPlayer = {renderPlayer}
        userAnswers = {mockAnswers}
        onChange = {changeHandler} />
  );
  form = genreQuestionScreen.find(`.game__tracks`);
});

describe(`Before submiting form.`, () => {
  it(`Callback should not be called.`, () => {
    expect(answerSubmitHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After submiting form.`, () => {
  it(`Callback should be called.`, () => {
    form.simulate(`submit`, (evt) => {
      evt.preventDefault();
    });

    expect(answerSubmitHandler).toHaveBeenCalledTimes(1);
    expect(answerSubmitHandler.mock.calls[0][0]).toEqual(void 0);
  });
});
