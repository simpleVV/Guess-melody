import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import GameOverScreen from './game-over-screen.jsx';

const mockMessage = {
  title: `Какая жалость!`,
  discription: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
};

describe(`The component is rendered correctly.`, () => {
  it(`Fail time component correctly render.`, () => {
    const failTime = renderer
    .create(
        <BrowserRouter>
          <GameOverScreen
            onReplayButtonClick = {jest.fn()}
            message = {mockMessage} />
        </BrowserRouter>
    )
    .toJSON();

    expect(failTime).toMatchSnapshot();
  });
});
