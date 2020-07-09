import React from 'react';
import renderer from 'react-test-renderer';

import GameScreen from './game-screen.jsx';

const mockChildren = <div className="mock-component"/>;

describe(`The component is rendered correctly`, () => {
  it(`With type genre`, () => {
    const gameScreen = renderer
    .create(<GameScreen
      type = {`genre`}
      mistakes = {0}
      errorCount = {3}
      gameTime = {60000}
      onTimeUpdate = {jest.fn()}
    >
      {mockChildren}
    </GameScreen>
    )
  .toJSON();

    expect(gameScreen).toMatchSnapshot();
  });

  it(`With type artist`, () => {
    const gameScreen = renderer
    .create(<GameScreen
      type = {`artist`}
      mistakes = {0}
      errorCount = {3}
      gameTime = {60000}
      onTimeUpdate = {jest.fn()}
    >
      {mockChildren}
    </GameScreen>
    )
  .toJSON();

    expect(gameScreen).toMatchSnapshot();
  });
});
