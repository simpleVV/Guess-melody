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
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0
    },
    {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    }
    )).toEqual({
      step: 0,
      mistakes: 0
    });

    expect(reducer({
      step: -1,
      mistakes: 0
    },
    {
      type: ActionType.INCREMENT_STEP,
      payload: 0
    })).toEqual({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should increment current mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0
    },
    {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    }
    )).toEqual({
      step: -1,
      mistakes: 1
    });

    expect(reducer({
      step: -1,
      mistakes: 0
    },
    {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    }
    )).toEqual({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 5,
      mistakes: 10
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
    });
  });

  it(`Reducer should decrement current time by a given value`, () => {
    expect(reducer({
      step: 2,
      mistakes: 3,
      minutes: 5,
      gameTimeMin: 3,
      gameTime: 180000,
    },
    {
      type: ActionType.DECREMENT_TIME,
      payload: 1000
    }
    )).toEqual({
      step: 2,
      mistakes: 3,
      minutes: 5,
      gameTimeMin: 3,
      gameTime: 179000,
    });
  });
});
