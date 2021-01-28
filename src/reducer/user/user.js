const initialState = {
  isAuthorizationRequired: true,
  user: null
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  AUTHORIZE_USER: `AUTHORIZE_USER`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
    case ActionType.AUTHORIZE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
  }
  return state;
};

export {
  reducer,
  ActionType,
};
