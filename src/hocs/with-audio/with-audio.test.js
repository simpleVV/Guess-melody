import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import withAudio from './with-audio.js';

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

describe(`The component with audio is rendered correctly`, () => {
  it(`With Audio correctly renders`, () => {
    const MockComponentWrapped = withAudio(MockComponent);

    const mockComponentWrapped = renderer
    .create(<MockComponentWrapped
      isLoading = {false}
      isPlaying = {false}
      src = {``}
      onPlayButtonClick = {jest.fn()}
    />)
      .toJSON();

    expect(mockComponentWrapped).toMatchSnapshot();
  });
});
