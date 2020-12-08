import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthorizationScreen} from './authorization-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const resetHandler = jest.fn();
const loginHandler = jest.fn();

describe(`The component interactivity`, () => {
  it(`Calls callback when user click on replay button`, () => {
    const authorizationScreen = mount(<AuthorizationScreen
      onReset = {resetHandler}
      login = {loginHandler}
    />);

    const replayButton = authorizationScreen.find(`.replay`);

    replayButton.simulate(`click`);

    expect(resetHandler).toHaveBeenCalledTimes(1);
  });

  it(`Calls callback when user submit form`, () => {
    const authorizationScreen = mount(<AuthorizationScreen
      onReset = {resetHandler}
      login = {loginHandler}
    />);

    const loginForm = authorizationScreen.find(`.login__form`);

    loginForm.simulate(`submit`, (evt) => {
      evt.preventDefault();
    });

    expect(loginHandler).toHaveBeenCalledTimes(1);
    expect(loginHandler.mock.calls[0][0]).toEqual({
      email: ``,
      password: ``
    });
  });
});
