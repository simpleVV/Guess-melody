import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Timer} from './timer.jsx';

Enzyme.configure({adapter: new Adapter()});

let timeUpdateHandler;
let timerStopHandler;

jest.useFakeTimers();

beforeEach(() => {
  timeUpdateHandler = jest.fn();
  timerStopHandler = jest.fn();
});

describe(`Before starting timer.`, () => {
  it(`Timer should not be updated and callback should not be called.`, () => {
    const timer = mount(
        <Timer
          gameTime = {1000}
          onTimeUpdate = {timeUpdateHandler}
          onTimerStop = {timerStopHandler} />
    );

    expect(timer.prop(`gameTime`)).toEqual(1000);
    expect(timeUpdateHandler).toHaveBeenCalledTimes(0);
  });
});


describe(`After timer starting.`, () => {
  it(`Timer should be updated and callback should be called.`, () => {
    const timer = mount(
        <Timer
          gameTime = {1000}
          onTimeUpdate = {timeUpdateHandler}
          onTimerStop = {timerStopHandler} />
    );

    expect(timer.prop(`gameTime`)).toEqual(1000);

    jest.advanceTimersByTime(1000);

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(timeUpdateHandler).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(timeUpdateHandler).toHaveBeenCalledTimes(2);
  });

  describe(`After timer stop`, () => {
    it(`Callback onTimerStop should be called`, () => {
      const timer = mount(
          <Timer
            gameTime = {0}
            onTimeUpdate = {timeUpdateHandler}
            onTimerStop = {timerStopHandler} />
      );

      expect(timer.prop(`gameTime`)).toEqual(0);
      jest.advanceTimersByTime(1000);

      expect(timerStopHandler).toHaveBeenCalledTimes(1);
    });
  });
});
