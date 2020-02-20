
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const settings = {
    gameTime: 7,
    errorCount: 4
  };

  ReactDOM.render(
      <App
        gameTime = {settings.gameTime}
        errorCount = {settings.errorCount}
      />,
      document.querySelector(`#root`)
  );
};

init();
