import {
  reducer,
  ActionType,
} from './user.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      isAuthorizationRequired: true,
      user: null
    });
  });

  it(`Reducer should to authorize user successfully`, () => {
    expect(reducer({
      isAuthorizationRequired: true,
      user: null
    },
    {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: false
    }
    )).toEqual({
      isAuthorizationRequired: false,
      user: null
    });
  });

  it(`Reducer shouldn't to authorize user`, () => {
    expect(reducer({
      isAuthorizationRequired: true,
      user: null
    },
    {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    }
    )).toEqual({
      isAuthorizationRequired: true,
      user: null
    });
  });

  it(`Reducer should save user data successfully`, () => {
    expect(reducer({
      isAuthorizationRequired: false,
      user: null
    },
    {
      type: ActionType.AUTHORIZE_USER,
      payload: {
        email: ``,
        password: ``
      }
    }
    )).toEqual({
      isAuthorizationRequired: false,
      user: {
        email: ``,
        password: ``
      }
    });
  });
});
