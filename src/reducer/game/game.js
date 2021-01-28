const initialState = {
  step: -1,
  mistakes: 0,
  errorCount: 3,
  gameTime: 300000,
  minutes: 5,
  isTimerStop: false
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  RESET: `RESET`,
  DECREMENT_TIME: `DECREMENT_TIME`,
  STOP_TIMER: `STOP_TIMER`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });

    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });

    case ActionType.RESET:
      return Object.assign({}, initialState);

    case ActionType.DECREMENT_TIME:
      return Object.assign({}, state, {
        gameTime: state.gameTime - action.payload
      });

    case ActionType.STOP_TIMER:
      return Object.assign({}, state, {
        isTimerStop: action.payload
      });
  }

  return state;
};

export {
  reducer,
  ActionType
};
