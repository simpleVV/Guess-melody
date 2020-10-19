import React from 'react';
import renderer from 'react-test-renderer';

import {Timer} from './timer.jsx';

const mockTimeInMilSec = 300000;

describe(`The component is rendered correctly`, () => {
  it(`Timer component is rendered correctly with transferred mock time`, () => {
    const timer = renderer
      .create(<Timer
        gameTime = {mockTimeInMilSec}
        onTimeUpdate = {jest.fn()}
      />)
      .toJSON();

    expect(timer).toMatchSnapshot();
  });
});
