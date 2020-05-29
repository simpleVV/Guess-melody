import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

describe(`The component is rendered correctly`, () => {
  it(`Header component correctly renders with transferred mock data`, () => {
    const header = renderer
    .create(<Header
      mistakes = {0}
      errorCount = {3}
      gameTime = {5}
      onTimeUpdate = {jest.fn()}
    />);

    expect(header).toMatchSnapshot();
  });
});
