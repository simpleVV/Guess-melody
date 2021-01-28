import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

let welcomeButtonClickHandler;
let welcomeButton;
let welcomeScreen;

beforeEach(() => {
  welcomeButtonClickHandler = jest.fn();
  welcomeScreen = shallow(
      <WelcomeScreen
        time = {7}
        errorCount = {4}
        onWelcomButtonClick = {welcomeButtonClickHandler} />
  );
  welcomeButton = welcomeScreen.find(`.welcome__button`);
});

describe(`Before clicking on welcome button.`, () => {
  it(`Callback should not be called.`, () => {
    expect(welcomeButtonClickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking on welcome button.`, () => {
  it(`Callback should be called once.`, () => {
    welcomeButton.simulate(`click`);

    expect(welcomeButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
