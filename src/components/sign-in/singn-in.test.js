import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in.jsx';

const mockFormData = {
  email: `mock@mail.ru`,
  password: `mockpass`
};

describe(`The component is rendered correctly.`, () => {
  it(`Sign in screen is renders correctly.`, () => {
    const signIn = renderer
      .create(
          <SignIn
            onLoginChange = {jest.fn()}
            onPasswordChange = {jest.fn()}
            formData = {mockFormData}
            login = {jest.fn()} />
      )
      .toJSON();

    expect(signIn).toMatchSnapshot();
  });
});
