import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenreItem from './genre-screen-item.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockAnswer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
  genre: `rock`
};
let genreItem;
let gameInputChangeHandler;
let gameInput;

beforeEach(() => {
  gameInputChangeHandler = jest.fn();
  genreItem = shallow(
      <GenreItem
        answer = {mockAnswer}
        id = {1}
        renderPlayer = {jest.fn()}
        screenIndex = {10}
        userAnswer = {false}
        onChange = {gameInputChangeHandler} />
  );

  gameInput = genreItem.find(`.game__input`);
});

describe(`Before change game input.`, () => {
  it(`Callback should not be called.`, () => {
    expect(gameInputChangeHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking on game input.`, () => {
  it(`Callback should be called once with id genre item.`, () => {
    gameInput.simulate(`change`);

    expect(gameInputChangeHandler).toHaveBeenCalledTimes(1);
    expect(gameInputChangeHandler.mock.calls[0][0]).toEqual(1);
  });
});
