import {
  ActionType,
} from './user.js';

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status
    };
  },
  authorizeUser: (user) => {
    return {
      type: ActionType.AUTHORIZE_USER,
      payload: user
    };
  }
};

const Operation = {
  login: (userData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: userData.email,
      password: userData.password
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.authorizeUser(response.data));
      });
  },
};

export {
  ActionCreator,
  Operation
};
