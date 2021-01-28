import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import WinScreen from './win-screen.jsx';

describe(`The component is rendered correctly.`, () => {
  it(`Win screen is renders correctly.`, () => {
    const winScreen = renderer
    .create(
        <BrowserRouter>
          <WinScreen
            onReplayButtonClick = {jest.fn()}
          />
        </BrowserRouter>
    )
    .toJSON();

    expect(winScreen).toMatchSnapshot();
  });
});
