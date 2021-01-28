import React from 'react';
import renderer from 'react-test-renderer';

import GenreItem from './genre-screen-item.jsx';

const mockAnswer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
  genre: `rock`
};

describe(`The component is rendered correctly.`, () => {
  it(`GenreItem correctly renders with transferred mock data.`, () => {
    const genreItem = renderer
    .create(
        <GenreItem
          answer = {mockAnswer}
          id = {0}
          renderPlayer = {jest.fn()}
          screenIndex = {10}
          userAnswer = {false}
          onChange = {jest.fn()} />
    )
    .toJSON();

    expect(genreItem).toMatchSnapshot();
  });
});
