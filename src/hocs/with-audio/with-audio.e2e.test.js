import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import withAudio from './with-audio.js';

Enzyme.configure({adapter: new Adapter()});

const MockPlayer = (props) => {
  const {
    children,
    onPlayButtonClick
  } = props;

  return (
    <div>
      <button onClick = {onPlayButtonClick}/>
      {children}
    </div>
  );
};

MockPlayer.propTypes = {
  onPlayButtonClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

describe(`The component interactivity`, () => {
  it(`Turn on audio`, () => {
    const MockPlayerWrapped = withAudio(MockPlayer);
    const onPlayButtonClickHandler = jest.fn();
    const mockPlayerWrapped = mount(<MockPlayerWrapped
      isPlaying = {true}
      src = {``}
      onPlayButtonClick = {onPlayButtonClickHandler}
    />);

    window.HTMLMediaElement.prototype.play = () => {};

    const {_audioRef} = mockPlayerWrapped.instance();

    jest.spyOn(_audioRef.current, `play`);

    mockPlayerWrapped.instance().componentDidMount();

    const button = mockPlayerWrapped.find(`button`);
    button.simulate(`click`);

    expect(onPlayButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Turn off audio`, () => {
    const MockPlayerWrapped = withAudio(MockPlayer);
    const onPlayButtonClickHandler = jest.fn();
    const mockPlayerWrapped = mount(<MockPlayerWrapped
      isPlaying = {false}
      src = {``}
      onPlayButtonClick = {onPlayButtonClickHandler}
    />);

    window.HTMLMediaElement.prototype.pause = () => {};

    const {_audioRef} = mockPlayerWrapped.instance();

    jest.spyOn(_audioRef.current, `pause`);

    mockPlayerWrapped.instance().componentDidMount();

    const button = mockPlayerWrapped.find(`button`);
    button.simulate(`click`);

    expect(onPlayButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
  });
});
