import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import GameScreen from './game-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore([]);
const mockElement = <div></div>;
const store = mockStore({
  GAME: {
    gameTime: 300000,
    mistakes: 0,
    errorCount: 3,
  }
});
let backButtonClickHandler;
let gameScreen;
let backButton;

beforeEach(() => {
  backButtonClickHandler = jest.fn();
  gameScreen = mount(
      <Provider store = {store}>
        <GameScreen
          type = {`genre`}
          onBackButtonClick = {backButtonClickHandler}
        >
          {mockElement}
        </GameScreen>
      </Provider>
  );
  backButton = gameScreen.find(`.game__back`);
});

describe(`Before clicking on game back button`, () => {
  it(`Callback should not be called`, () => {
    expect(backButtonClickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking on game back button`, () => {
  it(`Callback should be called once`, () => {
    backButton.simulate(`click`, (evt) => {
      evt.preventDefault();
    });

    expect(backButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
