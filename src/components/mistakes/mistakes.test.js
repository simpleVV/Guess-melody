import React from 'react';
import renderer from 'react-test-renderer';

import {Mistakes} from './mistakes.jsx';

describe(`The element is rendered correctly`, () => {
  it(`Mistakes element correctly renders if all answers correct`, () => {
    const mistakesElement = renderer
    .create(<Mistakes
      mistakes = {0}
      errorCount = {3}
    />);

    expect(mistakesElement).toMatchSnapshot();
  });

  it(`Mistakes element correctly renders if a few answers is incorrect`, () => {
    const mistakesElement = renderer
    .create(<Mistakes
      mistakes = {2}
      errorCount = {3}
    />);

    expect(mistakesElement).toMatchSnapshot();
  });
});
