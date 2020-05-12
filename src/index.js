
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import settings from './mocks/settings.js';
import questions from './mocks/questions.js';
import {reducer} from './reducer.js';

const init = (gameSettings, gameQuestions) => {
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store = {store}>
        <App
          gameTime = {gameSettings.time}
          errorCount = {gameSettings.errorCount}
          questions = {gameQuestions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
