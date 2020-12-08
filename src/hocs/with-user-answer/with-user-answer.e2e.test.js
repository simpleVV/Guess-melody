import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withUserAnswer from './with-user-answer.js';

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
const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);
const answerHandler = jest.fn();

describe(`The component interactivity`, () => {
  it(`Should change answers`, () => {
    const mockComponentWrapped = shallow(<MockComponentWrapped
      question = {mockQuestion}
      onAnswer = {answerHandler}
    />);

    expect(mockComponentWrapped.props().userAnswers).toEqual([false, false, false, false]);

    mockComponentWrapped.props().onChange(0, true);
    expect(mockComponentWrapped.props().userAnswers).toEqual([true, false, false, false]);

    mockComponentWrapped.props().onChange(0, false);
    expect(mockComponentWrapped.props().userAnswers).toEqual([false, false, false, false]);

    mockComponentWrapped.props().onChange(2, true);
    expect(mockComponentWrapped.props().userAnswers).toEqual([false, false, true, false]);
  });
});
