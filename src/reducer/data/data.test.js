import {
  reducer,
  ActionType
} from './data.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      questions: [],
    });
  });

  it(`Reducer should load questions`, () => {
    expect(reducer({
      step: 2,
      mistakes: 3,
      minutes: 5,
      gameTimeMin: 3,
      gameTime: 180000,
      questions: [],
      isAuthorizationRequired: false
    },
    {
      type: ActionType.LOAD_QUESTIONS,
      payload: [
        {
          type: `genre`,
          genre: `rock`,
          answers: []
        }
      ]
    }
    )).toEqual({
      step: 2,
      mistakes: 3,
      minutes: 5,
      gameTimeMin: 3,
      gameTime: 180000,
      questions: [
        {
          type: `genre`,
          genre: `rock`,
          answers: []
        }
      ],
      isAuthorizationRequired: false
    });
  });
});
