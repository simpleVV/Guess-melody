import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import questions from './mocks/questions.js';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import createAPI from './api.js';
import {Operation} from './reducer/action-creator.js';

import App from './components/app/app.jsx';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store = {store}>
        <App
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(questions);
