import {ActionType} from './user.js';

const UserActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status
    };
  }
};

const Operation = {
  login: (userData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: userData.email,
      password: userData.password
    })
      .then(() => {
        dispatch(UserActionCreator.requireAuthorization(false));
      });
  }
};

export {
  UserActionCreator,
  Operation
};
