import reducer from './reducer.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 300000,
      errorCount: 3
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0
    },
    {
      type: `INCREMENT_STEP`,
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
      type: `INCREMENT_STEP`,
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
      type: `INCREMENT_MISTAKES`,
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
      type: `INCREMENT_MISTAKES`,
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
      type: `RESET`
    }
    )).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 300000,
      errorCount: 3
    });
  });

  it(`Reducer should decrement current time by a given value`, () => {
    expect(reducer({
      step: 2,
      mistakes: 3,
      gameTimeMin: 3,
      gameTime: 180000
    },
    {
      type: `DECREMENT_TIME`,
      payload: 1000
    }
    )).toEqual({
      step: 2,
      mistakes: 3,
      gameTimeMin: 3,
      gameTime: 179000
    });
  });
});
