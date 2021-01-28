import {
  reducer,
  ActionType
} from './game.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      step: -1,
      mistakes: 0,
      minutes: 5,
      gameTime: 300000,
      errorCount: 3,
      isTimerStop: false
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
    },
    {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    }
    )).toEqual({
      step: 0,
    });

    expect(reducer({
      step: -1,
    },
    {
      type: ActionType.INCREMENT_STEP,
      payload: 0
    })).toEqual({
      step: -1,
    });
  });

  it(`Reducer should increment current mistakes by a given value`, () => {
    expect(reducer({
      mistakes: 0
    },
    {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    }
    )).toEqual({
      mistakes: 1
    });

    expect(reducer({
      mistakes: 0
    },
    {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    }
    )).toEqual({
      mistakes: 0
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 5,
      mistakes: 10,
      gemeTime: 1000,
      isTimerStop: true
    },
    {
      type: ActionType.RESET
    }
    )).toEqual({
      step: -1,
      mistakes: 0,
      minutes: 5,
      gameTime: 300000,
      errorCount: 3,
      isTimerStop: false
    });
  });

  it(`Reducer should decrement current time by a given value`, () => {
    expect(reducer({
      gameTime: 180000,
    },
    {
      type: ActionType.DECREMENT_TIME,
      payload: 1000
    }
    )).toEqual({
      gameTime: 179000,
    });
  });

  it(`Reducer should set isTimerStop on true `, () => {
    expect(reducer({
      isTimerStop: false
    },
    {
      type: ActionType.STOP_TIMER,
      payload: true
    })).toEqual({
      isTimerStop: true
    });
  });
});
