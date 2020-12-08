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
      questions: [],
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
      questions: [
        {
          type: `genre`,
          genre: `rock`,
          answers: []
        }
      ],
    });
  });
});
