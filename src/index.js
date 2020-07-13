import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import questions from './mocks/questions.js';

import App from './components/app/app.jsx';

const init = (gameQuestions) => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);
  ReactDOM.render(
      <Provider store = {store}>
        <App
          questions = {gameQuestions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(questions);
