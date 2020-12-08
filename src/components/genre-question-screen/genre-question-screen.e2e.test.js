import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockQuestion = {
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
      genre: `pop`
    }
  ]
};
const mockAnswers = [false, false, false, false];
const answerSubmitHandler = jest.fn();
const renderPlayer = jest.fn();
const changeHandler = jest.fn();

describe(`The component interactivity`, () => {
  it(`Calls callback when user Click on submit button`, () => {
    const genreQuestionScreen = shallow(<GenreQuestionScreen
      screenIndex = {0}
      question = {mockQuestion}
      onAnswer = {answerSubmitHandler}
      renderPlayer = {renderPlayer}
      userAnswers = {mockAnswers}
      onChange = {changeHandler}
    />);

    const form = genreQuestionScreen.find(`.game__tracks`);

    form.simulate(`submit`, {
      preventDefault: () => {}
    });

    expect(answerSubmitHandler).toHaveBeenCalledTimes(1);
    expect(answerSubmitHandler.mock.calls[0][0]).toEqual(void 0);
  });
});
