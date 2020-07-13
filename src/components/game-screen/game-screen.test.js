import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import GameScreen from './game-screen.jsx';


const mockStore = createStore(() => ({
  mistakes: 0,
  errorCount: 3,
  gameTime: 300000,
}));
const mockChildren = <div className="mock-component"/>;

describe(`The component is rendered correctly`, () => {
  it(`With type genre`, () => {
    const gameScreen = renderer
    .create(
        <Provider store = {mockStore}>
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
        <Provider store = {mockStore}>
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
