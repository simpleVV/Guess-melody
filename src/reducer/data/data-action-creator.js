import {ActionType} from './data.js';

const DataActionCreator = {
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
      dispatch(DataActionCreator.loadQuestions(response.data));
    });
  }
};

export {
  DataActionCreator,
  Operation
};
