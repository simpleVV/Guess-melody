import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthorizationScreen} from './authorization-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

let resetHandler;
let loginHandler;
let authorizationScreen;
let loginForm;
let replayButton;

beforeEach(() => {
  loginHandler = jest.fn();
  resetHandler = jest.fn();
  authorizationScreen = mount(
      <AuthorizationScreen
        onReset = {resetHandler}
        login = {loginHandler} />
  );
  loginForm = authorizationScreen.find(`.login__form`);
  replayButton = authorizationScreen.find(`.replay`);
});

describe(`Before clicking on replay button.`, () => {
  it(`Callback should not be called.`, () => {
    expect(resetHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking on replay button.`, () => {
  it(`Callback should be called once.`, () => {
    replayButton.simulate(`click`);

    expect(resetHandler).toHaveBeenCalledTimes(1);
  });
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
