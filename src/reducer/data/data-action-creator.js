import {ActionType} from './data.js';

const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    };
  },
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
    .then((response) => {
      dispatch(ActionCreator.loadQuestions(response.data));
    });
  }
};

export {
  ActionCreator,
  Operation
};
