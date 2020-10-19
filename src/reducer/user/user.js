const initialState = {
  isAuthorizationRequired: true
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
  }
  return state;
};

export {reducer, ActionType};
