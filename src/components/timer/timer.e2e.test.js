import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Timer} from './timer.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockTimeInMilSec = 300000;
const timeUpdateHandler = jest.fn();

describe(`The component interactivity`, () => {
  it(`Update time every second`, () => {

    jest.useFakeTimers();

    const timer = mount(<Timer
      gameTime = {mockTimeInMilSec}
      onTimeUpdate = {timeUpdateHandler}
    />);

    expect(timer.prop(`gameTime`)).toEqual(300000);
    expect(timeUpdateHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(timeUpdateHandler).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(timeUpdateHandler).toHaveBeenCalledTimes(2);
  });
});
