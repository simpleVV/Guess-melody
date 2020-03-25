
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import settings from './mocks/settings.js';
import questions from './mocks/questions.js';

const init = (gameSettings, gameQuestions) => {
  ReactDOM.render(
      <App
        gameTime = {gameSettings.time}
        errorCount = {gameSettings.errorCount}
        questions = {gameQuestions}
      />,
      document.querySelector(`#root`)
  );
};

init(settings, questions);
