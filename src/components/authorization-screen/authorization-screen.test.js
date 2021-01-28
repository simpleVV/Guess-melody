import React from 'react';
import renderer from 'react-test-renderer';

import {AuthorizationScreen} from './authorization-screen.jsx';

describe(`The component is rendered correctly.`, () => {
  it(`Authorization screen is renders correctly.`, () => {
    const authorizationScreen = renderer
      .create(
          <AuthorizationScreen
            onReset = {jest.fn()}
            login = {jest.fn()} />
      )
      .toJSON();

    expect(authorizationScreen).toMatchSnapshot();
  });
});
