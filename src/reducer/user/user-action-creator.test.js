import {ActionType} from './user.js';
import createAPI from '../../api.js';
import MockAdapter from 'axios-mock-adapter';
import {
  ActionCreator,
  Operation
} from './user-action-creator.js';

const api = createAPI(() => {});

const mockUserData = {
  email: `bob@mail.ru`,
  password: `123`
};

describe(`Action creator work correctly`, () => {
  it(`Action creator correctly change authorization status`, () => {
    expect(ActionCreator.requireAuthorization(false))
      .toEqual({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: false
      });

    expect(ActionCreator.requireAuthorization(true))
      .toEqual({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: true
      });
  });

  it(`Action creator correctly save user data`, () => {
    expect(ActionCreator.authorizeUser(mockUserData))
    .toEqual({
      type: ActionType.AUTHORIZE_USER,
      payload: mockUserData
    });
  });

  it(`Should successfully authorize the user then API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const login = Operation.login(mockUserData);

    apiMock
        .onPost(`/login`)
        .reply(200);

    return login(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REQUIRE_AUTHORIZATION,
            payload: false
          });
        });
  });
});
