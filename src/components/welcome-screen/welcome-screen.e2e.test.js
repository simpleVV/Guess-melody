import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const welcomButtonclickHandler = jest.fn();

describe(`The component interactivity`, () => {
  it(`Will be called callback, if click on the game launch button`, () => {
    const welcomeScreen = shallow(<WelcomeScreen
      time = {7}
      errorCount = {4}
      onWelcomButtonClick = {welcomButtonclickHandler}
    />);

    const welcomeButton = welcomeScreen.find(`.welcome__button`);
    welcomeButton.simulate(`click`);

    expect(welcomButtonclickHandler).toHaveBeenCalledTimes(1);
  });
});
