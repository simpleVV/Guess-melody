import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {withPrivateRoute} from './with-private-route.js';

const MockComponent = () => {
  return (
    <div>
      Hello User!
    </div>
  );
};

const MockComponentWrapped = withPrivateRoute(MockComponent);

describe(`HOC with private route is rendered correctly.`, () => {
  it(`Component correctly renders if user sign in.`, () => {
    const mockComponentWrapped = renderer
      .create(
          <MockComponentWrapped
            isAuthorizationRequired = {false}
          />
      )
        .toJSON();
    expect(mockComponentWrapped).toMatchSnapshot();
  });

  it(`Component should not rendered if user sign out.`, () => {
    const mockComponentWrapped = renderer
      .create(
          <BrowserRouter>
            <MockComponentWrapped
              isAuthorizationRequired = {true}
            />
          </BrowserRouter>
      )
        .toJSON();
    expect(mockComponentWrapped).toMatchSnapshot();
  });
});
