const initialState = {
  step: -1,
  mistakes: 0,
  errorCount: 3,
  gameTime: 300000,
  minutes: 5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case `RESET`:
      return Object.assign({}, initialState);
    case `DECREMENT_TIME`:
      return Object.assign({}, state, {
        gameTime: state.gameTime - action.payload
      });
  }
  return state;
};

export default reducer;
