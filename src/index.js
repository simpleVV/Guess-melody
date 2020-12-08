import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import {Operation} from './reducer/data/data-action-creator.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
  createStore,
  applyMiddleware
} from 'redux';

import App from './components/app/app.jsx';

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.loadQuestions());

ReactDOM.render(
    <Provider store = {store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
