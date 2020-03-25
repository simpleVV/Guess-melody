import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`The component interactivity`, () => {
  it(`Return correct data then user answer on question`, () => {
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

    const answerSubmitHandler = jest.fn();
    const genreQuestionScreen = shallow(<GenreQuestionScreen
      screenIndex = {0}
      question = {mockQuestion}
      onAnswer = {answerSubmitHandler}
    />);

    const form = genreQuestionScreen.find(`.game__tracks`);

    form.simulate(`submit`, {
      preventDefault: () => {}
    });

    expect(answerSubmitHandler).toHaveBeenCalledTimes(1);
    expect(answerSubmitHandler.mock.calls[0][0]).toEqual(expect.any(Array));
  });
});
