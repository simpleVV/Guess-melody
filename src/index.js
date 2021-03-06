import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
  createStore,
  applyMiddleware
} from 'redux';

import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data-action-creator.js';
import createAPI from './api.js';

const init = () => {
  const api = createAPI(() => {});
  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(DataOperation.loadQuestions());

  ReactDOM.render(
      <Provider store = {store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
