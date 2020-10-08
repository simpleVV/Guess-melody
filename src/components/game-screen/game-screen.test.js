import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import GameScreen from './game-screen.jsx';

const mockStore = configureStore([]);

const store = mockStore({
  game: {
    gameTime: 300000,
    mistakes: 0,
    errorCount: 3
  }
});

const mockChildren = <div className="mock-component"/>;

describe(`The component is rendered correctly`, () => {
  it(`With type genre`, () => {
    const gameScreen = renderer
    .create(
        <Provider store = {store}>
          <GameScreen
            type = {`genre`}
          >
            {mockChildren}
          </GameScreen>
        </Provider>
    )
  .toJSON();

    expect(gameScreen).toMatchSnapshot();
  });

  it(`With type artist`, () => {
    const gameScreen = renderer
    .create(
        <Provider store = {store}>
          <GameScreen
            type = {`artist`}
          >
            {mockChildren}
          </GameScreen>
        </Provider>
    )
  .toJSON();

    expect(gameScreen).toMatchSnapshot();
  });
});
