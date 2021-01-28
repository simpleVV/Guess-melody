import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WinScreen from './win-screen.jsx';

Enzyme.configure({adapter: new Adapter()});


let replayClickHandler;
let winScreen;
let replayButton;

beforeEach(() => {
  replayClickHandler = jest.fn();
  winScreen = shallow(
      <WinScreen
        onReplayButtonClick = {replayClickHandler} />
  );
  replayButton = winScreen.find(`.replay`);
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
