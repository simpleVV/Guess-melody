import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameOverScreen from './game-over-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

let replayClickHandler;
let gameOverScreen;
let replayButton;
const mockMessage = {
  title: `Какая жалость!`,
  discription: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
};

beforeEach(() => {
  replayClickHandler = jest.fn();
  gameOverScreen = shallow(
      <GameOverScreen
        onReplayButtonClick = {replayClickHandler}
        message = {mockMessage} />
  );
  replayButton = gameOverScreen.find(`.replay`);
});

describe(`Before clicking on replay button.`, () => {
  it(`Callback should not be called.`, () => {
    expect(replayClickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking on replay button.`, () => {
  it(`Callback should be called once.`, () => {

    replayButton.simulate(`click`);

    expect(replayClickHandler).toHaveBeenCalledTimes(1);
  });
});
