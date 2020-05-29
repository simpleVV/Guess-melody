import React from 'react';
import renderer from 'react-test-renderer';
import FailTime from './fail-time.jsx';

describe(`The component is rendered correctly`, () => {
  it(`Fail time component correctly render`, () => {
    const failTime = renderer
    .create(<FailTime
      onReplayButtonClick = {jest.fn()}
    />)
    .toJSON();

    expect(failTime).toMatchSnapshot();
  });
});
