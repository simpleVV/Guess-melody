import {
  reducer,
  ActionType
} from './user.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      isAuthorizationRequired: true
    });
  });

  it(`Reducer should to authorize user successfully`, () => {
    expect(reducer({
      isAuthorizationRequired: true
    },
    {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: false
    }
    )).toEqual({
      isAuthorizationRequired: false
    });
  });

  it(`Reducer shouldn't to authorize user successfully`, () => {
    expect(reducer({
      isAuthorizationRequired: true
    },
    {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    }
    )).toEqual({
      isAuthorizationRequired: true
    });
  });
});
