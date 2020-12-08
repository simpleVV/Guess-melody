import React from 'react';
import renderer from 'react-test-renderer';

import {GameScreen} from './game-screen.jsx';

const mockChildren = <div className="mock-component"/>;

describe(`The component is rendered correctly`, () => {
  it(`With type genre`, () => {
    const gameScreen = renderer
    .create(
        <GameScreen
          type = {`genre`}
          gameTime = {3000}
          onTimeUpdate = {jest.fn()}
          errorCount = {4}
          mistakes = {1}
        >
          {mockChildren}
        </GameScreen>
    )
  .toJSON();

    expect(gameScreen).toMatchSnapshot();
  });

  it(`With type artist`, () => {
    const gameScreen = renderer
    .create(
        <GameScreen
          type = {`artist`}
          gameTime = {3000}
          onTimeUpdate = {jest.fn()}
          errorCount = {4}
          mistakes = {1}
        >
          {mockChildren}
        </GameScreen>
    )
  .toJSON();

    expect(gameScreen).toMatchSnapshot();
  });
});
