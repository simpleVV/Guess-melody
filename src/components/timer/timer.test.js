import React from 'react';
import renderer from 'react-test-renderer';
import Timer from './timer.jsx';

describe(`The component is rendered correctly`, () => {
  it(`Timer component is rendered correctly with transferred mock time`, () => {
    const mockTimeInMilSec = 300000;

    const timer = renderer
      .create(<Timer
        gameTime = {mockTimeInMilSec}
        onTimeUpdate = {jest.fn()}
      />)
      .toJSON();

    expect(timer).toMatchSnapshot();
  });
});
