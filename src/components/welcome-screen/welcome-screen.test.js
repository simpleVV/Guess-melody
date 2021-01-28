import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen.jsx';

describe(`The component is rendered correctly.`, () => {
  it(`WelcomeScreen correctly render after relaunch.`, () => {
    const welcomeScreen = renderer
      .create(
          <WelcomeScreen
            time = {7}
            errorCount = {4}
            onWelcomButtonClick = {jest.fn()} />
      )
      .toJSON();

    expect(welcomeScreen).toMatchSnapshot();
  });
});
