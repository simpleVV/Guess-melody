import {ActionType} from './user.js';
import createAPI from '../../api.js';
import MockAdapter from 'axios-mock-adapter';
import {
  UserActionCreator,
  Operation
} from './user-action-creator.js';

const api = createAPI(() => {});

describe(`Action creator work correctly`, () => {
  it(`Action creator correctly change authorization status`, () => {
    expect(UserActionCreator.requireAuthorization(false))
      .toEqual({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: false
      });

    expect(UserActionCreator.requireAuthorization(true))
      .toEqual({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: true
      });
  });

  it(`Should successfully authorize the user then API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockUserData = {
      email: `bob@mail.ru`,
      password: `123`
    };
    const login = Operation.login(mockUserData);

    apiMock
        .onPost(`/login`)
        .reply(200);

    return login(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REQUIRE_AUTHORIZATION,
            payload: false
          });
        });
  });
});
