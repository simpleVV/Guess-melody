import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';

import {SignIn} from './sign-in.jsx';

Enzyme.configure({adapter: new Adapter()});

let loginHandler;
let signIn;
let loginForm;

beforeEach(() => {
  loginHandler = jest.fn();
  signIn = mount(
      <BrowserRouter>
        <SignIn
          login = {loginHandler} />
      </BrowserRouter>
  );
  loginForm = signIn.find(`.login__form`);

});

describe(`Before submitting login form.`, () => {
  it(`Callback should not be called.`, () => {
    expect(loginHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After submitting login form.`, () => {
  it(`Callback should be called once.`, () => {
    loginForm.simulate(`submit`, (evt) => {
      evt.preventDefault();
    });

    expect(loginHandler).toHaveBeenCalledTimes(1);
  });

  it(`Callback should be called with empty parameters.`, () => {
    loginForm.simulate(`submit`, (evt) => {
      evt.preventDefault();
    });

    expect(loginHandler.mock.calls[0][0]).toEqual({
      email: ``,
      password: ``
    });
  });
});
