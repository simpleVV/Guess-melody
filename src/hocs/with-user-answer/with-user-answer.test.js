import React from 'react';
import renderer from 'react-test-renderer';

import withUserAnser from './with-user-answer.js';

const MockComponent = () => {
  return (
    <div></div>
  );
};

const mockQuestion = {
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `rock`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `pop`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `jazz`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `rock`
    }
  ]
};

const MockComponentWrapped = withUserAnser(MockComponent);

describe(`HOC with user answer is rendered correctly.`, () => {
  it(`Component correctly renders with HOC.`, () => {
    const mockComponentWrapped = renderer
    .create(
        <MockComponentWrapped
          question = {mockQuestion}
          userAnsers = {[]}
          onAnswer = {jest.fn()}
          onChange = {jest.fn()}
        />
    )
    .toJSON();

    expect(mockComponentWrapped).toMatchSnapshot();
  });
});
